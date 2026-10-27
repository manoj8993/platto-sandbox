// Customer app: after delivery. Shows what was ordered and asks for a rating.

import { useState } from 'react';
import { Button, ScreenHeader } from '../../components/ui';
import { usePlatto } from '../../state/PlattoStore';
import { euros, getRestaurant, orderTotal } from '../../utils/format';
import type { CustomerNav } from './nav';

export function DeliveredScreen({ nav }: { nav: CustomerNav }) {
  const { state } = usePlatto();
  const order = state.orders.find((o) => o.id === state.activeOrderId);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  if (!order) return null;
  const restaurant = getRestaurant(order.restaurantId);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScreenHeader title="Your order" onBack={() => nav.go('home')} />
      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-6">
        <div className="text-center">
          <p className="text-4xl" aria-hidden>{restaurant?.emoji}</p>
          <h2 className="mt-2 text-2xl font-semibold">Enjoy your meal</h2>
          <p className="text-mist">{restaurant?.name}, {order.status === 'delivered' ? `delivered at ${order.etaTime}` : `arriving ${order.etaTime}`}</p>
        </div>

        <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
          {order.items.map((i) => (
            <li key={i.menuItemId} className="flex justify-between px-4 py-2.5 text-sm">
              <span><span className="font-semibold tabular-nums">{i.quantity}×</span> {i.name}</span>
              <span className="tabular-nums text-mist">{euros(i.price * i.quantity)}</span>
            </li>
          ))}
          <li className="flex justify-between px-4 py-2.5 text-sm font-semibold">
            <span>Food total</span><span className="tabular-nums">{euros(orderTotal(order))}</span>
          </li>
        </ul>

        <div className="mt-4 rounded-2xl border border-line bg-white px-4 py-4 text-center">
          {rated ? (
            <p className="font-semibold">Thanks for rating {restaurant?.name}</p>
          ) : (
            <>
              <p className="font-semibold">How was it?</p>
              <div className="mt-2 flex justify-center gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} stars`}
                    onClick={() => setRating(n)}
                    className={`text-3xl ${n <= rating ? 'text-saffron' : 'text-line'} focus-visible:ring-2 focus-visible:ring-ink`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <Button className="mt-3" variant="secondary" disabled={rating === 0} onClick={() => setRated(true)}>Send rating</Button>
            </>
          )}
        </div>

        <Button variant="ghost" className="mt-4 w-full" onClick={() => nav.go('help')}>Something wrong with your order? Get help</Button>
      </div>
    </div>
  );
}
