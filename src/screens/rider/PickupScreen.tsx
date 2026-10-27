// Rider app: collecting an order at the restaurant.

import { Button, ScreenHeader } from '../../components/ui';
import { usePlatto } from '../../state/PlattoStore';
import { getRestaurant } from '../../utils/format';

export function PickupScreen({ orderId, onBack, onPickedUp }: { orderId: string; onBack: () => void; onPickedUp: () => void }) {
  const { state, setStatus } = usePlatto();
  const order = state.orders.find((o) => o.id === orderId);
  if (!order) return null;
  const r = getRestaurant(order.restaurantId);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScreenHeader title="Collect order" onBack={onBack} />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        <div className="rounded-2xl border border-line bg-white px-4 py-4">
          <p className="text-sm text-mist">Restaurant</p>
          <p className="text-lg font-semibold">{r?.emoji} {r?.name}</p>
          <p className="text-sm text-mist">{r?.city}</p>
        </div>
        <div className="rounded-2xl border border-line bg-white px-4 py-4">
          <p className="text-sm text-mist">Order to ask for</p>
          <p className="text-[40px] font-semibold leading-none tabular-nums">{order.code}</p>
          <p className="mt-2 text-sm">For {order.customerName}</p>
        </div>
      </div>
      <div className="border-t border-line bg-white p-3">
        <Button className="w-full" onClick={() => { setStatus(order.id, 'picked_up'); onPickedUp(); }}>Confirm pickup</Button>
      </div>
    </div>
  );
}
