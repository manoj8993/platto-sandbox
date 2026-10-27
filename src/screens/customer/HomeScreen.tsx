// Customer app: home. Restaurants near the customer, plus their current and past orders.

import { CURRENT_CUSTOMER, restaurants } from '../../data/mockData';
import { usePlatto } from '../../state/PlattoStore';
import { getRestaurant, itemsLabel, STATUS_LABEL } from '../../utils/format';
import type { CustomerNav } from './nav';

export function HomeScreen({ nav }: { nav: CustomerNav }) {
  const { state, setActiveOrder } = usePlatto();
  const active = state.orders.find((o) => o.id === state.activeOrderId);
  const pastOrders = state.orders.filter((o) => o.customerName === CURRENT_CUSTOMER && o.status === 'delivered');

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="bg-ink px-5 pb-6 pt-11 text-white">
        <p className="text-sm text-white/70">Delivering to 14 rue des Fantasques, Lyon</p>
        <h1 className="mt-1 text-[26px] font-semibold leading-tight">Good evening, {CURRENT_CUSTOMER.split(' ')[0]}</h1>
      </div>

      {active && active.status !== 'delivered' && (
        <button
          onClick={() => nav.go('tracking')}
          className="mx-4 -mt-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-2xl bg-saffron px-4 py-3 text-left shadow-md focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span className="text-2xl" aria-hidden>{getRestaurant(active.restaurantId)?.emoji}</span>
          <span className="flex-1">
            <span className="block text-sm font-semibold">{STATUS_LABEL[active.status]}</span>
            <span className="block text-sm">{getRestaurant(active.restaurantId)?.name}, arriving {active.etaTime}</span>
          </span>
          <span className="text-sm font-semibold underline">Track</span>
        </button>
      )}

      <section className="px-4 pt-6">
        <h2 className="text-lg font-semibold">Restaurants near you</h2>
        <ul className="mt-3 space-y-3">
          {restaurants.map((r) => (
            <li key={r.id}>
              <button
                onClick={() => nav.openRestaurant(r.id)}
                className="flex w-full items-center gap-4 rounded-2xl border border-line bg-white p-3 text-left hover:border-ink/30 focus-visible:ring-2 focus-visible:ring-ink"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-paper text-3xl" aria-hidden>{r.emoji}</span>
                <span className="flex-1">
                  <span className="block font-semibold">{r.name}</span>
                  <span className="block text-sm text-mist">{r.cuisine}, {r.city}</span>
                  <span className="mt-1 block text-sm">★ {r.rating.toFixed(1)}, {r.deliveryMinutes[0]} to {r.deliveryMinutes[1]} min</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {pastOrders.length > 0 && (
        <section className="px-4 pb-8 pt-6">
          <h2 className="text-lg font-semibold">Your past orders</h2>
          <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-white">
            {pastOrders.map((o) => (
              <li key={o.id}>
                <button
                  onClick={() => { setActiveOrder(o.id); nav.go('delivered'); }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-paper"
                >
                  <span>{getRestaurant(o.restaurantId)?.name}, {itemsLabel(o.items.reduce((n, i) => n + i.quantity, 0))}</span>
                  <span className="text-mist">Delivered {o.etaTime}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
