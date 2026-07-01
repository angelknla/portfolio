import dynamic from 'next/dynamic';

import { About } from '../About/About';
import { Hero } from '../Hero/Hero';
import { Portfolio } from '../Portfolio/Portfolio';

import styles from './Main.module.css';

const Contact = dynamic(() =>
  import('../Contact/Contact').then((m) => ({ default: m.Contact }))
);

export const Main = () => {
  return (
    <main className={styles.container}>
      <Hero />
      <About />
      <Portfolio />
      <Contact />
    </main>
  );
};
