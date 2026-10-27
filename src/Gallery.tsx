// Gallery: every screen side by side, each in its own frame and state.
// Open the app with ?view=gallery and import that page into Figma (html.to.design plugin).

import type { ReactNode } from 'react';
import { CustomerApp } from './apps/CustomerApp';
import { RestaurantApp } from './apps/RestaurantApp';
import { RiderApp } from './apps/RiderApp';
import { PlattoProvider } from './state/PlattoStore';

const FILLED_CART = {
  restaurantId: 'r1',
  lines: [
    { menuItemId: 'm103', quantity: 2 },
    { menuItemId: 'm102', quantity: 2 },
    { menuItemId: 'm108', quantity: 1 },
    { menuItemId: 'm114', quantity: 2 },
  ],
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="mb-5 text-2xl font-semibold">{title}</h2>
      <div className="flex flex-wrap items-start gap-10">{children}</div>
    </section>
  );
}

export function Gallery() {
  return (
    <div className="min-h-screen bg-[#E9EAE4] px-10 py-10">
      <h1 className="text-3xl font-semibold">Platto: all screens</h1>
      <p className="mb-10 mt-1 text-mist">Starter screens for the Order Experience squad. Duplicate the frame you need before you change it.</p>

      <Section title="Customer app">
        <PlattoProvider><CustomerApp initialScreen="home" caption="Home" /></PlattoProvider>
        <PlattoProvider><CustomerApp initialScreen="menu" initialRestaurantId="r1" caption="Menu" /></PlattoProvider>
        <PlattoProvider overrides={{ cart: FILLED_CART }}><CustomerApp initialScreen="cart" caption="Cart" /></PlattoProvider>
        <PlattoProvider overrides={{ cart: FILLED_CART }}><CustomerApp initialScreen="checkout" caption="Checkout" /></PlattoProvider>
        <PlattoProvider><CustomerApp initialScreen="tracking" caption="Order tracking" /></PlattoProvider>
        <PlattoProvider overrides={{ activeOrderId: 'o4831' }}><CustomerApp initialScreen="delivered" caption="Order delivered" /></PlattoProvider>
        <PlattoProvider overrides={{ activeOrderId: 'o4831' }}><CustomerApp initialScreen="help" caption="Help" /></PlattoProvider>
      </Section>

      <Section title="Restaurant tablet">
        <PlattoProvider><RestaurantApp initialRestaurantId="r1" caption="Order queue" /></PlattoProvider>
        <PlattoProvider><RestaurantApp initialRestaurantId="r1" initialOrderId="o4821" caption="Order detail" /></PlattoProvider>
      </Section>

      <Section title="Rider app">
        <PlattoProvider><RiderApp caption="Jobs" /></PlattoProvider>
        <PlattoProvider><RiderApp initialScreen={{ name: 'pickup', orderId: 'o4825' }} caption="Collect order" /></PlattoProvider>
        <PlattoProvider><RiderApp initialScreen={{ name: 'dropoff', orderId: 'o4822' }} caption="Deliver order" /></PlattoProvider>
      </Section>
    </div>
  );
}
