import { useLanguage } from '@/contexts/Language';
import { heroData } from '@/data/heroData';

import styles from './Hero.module.css';

const FLOATING_ICONS = [
  {
    src: '/assets/react-icon.webp',
    top: '12%',
    left: '78%',
    size: '4.2rem',
    delay: '0s',
    dur: '9s',
    op: 0.65,
  },
  {
    src: '/assets/typescript-icon.webp',
    top: '68%',
    left: '84%',
    size: '3.6rem',
    delay: '1.2s',
    dur: '11s',
    op: 0.48,
  },
  {
    src: '/assets/nextjs-icon.webp',
    top: '28%',
    left: '90%',
    size: '3rem',
    delay: '2s',
    dur: '8s',
    op: 0.45,
  },
  {
    src: '/assets/js-icon.webp',
    top: '82%',
    left: '70%',
    size: '4.4rem',
    delay: '0.6s',
    dur: '12s',
    op: 0.6,
  },
  {
    src: '/assets/node-icon.webp',
    top: '48%',
    left: '93%',
    size: '3rem',
    delay: '3s',
    dur: '10s',
    op: 0.43,
  },
  {
    src: '/assets/css-icon.webp',
    top: '18%',
    left: '66%',
    size: '2.8rem',
    delay: '1.6s',
    dur: '7s',
    op: 0.52,
  },
  {
    src: '/assets/html-icon.webp',
    top: '76%',
    left: '58%',
    size: '3.2rem',
    delay: '2.4s',
    dur: '13s',
    op: 0.6,
  },
  {
    src: '/assets/redux.webp',
    top: '38%',
    left: '74%',
    size: '3rem',
    delay: '4s',
    dur: '9s',
    op: 0.52,
  },
  {
    src: '/assets/bootstrap-icon.webp',
    top: '90%',
    left: '88%',
    size: '2.6rem',
    delay: '0.9s',
    dur: '11s',
    op: 0.6,
  },
  {
    src: '/assets/vscode-icon.webp',
    top: '6%',
    left: '94%',
    size: '3.4rem',
    delay: '3.4s',
    dur: '8.5s',
    op: 0.64,
  },
  {
    src: '/assets/mysql-icon.webp',
    top: '55%',
    left: '62%',
    size: '2.8rem',
    delay: '2s',
    dur: '14s',
    op: 0.6,
  },
  {
    src: '/assets/jest-icon.webp',
    top: '22%',
    left: '56%',
    size: '3rem',
    delay: '1.1s',
    dur: '10s',
    op: 0.65,
  },
  {
    src: '/assets/vitest-icon.webp',
    top: '62%',
    left: '72%',
    size: '2.8rem',
    delay: '3.2s',
    dur: '11.5s',
    op: 0.56,
  },
  {
    src: '/assets/playwright-icon.webp',
    top: '44%',
    left: '80%',
    size: '3rem',
    delay: '0.4s',
    dur: '9.5s',
    op: 0.53,
  },
  {
    src: '/assets/cypress-icon.webp',
    top: '85%',
    left: '60%',
    size: '2.8rem',
    delay: '2.8s',
    dur: '12s',
    op: 0.6,
  },
  {
    src: '/assets/storybook-icon.webp',
    top: '5%',
    left: '72%',
    size: '2.6rem',
    delay: '4.5s',
    dur: '8s',
    op: 0.53,
  },
  {
    src: '/assets/tanstack-icon.webp',
    top: '72%',
    left: '88%',
    size: '2.8rem',
    delay: '1.8s',
    dur: '13s',
    op: 0.6,
  },
  {
    src: '/assets/msw-icon.webp',
    top: '35%',
    left: '60%',
    size: '2.6rem',
    delay: '3.7s',
    dur: '10.5s',
    op: 0.6,
  },
  {
    src: '/assets/aws-icon.webp',
    top: '54%',
    left: '86%',
    size: '3.2rem',
    delay: '0.7s',
    dur: '9s',
    op: 0.56,
  },
  {
    src: '/assets/graphql-icon.webp',
    top: '16%',
    left: '62%',
    size: '3rem',
    delay: '2.3s',
    dur: '10s',
    op: 0.62,
  },
  {
    src: '/assets/apollo-icon.webp',
    top: '78%',
    left: '76%',
    size: '2.8rem',
    delay: '5s',
    dur: '11s',
    op: 0.67,
  },
];

export const Hero = () => {
  const { language, translations } = useLanguage(heroData);

  if (!translations) return null;

  const { greeting, name, job, intro, contact, cv } = translations;

  return (
    <section className={styles.wrapper} id='home'>
      <div className={styles.floatingIcons} aria-hidden='true'>
        {FLOATING_ICONS.map(({ src, top, left, size, delay, dur, op }, i) => (
          <img
            key={i}
            src={src}
            alt=''
            className={styles.floatingIcon}
            style={{
              top,
              left,
              width: size,
              height: size,
              animationDelay: delay,
              animationDuration: dur,
              opacity: op,
            }}
          />
        ))}
      </div>

      <div className={styles.container}>
        <span className={styles.greeting}>{greeting}</span>
        <h1 className={styles.name}>
          {name}
          {language.language === 'japanese' && (
            <span className={styles.japanese}>&nbsp;です</span>
          )}
        </h1>
        <h2 className={styles.role}>{job}</h2>
        <p className={styles.intro}>{intro}</p>
        <div className={styles.actions}>
          <a href='#contact' className={styles.btnPrimary}>
            {contact}
          </a>
          <a
            href='/Angel_Canela_Software_Engineer_CV.pdf'
            download
            className={styles.btnSecondary}
          >
            {cv}
          </a>
        </div>
      </div>
      <a href='#about' className={styles.scrollArrow} aria-label='Scroll down'>
        <span className='sr-only'>Scroll down</span>
        <svg
          aria-hidden='true'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='6 9 12 15 18 9' />
        </svg>
        <svg
          aria-hidden='true'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='6 9 12 15 18 9' />
        </svg>
      </a>
    </section>
  );
};
