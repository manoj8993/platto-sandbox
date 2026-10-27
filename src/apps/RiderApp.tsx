// The rider app: jobs list, collect at the restaurant, deliver to the customer.

import { useState } from 'react';
import { PhoneFrame } from '../components/ui';
import { DropoffScreen } from '../screens/rider/DropoffScreen';
import { JobsScreen } from '../screens/rider/JobsScreen';
import { PickupScreen } from '../screens/rider/PickupScreen';

type RiderScreen = { name: 'jobs' } | { name: 'pickup'; orderId: string } | { name: 'dropoff'; orderId: string };

export function RiderApp({ initialScreen = { name: 'jobs' }, caption }: { initialScreen?: RiderScreen; caption?: string }) {
  const [screen, setScreen] = useState<RiderScreen>(initialScreen);

  let content;
  if (screen.name === 'pickup') {
    content = <PickupScreen orderId={screen.orderId} onBack={() => setScreen({ name: 'jobs' })} onPickedUp={() => setScreen({ name: 'dropoff', orderId: screen.orderId })} />;
  } else if (screen.name === 'dropoff') {
    content = <DropoffScreen orderId={screen.orderId} onBack={() => setScreen({ name: 'jobs' })} onDelivered={() => setScreen({ name: 'jobs' })} />;
  } else {
    content = <JobsScreen onPickup={(id) => setScreen({ name: 'pickup', orderId: id })} onDropoff={(id) => setScreen({ name: 'dropoff', orderId: id })} />;
  }

  return <PhoneFrame caption={caption}>{content}</PhoneFrame>;
}
