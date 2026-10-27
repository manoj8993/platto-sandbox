# Builder brief: read this before changing anything

This is **Platto Sandbox**, a working prototype of Platto, a fictional food-delivery company. It contains three apps that share one set of orders:

- **Customer app**: browse restaurants, order, track the order, get help.
- **Restaurant tablet**: see incoming orders, prepare them, mark them ready.
- **Rider app**: collect ready orders, deliver them.

An order placed in the customer app appears on the restaurant tablet, then in the rider app, then back in the customer app as delivered. The top bar switches between the three apps.

Product teams use this sandbox to prototype **one feature at a time**. Your job as the coding assistant is to add their feature without breaking anything else.

## Rules (always follow these)

1. **Stay in the browser.** No backend, no database, no login, no external APIs, no API keys, no AI calls, no new npm packages. Everything runs on the mock data.
2. **Change only what the request names.** Keep the top bar, the three apps, the demo controls and every existing screen working. Never delete an existing feature or screen.
3. **Reuse what exists.** Use the components in `src/components/ui.tsx` (`Button`, `ScreenHeader`, `Badge`, `QuantityStepper`) and the store in `src/state/PlattoStore.tsx`.
4. **Style with Tailwind classes and Platto's colours:** `ink` (text, dark areas), `saffron` (main buttons), `basil` (success, on time), `tomato` (problems, late), `paper` (background), `line` (borders), `mist` (secondary text). Rounded cards (`rounded-2xl`), pill buttons (`rounded-full`). Sentence case, plain English.
5. **New data is optional.** If a feature needs a new field (for example a name on each item), add it to `src/types.ts` as optional (`field?: type`) so existing mock data keeps working. Add realistic values to some orders in `src/data/mockData.ts` if it helps testing. Never change existing ids.
6. **Shared changes go through the store.** If one app must see what another app did (for example the tablet seeing something the customer chose), add an action to the reducer in `src/state/PlattoStore.tsx` and a function on the store value, following the existing pattern.
7. **Keep each change small.** Prefer editing one or two screens over restructuring.
8. **After every change, report:** the files you changed, and how to test each acceptance criterion by clicking through the app.

## Where things are

| What | File |
| --- | --- |
| Data types (orders, items, cart) | `src/types.ts` |
| Mock restaurants, menu items, orders | `src/data/mockData.ts` |
| Shared state and actions | `src/state/PlattoStore.tsx` |
| Shared UI components | `src/components/ui.tsx` |
| Customer screens | `src/screens/customer/` (`HomeScreen`, `MenuScreen`, `CartScreen`, `CheckoutScreen`, `TrackingScreen`, `DeliveredScreen`, `HelpScreen`) |
| Customer navigation (screen names) | `src/screens/customer/nav.ts` and `src/apps/CustomerApp.tsx` |
| Restaurant tablet screens | `src/screens/restaurant/` (`OrderQueueScreen`, `OrderDetailScreen`) |
| Rider screens | `src/screens/rider/` (`JobsScreen`, `PickupScreen`, `DropoffScreen`) |
| Top bar and app switcher | `src/App.tsx` |
| All screens side by side | `src/Gallery.tsx` (open the app with `?view=gallery`) |

## How the data works

- An **order** has a code (`PL-4821`), a restaurant, a customer, a delivery address, a delivery type (`home` or `office`), a list of **items** (name, quantity, price), a **bag count**, a **status**, the time it was placed, the **promised time** shown at checkout and the current **ETA**.
- Status moves in this order: `placed` → `preparing` → `ready` → `picked_up` → `delivered`.
- The customer is **Nadia B.** in Lyon. Her current order is `PL-4821` (12 items from Nonna Rosa). The rider is **Aïcha K.**
- Orders `PL-4821`, `PL-4824`, `PL-4825` and `PL-4826` are large family orders. `PL-4823` and `PL-4827` are office team orders.
- Demo controls in the top bar move Nadia's current order to its next step, or delay its ETA by 10 minutes.
- Reloading the page resets everything to the mock data.

## If something breaks

Undo your last change and try a smaller one. Never "fix" an error by deleting a screen or a feature.
