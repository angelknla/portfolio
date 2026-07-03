'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useLanguage } from '../../contexts/Language';
import { data as portfolioData } from '../../data/portfolioData';
import type { ProjectCardProps } from './ProjectCard';
import ProjectCard from './ProjectCard';

import styles from './Portfolio.module.css';

const GAME_COLORS: Record<string, string> = {
  '/games/balloon': '#ec4899',
  '/games/doroteyo': '#f59e0b',
  '/games/mario': '#ef4444',
  '/games/snake': '#22c55e',
};

export const Portfolio = () => {
  const { translations } = useLanguage(portfolioData);
  const [activeTab, setActiveTab] = useState<'projects' | 'games'>('projects');
  const searchParams = useSearchParams();
  const router = useRouter();

  // Activated via query param from cross-route navigation (e.g. game pages)
  useEffect(() => {
    if (searchParams.get('games') === '1') {
      setActiveTab('games');
      router.replace('/#portfolio', { scroll: false });
      document
        .getElementById('portfolio')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams, router]);

  // Activated via hash change on the same page (e.g. About section link)
  useEffect(() => {
    const activateGamesTab = () => {
      if (window.location.hash === '#portfolio-games') {
        setActiveTab('games');
        history.replaceState(null, '', '#portfolio');
        document
          .getElementById('portfolio')
          ?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    activateGamesTab();
    window.addEventListener('hashchange', activateGamesTab);
    return () => window.removeEventListener('hashchange', activateGamesTab);
  }, []);

  return (
    <section className={styles.container} id='portfolio'>
      <h2 className={styles.title}>{translations?.title}</h2>
      <div className={styles.tabs}>
        <button
          type='button'
          className={`${styles.tab} ${activeTab === 'projects' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          {translations?.tabs?.projects ?? 'Projects'}
        </button>
        <button
          type='button'
          className={`${styles.tab} ${activeTab === 'games' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('games')}
        >
          {translations?.tabs?.games ?? 'Games'}
        </button>
      </div>
      <div className={`${styles.projectsWrapper} projects`}>
        {activeTab === 'projects'
          ? translations?.cards?.map((cardInfo: ProjectCardProps) => (
              <ProjectCard key={cardInfo.title} {...cardInfo} />
            ))
          : translations?.games?.map((cardInfo: ProjectCardProps) => (
              <ProjectCard
                key={cardInfo.title}
                {...cardInfo}
                accentColor={GAME_COLORS[cardInfo.href]}
              />
            ))}
      </div>
    </section>
  );
};
