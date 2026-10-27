// Customer app: checkout. Placing the order sends it to the restaurant tablet.

import { useState } from 'react';
import { Button, ScreenHeader } from '../../components/ui';
import { usePlatto } from '../../state/PlattoStore';
import { euros, getMenuItem, getRestaurant } from '../../utils/format';
import { addMinutes, nowHHMM } from '../../utils/time';
import { DELIVERY_FEE, SERVICE_FEE } from './CartScreen';
import type { CustomerNav } from './nav';

export function CheckoutScreen({ nav }: { nav: CustomerNav }) {
  const { state, placeOrder } = usePlatto();
  const [address, setAddress] = useState('14 rue des Fantasques, 69001 Lyon');
  const [notes, setNotes] = useState('');
  const restaurant = getRestaurant(state.cart.restaurantId);
  const subtotal = state.cart.lines.reduce((sum, l) => sum + (getMenuItem(l.menuItemId)?.price ?? 0) * l.quantity, 0);
  const total = subtotal + DELIVERY_FEE + SERVICE_FEE;

  function handlePlaceOrder() {
    placeOrder(address, notes || undefined);
    nav.go('tracking');
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScreenHeader title="Checkout" onBack={() => nav.go('cart')} />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <label className="block">
          <span className="text-sm font-semibold">Delivery address</span>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 focus:border-ink focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Note for the rider (optional)</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Door code, floor, where to leave it"
            className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 focus:border-ink focus:outline-none"
          />
        </label>
        <div className="rounded-2xl border border-line bg-white px-4 py-3 text-sm">
          <p className="font-semibold">Payment</p>
          <p className="mt-1 text-mist">Visa ending 4417</p>
        </div>
        <div className="rounded-2xl border border-line bg-white px-4 py-3 text-sm">
          <p className="font-semibold">Estimated arrival</p>
          <p className="mt-1">{addMinutes(nowHHMM(), 35)}, from {restaurant?.name}</p>
        </div>
      </div>
      <div className="border-t border-line bg-white p-3">
        <Button className="w-full" disabled={!address.trim() || state.cart.lines.length === 0} onClick={handlePlaceOrder}>
          Place order, {euros(total)}
        </Button>
      </div>
    </div>
  );
}
