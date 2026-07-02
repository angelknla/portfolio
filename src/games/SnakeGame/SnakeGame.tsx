'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './SnakeGame.module.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_COLS = 30;
const GRID_ROWS = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = 'RIGHT';
const GAME_SPEED = 150;

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_COLS),
        y: Math.floor(Math.random() * GRID_ROWS),
      };
    } while (
      currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 15, y: 15 });
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  }, []);

  const checkCollision = useCallback(
    (head: Position, body: Position[]): boolean => {
      // Wall collision
      if (
        head.x < 0 ||
        head.x >= GRID_COLS ||
        head.y < 0 ||
        head.y >= GRID_ROWS
      ) {
        return true;
      }
      // Self collision
      return body.some(
        (segment) => segment.x === head.x && segment.y === head.y
      );
    },
    []
  );

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      const currentDirection = directionRef.current;

      switch (currentDirection) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      if (checkCollision(head, prevSnake)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check if snake ate food
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameOver, isPlaying, food, checkCollision, generateFood]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDirectionChange = useCallback(
    (newDirection: Direction) => {
      if (!isPlaying) return;

      const opposites: Record<Direction, Direction> = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      };

      if (opposites[directionRef.current] !== newDirection) {
        directionRef.current = newDirection;
        setDirection(newDirection);
      }
    },
    [isPlaying]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying && !gameOver) return;

      const key = e.key;

      if (key === 'ArrowUp') {
        handleDirectionChange('UP');
      } else if (key === 'ArrowDown') {
        handleDirectionChange('DOWN');
      } else if (key === 'ArrowLeft') {
        handleDirectionChange('LEFT');
      } else if (key === 'ArrowRight') {
        handleDirectionChange('RIGHT');
      } else if (key === ' ' && gameOver) {
        e.preventDefault();
        resetGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, gameOver, resetGame, handleDirectionChange]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = setInterval(() => {
      moveSnake();
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, moveSnake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#16213e33';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_ROWS * CELL_SIZE);
      ctx.stroke();
    }
    for (let i = 0; i <= GRID_ROWS; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_COLS * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#4ecca3' : '#45b393';
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );

      // Draw eyes on head
      if (index === 0) {
        ctx.fillStyle = '#1a1a2e';
        const eyeSize = 3;
        const eyeOffset = 8;

        if (direction === 'RIGHT') {
          ctx.fillRect(
            segment.x * CELL_SIZE + eyeOffset,
            segment.y * CELL_SIZE + 6,
            eyeSize,
            eyeSize
          );
          ctx.fillRect(
            segment.x * CELL_SIZE + eyeOffset,
            segment.y * CELL_SIZE + 15,
            eyeSize,
            eyeSize
          );
        } else if (direction === 'LEFT') {
          ctx.fillRect(
            segment.x * CELL_SIZE + 13,
            segment.y * CELL_SIZE + 6,
            eyeSize,
            eyeSize
          );
          ctx.fillRect(
            segment.x * CELL_SIZE + 13,
            segment.y * CELL_SIZE + 15,
            eyeSize,
            eyeSize
          );
        } else if (direction === 'UP') {
          ctx.fillRect(
            segment.x * CELL_SIZE + 6,
            segment.y * CELL_SIZE + 13,
            eyeSize,
            eyeSize
          );
          ctx.fillRect(
            segment.x * CELL_SIZE + 15,
            segment.y * CELL_SIZE + 13,
            eyeSize,
            eyeSize
          );
        } else {
          ctx.fillRect(
            segment.x * CELL_SIZE + 6,
            segment.y * CELL_SIZE + 8,
            eyeSize,
            eyeSize
          );
          ctx.fillRect(
            segment.x * CELL_SIZE + 15,
            segment.y * CELL_SIZE + 8,
            eyeSize,
            eyeSize
          );
        }
      }
    });

    // Draw food
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [snake, food, direction]);

  return (
    <div className={styles.container}>
      <div className={styles.gameWrapper}>
        <h1 className={styles.title}>🐍 Snake Game</h1>

        <div className={styles.scoreBoard}>
          <div className={styles.score}>Score: {score}</div>
          <div className={styles.highScore}>Length: {snake.length}</div>
        </div>

        <div className={styles.gameLayout}>
          <div className={styles.gameColumn}>
            <div className={styles.canvasWrapper}>
              <canvas
                ref={canvasRef}
                width={GRID_COLS * CELL_SIZE}
                height={GRID_ROWS * CELL_SIZE}
                className={styles.canvas}
              />

              {!isPlaying && !gameOver && (
                <div className={styles.overlay}>
                  <button
                    type='button'
                    onClick={resetGame}
                    className={styles.startButton}
                  >
                    Start Game
                  </button>
                  <p className={styles.instructions}>
                    {isMobile
                      ? 'Tap the buttons below to control the snake'
                      : 'Use arrow keys to control the snake'}
                  </p>
                </div>
              )}

              {gameOver && (
                <div className={styles.overlay}>
                  <div className={styles.gameOverText}>Game Over!</div>
                  <div className={styles.finalScore}>Final Score: {score}</div>
                  <button
                    type='button'
                    onClick={resetGame}
                    className={styles.restartButton}
                  >
                    Play Again
                  </button>
                  <p className={styles.instructions}>
                    {isMobile
                      ? 'Tap to restart'
                      : 'Press SPACE or click to restart'}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.sidePanel}>
            <div className={styles.controls}>
              <div className={styles.controlsTitle}>
                {isMobile ? 'Touch Controls' : 'Keyboard Controls'}
              </div>
              <div className={styles.controlGrid}>
                <div />
                <button
                  type='button'
                  className={styles.controlButton}
                  onClick={() => handleDirectionChange('UP')}
                  onTouchStart={() => handleDirectionChange('UP')}
                  aria-label='Move up'
                >
                  ↑
                </button>
                <div />
                <button
                  type='button'
                  className={styles.controlButton}
                  onClick={() => handleDirectionChange('LEFT')}
                  onTouchStart={() => handleDirectionChange('LEFT')}
                  aria-label='Move left'
                >
                  ←
                </button>
                <button
                  type='button'
                  className={styles.controlButton}
                  onClick={() => handleDirectionChange('DOWN')}
                  onTouchStart={() => handleDirectionChange('DOWN')}
                  aria-label='Move down'
                >
                  ↓
                </button>
                <button
                  type='button'
                  className={styles.controlButton}
                  onClick={() => handleDirectionChange('RIGHT')}
                  onTouchStart={() => handleDirectionChange('RIGHT')}
                  aria-label='Move right'
                >
                  →
                </button>
              </div>
            </div>

            <div className={styles.instructionsPanel}>
              <h2 className={styles.instructionsTitle}>📋 How to Play</h2>
              <div className={styles.instructionsList}>
                <div className={styles.instructionItem}>
                  <span className={styles.instructionIcon}>
                    {isMobile ? '👆' : '⌨️'}
                  </span>
                  <div>
                    <strong>Controls</strong>
                    <p>
                      {isMobile
                        ? 'Tap the arrow buttons below to move the snake in any direction'
                        : 'Use arrow keys (↑ ↓ ← →) to move the snake in any direction'}
                    </p>
                  </div>
                </div>
                <div className={styles.instructionItem}>
                  <span className={styles.instructionIcon}>🎯</span>
                  <div>
                    <strong>Objective</strong>
                    <p>
                      Eat the red food to grow longer and increase your score
                    </p>
                  </div>
                </div>
                <div className={styles.instructionItem}>
                  <span className={styles.instructionIcon}>⚠️</span>
                  <div>
                    <strong>Avoid</strong>
                    <p>Don't hit the walls or run into yourself!</p>
                  </div>
                </div>
                <div className={styles.instructionItem}>
                  <span className={styles.instructionIcon}>🏆</span>
                  <div>
                    <strong>Scoring</strong>
                    <p>
                      Each food gives you +10 points. How long can you survive?
                    </p>
                  </div>
                </div>
                <div className={styles.instructionItem}>
                  <span className={styles.instructionIcon}>💡</span>
                  <div>
                    <strong>Pro Tip</strong>
                    <p>
                      Plan your moves ahead! The snake speeds up as you get
                      longer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
