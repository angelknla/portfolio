'use client';

import { use } from 'react';

import Link from 'next/link';

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

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href='/#portfolio-games' className={styles.backLink}>
          ← Back to Portfolio
        </Link>
      </nav>
      <main className={styles.main}>
        {GameComponent ? (
          <GameComponent />
        ) : (
          <p className={styles.notFound}>Game not found.</p>
        )}
      </main>
    </div>
  );
};
