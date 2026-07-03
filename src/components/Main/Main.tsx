import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { Hero } from '@/components/Hero/Hero';

import styles from './Main.module.css';

const About = dynamic(() =>
  import('@/components/About/About').then((m) => ({ default: m.About }))
);

const Portfolio = dynamic(() =>
  import('../Portfolio/Portfolio').then((m) => ({ default: m.Portfolio }))
);

const Contact = dynamic(() =>
  import('../Contact/Contact').then((m) => ({ default: m.Contact }))
);

export const Main = () => {
  return (
    <main className={styles.container}>
      <Hero />
      <About />
      <Suspense>
        <Portfolio />
      </Suspense>
      <Contact />
    </main>
  );
};
