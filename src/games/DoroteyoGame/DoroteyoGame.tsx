'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './DoroteyoGame.module.css';

type Planet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: 'large' | 'medium' | 'small';
  radius: number;
  color: string;
};

type Shot = {
  x: number;
  y: number;
  active: boolean;
  trail: { x: number; y: number; alpha: number }[];
};

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 50;
const MOVE_SPEED = 5;
const GRAVITY = 0.3;
const PLANET_COLORS = [
  '#FF6B9D',
  '#4ECDC4',
  '#FFE66D',
  '#95E1D3',
  '#C7CEEA',
  '#FFDAC1',
];

const PLANET_SIZES = {
  large: 50,
  medium: 30,
  small: 15,
};

const LEVELS = [
  // Level 1 - 2 planets
  [
    {
      x: 250,
      y: 120,
      vx: 2,
      vy: 0,
      size: 'large',
      radius: 50,
      color: '#FF6B9D',
    },
    {
      x: 550,
      y: 130,
      vx: -2,
      vy: 0,
      size: 'large',
      radius: 50,
      color: '#4ECDC4',
    },
  ],
  // Level 2 - 3 planets
  [
    {
      x: 200,
      y: 100,
      vx: 2.5,
      vy: 0,
      size: 'large',
      radius: 50,
      color: '#9B59B6',
    },
    {
      x: 400,
      y: 130,
      vx: -2.5,
      vy: 0,
      size: 'large',
      radius: 50,
      color: '#E67E22',
    },
    {
      x: 600,
      y: 110,
      vx: 2.5,
      vy: 0,
      size: 'large',
      radius: 50,
      color: '#1ABC9C',
    },
  ],
];

export default function DoroteyoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [health, setHealth] = useState(3);
  const [isFlashing, setIsFlashing] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showLevelTransition, setShowLevelTransition] = useState(false);

  const playerRef = useRef({
    x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
    isPoweredUp: false,
    powerUpTimer: 0,
    invincibilityTimer: 0,
  });

  const keysRef = useRef<Set<string>>(new Set());
  const planetsRef = useRef<Planet[]>(JSON.parse(JSON.stringify(LEVELS[0])));
  const shotsRef = useRef<Shot[]>([]);
  const destroyedPlanetsRef = useRef(0);
  const healthRef = useRef(3);

  const spawnPlanets = useCallback((planet: Planet) => {
    if (planet.size === 'large') {
      // Split into 2 medium planets
      const color1 =
        PLANET_COLORS[Math.floor(Math.random() * PLANET_COLORS.length)];
      const color2 =
        PLANET_COLORS[Math.floor(Math.random() * PLANET_COLORS.length)];
      planetsRef.current.push(
        {
          x: planet.x - 20,
          y: planet.y,
          vx: -2.5,
          vy: -5,
          size: 'medium',
          radius: PLANET_SIZES.medium,
          color: color1,
        },
        {
          x: planet.x + 20,
          y: planet.y,
          vx: 2.5,
          vy: -5,
          size: 'medium',
          radius: PLANET_SIZES.medium,
          color: color2,
        }
      );
    } else if (planet.size === 'medium') {
      // Split into 2 small planets
      const color1 =
        PLANET_COLORS[Math.floor(Math.random() * PLANET_COLORS.length)];
      const color2 =
        PLANET_COLORS[Math.floor(Math.random() * PLANET_COLORS.length)];
      planetsRef.current.push(
        {
          x: planet.x - 15,
          y: planet.y,
          vx: -3,
          vy: -6,
          size: 'small',
          radius: PLANET_SIZES.small,
          color: color1,
        },
        {
          x: planet.x + 15,
          y: planet.y,
          vx: 3,
          vy: -6,
          size: 'small',
          radius: PLANET_SIZES.small,
          color: color2,
        }
      );
    } else {
      // Small planet destroyed - activate power up
      destroyedPlanetsRef.current += 1;
      playerRef.current.isPoweredUp = true;
      playerRef.current.powerUpTimer = 300; // 5 seconds at 60fps
    }
  }, []);

  const shoot = useCallback(() => {
    const player = playerRef.current;
    shotsRef.current.push({
      x: player.x + PLAYER_WIDTH / 2,
      y: CANVAS_HEIGHT - 60,
      active: true,
      trail: [],
    });
  }, []);

  const resetGame = useCallback(() => {
    playerRef.current = {
      x: 150,
      isPoweredUp: false,
      powerUpTimer: 0,
      invincibilityTimer: 0,
    };
    planetsRef.current = JSON.parse(JSON.stringify(LEVELS[0]));
    shotsRef.current = [];
    destroyedPlanetsRef.current = 0;
    healthRef.current = 3;
    setScore(0);
    setHealth(3);
    setCurrentLevel(0);
    setGameOver(false);
    setIsVictory(false);
    setShowLevelTransition(false);
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
        e.preventDefault();
        if (gameOver) {
          resetGame();
        } else if (gameStarted) {
          shoot();
        }
      } else {
        keysRef.current.add(e.key);
      }
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
  }, [gameOver, gameStarted, resetGame, shoot]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = () => {
      const player = playerRef.current;
      const planets = planetsRef.current;
      const shots = shotsRef.current;

      // Update power-up timer
      if (player.isPoweredUp) {
        player.powerUpTimer -= 1;
        if (player.powerUpTimer <= 0) {
          player.isPoweredUp = false;
        }
      }

      // Update invincibility timer
      if (player.invincibilityTimer > 0) {
        player.invincibilityTimer -= 1;
      }

      // Move player
      if (keysRef.current.has('ArrowLeft')) {
        player.x = Math.max(0, player.x - MOVE_SPEED);
      }
      if (keysRef.current.has('ArrowRight')) {
        player.x = Math.min(CANVAS_WIDTH - PLAYER_WIDTH, player.x + MOVE_SPEED);
      }

      // Update shots
      for (let i = shots.length - 1; i >= 0; i--) {
        const shot = shots[i];
        if (!shot.active) continue;

        // Add trail effect - longer and brighter when powered up
        const maxTrailLength = player.isPoweredUp ? 18 : 8;
        const trailAlphaDecay = player.isPoweredUp ? 0.05 : 0.1;

        shot.trail.push({ x: shot.x, y: shot.y, alpha: 1 });
        if (shot.trail.length > maxTrailLength) {
          shot.trail.shift();
        }

        // Update trail alpha
        for (const star of shot.trail) {
          star.alpha -= trailAlphaDecay;
        }

        shot.y -= player.isPoweredUp ? 12 : 8;

        if (shot.y < 0) {
          shots.splice(i, 1);
          continue;
        }

        // Check collision with planets
        let shotHit = false;
        for (let j = planets.length - 1; j >= 0; j--) {
          const planet = planets[j];

          // Check shot head collision
          const dist = Math.sqrt(
            (shot.x - planet.x) ** 2 + (shot.y - planet.y) ** 2
          );

          if (dist < planet.radius) {
            // Hit!
            shots.splice(i, 1);
            planets.splice(j, 1);
            spawnPlanets(planet);
            setScore(
              (prev) =>
                prev +
                (planet.size === 'large'
                  ? 10
                  : planet.size === 'medium'
                    ? 20
                    : 30)
            );
            shotHit = true;
            break;
          }

          // When powered up, check trail collision too (check every other point for performance)
          if (player.isPoweredUp && !shotHit) {
            for (let k = 0; k < shot.trail.length; k += 2) {
              const trailPoint = shot.trail[k];
              const trailDist = Math.sqrt(
                (trailPoint.x - planet.x) ** 2 + (trailPoint.y - planet.y) ** 2
              );
              if (trailDist < planet.radius) {
                // Trail hit!
                shots.splice(i, 1);
                planets.splice(j, 1);
                spawnPlanets(planet);
                setScore(
                  (prev) =>
                    prev +
                    (planet.size === 'large'
                      ? 10
                      : planet.size === 'medium'
                        ? 20
                        : 30)
                );
                shotHit = true;
                break;
              }
            }
            if (shotHit) break;
          }
        }
      }

      // Update planets
      for (const planet of planets) {
        planet.x += planet.vx;
        planet.y += planet.vy;
        planet.vy += GRAVITY;

        // Bounce off walls
        if (
          planet.x - planet.radius < 0 ||
          planet.x + planet.radius > CANVAS_WIDTH
        ) {
          planet.vx *= -1;
          planet.x =
            planet.x < CANVAS_WIDTH / 2
              ? planet.radius
              : CANVAS_WIDTH - planet.radius;
        }

        // Bounce off top
        if (planet.y - planet.radius < 0) {
          planet.y = planet.radius;
          const bounceCoefficient =
            planet.size === 'small'
              ? -0.95
              : planet.size === 'medium'
                ? -0.95
                : -0.95;
          planet.vy *= bounceCoefficient;
        }

        // Bounce off floor
        if (planet.y + planet.radius > CANVAS_HEIGHT - 50) {
          planet.y = CANVAS_HEIGHT - 50 - planet.radius;
          // Smaller planets are bouncier
          const bounceCoefficient =
            planet.size === 'small'
              ? -0.95
              : planet.size === 'medium'
                ? -0.95
                : -0.95;
          planet.vy *= bounceCoefficient;
        }

        // Check collision with player
        const playerTop = CANVAS_HEIGHT - 50 - PLAYER_HEIGHT;
        const playerBottom = CANVAS_HEIGHT - 50;

        // Check if planet overlaps with player hitbox
        const overlapX =
          planet.x + planet.radius > player.x &&
          planet.x - planet.radius < player.x + PLAYER_WIDTH;
        const overlapY =
          planet.y + planet.radius > playerTop &&
          planet.y - planet.radius < playerBottom;

        if (overlapX && overlapY && player.invincibilityTimer === 0) {
          healthRef.current -= 1;
          setHealth(healthRef.current);
          player.invincibilityTimer = 120; // 2 seconds of invincibility at 60fps

          // Trigger flash effect
          setIsFlashing(true);
          setTimeout(() => setIsFlashing(false), 200);

          if (healthRef.current <= 0) {
            setGameOver(true);
            setGameStarted(false);
            return;
          }
        }
      }

      // Check victory or level completion
      if (planets.length === 0) {
        if (currentLevel === 0) {
          // Level 1 complete, load level 2
          setShowLevelTransition(true);
          setGameStarted(false);
          setTimeout(() => {
            planetsRef.current = JSON.parse(JSON.stringify(LEVELS[1]));
            setCurrentLevel(1);
            // Restore health for level 2
            healthRef.current = 3;
            setHealth(3);
            // Reset player position to the left
            player.x = 150;
            setShowLevelTransition(false);
            setGameStarted(true);
          }, 2000);
        } else {
          // Level 2 complete - Victory!
          setIsVictory(true);
          setGameOver(true);
          setGameStarted(false);
        }
      }
    };

    const intervalId = setInterval(gameLoop, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [gameStarted, gameOver, currentLevel, spawnPlanets]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Different background for each level
      if (currentLevel === 0) {
        // Level 1 - Blue/purple space with moon
        const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        gradient.addColorStop(0, '#0a0e27');
        gradient.addColorStop(0.5, '#1a1f3a');
        gradient.addColorStop(1, '#2a1f4a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw large moon in background
        const moonX = 650;
        const moonY = 120;
        const moonRadius = 80;

        // Moon shadow/crater
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.fill();

        // Moon body
        const moonGradient = ctx.createRadialGradient(
          moonX - 20,
          moonY - 20,
          10,
          moonX,
          moonY,
          moonRadius
        );
        moonGradient.addColorStop(0, '#f0f0f0');
        moonGradient.addColorStop(0.7, '#d0d0d0');
        moonGradient.addColorStop(1, '#a0a0a0');
        ctx.fillStyle = moonGradient;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.fill();

        // Moon craters
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        ctx.arc(moonX - 25, moonY - 15, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(moonX + 20, moonY + 10, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(moonX - 10, moonY + 25, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(moonX + 15, moonY - 30, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw distant planets in background
        const bgPlanet1X = 150;
        const bgPlanet1Y = 100;
        const bgPlanet1Gradient = ctx.createRadialGradient(
          bgPlanet1X - 10,
          bgPlanet1Y - 10,
          5,
          bgPlanet1X,
          bgPlanet1Y,
          35
        );
        bgPlanet1Gradient.addColorStop(0, '#FFB84D');
        bgPlanet1Gradient.addColorStop(1, '#CC7A2E');
        ctx.fillStyle = bgPlanet1Gradient;
        ctx.beginPath();
        ctx.arc(bgPlanet1X, bgPlanet1Y, 35, 0, Math.PI * 2);
        ctx.fill();

        // Ring for background planet
        ctx.strokeStyle = 'rgba(255, 184, 77, 0.4)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.ellipse(bgPlanet1X, bgPlanet1Y + 5, 50, 15, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Level 2 - Red/orange nebula space with multiple planets
        const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        gradient.addColorStop(0, '#1a0a0f');
        gradient.addColorStop(0.3, '#3a1f2a');
        gradient.addColorStop(0.6, '#2a1a3f');
        gradient.addColorStop(1, '#1f1a3a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Nebula clouds
        ctx.fillStyle = 'rgba(255, 80, 120, 0.1)';
        ctx.beginPath();
        ctx.ellipse(200, 150, 120, 80, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(138, 43, 226, 0.08)';
        ctx.beginPath();
        ctx.ellipse(600, 200, 140, 90, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // Large red planet in background
        const redPlanetX = 100;
        const redPlanetY = 450;
        const redPlanetRadius = 60;

        const redPlanetGradient = ctx.createRadialGradient(
          redPlanetX - 15,
          redPlanetY - 15,
          10,
          redPlanetX,
          redPlanetY,
          redPlanetRadius
        );
        redPlanetGradient.addColorStop(0, '#FF6B6B');
        redPlanetGradient.addColorStop(0.7, '#C92A2A');
        redPlanetGradient.addColorStop(1, '#8B1A1A');
        ctx.fillStyle = redPlanetGradient;
        ctx.beginPath();
        ctx.arc(redPlanetX, redPlanetY, redPlanetRadius, 0, Math.PI * 2);
        ctx.fill();

        // Planet features
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.beginPath();
        ctx.arc(redPlanetX + 15, redPlanetY - 20, 12, 0, Math.PI * 2);
        ctx.fill();

        // Distant galaxy/nebula
        const galaxyX = 700;
        const galaxyY = 100;
        const galaxyGradient = ctx.createRadialGradient(
          galaxyX,
          galaxyY,
          10,
          galaxyX,
          galaxyY,
          50
        );
        galaxyGradient.addColorStop(0, 'rgba(147, 51, 234, 0.4)');
        galaxyGradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.2)');
        galaxyGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
        ctx.fillStyle = galaxyGradient;
        ctx.beginPath();
        ctx.arc(galaxyX, galaxyY, 50, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw stars in background with twinkle effect
      const time = Date.now() / 1000;
      ctx.fillStyle =
        currentLevel === 0
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(255, 200, 220, 0.8)';
      for (let i = 0; i < 100; i++) {
        const x = (i * 157) % CANVAS_WIDTH;
        const y = (i * 211) % (CANVAS_HEIGHT - 50);
        const size = ((i % 3) + 1) * (0.5 + Math.sin(time + i) * 0.5);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shooting stars occasionally
      if (Math.floor(time * 2) % 5 === 0) {
        const shootingStar = (time * 300) % CANVAS_WIDTH;
        ctx.strokeStyle =
          currentLevel === 0
            ? 'rgba(255, 255, 255, 0.6)'
            : 'rgba(255, 150, 200, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar, 50);
        ctx.lineTo(shootingStar + 30, 60);
        ctx.stroke();
      }

      // Draw planets
      const planets = planetsRef.current;
      for (const planet of planets) {
        // Planet shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(planet.x + 5, planet.y + 5, planet.radius, 0, Math.PI * 2);
        ctx.fill();

        // Planet gradient
        const planetGradient = ctx.createRadialGradient(
          planet.x - planet.radius / 3,
          planet.y - planet.radius / 3,
          planet.radius / 4,
          planet.x,
          planet.y,
          planet.radius
        );
        planetGradient.addColorStop(0, planet.color);
        planetGradient.addColorStop(0.6, planet.color);
        planetGradient.addColorStop(1, `${planet.color}66`);
        ctx.fillStyle = planetGradient;

        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fill();

        // Planet shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(
          planet.x - planet.radius / 4,
          planet.y - planet.radius / 4,
          planet.radius / 4,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Planet ring for large planets
        if (planet.size === 'large') {
          ctx.strokeStyle = `${planet.color}66`;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.ellipse(
            planet.x,
            planet.y + 10,
            planet.radius * 1.3,
            planet.radius * 0.3,
            0,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
      }

      // Draw shots with star trails
      const shots = shotsRef.current;
      const player = playerRef.current;
      for (const shot of shots) {
        if (!shot.active) continue;

        // Draw trail - no effects for max performance
        for (const star of shot.trail) {
          if (star.alpha > 0) {
            if (player.isPoweredUp) {
              ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
              ctx.beginPath();
              ctx.arc(star.x, star.y, 4, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillStyle = `rgba(255, 255, 100, ${star.alpha})`;
              ctx.beginPath();
              ctx.moveTo(star.x, star.y - 4);
              ctx.lineTo(star.x - 2, star.y + 2);
              ctx.lineTo(star.x + 2, star.y + 2);
              ctx.closePath();
              ctx.fill();
            }
          }
        }

        // Draw shot
        if (player.isPoweredUp) {
          // Powered up shot - larger bright star, no shadow for performance
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.moveTo(shot.x, shot.y - 10);
          ctx.lineTo(shot.x - 2, shot.y - 2);
          ctx.lineTo(shot.x - 10, shot.y);
          ctx.lineTo(shot.x - 2, shot.y + 2);
          ctx.lineTo(shot.x, shot.y + 10);
          ctx.lineTo(shot.x + 2, shot.y + 2);
          ctx.lineTo(shot.x + 10, shot.y);
          ctx.lineTo(shot.x + 2, shot.y - 2);
          ctx.closePath();
          ctx.fill();
        } else {
          // Normal shot
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.moveTo(shot.x, shot.y - 8);
          ctx.lineTo(shot.x - 4, shot.y + 4);
          ctx.lineTo(shot.x + 4, shot.y + 4);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Draw ground
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH, 50);

      ctx.fillStyle = '#34495e';
      for (let i = 0; i < CANVAS_WIDTH; i += 40) {
        ctx.fillRect(i, CANVAS_HEIGHT - 50, 35, 3);
      }

      // Draw player
      const playerY = CANVAS_HEIGHT - 50;
      const centerX = player.x + PLAYER_WIDTH / 2;

      if (player.isPoweredUp) {
        // Draw power-up aura with sparkles
        const auraGradient = ctx.createRadialGradient(
          centerX,
          playerY - 25,
          0,
          centerX,
          playerY - 25,
          35
        );
        auraGradient.addColorStop(0, 'rgba(255, 215, 0, 0.5)');
        auraGradient.addColorStop(0.5, 'rgba(255, 184, 0, 0.3)');
        auraGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(centerX, playerY - 25, 35, 0, Math.PI * 2);
        ctx.fill();
      }

      if (player.isPoweredUp) {
        // Powered-up cute magical girl - chibi style
        // Tiny dress with gradient
        const dressGradient = ctx.createLinearGradient(
          centerX,
          playerY - 18,
          centerX,
          playerY
        );
        dressGradient.addColorStop(0, '#FFB6C1');
        dressGradient.addColorStop(1, '#FF69B4');
        ctx.fillStyle = dressGradient;
        ctx.beginPath();
        ctx.moveTo(centerX, playerY - 18);
        ctx.lineTo(player.x + 5, playerY);
        ctx.lineTo(player.x + 35, playerY);
        ctx.closePath();
        ctx.fill();

        // Dress bow/ribbon
        ctx.fillStyle = '#FF1493';
        ctx.beginPath();
        ctx.arc(centerX - 8, playerY - 18, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 8, playerY - 18, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(centerX - 3, playerY - 20, 6, 4);

        // Tiny body
        ctx.fillStyle = '#FFB6C1';
        ctx.fillRect(player.x + 14, playerY - 25, 12, 7);

        // Tiny arms - cute rounded
        ctx.fillStyle = '#FFDAB9';
        ctx.beginPath();
        ctx.arc(player.x + 12, playerY - 22, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(player.x + 10, playerY - 23, 4, 8);
        ctx.beginPath();
        ctx.arc(player.x + 28, playerY - 22, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(player.x + 26, playerY - 23, 4, 8);

        // Tiny hands - round
        ctx.beginPath();
        ctx.arc(player.x + 12, playerY - 15, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 28, playerY - 15, 3, 0, Math.PI * 2);
        ctx.fill();

        // Cute big head - chibi proportions
        const headGradient = ctx.createRadialGradient(
          centerX - 4,
          playerY - 38,
          3,
          centerX,
          playerY - 35,
          14
        );
        headGradient.addColorStop(0, '#FFE4C4');
        headGradient.addColorStop(1, '#FFDAB9');
        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.arc(centerX, playerY - 35, 14, 0, Math.PI * 2);
        ctx.fill();

        // Cute pigtails
        ctx.fillStyle = '#8B4513';
        // Left pigtail
        ctx.beginPath();
        ctx.arc(player.x + 8, playerY - 40, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(player.x + 6, playerY - 42, 4, 10);
        // Right pigtail
        ctx.beginPath();
        ctx.arc(player.x + 32, playerY - 40, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(player.x + 30, playerY - 42, 4, 10);

        // Hair on head
        ctx.beginPath();
        ctx.arc(centerX, playerY - 38, 15, Math.PI, 0);
        ctx.fill();

        // Hair shine
        ctx.fillStyle = '#A0522D';
        ctx.beginPath();
        ctx.arc(centerX - 5, playerY - 40, 4, 0, Math.PI);
        ctx.fill();

        // Big cute anime eyes
        // Eye whites - bigger
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.ellipse(player.x + 14, playerY - 36, 5, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(player.x + 26, playerY - 36, 5, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pupils - sparkly blue
        ctx.fillStyle = '#4169E1';
        ctx.beginPath();
        ctx.arc(player.x + 14, playerY - 35, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 26, playerY - 35, 3, 0, Math.PI * 2);
        ctx.fill();

        // Multiple eye shines for sparkle effect
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(player.x + 15, playerY - 36, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 27, playerY - 36, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 13, playerY - 34, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 25, playerY - 34, 1, 0, Math.PI * 2);
        ctx.fill();

        // Tiny cute nose
        ctx.fillStyle = 'rgba(255, 182, 193, 0.3)';
        ctx.beginPath();
        ctx.arc(centerX, playerY - 32, 1, 0, Math.PI * 2);
        ctx.fill();

        // Big happy smile
        ctx.strokeStyle = '#FF1493';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, playerY - 30, 6, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // Rosy cheeks - bigger
        ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
        ctx.beginPath();
        ctx.arc(player.x + 8, playerY - 32, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 32, playerY - 32, 4, 0, Math.PI * 2);
        ctx.fill();

        // Sparkles around powered-up character
        const sparkles = [
          { x: -20, y: -35 },
          { x: 20, y: -30 },
          { x: -15, y: -15 },
          { x: 25, y: -20 },
          { x: 0, y: -48 },
        ];
        const sparkleTime = Date.now() / 100;
        for (let i = 0; i < sparkles.length; i++) {
          const sparkle = sparkles[i];
          const sx = centerX + sparkle.x;
          const sy = playerY + sparkle.y;
          const alpha = (Math.sin(sparkleTime + i) + 1) / 2;
          ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(sx, sy - 4);
          ctx.lineTo(sx - 2, sy + 2);
          ctx.lineTo(sx + 2, sy + 2);
          ctx.closePath();
          ctx.fill();

          // Cross sparkle
          ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(sx - 3, sy);
          ctx.lineTo(sx + 3, sy);
          ctx.moveTo(sx, sy - 3);
          ctx.lineTo(sx, sy + 3);
          ctx.stroke();
        }
      } else {
        // Cute little boy - chibi astronaut style
        // Tiny rounded shoes
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(player.x + 12, playerY - 3, 5, 0, Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 28, playerY - 3, 5, 0, Math.PI);
        ctx.fill();
        ctx.fillRect(player.x + 7, playerY - 3, 10, 3);
        ctx.fillRect(player.x + 23, playerY - 3, 10, 3);

        // Shoe shine
        ctx.fillStyle = '#34495E';
        ctx.fillRect(player.x + 9, playerY - 4, 3, 2);
        ctx.fillRect(player.x + 25, playerY - 4, 3, 2);

        // Tiny legs - rounded
        const legGradient = ctx.createLinearGradient(
          centerX,
          playerY - 16,
          centerX,
          playerY
        );
        legGradient.addColorStop(0, '#5DADE2');
        legGradient.addColorStop(1, '#3498DB');
        ctx.fillStyle = legGradient;
        ctx.fillRect(player.x + 9, playerY - 16, 8, 13);
        ctx.fillRect(player.x + 23, playerY - 16, 8, 13);

        // Round leg tops
        ctx.beginPath();
        ctx.arc(player.x + 13, playerY - 16, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 27, playerY - 16, 4, 0, Math.PI * 2);
        ctx.fill();

        // Tiny body - rounder
        const bodyGradient = ctx.createLinearGradient(
          centerX,
          playerY - 28,
          centerX,
          playerY - 16
        );
        bodyGradient.addColorStop(0, '#E74C3C');
        bodyGradient.addColorStop(1, '#C0392B');
        ctx.fillStyle = bodyGradient;
        ctx.fillRect(player.x + 12, playerY - 28, 16, 12);

        // Round body
        ctx.beginPath();
        ctx.arc(centerX, playerY - 22, 8, 0, Math.PI * 2);
        ctx.fill();

        // Belt
        ctx.fillStyle = '#F39C12';
        ctx.fillRect(player.x + 10, playerY - 17, 20, 2);

        // Tiny arms - rounded
        ctx.fillStyle = '#E74C3C';
        ctx.beginPath();
        ctx.arc(player.x + 10, playerY - 24, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(player.x + 8, playerY - 25, 4, 10);
        ctx.beginPath();
        ctx.arc(player.x + 30, playerY - 24, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(player.x + 28, playerY - 25, 4, 10);

        // Cute round hands
        ctx.fillStyle = '#FFDAB9';
        ctx.beginPath();
        ctx.arc(player.x + 10, playerY - 15, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 30, playerY - 15, 3, 0, Math.PI * 2);
        ctx.fill();

        // Big cute head - chibi proportions
        const headGradient = ctx.createRadialGradient(
          centerX - 4,
          playerY - 38,
          3,
          centerX,
          playerY - 35,
          13
        );
        headGradient.addColorStop(0, '#FFE4C4');
        headGradient.addColorStop(1, '#FFDAB9');
        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.arc(centerX, playerY - 35, 13, 0, Math.PI * 2);
        ctx.fill();

        // Cute messy hair
        ctx.fillStyle = '#654321';
        ctx.beginPath();
        ctx.arc(centerX, playerY - 38, 14, Math.PI, 0);
        ctx.fill();

        // Hair spikes - cute style
        ctx.beginPath();
        ctx.arc(centerX - 8, playerY - 42, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, playerY - 45, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 8, playerY - 42, 5, 0, Math.PI * 2);
        ctx.fill();

        // Hair shine
        ctx.fillStyle = '#8B6914';
        ctx.beginPath();
        ctx.arc(centerX - 3, playerY - 40, 3, 0, Math.PI);
        ctx.fill();

        // Big cute anime eyes
        // Eye whites - big and round
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.ellipse(player.x + 15, playerY - 36, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(player.x + 25, playerY - 36, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pupils - sparkly
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(player.x + 15, playerY - 35, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 25, playerY - 35, 3, 0, Math.PI * 2);
        ctx.fill();

        // Multiple eye shines for sparkle
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(player.x + 16, playerY - 36, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 26, playerY - 36, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 14, playerY - 34, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 24, playerY - 34, 1, 0, Math.PI * 2);
        ctx.fill();

        // Cute eyebrows
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(player.x + 15, playerY - 40, 3, 0.2, Math.PI - 0.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(player.x + 25, playerY - 40, 3, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // Big happy smile
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, playerY - 30, 5, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // Rosy cheeks
        ctx.fillStyle = 'rgba(255, 182, 193, 0.5)';
        ctx.beginPath();
        ctx.arc(player.x + 9, playerY - 32, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x + 31, playerY - 32, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animationId = requestAnimationFrame(function animate() {
      render();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationId);
  }, [currentLevel]);

  return (
    <div className={styles.container}>
      <div className={styles.gameWrapper}>
        <h1 className={styles.title}>⭐ Doroteyo</h1>

        <div className={styles.scoreBoard}>
          <div className={styles.score}>Level: {currentLevel + 1}/2</div>
          <div className={styles.score}>Score: {score}</div>
          <div className={styles.score}>
            Planets: {planetsRef.current.length}
          </div>
          <div
            className={`${styles.health} ${playerRef.current.isPoweredUp ? styles.healthPoweredUp : ''}`}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={`heart-${i}`} className={styles.heart}>
                {i < health ? '❤️' : '🖤'}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.gameLayout}>
          <div className={styles.gameColumn}>
            <div
              className={`${styles.canvasWrapper} ${isFlashing ? styles.flash : ''}`}
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className={styles.canvas}
                onTouchStart={isMobile && gameStarted ? shoot : undefined}
                onPointerDown={isMobile && gameStarted ? shoot : undefined}
              />

              {!gameStarted && !gameOver && !showLevelTransition && (
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
                      ? 'Use buttons to move and shoot stars at planets!'
                      : 'Arrow keys to move, SPACE to shoot stars at planets!'}
                  </p>
                </div>
              )}

              {showLevelTransition && (
                <div className={styles.overlay}>
                  <div className={styles.levelTransition}>
                    <div className={styles.levelNumber}>Level 2</div>
                    <div className={styles.levelSubtext}>Get Ready!</div>
                  </div>
                </div>
              )}

              {gameOver && (
                <div className={styles.overlay}>
                  <div className={styles.gameOverText}>
                    {isVictory ? '🎉 Victory!' : 'Game Over!'}
                  </div>
                  <div className={styles.finalScore}>
                    {isVictory
                      ? 'All planets destroyed!'
                      : `Final Score: ${score}`}
                  </div>
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

            {isMobile && (
              <p className={styles.tapHint}>
                💡 Tip: Tap the play area to shoot!
              </p>
            )}
          </div>

          <div className={styles.sidePanel}>
            <div className={styles.controls}>
              <div className={styles.controlsTitle}>
                {isMobile ? 'Touch Controls' : 'Keyboard Controls'}
              </div>
              <div className={styles.controlInfo}>
                <button
                  type='button'
                  className={styles.controlItem}
                  onTouchStart={() => keysRef.current.add('ArrowLeft')}
                  onTouchEnd={() => keysRef.current.delete('ArrowLeft')}
                  onMouseDown={() => keysRef.current.add('ArrowLeft')}
                  onMouseUp={() => keysRef.current.delete('ArrowLeft')}
                  onMouseLeave={() => keysRef.current.delete('ArrowLeft')}
                  aria-label='Move Left'
                >
                  <span className={styles.key}>←</span>
                </button>
                <button
                  type='button'
                  className={styles.controlItem}
                  onTouchStart={() => keysRef.current.add('ArrowRight')}
                  onTouchEnd={() => keysRef.current.delete('ArrowRight')}
                  onMouseDown={() => keysRef.current.add('ArrowRight')}
                  onMouseUp={() => keysRef.current.delete('ArrowRight')}
                  onMouseLeave={() => keysRef.current.delete('ArrowRight')}
                  aria-label='Move Right'
                >
                  <span className={styles.key}>→</span>
                </button>
                <button
                  type='button'
                  className={styles.controlItem}
                  onTouchStart={shoot}
                  onClick={shoot}
                  aria-label='Shoot'
                >
                  <span className={styles.key}>⭐ SHOOT</span>
                </button>
              </div>
            </div>

            <div className={styles.gameInstructions}>
              <h3 className={styles.instructionsTitle}>How to Play</h3>
              <ul className={styles.instructionsList}>
                <li>
                  🎯 <strong>Objective:</strong> Destroy all planets to complete
                  each level
                </li>
                <li>
                  ⭐ <strong>Shooting:</strong> Fire stars at planets to make
                  them split apart
                </li>
                <li>
                  🪐 <strong>Planet Splitting:</strong> Large planets split into
                  2 medium, medium into 2 small, then destroyed
                </li>
                <li>
                  ⚡ <strong>Power-Up:</strong> When you destroy a small planet,
                  transform into a powered-up girl for 5 seconds with faster,
                  stronger shots
                </li>
                <li>
                  ❤️ <strong>Health:</strong> You have 3 lives. Avoid getting hit
                  by bouncing planets!
                </li>
                <li>
                  🎮 <strong>Levels:</strong> Complete Level 1 to unlock Level
                  2. Your health is restored between levels!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
