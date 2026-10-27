// Restaurant tablet: today's orders for one restaurant, in three columns.

import { usePlatto } from '../../state/PlattoStore';
import { itemCount, itemsLabel } from '../../utils/format';
import type { Order, OrderStatus } from '../../types';

const COLUMNS: { status: OrderStatus; title: string }[] = [
  { status: 'placed', title: 'New' },
  { status: 'preparing', title: 'Preparing' },
  { status: 'ready', title: 'Ready for pickup' },
];

export function OrderQueueScreen({ restaurantId, onOpen }: { restaurantId: string; onOpen: (orderId: string) => void }) {
  const { state } = usePlatto();
  const orders = state.orders.filter((o) => o.restaurantId === restaurantId);

  return (
    <div className="grid flex-1 grid-cols-3 gap-4 overflow-hidden p-4">
      {COLUMNS.map((col) => {
        const inCol = orders.filter((o) => o.status === col.status);
        return (
          <section key={col.status} className="flex flex-col overflow-hidden rounded-2xl bg-white">
            <h2 className="flex items-center justify-between border-b border-line px-4 py-3 font-semibold">
              {col.title}
              <span className="rounded-full bg-paper px-2 text-sm tabular-nums">{inCol.length}</span>
            </h2>
            <ul className="flex-1 space-y-2 overflow-y-auto p-3">
              {inCol.length === 0 && <li className="px-1 py-6 text-center text-sm text-mist">No orders here</li>}
              {inCol.map((o) => <OrderCard key={o.id} order={o} onOpen={onOpen} />)}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function OrderCard({ order, onOpen }: { order: Order; onOpen: (id: string) => void }) {
  return (
    <li>
      <button
        onClick={() => onOpen(order.id)}
        className="w-full rounded-xl border border-line px-3 py-2.5 text-left hover:border-ink/40 focus-visible:ring-2 focus-visible:ring-ink"
      >
        <span className="flex items-center justify-between">
          <span className="font-semibold tabular-nums">{order.code}</span>
          <span className="text-sm tabular-nums text-mist">{order.placedAt}</span>
        </span>
        <span className="mt-0.5 block text-sm">{order.customerName}</span>
        <span className="block text-sm text-mist">{itemsLabel(itemCount(order))}, due {order.promisedTime}</span>
      </button>
    </li>
  );
}
