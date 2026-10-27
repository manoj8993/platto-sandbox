// Customer app: a restaurant's menu, grouped by category.

import { ScreenHeader } from '../../components/ui';
import { menuItems } from '../../data/mockData';
import { usePlatto } from '../../state/PlattoStore';
import { euros, getRestaurant } from '../../utils/format';
import type { MenuCategory } from '../../types';
import type { CustomerNav } from './nav';

const CATEGORY_ORDER: MenuCategory[] = ['Family menus', 'Mains', 'Sides', 'Desserts', 'Drinks'];

export function MenuScreen({ nav }: { nav: CustomerNav }) {
  const { state, addToCart } = usePlatto();
  const restaurant = getRestaurant(nav.restaurantId);
  const items = menuItems.filter((m) => m.restaurantId === nav.restaurantId);
  const cartForThis = state.cart.restaurantId === nav.restaurantId ? state.cart.lines : [];
  const cartCount = cartForThis.reduce((n, l) => n + l.quantity, 0);
  const cartTotal = cartForThis.reduce((sum, l) => sum + (menuItems.find((m) => m.id === l.menuItemId)?.price ?? 0) * l.quantity, 0);

  if (!restaurant) return null;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScreenHeader title={restaurant.name} onBack={() => nav.go('home')} />
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex items-center gap-4 bg-white px-4 py-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-paper text-3xl" aria-hidden>{restaurant.emoji}</span>
          <div>
            <p className="text-sm text-mist">{restaurant.cuisine}, {restaurant.city}</p>
            <p className="text-sm">★ {restaurant.rating.toFixed(1)}, delivery in {restaurant.deliveryMinutes[0]} to {restaurant.deliveryMinutes[1]} min</p>
          </div>
        </div>
        {CATEGORY_ORDER.map((category) => {
          const inCategory = items.filter((m) => m.category === category);
          if (inCategory.length === 0) return null;
          return (
            <section key={category} className="px-4 pt-5">
              <h2 className="text-base font-semibold">{category}</h2>
              <ul className="mt-2 divide-y divide-line rounded-2xl border border-line bg-white">
                {inCategory.map((m) => {
                  const inCart = cartForThis.find((l) => l.menuItemId === m.id)?.quantity ?? 0;
                  return (
                    <li key={m.id} className="flex items-start gap-3 px-4 py-3">
                      <div className="flex-1">
                        <p className="font-medium">{m.name}</p>
                        <p className="text-sm text-mist">{m.description}</p>
                        <p className="mt-1 text-sm font-semibold tabular-nums">{euros(m.price)}</p>
                      </div>
                      <button
                        onClick={() => addToCart(m.id)}
                        aria-label={`Add ${m.name}`}
                        className="mt-1 flex h-9 min-w-9 items-center justify-center rounded-full border border-ink/20 px-2 text-sm font-semibold hover:border-ink focus-visible:ring-2 focus-visible:ring-ink"
                      >
                        {inCart > 0 ? `${inCart} +` : '+'}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
      {cartCount > 0 && (
        <div className="border-t border-line bg-white p-3">
          <button
            onClick={() => nav.go('cart')}
            className="flex w-full items-center justify-between rounded-full bg-saffron px-5 py-3 font-semibold focus-visible:ring-2 focus-visible:ring-ink"
          >
            <span>View cart ({cartCount})</span>
            <span className="tabular-nums">{euros(cartTotal)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
