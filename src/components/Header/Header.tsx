import { useId, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isGame = pathname.startsWith('/games/');
  const switchId = useId();

  if (!translations) return null;

  const { home, about, portfolio, contact } = translations;

  const closeMenu = () => {
    setActive(false);
    document.body.style.overflow = '';
  };

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    // Clear the hash first so re-clicking the same link always fires
    history.replaceState(null, '', ' ');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    }
  };

  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    if (isHome) {
      scrollTo(id)(e);
    } else {
      closeMenu();
    }
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
        {isGame && (
          <Link href='/?games=1#portfolio' className={styles.backLink}>
            ← Back to games
          </Link>
        )}
        <Link
          id='headerName'
          href={isHome ? '#home' : '/#home'}
          onClick={handleNavClick('home')}
          className={styles.logo}
        >
          <span>Angel</span>
          <span> Canela</span>
        </Link>

        <nav
          id='main-navigation'
          className={`${styles.nav} ${active ? styles.active : open ? styles.inactive : ''}`}
        >
          <Link
            href={isHome ? '#home' : '/#home'}
            onClick={handleNavClick('home')}
          >
            {home}
          </Link>
          <Link
            href={isHome ? '#about' : '/#about'}
            onClick={handleNavClick('about')}
          >
            {about}
          </Link>
          <Link
            href={isHome ? '#portfolio' : '/#portfolio'}
            onClick={handleNavClick('portfolio')}
          >
            {portfolio}
          </Link>
          <Link
            href={isHome ? '#contact' : '/#contact'}
            onClick={handleNavClick('contact')}
          >
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
              src='/assets/linkedin.webp'
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
