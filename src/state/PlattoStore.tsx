// Platto Sandbox: the shared in-memory store.
// The customer app, restaurant tablet and rider app all read the same orders,
// so a change on one surface shows up on the others. Nothing is saved:
// reloading the page resets everything to the mock data.

import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import { CURRENT_CUSTOMER, CURRENT_RIDER, menuItems, seedOrders } from '../data/mockData';
import type { Cart, IssueType, Order, OrderStatus } from '../types';
import { addMinutes, nowHHMM } from '../utils/time';

export const STATUS_FLOW: OrderStatus[] = ['placed', 'preparing', 'ready', 'picked_up', 'delivered'];

export interface PlattoState {
  orders: Order[];
  cart: Cart;
  activeOrderId: string; // the customer's most recent order
  nextOrderNumber: number;
}

type Action =
  | { type: 'ADD_TO_CART'; menuItemId: string }
  | { type: 'SET_QUANTITY'; menuItemId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'PLACE_ORDER'; address: string; notes?: string }
  | { type: 'SET_STATUS'; orderId: string; status: OrderStatus }
  | { type: 'ADVANCE_ORDER'; orderId: string }
  | { type: 'DELAY_ORDER'; orderId: string; minutes: number }
  | { type: 'REPORT_ISSUE'; orderId: string; issueType: IssueType; message: string }
  | { type: 'SET_ACTIVE_ORDER'; orderId: string };

const initialState: PlattoState = {
  orders: seedOrders,
  cart: { restaurantId: null, lines: [] },
  activeOrderId: 'o4821',
  nextOrderNumber: 4833,
};

function updateOrder(state: PlattoState, orderId: string, change: (o: Order) => Order): PlattoState {
  return { ...state, orders: state.orders.map((o) => (o.id === orderId ? change(o) : o)) };
}

function reducer(state: PlattoState, action: Action): PlattoState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = menuItems.find((m) => m.id === action.menuItemId);
      if (!item) return state;
      // A cart holds items from one restaurant at a time.
      const sameRestaurant = state.cart.restaurantId === item.restaurantId;
      const current = sameRestaurant ? state.cart.lines : [];
      const exists = current.some((l) => l.menuItemId === item.id);
      const lines = exists
        ? current.map((l) => (l.menuItemId === item.id ? { ...l, quantity: l.quantity + 1 } : l))
        : [...current, { menuItemId: item.id, quantity: 1 }];
      return { ...state, cart: { restaurantId: item.restaurantId, lines } };
    }
    case 'SET_QUANTITY': {
      const lines = state.cart.lines
        .map((l) => (l.menuItemId === action.menuItemId ? { ...l, quantity: action.quantity } : l))
        .filter((l) => l.quantity > 0);
      return { ...state, cart: { restaurantId: lines.length ? state.cart.restaurantId : null, lines } };
    }
    case 'CLEAR_CART':
      return { ...state, cart: { restaurantId: null, lines: [] } };
    case 'PLACE_ORDER': {
      if (!state.cart.restaurantId || state.cart.lines.length === 0) return state;
      const placedAt = nowHHMM();
      const itemCount = state.cart.lines.reduce((n, l) => n + l.quantity, 0);
      const order: Order = {
        id: `o${state.nextOrderNumber}`,
        code: `PL-${state.nextOrderNumber}`,
        restaurantId: state.cart.restaurantId,
        customerName: CURRENT_CUSTOMER,
        address: action.address,
        deliveryType: 'home',
        items: state.cart.lines.map((l) => {
          const m = menuItems.find((mi) => mi.id === l.menuItemId)!;
          return { menuItemId: m.id, name: m.name, quantity: l.quantity, price: m.price };
        }),
        bagCount: Math.max(1, Math.ceil(itemCount / 4)),
        status: 'placed',
        placedAt,
        promisedTime: addMinutes(placedAt, 35),
        etaTime: addMinutes(placedAt, 35),
        notes: action.notes,
        issues: [],
      };
      return {
        ...state,
        orders: [order, ...state.orders],
        cart: { restaurantId: null, lines: [] },
        activeOrderId: order.id,
        nextOrderNumber: state.nextOrderNumber + 1,
      };
    }
    case 'SET_STATUS':
      return updateOrder(state, action.orderId, (o) => ({
        ...o,
        status: action.status,
        riderName: action.status === 'picked_up' ? CURRENT_RIDER : o.riderName,
      }));
    case 'ADVANCE_ORDER':
      return updateOrder(state, action.orderId, (o) => {
        const next = STATUS_FLOW[Math.min(STATUS_FLOW.indexOf(o.status) + 1, STATUS_FLOW.length - 1)];
        return { ...o, status: next, riderName: next === 'picked_up' ? CURRENT_RIDER : o.riderName };
      });
    case 'DELAY_ORDER':
      return updateOrder(state, action.orderId, (o) => ({ ...o, etaTime: addMinutes(o.etaTime, action.minutes) }));
    case 'REPORT_ISSUE':
      return updateOrder(state, action.orderId, (o) => ({
        ...o,
        issues: [...o.issues, { type: action.issueType, message: action.message, createdAt: nowHHMM() }],
      }));
    case 'SET_ACTIVE_ORDER':
      return { ...state, activeOrderId: action.orderId };
    default:
      return state;
  }
}

interface StoreValue {
  state: PlattoState;
  addToCart: (menuItemId: string) => void;
  setQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (address: string, notes?: string) => void;
  setStatus: (orderId: string, status: OrderStatus) => void;
  advanceOrder: (orderId: string) => void;
  delayOrder: (orderId: string, minutes: number) => void;
  reportIssue: (orderId: string, issueType: IssueType, message: string) => void;
  setActiveOrder: (orderId: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function PlattoProvider({ children, overrides }: { children: ReactNode; overrides?: Partial<PlattoState> }) {
  // `overrides` lets the gallery view start a screen from a specific state (e.g. a filled cart).
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...overrides });
  const value = useMemo<StoreValue>(
    () => ({
      state,
      addToCart: (menuItemId) => dispatch({ type: 'ADD_TO_CART', menuItemId }),
      setQuantity: (menuItemId, quantity) => dispatch({ type: 'SET_QUANTITY', menuItemId, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      placeOrder: (address, notes) => dispatch({ type: 'PLACE_ORDER', address, notes }),
      setStatus: (orderId, status) => dispatch({ type: 'SET_STATUS', orderId, status }),
      advanceOrder: (orderId) => dispatch({ type: 'ADVANCE_ORDER', orderId }),
      delayOrder: (orderId, minutes) => dispatch({ type: 'DELAY_ORDER', orderId, minutes }),
      reportIssue: (orderId, issueType, message) => dispatch({ type: 'REPORT_ISSUE', orderId, issueType, message }),
      setActiveOrder: (orderId) => dispatch({ type: 'SET_ACTIVE_ORDER', orderId }),
    }),
    [state],
  );
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function usePlatto(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('usePlatto must be used inside <PlattoProvider>');
  return ctx;
}
