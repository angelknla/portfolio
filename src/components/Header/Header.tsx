import { useId, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useLanguage } from '../../contexts/Language';
import { headerData } from '../../data/headerData';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

import styles from './Header.module.css';

export const toggleTheme = () => {
  const html = document.getElementsByTagName('html')[0];
  html.classList.toggle('dark');
};

export const Header = () => {
  const { translations } = useLanguage(headerData);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const switchId = useId();

  if (!translations) return null;

  const { home, about, portfolio, contact } = translations;

  const closeMenu = () => {
    setActive(false);
    document.body.style.overflow = '';
  };

  const handleClick = () => {
    const next = !active;
    setActive(next);
    setOpen(true);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  return (
    <header className={`${styles.container} header-fixed`}>
      <div className={styles.inner}>
        <Link id='headerName' href='#home' className={styles.logo}>
          <span>Angel</span>
          <span> Canela</span>
        </Link>

        <nav
          id='main-navigation'
          className={`${styles.nav} ${active ? styles.active : open ? styles.inactive : ''}`}
        >
          <Link href='#home' onClick={closeMenu}>
            {home}
          </Link>
          <Link href='#about' onClick={closeMenu}>
            {about}
          </Link>
          <Link href='#portfolio' onClick={closeMenu}>
            {portfolio}
          </Link>
          <Link href='#contact' onClick={closeMenu}>
            {contact}
          </Link>
          <a
            href='/Angel_Canela_Software_Engineer_CV.pdf'
            download
            className={styles.button}
          >
            CV
          </a>
          <a
            href='https://www.linkedin.com/in/angel-canela/'
            target='_blank'
            rel='noreferrer'
            className={styles.styledLinkedIn}
          >
            <Image
              src='/assets/linkedin.png'
              alt='Linkedin'
              width={24}
              height={24}
            />
          </a>
          <LanguageSwitcher />
          <input
            onChange={toggleTheme}
            type='checkbox'
            id={switchId}
            name='mode'
          />
          <label htmlFor={switchId}>Toggle</label>
        </nav>

        <button
          type='button'
          aria-expanded={active}
          aria-controls='main-navigation'
          aria-label={active ? 'Close menu' : 'Open Menu'}
          className={`${styles.menu} ${active ? styles.active : ''}`}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleClick();
          }}
        ></button>
      </div>
    </header>
  );
};
