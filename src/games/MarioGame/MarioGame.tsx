'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useLanguage } from '../../contexts/Language';
import { gamesData } from '../../data/gamesData';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MOVE_SPEED,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from '../constants';
import GameLayout from '../GameLayout/GameLayout';

import layoutStyles from '../GameLayout/GameLayout.module.css';
import styles from './MarioGame.module.css';

type Platform = { x: number; y: number; width: number; height: number };
type Coin = { x: number; y: number; collected: boolean };

const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const GROUND_Y = CANVAS_HEIGHT - 50;

const LEVELS = [
  {
    platforms: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 150, y: 450, width: 120, height: 20 },
      { x: 350, y: 380, width: 100, height: 20 },
      { x: 550, y: 320, width: 150, height: 20 },
      { x: 200, y: 250, width: 120, height: 20 },
      { x: 500, y: 180, width: 100, height: 20 },
    ],
    coins: [
      { x: 200, y: 410, collected: false },
      { x: 400, y: 340, collected: false },
      { x: 600, y: 280, collected: false },
      { x: 250, y: 210, collected: false },
      { x: 550, y: 140, collected: false },
      { x: 180, y: 420, collected: false },
      { x: 650, y: 290, collected: false },
    ],
    background: '#5eb6ff',
  },
  {
    platforms: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 100, y: 470, width: 100, height: 20 },
      { x: 300, y: 420, width: 80, height: 20 },
      { x: 480, y: 370, width: 100, height: 20 },
      { x: 150, y: 320, width: 120, height: 20 },
      { x: 400, y: 250, width: 100, height: 20 },
      { x: 600, y: 200, width: 120, height: 20 },
      { x: 250, y: 150, width: 100, height: 20 },
    ],
    coins: [
      { x: 140, y: 430, collected: false },
      { x: 340, y: 380, collected: false },
      { x: 520, y: 330, collected: false },
      { x: 200, y: 280, collected: false },
      { x: 440, y: 210, collected: false },
      { x: 650, y: 160, collected: false },
      { x: 290, y: 110, collected: false },
      { x: 380, y: 240, collected: false },
    ],
    background: '#ff9a76',
  },
];

export default function MarioGame() {
  const { translations } = useLanguage(gamesData);
  const common = translations?.common;
  const t = translations?.mario;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);

  const playerRef = useRef({
    x: 50,
    y: GROUND_Y - PLAYER_HEIGHT,
    velocityY: 0,
    isJumping: false,
  });

  const keysRef = useRef<Set<string>>(new Set());
  const platformsRef = useRef<Platform[]>(LEVELS[0].platforms);
  const coinsRef = useRef<Coin[]>(JSON.parse(JSON.stringify(LEVELS[0].coins)));

  const loadLevel = useCallback((levelIndex: number) => {
    platformsRef.current = LEVELS[levelIndex].platforms;
    coinsRef.current = JSON.parse(JSON.stringify(LEVELS[levelIndex].coins));
    playerRef.current = {
      x: 50,
      y: GROUND_Y - PLAYER_HEIGHT,
      velocityY: 0,
      isJumping: false,
    };
  }, []);

  const resetGame = useCallback(() => {
    setCurrentLevel(0);
    loadLevel(0);
    setScore(0);
    setGameOver(false);
    setIsVictory(false);
    setGameStarted(true);
  }, [loadLevel]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      loadLevel(currentLevel);
    }
  }, [currentLevel, gameStarted, gameOver, loadLevel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (gameOver) {
          resetGame();
          return;
        }
      }
      keysRef.current.add(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameOver, resetGame]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = () => {
      const player = playerRef.current;
      const platforms = platformsRef.current;
      const coins = coinsRef.current;

      // Handle horizontal movement
      if (keysRef.current.has('ArrowLeft')) {
        player.x = Math.max(0, player.x - MOVE_SPEED);
      }
      if (keysRef.current.has('ArrowRight')) {
        player.x = Math.min(CANVAS_WIDTH - PLAYER_WIDTH, player.x + MOVE_SPEED);
      }

      // Handle jumping
      if (
        (keysRef.current.has('ArrowUp') || keysRef.current.has(' ')) &&
        !player.isJumping
      ) {
        player.velocityY = JUMP_FORCE;
        player.isJumping = true;
      }

      // Apply gravity
      player.velocityY += GRAVITY;
      player.y += player.velocityY;

      // Check platform collisions
      for (const platform of platforms) {
        if (
          player.x + PLAYER_WIDTH > platform.x &&
          player.x < platform.x + platform.width &&
          player.y + PLAYER_HEIGHT >= platform.y &&
          player.y + PLAYER_HEIGHT <= platform.y + 20 &&
          player.velocityY >= 0
        ) {
          player.y = platform.y - PLAYER_HEIGHT;
          player.velocityY = 0;
          player.isJumping = false;
          break;
        }
      }

      // Check if player fell off screen
      if (player.y > CANVAS_HEIGHT) {
        setGameOver(true);
        setGameStarted(false);
      }

      // Check coin collection
      for (const coin of coins) {
        if (
          !coin.collected &&
          player.x + PLAYER_WIDTH > coin.x &&
          player.x < coin.x + 20 &&
          player.y + PLAYER_HEIGHT > coin.y &&
          player.y < coin.y + 20
        ) {
          coin.collected = true;
          setScore((prev) => prev + 10);
        }
      }

      // Check if all coins collected
      const allCoinsCollected = coins.every((coin) => coin.collected);
      if (allCoinsCollected) {
        if (currentLevel < LEVELS.length - 1) {
          // Load next level
          const nextLevel = currentLevel + 1;
          setCurrentLevel(nextLevel);
        } else {
          // Win game - all levels completed
          setIsVictory(true);
          setGameOver(true);
          setGameStarted(false);
        }
      }
    };

    const intervalId = setInterval(gameLoop, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [gameStarted, gameOver, currentLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Clear canvas with level background
      ctx.fillStyle = LEVELS[currentLevel].background;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(100, 80, 30, 0, Math.PI * 2);
      ctx.arc(130, 80, 35, 0, Math.PI * 2);
      ctx.arc(160, 80, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(500, 120, 25, 0, Math.PI * 2);
      ctx.arc(525, 120, 30, 0, Math.PI * 2);
      ctx.arc(550, 120, 25, 0, Math.PI * 2);
      ctx.fill();

      // Draw platforms with better detail
      const platforms = platformsRef.current;
      for (const platform of platforms) {
        // Platform shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(
          platform.x,
          platform.y + platform.height,
          platform.width,
          3
        );

        // Platform main body
        if (platform.y === GROUND_Y) {
          // Ground platform
          ctx.fillStyle = '#8b5a3c';
          ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

          // Grass on top
          ctx.fillStyle = '#7cb342';
          ctx.fillRect(platform.x, platform.y, platform.width, 8);

          // Grass details
          ctx.fillStyle = '#689f38';
          for (let i = 0; i < platform.width; i += 15) {
            ctx.fillRect(platform.x + i, platform.y, 2, 8);
          }
        } else {
          // Floating platform - brick style
          const brickWidth = 40;
          const brickHeight = 20;

          for (let i = 0; i < platform.width; i += brickWidth) {
            const brickX = platform.x + i;
            const actualWidth = Math.min(brickWidth, platform.width - i);

            // Brick
            ctx.fillStyle = '#d84315';
            ctx.fillRect(brickX, platform.y, actualWidth, brickHeight);

            // Brick highlight
            ctx.fillStyle = '#ff5722';
            ctx.fillRect(brickX + 2, platform.y + 2, actualWidth - 4, 6);

            // Brick mortar
            ctx.fillStyle = '#bf360c';
            if (i + brickWidth < platform.width) {
              ctx.fillRect(
                brickX + actualWidth - 2,
                platform.y,
                2,
                brickHeight
              );
            }
          }
        }
      }

      // Draw coins with animation
      const coins = coinsRef.current;
      const time = Date.now() / 200;
      for (const coin of coins) {
        if (!coin.collected) {
          const pulse = Math.sin(time) * 2;

          // Outer glow
          const gradient = ctx.createRadialGradient(
            coin.x + 10,
            coin.y + 10,
            0,
            coin.x + 10,
            coin.y + 10,
            14 + pulse
          );
          gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(coin.x + 10, coin.y + 10, 14 + pulse, 0, Math.PI * 2);
          ctx.fill();

          // Coin body
          ctx.fillStyle = '#ffd700';
          ctx.beginPath();
          ctx.arc(coin.x + 10, coin.y + 10, 10, 0, Math.PI * 2);
          ctx.fill();

          // Coin highlight
          ctx.fillStyle = '#ffed4e';
          ctx.beginPath();
          ctx.arc(coin.x + 10, coin.y + 10, 6, 0, Math.PI * 2);
          ctx.fill();

          // Coin detail
          ctx.strokeStyle = '#e6ac00';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(coin.x + 10, coin.y + 10, 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw player
      const player = playerRef.current;

      // Body (red shirt)
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(player.x + 5, player.y + 15, 30, 20);

      // Head (skin color)
      ctx.fillStyle = '#ffdbac';
      ctx.beginPath();
      ctx.arc(player.x + 20, player.y + 10, 10, 0, Math.PI * 2);
      ctx.fill();

      // Hat
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(player.x + 10, player.y + 2, 20, 8);
      ctx.fillRect(player.x + 8, player.y + 5, 24, 5);

      // Overalls (blue)
      ctx.fillStyle = '#0066ff';
      ctx.fillRect(player.x + 8, player.y + 35, 12, 15);
      ctx.fillRect(player.x + 20, player.y + 35, 12, 15);

      // Shoes
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(player.x + 5, player.y + 45, 15, 5);
      ctx.fillRect(player.x + 20, player.y + 45, 15, 5);

      // Eyes
      ctx.fillStyle = '#000';
      ctx.fillRect(player.x + 15, player.y + 8, 3, 3);
      ctx.fillRect(player.x + 22, player.y + 8, 3, 3);

      // Mustache
      ctx.fillStyle = '#654321';
      ctx.fillRect(player.x + 12, player.y + 13, 16, 3);
    };

    const animationId = requestAnimationFrame(function animate() {
      render();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationId);
  }, [currentLevel]);

  return (
    <GameLayout
      title={t?.title ?? '🍄 Super Mario Platform'}
      gameColor='#ef4444'
      scoreBoard={
        <>
          <div className={layoutStyles.scoreItem}>
            {common?.level}: {currentLevel + 1}/{LEVELS.length}
          </div>
          <div className={layoutStyles.scoreItem}>
            {common?.score}: {score}
          </div>
          <div className={layoutStyles.scoreItem}>
            {t?.coins}: {coinsRef.current.filter((c) => c.collected).length}/
            {coinsRef.current.length}
          </div>
        </>
      }
      sidePanel={
        <>
          <div className={layoutStyles.controls}>
            <div className={layoutStyles.controlsTitle}>
              {isMobile ? common?.touchControls : common?.keyboardControls}
            </div>
            <div className={styles.controlInfo}>
              <button
                type='button'
                className={layoutStyles.controlItem}
                onTouchStart={() => keysRef.current.add('ArrowLeft')}
                onTouchEnd={() => keysRef.current.delete('ArrowLeft')}
                onMouseDown={() => keysRef.current.add('ArrowLeft')}
                onMouseUp={() => keysRef.current.delete('ArrowLeft')}
                onMouseLeave={() => keysRef.current.delete('ArrowLeft')}
                aria-label={t?.moveLeftAria}
              >
                <span className={styles.key}>←</span>
              </button>
              <button
                type='button'
                className={layoutStyles.controlItem}
                onTouchStart={() => keysRef.current.add('ArrowRight')}
                onTouchEnd={() => keysRef.current.delete('ArrowRight')}
                onMouseDown={() => keysRef.current.add('ArrowRight')}
                onMouseUp={() => keysRef.current.delete('ArrowRight')}
                onMouseLeave={() => keysRef.current.delete('ArrowRight')}
                aria-label={t?.moveRightAria}
              >
                <span className={styles.key}>→</span>
              </button>
              <button
                type='button'
                className={layoutStyles.controlItem}
                onTouchStart={() => {
                  keysRef.current.add('ArrowUp');
                  setTimeout(() => keysRef.current.delete('ArrowUp'), 100);
                }}
                onClick={() => {
                  keysRef.current.add('ArrowUp');
                  setTimeout(() => keysRef.current.delete('ArrowUp'), 100);
                }}
                aria-label={t?.jumpAria}
              >
                <span className={styles.key}>↑</span>
              </button>
            </div>
          </div>

          <div className={layoutStyles.instructionsPanel}>
            <h2 className={layoutStyles.instructionsTitle}>
              {common?.howToPlay}
            </h2>
            <div className={layoutStyles.instructionsList}>
              <div className={layoutStyles.instructionItem}>
                <span className={layoutStyles.instructionIcon}>
                  {isMobile ? '👆' : '⌨️'}
                </span>
                <div>
                  <strong>{t?.instructions?.move?.title}</strong>
                  <p>
                    {isMobile
                      ? t?.instructions?.move?.textMobile
                      : t?.instructions?.move?.textDesktop}
                  </p>
                </div>
              </div>
              <div className={layoutStyles.instructionItem}>
                <span className={layoutStyles.instructionIcon}>🦘</span>
                <div>
                  <strong>{t?.instructions?.jump?.title}</strong>
                  <p>
                    {isMobile
                      ? t?.instructions?.jump?.textMobile
                      : t?.instructions?.jump?.textDesktop}
                  </p>
                </div>
              </div>
              <div className={layoutStyles.instructionItem}>
                <span className={layoutStyles.instructionIcon}>🪙</span>
                <div>
                  <strong>{t?.instructions?.coins?.title}</strong>
                  <p>{t?.instructions?.coins?.text}</p>
                </div>
              </div>
              <div className={layoutStyles.instructionItem}>
                <span className={layoutStyles.instructionIcon}>🏆</span>
                <div>
                  <strong>{t?.instructions?.levels?.title}</strong>
                  <p>{t?.instructions?.levels?.text}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    >
      <div className={layoutStyles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className={layoutStyles.canvas}
        />

        {!gameStarted && !gameOver && (
          <div className={layoutStyles.overlay}>
            <button
              type='button'
              onClick={resetGame}
              className={layoutStyles.startButton}
            >
              {common?.startGame}
            </button>
            <p className={layoutStyles.instructions}>
              {isMobile ? t?.startTextMobile : t?.startTextDesktop}
            </p>
          </div>
        )}

        {gameOver && (
          <div className={layoutStyles.overlay}>
            <div className={layoutStyles.gameOverText}>
              {isVictory ? t?.victoryTitle : common?.gameOver}
            </div>
            <div className={layoutStyles.finalScore}>
              {isVictory ? t?.victoryText : `${common?.finalScore}: ${score}`}
            </div>
            <button
              type='button'
              onClick={resetGame}
              className={layoutStyles.restartButton}
            >
              {common?.playAgain}
            </button>
            <p className={layoutStyles.instructions}>
              {isMobile ? common?.tapToRestart : common?.pressToRestart}
            </p>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
