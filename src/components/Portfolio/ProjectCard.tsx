import Link from 'next/link';

import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  iconSvg?: string;
  iconAlt?: string;
  title: string;
  href: string;
  description: string;
  techStack: Array<string>;
  stroke?: string;
  accentColor?: string;
}

const isExternal = (url: string) => url.startsWith('http');

const ProjectCard = ({
  iconSvg = '/assets/github-icon.webp',
  iconAlt = 'Github',
  title,
  href,
  description,
  techStack,
  stroke = 'var(--blue)',
  accentColor,
}: ProjectCardProps) => {
  const cardStyle = accentColor
    ? ({
        '--card-accent': accentColor,
        '--card-accent-bg': `${accentColor}14`,
      } as React.CSSProperties)
    : undefined;
  const cardInner = (
    <>
      <header className={styles.header}>
        <svg
          width='50'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          viewBox='0 0 24 24'
          fill='none'
          stroke={stroke}
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <title>Folder</title>
          <path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'></path>
        </svg>
        <div className={styles.projectLinks}>
          <img src={iconSvg} alt={iconAlt} width={22} height={22} />
        </div>
      </header>
      <div className={styles.body}>
        <h3>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <footer className={styles.footer}>
        <ul className={styles.techList}>
          {techStack?.map((tech) => (
            <li key={`${tech}`}>{tech}</li>
          ))}
        </ul>
      </footer>
    </>
  );

  if (isExternal(href)) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noreferrer'
        className={styles.project}
        style={cardStyle}
      >
        {cardInner}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.project} style={cardStyle}>
      {cardInner}
    </Link>
  );
};

export default ProjectCard;
