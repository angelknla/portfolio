'use client';

import { use } from 'react';

import { useLanguage } from '../../../contexts/Language';
import { gamesData } from '../../../data/gamesData';
import BalloonGame from '../../../games/BalloonGame/BalloonGame';
import DoroteyoGame from '../../../games/DoroteyoGame/DoroteyoGame';
import MarioGame from '../../../games/MarioGame/MarioGame';
import SnakeGame from '../../../games/SnakeGame/SnakeGame';

import styles from './GamePage.module.css';

const GAME_MAP: Record<string, React.ComponentType> = {
  balloon: BalloonGame,
  doroteyo: DoroteyoGame,
  mario: MarioGame,
  snake: SnakeGame,
};

interface GamePageProps {
  params: Promise<{ gameName: string }>;
}

export const GamePage = ({ params }: GamePageProps) => {
  const { gameName } = use(params);
  const GameComponent = GAME_MAP[gameName];
  const { translations } = useLanguage(gamesData);

  return (
    <main className={styles.page}>
      {GameComponent ? (
        <GameComponent />
      ) : (
        <p className={styles.notFound}>
          {translations?.common?.notFound ?? 'Game not found.'}
        </p>
      )}
    </main>
  );
};
