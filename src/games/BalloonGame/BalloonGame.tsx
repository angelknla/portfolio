'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import GameLayout from '../GameLayout/GameLayout';

import layoutStyles from '../GameLayout/GameLayout.module.css';
import styles from './BalloonGame.module.css';

type Obstacle = {
  x: number;
  y: number;
  width: number;
  height: number;
  isTop: boolean;
};

const BALLOON_SIZE = 40;
const GRAVITY = 0.1;
const BLOW_FORCE = -0.3;
const HORIZONTAL_SPEED = 1;

const LEVELS = [
  // Level 1
  [
    // Top obstacles
    { x: 200, y: 0, width: 60, height: 200, isTop: true },
    { x: 350, y: 0, width: 60, height: 250, isTop: true },
    { x: 500, y: 0, width: 60, height: 180, isTop: true },
    { x: 650, y: 0, width: 60, height: 220, isTop: true },
    // Bottom obstacles
    { x: 200, y: 420, width: 60, height: 180, isTop: false },
    { x: 350, y: 380, width: 60, height: 220, isTop: false },
    { x: 500, y: 400, width: 60, height: 200, isTop: false },
    { x: 650, y: 360, width: 60, height: 240, isTop: false },
  ],
  // Level 2
  [
    // Top obstacles - more challenging
    { x: 150, y: 0, width: 60, height: 230, isTop: true },
    { x: 300, y: 0, width: 60, height: 200, isTop: true },
    { x: 450, y: 0, width: 60, height: 260, isTop: true },
    { x: 600, y: 0, width: 60, height: 220, isTop: true },
    { x: 750, y: 0, width: 50, height: 240, isTop: true },
    // Bottom obstacles - more challenging
    { x: 150, y: 380, width: 60, height: 220, isTop: false },
    { x: 300, y: 400, width: 60, height: 200, isTop: false },
    { x: 450, y: 360, width: 60, height: 240, isTop: false },
    { x: 600, y: 380, width: 60, height: 220, isTop: false },
    { x: 750, y: 370, width: 50, height: 230, isTop: false },
  ],
];

export default function BalloonGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);

  const balloonRef = useRef({
    x: 0,
    y: CANVAS_HEIGHT / 2,
    velocityY: 0,
  });

  const isBlowingRef = useRef(false);
  const distanceRef = useRef(0);

  const obstaclesRef = useRef<Obstacle[]>(LEVELS[0]);

  const goalRef = useRef({
    x: 750,
    y: CANVAS_HEIGHT / 2 - 30,
    width: 40,
    height: 60,
  });

  const loadLevel = useCallback((level: number) => {
    balloonRef.current = {
      x: 0,
      y: CANVAS_HEIGHT / 2,
      velocityY: 0,
    };
    distanceRef.current = 0;
    obstaclesRef.current = LEVELS[level];
    setScore(0);
    setCurrentLevel(level);
    setGameStarted(true);
    setGameOver(false);
  }, []);

  const resetGame = useCallback(() => {
    balloonRef.current = {
      x: 0,
      y: CANVAS_HEIGHT / 2,
      velocityY: 0,
    };
    distanceRef.current = 0;
    obstaclesRef.current = LEVELS[0];
    setScore(0);
    setCurrentLevel(0);
    setGameOver(false);
    setIsVictory(false);
    setGameStarted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        if (gameOver) {
          e.preventDefault();
          resetGame();
        } else if (gameStarted) {
          e.preventDefault();
          isBlowingRef.current = true;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        isBlowingRef.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameOver, gameStarted, resetGame]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = () => {
      const balloon = balloonRef.current;
      const obstacles = obstaclesRef.current;
      const goal = goalRef.current;

      // Move balloon horizontally
      balloon.x += HORIZONTAL_SPEED;

      // Apply blow force or gravity
      if (isBlowingRef.current) {
        balloon.velocityY += BLOW_FORCE;
      } else {
        balloon.velocityY += GRAVITY;
      }

      // Limit max velocity
      balloon.velocityY = Math.max(-8, Math.min(8, balloon.velocityY));

      // Update position
      balloon.y += balloon.velocityY;

      // Check boundaries
      if (balloon.y < 0 || balloon.y + BALLOON_SIZE > CANVAS_HEIGHT) {
        setGameOver(true);
        setGameStarted(false);
        return;
      }

      // Check obstacle collisions
      for (const obstacle of obstacles) {
        if (
          balloon.x + BALLOON_SIZE > obstacle.x &&
          balloon.x < obstacle.x + obstacle.width &&
          balloon.y + BALLOON_SIZE > obstacle.y &&
          balloon.y < obstacle.y + obstacle.height
        ) {
          setGameOver(true);
          setGameStarted(false);
          return;
        }
      }

      // Update distance score
      distanceRef.current = Math.floor(balloon.x / 10);
      setScore(distanceRef.current);

      // Check if reached goal
      if (
        balloon.x + BALLOON_SIZE > goal.x &&
        balloon.x < goal.x + goal.width &&
        balloon.y + BALLOON_SIZE > goal.y &&
        balloon.y < goal.y + goal.height
      ) {
        if (currentLevel === 0) {
          // Load level 2
          setTimeout(() => loadLevel(1), 100);
          return;
        }
        // Level 2 complete - Victory!
        setIsVictory(true);
        setGameOver(true);
        setGameStarted(false);
        return;
      }

      // Check if balloon went too far past the goal without hitting it
      if (balloon.x > CANVAS_WIDTH) {
        setGameOver(true);
        setGameStarted(false);
        return;
      }
    };

    const intervalId = setInterval(gameLoop, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [gameStarted, gameOver, currentLevel, loadLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Clear canvas - sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#E0F6FF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (let i = 0; i < 3; i++) {
        const cloudX = (i * 300 + Date.now() / 50) % (CANVAS_WIDTH + 200);
        ctx.beginPath();
        ctx.arc(cloudX, 100 + i * 50, 25, 0, Math.PI * 2);
        ctx.arc(cloudX + 30, 100 + i * 50, 30, 0, Math.PI * 2);
        ctx.arc(cloudX + 60, 100 + i * 50, 25, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw obstacles
      const obstacles = obstaclesRef.current;
      for (const obstacle of obstacles) {
        // Main obstacle
        ctx.fillStyle = obstacle.isTop ? '#8B4513' : '#654321';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Texture lines
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 2;
        for (let i = 0; i < obstacle.height; i += 20) {
          ctx.beginPath();
          ctx.moveTo(obstacle.x, obstacle.y + i);
          ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + i);
          ctx.stroke();
        }

        // Highlight
        ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
        ctx.fillRect(obstacle.x + 5, obstacle.y + 5, 10, obstacle.height - 10);
      }

      // Draw goal flag
      const goal = goalRef.current;
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.moveTo(goal.x, goal.y);
      ctx.lineTo(goal.x + 30, goal.y + 15);
      ctx.lineTo(goal.x, goal.y + 30);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#FF8C00';
      ctx.lineWidth = 3;
      ctx.strokeRect(goal.x, goal.y, goal.width, goal.height);

      // Draw balloon
      const balloon = balloonRef.current;
      const time = Date.now() / 100;
      const wobble = Math.sin(time) * 3;

      // Balloon shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(
        balloon.x + BALLOON_SIZE / 2,
        CANVAS_HEIGHT - 20,
        BALLOON_SIZE / 2,
        8,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Balloon string
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(balloon.x + BALLOON_SIZE / 2, balloon.y + BALLOON_SIZE);
      ctx.quadraticCurveTo(
        balloon.x + BALLOON_SIZE / 2 + wobble,
        balloon.y + BALLOON_SIZE + 20,
        balloon.x + BALLOON_SIZE / 2,
        balloon.y + BALLOON_SIZE + 30
      );
      ctx.stroke();

      // Balloon body
      const balloonGradient = ctx.createRadialGradient(
        balloon.x + BALLOON_SIZE / 3,
        balloon.y + BALLOON_SIZE / 3,
        5,
        balloon.x + BALLOON_SIZE / 2,
        balloon.y + BALLOON_SIZE / 2,
        BALLOON_SIZE / 2
      );
      balloonGradient.addColorStop(0, '#FF6B9D');
      balloonGradient.addColorStop(1, '#C23373');
      ctx.fillStyle = balloonGradient;

      ctx.beginPath();
      ctx.ellipse(
        balloon.x + BALLOON_SIZE / 2,
        balloon.y + BALLOON_SIZE / 2,
        BALLOON_SIZE / 2,
        BALLOON_SIZE / 1.8,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Balloon highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.ellipse(
        balloon.x + BALLOON_SIZE / 3,
        balloon.y + BALLOON_SIZE / 3,
        BALLOON_SIZE / 5,
        BALLOON_SIZE / 4,
        -0.3,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Balloon knot
      ctx.fillStyle = '#C23373';
      ctx.beginPath();
      ctx.ellipse(
        balloon.x + BALLOON_SIZE / 2,
        balloon.y + BALLOON_SIZE - 2,
        4,
        6,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    const animationId = requestAnimationFrame(function animate() {
      render();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <GameLayout
      title='🎈 Balloon Flight'
      gameColor='#ec4899'
      scoreBoard={
        <>
          <div className={layoutStyles.scoreItem}>
            Level {currentLevel + 1}/2
          </div>
          <div className={layoutStyles.scoreItem}>Distance: {score}m</div>
        </>
      }
      sidePanel={
        <>
          <div className={layoutStyles.controls}>
            <div className={layoutStyles.controlsTitle}>
              {isMobile ? 'Touch Control' : 'Keyboard Control'}
            </div>
            <div className={styles.controlInfo}>
              <button
                type='button'
                className={layoutStyles.controlItem}
                onTouchStart={() => {
                  isBlowingRef.current = true;
                }}
                onTouchEnd={() => {
                  isBlowingRef.current = false;
                }}
                onMouseDown={() => {
                  isBlowingRef.current = true;
                }}
                onMouseUp={() => {
                  isBlowingRef.current = false;
                }}
                onMouseLeave={() => {
                  isBlowingRef.current = false;
                }}
                aria-label='Blow balloon'
              >
                <span className={styles.key}>💨 BLOW</span>
              </button>
            </div>
          </div>

          <div className={layoutStyles.instructionsPanel}>
            <h2 className={layoutStyles.instructionsTitle}>📋 How to Play</h2>
            <div className={layoutStyles.instructionsList}>
              <div className={layoutStyles.instructionItem}>
                <span className={layoutStyles.instructionIcon}>
                  {isMobile ? '👆' : '⌨️'}
                </span>
                <div>
                  <strong>Controls</strong>
                  <p>
                    {isMobile
                      ? 'Hold the button to blow the balloon up'
                      : 'Hold SPACE to blow the balloon up'}
                  </p>
                </div>
              </div>
              <div className={layoutStyles.instructionItem}>
                <span className={layoutStyles.instructionIcon}>🎈</span>
                <div>
                  <strong>Physics</strong>
                  <p>Release to let gravity pull the balloon down</p>
                </div>
              </div>
              <div className={layoutStyles.instructionItem}>
                <span className={layoutStyles.instructionIcon}>⚠️</span>
                <div>
                  <strong>Avoid</strong>
                  <p>Don't touch the walls or the brown obstacles</p>
                </div>
              </div>
              <div className={layoutStyles.instructionItem}>
                <span className={layoutStyles.instructionIcon}>🚩</span>
                <div>
                  <strong>Goal</strong>
                  <p>Reach the flag at the end of each level to advance</p>
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
          onMouseDown={() => {
            if (gameStarted && !gameOver) {
              isBlowingRef.current = true;
            }
          }}
          onMouseUp={() => {
            isBlowingRef.current = false;
          }}
          onMouseLeave={() => {
            isBlowingRef.current = false;
          }}
          onTouchStart={() => {
            if (gameStarted && !gameOver) {
              isBlowingRef.current = true;
            }
          }}
          onTouchEnd={() => {
            isBlowingRef.current = false;
          }}
        />

        {!gameStarted && !gameOver && (
          <div className={layoutStyles.overlay}>
            <button
              type='button'
              onClick={resetGame}
              className={layoutStyles.startButton}
            >
              Start Game
            </button>
            <p className={layoutStyles.instructions}>
              {isMobile
                ? 'Hold the button below to blow the balloon up'
                : 'Hold SPACE to blow the balloon up'}
            </p>
          </div>
        )}

        {gameOver && (
          <div className={layoutStyles.overlay}>
            <div className={layoutStyles.gameOverText}>
              {isVictory ? '🎉 You Win!' : 'Game Over!'}
            </div>
            <div className={layoutStyles.finalScore}>
              {isVictory ? 'You reached the goal!' : `Distance: ${score}m`}
            </div>
            <button
              type='button'
              onClick={resetGame}
              className={layoutStyles.restartButton}
            >
              Play Again
            </button>
            <p className={layoutStyles.instructions}>
              {isMobile ? 'Tap to restart' : 'Press SPACE or click to restart'}
            </p>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
