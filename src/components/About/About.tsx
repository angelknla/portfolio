import Image from 'next/image';

import { useLanguage } from '../../contexts/Language';
import { aboutData } from '../../data/aboutData';

import styles from './About.module.css';

const SKILLS = [
  { src: '/assets/react-icon.svg', alt: 'React' },
  { src: '/assets/typescript-icon.svg', alt: 'TypeScript' },
  { src: '/assets/nextjs-icon.svg', alt: 'Next.js' },
  { src: '/assets/js-icon.svg', alt: 'JavaScript' },
  { src: '/assets/node-icon.svg', alt: 'Node.js' },
  { src: '/assets/redux.svg', alt: 'Redux' },
  { src: '/assets/html-icon.svg', alt: 'HTML5' },
  { src: '/assets/css-icon.svg', alt: 'CSS' },
  { src: '/assets/bootstrap-icon.svg', alt: 'Bootstrap' },
];

export const About = () => {
  const { translations } = useLanguage(aboutData);
  if (!translations) return null;
  const { title, p1, p2, p3, h3 } = translations;

  return (
    <section className={styles.container} id='about'>
      <div className={styles.textCol}>
        <h2 className={styles.heading}>{title}</h2>
        <div className={styles.body}>
          <p>{p1}</p>
          <p>{p2}</p>
          <p>{p3}</p>
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
            src='/assets/angelnew.jpg'
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
