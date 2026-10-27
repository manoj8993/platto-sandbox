// Platto Sandbox: shared types.
// Every screen reads and writes data through these shapes.
// See BUILDER_BRIEF.md before changing anything here.

export type Surface = 'customer' | 'restaurant' | 'rider';

export type MenuCategory = 'Family menus' | 'Mains' | 'Sides' | 'Desserts' | 'Drinks';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  city: string;
  rating: number;
  deliveryMinutes: [number, number];
  emoji: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number; // euros
  category: MenuCategory;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number; // unit price in euros
}

// Order lifecycle: placed -> preparing -> ready -> picked_up -> delivered
export type OrderStatus = 'placed' | 'preparing' | 'ready' | 'picked_up' | 'delivered';

export type DeliveryType = 'home' | 'office';

export type IssueType = 'late' | 'payment' | 'other';

export interface Issue {
  type: IssueType;
  message: string;
  createdAt: string; // HH:MM
}

export interface Order {
  id: string;
  code: string; // shown to staff and riders, e.g. "PL-4821"
  restaurantId: string;
  customerName: string;
  address: string;
  deliveryType: DeliveryType;
  items: OrderItem[];
  bagCount: number; // bags the restaurant hands to the rider
  status: OrderStatus;
  placedAt: string; // HH:MM
  promisedTime: string; // ETA shown at checkout, HH:MM
  etaTime: string; // current ETA, HH:MM (later than promisedTime when delayed)
  riderName?: string;
  notes?: string;
  issues: Issue[];
}

export interface CartLine {
  menuItemId: string;
  quantity: number;
}

export interface Cart {
  restaurantId: string | null;
  lines: CartLine[];
}
