// The customer app: decides which customer screen is showing.
// To add a screen: add its name in screens/customer/nav.ts and a line in the switch below.

import { useState } from 'react';
import { PhoneFrame } from '../components/ui';
import { CartScreen } from '../screens/customer/CartScreen';
import { CheckoutScreen } from '../screens/customer/CheckoutScreen';
import { DeliveredScreen } from '../screens/customer/DeliveredScreen';
import { HelpScreen } from '../screens/customer/HelpScreen';
import { HomeScreen } from '../screens/customer/HomeScreen';
import { MenuScreen } from '../screens/customer/MenuScreen';
import type { CustomerNav, CustomerScreen } from '../screens/customer/nav';
import { TrackingScreen } from '../screens/customer/TrackingScreen';

export function CustomerApp({ initialScreen = 'home', initialRestaurantId = 'r1', caption }: { initialScreen?: CustomerScreen; initialRestaurantId?: string; caption?: string }) {
  const [screen, setScreen] = useState<CustomerScreen>(initialScreen);
  const [restaurantId, setRestaurantId] = useState(initialRestaurantId);

  const nav: CustomerNav = {
    go: setScreen,
    openRestaurant: (id) => { setRestaurantId(id); setScreen('menu'); },
    restaurantId,
  };

  let content;
  switch (screen) {
    case 'home': content = <HomeScreen nav={nav} />; break;
    case 'menu': content = <MenuScreen nav={nav} />; break;
    case 'cart': content = <CartScreen nav={nav} />; break;
    case 'checkout': content = <CheckoutScreen nav={nav} />; break;
    case 'tracking': content = <TrackingScreen nav={nav} />; break;
    case 'delivered': content = <DeliveredScreen nav={nav} />; break;
    case 'help': content = <HelpScreen nav={nav} />; break;
  }

  return <PhoneFrame caption={caption}>{content}</PhoneFrame>;
}
