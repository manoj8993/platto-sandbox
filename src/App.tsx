// Platto Sandbox: the workspace shell.
// The top bar switches between the three Platto apps. They share one store, so an order
// placed in the customer app appears on the restaurant tablet and then in the rider app.
// Add ?view=gallery to the URL to see every screen side by side (used for the Figma import).

import { useState } from 'react';
import { CustomerApp } from './apps/CustomerApp';
import { RestaurantApp } from './apps/RestaurantApp';
import { RiderApp } from './apps/RiderApp';
import { Gallery } from './Gallery';
import { PlattoProvider, usePlatto } from './state/PlattoStore';
import type { Surface } from './types';

const SURFACES: { id: Surface; label: string }[] = [
  { id: 'customer', label: 'Customer app' },
  { id: 'restaurant', label: 'Restaurant tablet' },
  { id: 'rider', label: 'Rider app' },
];

function DemoControls() {
  const { state, advanceOrder, delayOrder } = usePlatto();
  const active = state.orders.find((o) => o.id === state.activeOrderId);
  if (!active) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="hidden text-white/60 lg:inline">Demo, order {active.code}:</span>
      <button onClick={() => advanceOrder(active.id)} disabled={active.status === 'delivered'} className="rounded-full bg-white/10 px-3 py-1.5 font-medium hover:bg-white/20 disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-saffron">Next step</button>
      <button onClick={() => delayOrder(active.id, 10)} disabled={active.status === 'delivered'} className="rounded-full bg-white/10 px-3 py-1.5 font-medium hover:bg-white/20 disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-saffron">Delay 10 min</button>
    </div>
  );
}

function Workspace() {
  const [surface, setSurface] = useState<Surface>('customer');
  return (
    <div className="min-h-screen">
      <header className="flex flex-wrap items-center gap-4 bg-ink px-5 py-3 text-white">
        <span className="flex items-center gap-2 text-lg font-semibold">
          <span className="relative inline-block h-6 w-6 rounded-full bg-saffron" aria-hidden>
            <span className="absolute inset-[6px] rounded-full bg-ink" />
          </span>
          Platto Sandbox
        </span>
        <nav className="flex gap-1 rounded-full bg-white/10 p-1" aria-label="Choose an app">
          {SURFACES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSurface(s.id)}
              aria-pressed={surface === s.id}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-saffron ${surface === s.id ? 'bg-saffron text-ink' : 'text-white/80 hover:text-white'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="ml-auto"><DemoControls /></div>
      </header>
      <main className="flex justify-center px-4 py-8">
        {/* All three stay mounted so each keeps its place when you switch. */}
        <div hidden={surface !== 'customer'}><CustomerApp /></div>
        <div hidden={surface !== 'restaurant'}><RestaurantApp /></div>
        <div hidden={surface !== 'rider'}><RiderApp /></div>
      </main>
    </div>
  );
}

export default function App() {
  const isGallery = new URLSearchParams(window.location.search).get('view') === 'gallery';
  if (isGallery) return <Gallery />;
  return (
    <PlattoProvider>
      <Workspace />
    </PlattoProvider>
  );
}
