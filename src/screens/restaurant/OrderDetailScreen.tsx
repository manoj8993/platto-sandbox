// Restaurant tablet: one order. Staff read the item list, prepare the food and mark it ready.

import { Button } from '../../components/ui';
import { usePlatto } from '../../state/PlattoStore';
import { itemCount, itemsLabel } from '../../utils/format';

export function OrderDetailScreen({ orderId, onBack }: { orderId: string; onBack: () => void }) {
  const { state, setStatus } = usePlatto();
  const order = state.orders.find((o) => o.id === orderId);
  if (!order) return null;

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center gap-3 border-b border-line bg-white px-5 py-3">
          <button onClick={onBack} className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-ink">‹ All orders</button>
          <h2 className="text-xl font-semibold tabular-nums">{order.code}</h2>
          <span className="text-mist">{itemsLabel(itemCount(order))}</span>
        </div>
        <ul className="flex-1 overflow-y-auto bg-white px-5 py-2">
          {order.items.map((i) => (
            <li key={i.menuItemId} className="flex gap-4 border-b border-line py-3 text-lg last:border-0">
              <span className="w-10 font-semibold tabular-nums">{i.quantity}×</span>
              <span>{i.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <aside className="flex w-[300px] flex-col gap-4 border-l border-line bg-paper p-5">
        <div>
          <p className="text-sm text-mist">Customer</p>
          <p className="font-semibold">{order.customerName}</p>
        </div>
        <div>
          <p className="text-sm text-mist">Placed at</p>
          <p className="font-semibold tabular-nums">{order.placedAt}, due {order.promisedTime}</p>
        </div>
        {order.notes && (
          <div>
            <p className="text-sm text-mist">Customer note</p>
            <p>{order.notes}</p>
          </div>
        )}
        <div className="mt-auto">
          {order.status === 'placed' && <Button className="w-full" onClick={() => setStatus(order.id, 'preparing')}>Start preparing</Button>}
          {order.status === 'preparing' && <Button className="w-full" onClick={() => { setStatus(order.id, 'ready'); onBack(); }}>Mark ready</Button>}
          {order.status === 'ready' && <p className="rounded-xl bg-white p-3 text-center text-sm font-semibold">Waiting for the rider</p>}
          {(order.status === 'picked_up' || order.status === 'delivered') && <p className="rounded-xl bg-white p-3 text-center text-sm font-semibold">Collected by {order.riderName ?? 'rider'}</p>}
        </div>
      </aside>
    </div>
  );
}
