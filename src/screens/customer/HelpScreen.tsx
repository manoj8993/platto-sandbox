// Customer app: help with an order. Each option either routes the customer or opens a support message.

import { useState } from 'react';
import { Button, ScreenHeader } from '../../components/ui';
import { usePlatto } from '../../state/PlattoStore';
import { getRestaurant } from '../../utils/format';
import type { IssueType } from '../../types';
import type { CustomerNav } from './nav';

const OPTIONS: { type: IssueType; label: string; hint: string }[] = [
  { type: 'late', label: 'My order is late', hint: 'Check where your order is' },
  { type: 'payment', label: 'Payment or promo code problem', hint: 'Charges, refunds, codes' },
  { type: 'other', label: 'Something else', hint: 'Chat with our support team' },
];

export function HelpScreen({ nav }: { nav: CustomerNav }) {
  const { state, reportIssue } = usePlatto();
  const order = state.orders.find((o) => o.id === state.activeOrderId);
  const [chosen, setChosen] = useState<IssueType | null>(null);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!order) return null;
  const back = () => nav.go(order.status === 'delivered' ? 'delivered' : 'tracking');

  if (sent) {
    return (
      <div className="flex flex-1 flex-col">
        <ScreenHeader title="Help" onBack={back} />
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
          <p className="text-lg font-semibold">Message sent</p>
          <p className="text-mist">An agent will reply in this chat. Average wait right now: about 20 minutes.</p>
          <Button variant="secondary" onClick={back}>Back to your order</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScreenHeader title="Help" onBack={chosen ? () => setChosen(null) : back} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-sm text-mist">Order {order.code} from {getRestaurant(order.restaurantId)?.name}</p>
        {chosen === null ? (
          <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-white">
            {OPTIONS.map((o) => (
              <li key={o.type}>
                <button
                  onClick={() => (o.type === 'late' ? nav.go('tracking') : setChosen(o.type))}
                  className="flex w-full flex-col px-4 py-3 text-left hover:bg-paper focus-visible:ring-2 focus-visible:ring-ink"
                >
                  <span className="font-medium">{o.label}</span>
                  <span className="text-sm text-mist">{o.hint}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3 space-y-3">
            <p className="font-semibold">{OPTIONS.find((o) => o.type === chosen)?.label}</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Tell us what happened"
              className="w-full rounded-xl border border-line bg-white px-3 py-2.5 focus:border-ink focus:outline-none"
            />
            <Button
              className="w-full"
              disabled={!message.trim()}
              onClick={() => { reportIssue(order.id, chosen, message.trim()); setSent(true); }}
            >
              Send to support
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
