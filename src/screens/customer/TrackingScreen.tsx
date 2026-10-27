// Customer app: live tracking for the customer's active order.
// The ring fills as the order moves through its five steps.

import type { ReactNode } from 'react';
import { Button, ScreenHeader } from '../../components/ui';
import { STATUS_FLOW, usePlatto } from '../../state/PlattoStore';
import { euros, getRestaurant, itemCount, itemsLabel, orderTotal, STATUS_LABEL } from '../../utils/format';
import type { CustomerNav } from './nav';

function PlateRing({ progress, children }: { progress: number; children: ReactNode }) {
  const r = 104;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto h-[248px] w-[248px]">
      <svg viewBox="0 0 248 248" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="124" cy="124" r={r} fill="white" stroke="#E3E3DC" strokeWidth="14" />
        <circle
          cx="124" cy="124" r={r} fill="none" stroke="#F2B705" strokeWidth="14" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - progress)} style={{ transition: 'stroke-dashoffset 600ms ease' }}
        />
        <circle cx="124" cy="124" r="78" fill="none" stroke="#E3E3DC" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

export function TrackingScreen({ nav }: { nav: CustomerNav }) {
  const { state } = usePlatto();
  const order = state.orders.find((o) => o.id === state.activeOrderId);

  if (!order) {
    return (
      <div className="flex flex-1 flex-col">
        <ScreenHeader title="Your order" onBack={() => nav.go('home')} />
        <p className="p-6 text-mist">No order to track yet.</p>
      </div>
    );
  }

  const restaurant = getRestaurant(order.restaurantId);
  const stepIndex = STATUS_FLOW.indexOf(order.status);
  const delivered = order.status === 'delivered';

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScreenHeader title={restaurant?.name ?? 'Your order'} onBack={() => nav.go('home')} />
      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-6">
        <PlateRing progress={(stepIndex + 1) / STATUS_FLOW.length}>
          <span className="text-sm text-mist">{delivered ? 'Delivered at' : 'Arrives at'}</span>
          <span className="text-[56px] font-semibold leading-none tracking-tight tabular-nums">{order.etaTime}</span>
          <span className="mt-2 text-sm font-semibold">{STATUS_LABEL[order.status]}</span>
        </PlateRing>

        <ol className="mt-6 space-y-3 rounded-2xl border border-line bg-white px-4 py-4">
          {STATUS_FLOW.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  i < stepIndex ? 'bg-basil text-white' : i === stepIndex ? 'bg-saffron text-ink' : 'bg-line text-mist'
                }`}
              >
                {i < stepIndex ? '✓' : i + 1}
              </span>
              <span className={i === stepIndex ? 'font-semibold' : i < stepIndex ? '' : 'text-mist'}>{STATUS_LABEL[s]}</span>
            </li>
          ))}
        </ol>

        <div className="mt-4 rounded-2xl border border-line bg-white px-4 py-3 text-sm">
          <p className="font-semibold">Order {order.code}</p>
          <p className="text-mist">{itemsLabel(itemCount(order))}, {euros(orderTotal(order))}{order.riderName ? `, with ${order.riderName}` : ''}</p>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {delivered && <Button onClick={() => nav.go('delivered')}>See your order</Button>}
          <Button variant="ghost" onClick={() => nav.go('help')}>Help with this order</Button>
        </div>
      </div>
    </div>
  );
}
