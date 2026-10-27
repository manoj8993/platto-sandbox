// Rider app: orders ready to collect, plus the rider's current delivery.

import { CURRENT_RIDER } from '../../data/mockData';
import { usePlatto } from '../../state/PlattoStore';
import { getRestaurant } from '../../utils/format';

export function JobsScreen({ onPickup, onDropoff }: { onPickup: (orderId: string) => void; onDropoff: (orderId: string) => void }) {
  const { state } = usePlatto();
  const current = state.orders.filter((o) => o.status === 'picked_up' && o.riderName === CURRENT_RIDER);
  const ready = state.orders.filter((o) => o.status === 'ready');

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="bg-ink px-5 pb-5 pt-11 text-white">
        <p className="text-sm text-white/70">Online</p>
        <h1 className="text-[24px] font-semibold">Hi {CURRENT_RIDER.split(' ')[0]}</h1>
      </div>

      {current.length > 0 && (
        <section className="px-4 pt-5">
          <h2 className="text-base font-semibold">On the way</h2>
          <ul className="mt-2 space-y-2">
            {current.map((o) => (
              <li key={o.id}>
                <button onClick={() => onDropoff(o.id)} className="w-full rounded-2xl bg-saffron px-4 py-3 text-left focus-visible:ring-2 focus-visible:ring-ink">
                  <span className="block font-semibold">{o.code} to {o.customerName}</span>
                  <span className="block text-sm">{o.address}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="px-4 pb-6 pt-5">
        <h2 className="text-base font-semibold">Ready to collect</h2>
        <ul className="mt-2 space-y-2">
          {ready.length === 0 && <li className="rounded-2xl bg-white px-4 py-6 text-center text-sm text-mist">Nothing ready right now</li>}
          {ready.map((o) => {
            const r = getRestaurant(o.restaurantId);
            return (
              <li key={o.id}>
                <button onClick={() => onPickup(o.id)} className="flex w-full items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-left hover:border-ink/30 focus-visible:ring-2 focus-visible:ring-ink">
                  <span className="text-2xl" aria-hidden>{r?.emoji}</span>
                  <span className="flex-1">
                    <span className="block font-semibold">{r?.name}</span>
                    <span className="block text-sm text-mist">{o.code}, deliver by {o.promisedTime}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
