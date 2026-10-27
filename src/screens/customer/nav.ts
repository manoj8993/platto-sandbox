// Navigation inside the customer app. Add a new screen name here when you add a screen.

export type CustomerScreen = 'home' | 'menu' | 'cart' | 'checkout' | 'tracking' | 'delivered' | 'help';

export interface CustomerNav {
  go: (screen: CustomerScreen) => void;
  openRestaurant: (restaurantId: string) => void;
  restaurantId: string;
}
