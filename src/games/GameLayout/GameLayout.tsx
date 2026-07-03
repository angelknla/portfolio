import type { CSSProperties, ReactNode } from 'react';

import styles from './GameLayout.module.css';

interface GameLayoutProps {
  title: string;
  gameColor: string;
  scoreBoard: ReactNode;
  sidePanel: ReactNode;
  children: ReactNode;
}

export default function GameLayout({
  title,
  gameColor,
  scoreBoard,
  sidePanel,
  children,
}: GameLayoutProps) {
  return (
    <div
      className={styles.container}
      style={{ '--game-color': gameColor } as CSSProperties}
    >
      <div className={styles.gameWrapper}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.scoreBoard}>{scoreBoard}</div>

        <div className={styles.gameLayout}>
          <div className={styles.gameColumn}>{children}</div>
          <div className={styles.sidePanel}>{sidePanel}</div>
        </div>
      </div>
    </div>
  );
}
