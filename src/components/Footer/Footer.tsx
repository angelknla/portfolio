import Image from 'next/image';

import { useLanguage } from '../../contexts/Language';
import { footerData } from '../../data/footerData';

import styles from './Footer.module.css';

export const Footer = () => {
  const { translations } = useLanguage(footerData);

  if (!translations) return null;

  const { message } = translations;

  return (
    <footer className={styles.container}>
      <a href='/' className={styles.logo}>
        <span>Angel</span>
        <span> Canela</span>
      </a>
      <div className={styles.message}>
        <p>{message}</p>
      </div>

      <div className={styles.socialMedia}>
        <a
          href='https://www.linkedin.com/in/angel-canela/'
          target='_blank'
          rel='noreferrer'
        >
          <Image
            src='/assets/linkedin.webp'
            alt='Linkedin'
            width={24}
            height={24}
          />
        </a>

        <a href='https://github.com/angelknla' target='_blank' rel='noreferrer'>
          <Image
            src='/assets/github.webp'
            alt='GitHub'
            width={24}
            height={24}
          />
        </a>

        <a href='b' target='_blank' rel='noreferrer'>
          <Image
            src='/assets/instagram.webp'
            alt='Instagram'
            width={24}
            height={24}
          />
        </a>
      </div>
    </footer>
  );
};
