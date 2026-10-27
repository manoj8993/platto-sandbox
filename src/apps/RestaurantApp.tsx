// The restaurant tablet: pick a restaurant, see its orders, open one.

import { useState } from 'react';
import { TabletFrame } from '../components/ui';
import { restaurants } from '../data/mockData';
import { OrderDetailScreen } from '../screens/restaurant/OrderDetailScreen';
import { OrderQueueScreen } from '../screens/restaurant/OrderQueueScreen';

export function RestaurantApp({ initialRestaurantId = 'r1', initialOrderId = null, caption }: { initialRestaurantId?: string; initialOrderId?: string | null; caption?: string }) {
  const [restaurantId, setRestaurantId] = useState(initialRestaurantId);
  const [openOrderId, setOpenOrderId] = useState<string | null>(initialOrderId);
  const restaurant = restaurants.find((r) => r.id === restaurantId);

  return (
    <TabletFrame caption={caption}>
      <div className="flex items-center gap-4 bg-ink px-5 py-3 text-white">
        <span className="text-lg font-semibold">{restaurant?.emoji} {restaurant?.name}</span>
        <span className="text-sm text-white/60">Platto for restaurants</span>
        <label className="ml-auto flex items-center gap-2 text-sm">
          <span className="text-white/70">Restaurant</span>
          <select
            value={restaurantId}
            onChange={(e) => { setRestaurantId(e.target.value); setOpenOrderId(null); }}
            className="rounded-lg bg-white/10 px-2 py-1 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
          >
            {restaurants.map((r) => <option key={r.id} value={r.id} className="text-ink">{r.name}</option>)}
          </select>
        </label>
      </div>
      {openOrderId ? (
        <OrderDetailScreen orderId={openOrderId} onBack={() => setOpenOrderId(null)} />
      ) : (
        <OrderQueueScreen restaurantId={restaurantId} onOpen={setOpenOrderId} />
      )}
    </TabletFrame>
  );
}
