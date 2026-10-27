import { menuItems, restaurants } from '../data/mockData';
import type { Order, OrderStatus } from '../types';

export function euros(amount: number): string {
  return `€${amount.toFixed(2).replace('.', ',')}`;
}

export function getRestaurant(id: string | null) {
  return restaurants.find((r) => r.id === id);
}

export function getMenuItem(id: string) {
  return menuItems.find((m) => m.id === id);
}

export function itemCount(order: Order): number {
  return order.items.reduce((n, i) => n + i.quantity, 0);
}

/** "1 item", "3 items" */
export function itemsLabel(count: number): string {
  return `${count} ${count === 1 ? 'item' : 'items'}`;
}

export function orderTotal(order: Order): number {
  return order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: 'Order placed',
  preparing: 'Being prepared',
  ready: 'Ready for pickup',
  picked_up: 'On the way',
  delivered: 'Delivered',
};
