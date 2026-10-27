// Platto Sandbox: mock data. Everything here is fictional.
// There is no backend: the app starts from this data every time it loads.
// You may ADD items, orders or fields. Keep existing ids unchanged.

import type { MenuItem, Order, Restaurant } from '../types';

export const CURRENT_CUSTOMER = 'Nadia B.';
export const CURRENT_RIDER = 'Aïcha K.';

export const restaurants: Restaurant[] = [
  { id: 'r1', name: 'Nonna Rosa', cuisine: 'Pizzeria', city: 'Lyon', rating: 4.6, deliveryMinutes: [25, 35], emoji: '🍕' },
  { id: 'r2', name: 'Le Comptoir Burger', cuisine: 'Burgers', city: 'Paris', rating: 4.4, deliveryMinutes: [20, 30], emoji: '🍔' },
  { id: 'r3', name: 'Sakura Box', cuisine: 'Sushi and platters', city: 'Paris', rating: 4.5, deliveryMinutes: [30, 40], emoji: '🍣' },
];

export const menuItems: MenuItem[] = [
  // Nonna Rosa (r1)
  { id: 'm101', restaurantId: 'r1', name: 'Famiglia menu', description: '4 pizzas of your choice and 2 sides', price: 54, category: 'Family menus' },
  { id: 'm102', restaurantId: 'r1', name: "Kids' menu", description: 'Small margherita, juice and a scoop of gelato', price: 9.5, category: 'Family menus' },
  { id: 'm103', restaurantId: 'r1', name: 'Margherita', description: 'Tomato, mozzarella, basil', price: 11, category: 'Mains' },
  { id: 'm104', restaurantId: 'r1', name: 'Regina', description: 'Tomato, mozzarella, ham, mushrooms', price: 13, category: 'Mains' },
  { id: 'm105', restaurantId: 'r1', name: 'Quattro formaggi', description: 'Mozzarella, gorgonzola, parmesan, fontina', price: 14, category: 'Mains' },
  { id: 'm106', restaurantId: 'r1', name: 'Diavola', description: 'Tomato, mozzarella, spicy salami', price: 13.5, category: 'Mains' },
  { id: 'm107', restaurantId: 'r1', name: 'Calzone', description: 'Folded pizza with ham, ricotta and mozzarella', price: 13, category: 'Mains' },
  { id: 'm108', restaurantId: 'r1', name: 'Garlic bread', description: 'Wood-fired, with herb butter', price: 5, category: 'Sides' },
  { id: 'm109', restaurantId: 'r1', name: 'Caesar salad', description: 'Romaine, parmesan, croutons', price: 8.5, category: 'Sides' },
  { id: 'm110', restaurantId: 'r1', name: 'Arancini (3)', description: 'Fried risotto balls with mozzarella', price: 6.5, category: 'Sides' },
  { id: 'm111', restaurantId: 'r1', name: 'Tiramisu', description: 'House recipe', price: 6, category: 'Desserts' },
  { id: 'm112', restaurantId: 'r1', name: 'Panna cotta', description: 'With red berry coulis', price: 5.5, category: 'Desserts' },
  { id: 'm113', restaurantId: 'r1', name: 'San Pellegrino 50cl', description: 'Sparkling water', price: 3, category: 'Drinks' },
  { id: 'm114', restaurantId: 'r1', name: 'Homemade lemonade', description: '33cl', price: 3.5, category: 'Drinks' },

  // Le Comptoir Burger (r2)
  { id: 'm201', restaurantId: 'r2', name: 'Burger box for 4', description: '4 classic burgers, 2 large fries', price: 46, category: 'Family menus' },
  { id: 'm202', restaurantId: 'r2', name: "Kids' menu", description: 'Mini burger, small fries, juice', price: 8.5, category: 'Family menus' },
  { id: 'm203', restaurantId: 'r2', name: 'Classic burger', description: 'Beef, cheddar, pickles, house sauce', price: 12.5, category: 'Mains' },
  { id: 'm204', restaurantId: 'r2', name: 'Double cheese burger', description: 'Two patties, double cheddar', price: 13.5, category: 'Mains' },
  { id: 'm205', restaurantId: 'r2', name: 'Veggie burger', description: 'Bean patty, avocado, tomato', price: 12.5, category: 'Mains' },
  { id: 'm206', restaurantId: 'r2', name: 'Chicken burger', description: 'Crispy chicken, slaw, chipotle mayo', price: 13, category: 'Mains' },
  { id: 'm207', restaurantId: 'r2', name: 'Fries', description: 'Skin-on, sea salt', price: 4, category: 'Sides' },
  { id: 'm208', restaurantId: 'r2', name: 'Sweet potato fries', description: 'With smoked paprika', price: 4.5, category: 'Sides' },
  { id: 'm209', restaurantId: 'r2', name: 'Onion rings', description: 'Beer batter', price: 4.5, category: 'Sides' },
  { id: 'm210', restaurantId: 'r2', name: 'Brownie', description: 'Dark chocolate, walnuts', price: 4.5, category: 'Desserts' },
  { id: 'm211', restaurantId: 'r2', name: 'Cookie', description: 'Chocolate chip', price: 3, category: 'Desserts' },
  { id: 'm212', restaurantId: 'r2', name: 'Cola 33cl', description: 'Can', price: 3, category: 'Drinks' },
  { id: 'm213', restaurantId: 'r2', name: 'Iced tea 33cl', description: 'Peach', price: 3, category: 'Drinks' },

  // Sakura Box (r3)
  { id: 'm301', restaurantId: 'r3', name: 'Party platter (48 pieces)', description: 'Maki, nigiri and California rolls for 4 to 6', price: 62, category: 'Family menus' },
  { id: 'm302', restaurantId: 'r3', name: 'Office lunch box', description: '8 maki, 4 nigiri, salad, miso', price: 14.5, category: 'Family menus' },
  { id: 'm303', restaurantId: 'r3', name: 'Salmon sushi set', description: '6 nigiri, 6 maki', price: 15, category: 'Mains' },
  { id: 'm304', restaurantId: 'r3', name: 'California rolls (8)', description: 'Crab, avocado, cucumber', price: 12, category: 'Mains' },
  { id: 'm305', restaurantId: 'r3', name: 'Chicken teriyaki bowl', description: 'Rice, grilled chicken, vegetables', price: 13.5, category: 'Mains' },
  { id: 'm306', restaurantId: 'r3', name: 'Vegetable gyoza (6)', description: 'Pan-fried dumplings', price: 6.5, category: 'Sides' },
  { id: 'm307', restaurantId: 'r3', name: 'Edamame', description: 'Sea salt', price: 4.5, category: 'Sides' },
  { id: 'm308', restaurantId: 'r3', name: 'Miso soup', description: 'Tofu, wakame', price: 3.5, category: 'Sides' },
  { id: 'm309', restaurantId: 'r3', name: 'Seaweed salad', description: 'Sesame dressing', price: 5, category: 'Sides' },
  { id: 'm310', restaurantId: 'r3', name: 'Mochi (3)', description: 'Matcha, mango, red bean', price: 5.5, category: 'Desserts' },
  { id: 'm311', restaurantId: 'r3', name: 'Matcha cheesecake', description: 'Slice', price: 5.5, category: 'Desserts' },
  { id: 'm312', restaurantId: 'r3', name: 'Green tea 50cl', description: 'Unsweetened', price: 3, category: 'Drinks' },
  { id: 'm313', restaurantId: 'r3', name: 'Ramune', description: 'Japanese soda', price: 3.5, category: 'Drinks' },
];

// Helper used only to build the seed orders below.
function line(menuItemId: string, quantity: number) {
  const item = menuItems.find((m) => m.id === menuItemId);
  if (!item) throw new Error(`Unknown menu item ${menuItemId}`);
  return { menuItemId, name: item.name, quantity, price: item.price };
}

export const seedOrders: Order[] = [
  {
    id: 'o4821', code: 'PL-4821', restaurantId: 'r1', customerName: 'Nadia B.',
    address: '14 rue des Fantasques, 69001 Lyon', deliveryType: 'home',
    items: [line('m103', 2), line('m104', 1), line('m106', 1), line('m102', 2), line('m108', 2), line('m111', 2), line('m114', 2)],
    bagCount: 3, status: 'preparing', placedAt: '19:42', promisedTime: '20:15', etaTime: '20:15', issues: [],
  },
  {
    id: 'o4822', code: 'PL-4822', restaurantId: 'r2', customerName: 'Julien R.',
    address: '37 rue Oberkampf, 75011 Paris', deliveryType: 'home',
    items: [line('m204', 1), line('m207', 1)],
    bagCount: 1, status: 'picked_up', placedAt: '19:35', promisedTime: '20:05', etaTime: '20:25', riderName: 'Aïcha K.', issues: [],
  },
  {
    id: 'o4823', code: 'PL-4823', restaurantId: 'r3', customerName: 'Claire M. (office)',
    address: 'Morel & Associés, Tour Horizon, 4th floor reception, 92800 Puteaux (La Défense)', deliveryType: 'office',
    items: [line('m302', 6), line('m308', 3)],
    bagCount: 2, status: 'ready', placedAt: '12:05', promisedTime: '12:40', etaTime: '12:40',
    notes: 'Team lunch for 6. Please deliver to the 4th floor reception.', issues: [],
  },
  {
    id: 'o4824', code: 'PL-4824', restaurantId: 'r1', customerName: 'Thomas G.',
    address: '8 quai Saint-Vincent, 69001 Lyon', deliveryType: 'home',
    items: [line('m101', 1), line('m109', 2), line('m110', 2), line('m112', 2), line('m113', 2)],
    bagCount: 2, status: 'placed', placedAt: '19:48', promisedTime: '20:25', etaTime: '20:25', issues: [],
  },
  {
    id: 'o4825', code: 'PL-4825', restaurantId: 'r2', customerName: 'Sophie L.',
    address: '22 avenue Parmentier, 75011 Paris', deliveryType: 'home',
    items: [line('m201', 1), line('m202', 2), line('m209', 2), line('m210', 2), line('m212', 3)],
    bagCount: 3, status: 'ready', placedAt: '19:30', promisedTime: '20:05', etaTime: '20:05', issues: [],
  },
  {
    id: 'o4826', code: 'PL-4826', restaurantId: 'r3', customerName: 'Karim A.',
    address: '5 rue de Charonne, 75011 Paris', deliveryType: 'home',
    items: [line('m301', 1), line('m307', 2), line('m306', 2), line('m310', 2), line('m312', 2)],
    bagCount: 2, status: 'preparing', placedAt: '19:40', promisedTime: '20:20', etaTime: '20:20', issues: [],
  },
  {
    id: 'o4827', code: 'PL-4827', restaurantId: 'r3', customerName: 'Hugo P. (office)',
    address: 'Lambert Conseil, 3 place de la Pyramide, ground floor reception, 92800 Puteaux (La Défense)', deliveryType: 'office',
    items: [line('m302', 5), line('m309', 2), line('m313', 2)],
    bagCount: 2, status: 'placed', placedAt: '12:10', promisedTime: '12:45', etaTime: '12:45',
    notes: 'Team lunch for 5. Badge needed to go upstairs: call on arrival.', issues: [],
  },
  {
    id: 'o4828', code: 'PL-4828', restaurantId: 'r1', customerName: 'Emma D.',
    address: '3 rue Mercière, 69002 Lyon', deliveryType: 'home',
    items: [line('m103', 1)],
    bagCount: 1, status: 'ready', placedAt: '19:50', promisedTime: '20:20', etaTime: '20:20', issues: [],
  },
  {
    id: 'o4829', code: 'PL-4829', restaurantId: 'r2', customerName: 'Léo V.',
    address: '61 rue de la Roquette, 75011 Paris', deliveryType: 'home',
    items: [line('m205', 1), line('m208', 1)],
    bagCount: 1, status: 'placed', placedAt: '19:52', promisedTime: '20:20', etaTime: '20:20', issues: [],
  },
  {
    id: 'o4830', code: 'PL-4830', restaurantId: 'r3', customerName: 'Paul S.',
    address: '12 boulevard Voltaire, 75011 Paris', deliveryType: 'home',
    items: [line('m303', 1), line('m308', 1)],
    bagCount: 1, status: 'picked_up', placedAt: '19:31', promisedTime: '20:08', etaTime: '20:08', riderName: 'Aïcha K.', issues: [],
  },
  {
    id: 'o4831', code: 'PL-4831', restaurantId: 'r1', customerName: 'Nadia B.',
    address: '14 rue des Fantasques, 69001 Lyon', deliveryType: 'home',
    items: [line('m107', 1), line('m111', 1), line('m114', 1)],
    bagCount: 1, status: 'delivered', placedAt: '12:20', promisedTime: '12:50', etaTime: '12:55', issues: [],
  },
  {
    id: 'o4832', code: 'PL-4832', restaurantId: 'r2', customerName: 'Inès F.',
    address: '9 rue Saint-Maur, 75011 Paris', deliveryType: 'home',
    items: [line('m203', 1), line('m207', 1), line('m212', 1)],
    bagCount: 1, status: 'delivered', placedAt: '18:55', promisedTime: '19:25', etaTime: '19:25', issues: [],
  },
];
