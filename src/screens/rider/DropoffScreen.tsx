// Rider app: delivering an order to the customer.

import { Button, ScreenHeader } from '../../components/ui';
import { usePlatto } from '../../state/PlattoStore';

export function DropoffScreen({ orderId, onBack, onDelivered }: { orderId: string; onBack: () => void; onDelivered: () => void }) {
  const { state, setStatus } = usePlatto();
  const order = state.orders.find((o) => o.id === orderId);
  if (!order) return null;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScreenHeader title="Deliver order" onBack={onBack} />
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        <div className="rounded-2xl border border-line bg-white px-4 py-4">
          <p className="text-sm text-mist">Deliver to</p>
          <p className="text-lg font-semibold">{order.customerName}</p>
          <p className="mt-1">{order.address}</p>
          <p className="mt-2 text-sm text-mist">Expected by {order.promisedTime}</p>
        </div>
        {order.notes && (
          <div className="rounded-2xl border border-line bg-white px-4 py-4">
            <p className="text-sm text-mist">Customer note</p>
            <p className="mt-1">{order.notes}</p>
          </div>
        )}
      </div>
      <div className="border-t border-line bg-white p-3">
        <Button className="w-full" onClick={() => { setStatus(order.id, 'delivered'); onDelivered(); }}>Mark delivered</Button>
      </div>
    </div>
  );
}
