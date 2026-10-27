// Customer app: the cart. One restaurant per cart.

import { Button, QuantityStepper, ScreenHeader } from '../../components/ui';
import { usePlatto } from '../../state/PlattoStore';
import { euros, getMenuItem, getRestaurant } from '../../utils/format';
import type { CustomerNav } from './nav';

export const DELIVERY_FEE = 2.49;
export const SERVICE_FEE = 0.99;

export function CartScreen({ nav }: { nav: CustomerNav }) {
  const { state, setQuantity } = usePlatto();
  const restaurant = getRestaurant(state.cart.restaurantId);
  const lines = state.cart.lines;
  const subtotal = lines.reduce((sum, l) => sum + (getMenuItem(l.menuItemId)?.price ?? 0) * l.quantity, 0);

  if (!restaurant || lines.length === 0) {
    return (
      <div className="flex flex-1 flex-col">
        <ScreenHeader title="Your cart" onBack={() => nav.go('home')} />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="text-mist">Pick a restaurant and add a few dishes.</p>
          <Button onClick={() => nav.go('home')}>See restaurants</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScreenHeader title="Your cart" onBack={() => nav.go('menu')} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-sm text-mist">From {restaurant.name}</p>
        <ul className="mt-2 divide-y divide-line rounded-2xl border border-line bg-white">
          {lines.map((l) => {
            const item = getMenuItem(l.menuItemId);
            if (!item) return null;
            return (
              <li key={l.menuItemId} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm tabular-nums text-mist">{euros(item.price * l.quantity)}</p>
                </div>
                <QuantityStepper value={l.quantity} onChange={(v) => setQuantity(l.menuItemId, v)} label={item.name} />
              </li>
            );
          })}
        </ul>
        <dl className="mt-4 space-y-1 rounded-2xl border border-line bg-white px-4 py-3 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{euros(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Delivery</dt><dd className="tabular-nums">{euros(DELIVERY_FEE)}</dd></div>
          <div className="flex justify-between"><dt>Service</dt><dd className="tabular-nums">{euros(SERVICE_FEE)}</dd></div>
          <div className="flex justify-between border-t border-line pt-2 text-base font-semibold"><dt>Total</dt><dd className="tabular-nums">{euros(subtotal + DELIVERY_FEE + SERVICE_FEE)}</dd></div>
        </dl>
      </div>
      <div className="border-t border-line bg-white p-3">
        <Button className="w-full" onClick={() => nav.go('checkout')}>Go to checkout</Button>
      </div>
    </div>
  );
}
