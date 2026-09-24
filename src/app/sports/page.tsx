import type { Metadata } from 'next';

import { SportsPage } from './SportsPage';

export const metadata: Metadata = {
  title: 'Book a sports session — Angel Canela',
  description:
    'Pick a sport, a date and time slot, and your team size to book a session in three accessible steps.',
};

export const Sports = () => {
  return <SportsPage />;
};

export default Sports;
