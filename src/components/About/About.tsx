import Image from 'next/image';

import { useLanguage } from '@/contexts/Language';
import { aboutData } from '@/data/aboutData';

import styles from './About.module.css';

const SKILLS = [
  { src: '/assets/react-icon.webp', alt: 'React' },
  { src: '/assets/typescript-icon.webp', alt: 'TypeScript' },
  { src: '/assets/nextjs-icon.webp', alt: 'Next.js' },
  { src: '/assets/js-icon.webp', alt: 'JavaScript' },
  { src: '/assets/node-icon.webp', alt: 'Node.js' },
  { src: '/assets/redux.webp', alt: 'Redux' },
  { src: '/assets/html-icon.webp', alt: 'HTML5' },
  { src: '/assets/css-icon.webp', alt: 'CSS' },
  { src: '/assets/bootstrap-icon.webp', alt: 'Bootstrap' },
  { src: '/assets/jest-icon.webp', alt: 'Jest' },
  { src: '/assets/vitest-icon.webp', alt: 'Vitest' },
  { src: '/assets/playwright-icon.webp', alt: 'Playwright' },
  { src: '/assets/cypress-icon.webp', alt: 'Cypress' },
  { src: '/assets/storybook-icon.webp', alt: 'Storybook' },
  { src: '/assets/tanstack-icon.webp', alt: 'TanStack' },
  { src: '/assets/msw-icon.webp', alt: 'MSW' },
  { src: '/assets/aws-icon.webp', alt: 'AWS' },
  { src: '/assets/graphql-icon.webp', alt: 'GraphQL' },
  { src: '/assets/apollo-icon.webp', alt: 'Apollo' },
];

export const About = () => {
  const { translations } = useLanguage(aboutData);
  if (!translations) return null;
  const { title, p1, p2, p3, h3, pGames } = translations;

  return (
    <section className={styles.container} id='about'>
      <div className={styles.textCol}>
        <h2 className={styles.heading}>{title}</h2>
        <div className={styles.body}>
          <p>{p1}</p>
          <p>{p2}</p>
          <p>{p3}</p>
          {pGames && (
            <p>
              {pGames.before}
              <a href='/#portfolio-games' className={styles.inlineLink}>
                {pGames.link}
              </a>
              {pGames.after}
            </p>
          )}
        </div>
        <div className={styles.skillsSection}>
          <p className={styles.skillsLabel}>{h3}</p>
          <div className={styles.skillGrid}>
            {SKILLS.map(({ src, alt }, i) => (
              <div
                key={alt}
                className={styles.skillBadge}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <img src={src} alt={alt} width={18} height={18} />
                <span>{alt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.imageCol}>
        <div className={styles.imageWrapper}>
          <Image
            src='/assets/angelnew.webp'
            alt='Angel Canela'
            fill
            sizes='(max-width: 960px) 90vw, 33vw'
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            priority
          />
        </div>
      </div>
    </section>
  );
};
