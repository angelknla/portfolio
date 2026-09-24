'use client';

import { SportsBooking } from '@/components/SportsBooking/SportsBooking';
import { useLanguage } from '@/contexts/Language';
import { sportsData } from '@/data/sportsData';

import styles from './SportsPage.module.css';

export const SportsPage = () => {
  const { translations } = useLanguage(sportsData);
  const title: string = translations?.page?.title ?? '';
  const [titleHead, ...titleRest] = title.split(' ');

  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>{translations?.page?.eyebrow}</p>
        <h1 className={styles.title}>
          {titleHead} <em>{titleRest.join(' ')}</em>
        </h1>
        <p className={styles.subtitle}>{translations?.page?.subtitle}</p>
      </header>
      <div className={styles.booking}>
        <SportsBooking />
      </div>
    </main>
  );
};
