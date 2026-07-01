import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

import styles from './BrushStrokeAnimation.module.css';

const ICON_SRCS = [
  '/assets/react-icon.webp',
  '/assets/typescript-icon.webp',
  '/assets/nextjs-icon.webp',
  '/assets/js-icon.webp',
  '/assets/node-icon.webp',
  '/assets/css-icon.webp',
  '/assets/html-icon.webp',
  '/assets/redux.webp',
  '/assets/bootstrap-icon.webp',
  '/assets/vscode-icon.webp',
  '/assets/mysql-icon.webp',
];

interface TrailIcon {
  id: number;
  src: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

const STROKE_DURATION = 1300; // ms for full width traversal
const ICON_INTERVAL_MS = 130; // spawn a new icon every N ms

export const BrushStrokeAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [trailIcons, setTrailIcons] = useState<TrailIcon[]>([]);
  const [done, setDone] = useState(false);
  const idRef = useRef(0);
  const iconPickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use full viewport dimensions so the stroke truly spans edge-to-edge
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Light-blue brush colour, adjusted per colour scheme
    const isDark = document.documentElement.classList.contains('dark');
    const brushColor = isDark ? '#93c5fd' : '#60a5fa';

    // ---- Path: bottom-left → low sweep → arc up → scroll arrow ----
    const cubicBez = (
      t: number,
      p0: [number, number],
      p1: [number, number],
      p2: [number, number],
      p3: [number, number]
    ): [number, number] => {
      const mt = 1 - t;
      return [
        mt ** 3 * p0[0] +
          3 * mt ** 2 * t * p1[0] +
          3 * mt * t ** 2 * p2[0] +
          t ** 3 * p3[0],
        mt ** 3 * p0[1] +
          3 * mt ** 2 * t * p1[1] +
          3 * mt * t ** 2 * p2[1] +
          t ** 3 * p3[1],
      ];
    };

    // Scroll-arrow centre: bottom: 3.2rem, right: 4rem, arrow height ≈ 7rem
    const arrowX = W - 64; // right: 4rem
    const arrowY = H - 107; // bottom: 3.2rem + half arrow height (≈ 3.5rem)

    // Mid-junction: where the low sweep hands off to the rising arc
    // Placed in the right portion of the screen, away from the hero text
    const jX = W * 0.62;
    const jY = H * 0.88;

    const pts: [number, number][] = [];

    // Phase 1 — flat low sweep across the left (240 pts)
    // Stays below y = 88 % so it clears all hero text
    const N1 = 240;
    for (let i = 0; i <= N1; i++) {
      const t = i / N1;
      pts.push(
        cubicBez(
          t,
          [0, H * 0.94], // start: bottom-left corner
          [W * 0.2, H * 0.92], // CP1: keeps it near the bottom
          [W * 0.48, H * 0.9], // CP2: very gently rising
          [jX, jY] // end: junction
        )
      );
    }

    // Phase 2 — sweeping arc up through the floating-icons area, back to arrow (160 pts)
    const N2 = 160;
    for (let i = 1; i <= N2; i++) {
      const t = i / N2;
      pts.push(
        cubicBez(
          t,
          [jX, jY], // start: junction (C1 join — same point)
          [W * 0.68, H * 0.88], // CP1: continue direction from Phase 1
          [W * 0.82, H * 0.12], // CP2: arc up high (floating-icons zone)
          [arrowX, arrowY] // end: scroll-arrow centre
        )
      );
    }

    const N = pts.length - 1;

    // Bristle layers: thinner, paint-brush spread
    const bristles = [
      { off: -5, w: 1.5, a: 0.07 },
      { off: -3, w: 3.5, a: 0.15 },
      { off: -1, w: 6.0, a: 0.32 },
      { off: 0, w: 8.5, a: 0.52 },
      { off: 1, w: 6.0, a: 0.32 },
      { off: 3, w: 3.5, a: 0.15 },
      { off: 5, w: 1.5, a: 0.07 },
    ];

    const startTime = performance.now();
    let lastIconAt = -ICON_INTERVAL_MS; // spawn one immediately
    let lastIdx = 0;
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / STROKE_DURATION, 1);
      const idx = Math.floor(progress * N);

      // Incrementally add new path segments (never clear – the stroke accumulates)
      if (idx > lastIdx) {
        for (const { off, w, a } of bristles) {
          ctx.save();
          ctx.globalAlpha = a;
          ctx.strokeStyle = brushColor;
          ctx.lineWidth = w;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(pts[lastIdx][0], pts[lastIdx][1] + off);
          for (let j = lastIdx + 1; j <= idx; j++) {
            ctx.lineTo(pts[j][0], pts[j][1] + off);
          }
          ctx.stroke();
          ctx.restore();
        }
        lastIdx = idx;
      }

      // Spawn a trail icon at the brush tip
      if (elapsed - lastIconAt >= ICON_INTERVAL_MS && idx < N) {
        const [tipX, tipY] = pts[idx];
        const src = ICON_SRCS[iconPickRef.current % ICON_SRCS.length];
        const size = 26 + Math.random() * 22;
        const rotation = (Math.random() - 0.5) * 52;
        const id = idRef.current++;
        iconPickRef.current++;

        setTrailIcons((prev) => [
          ...prev,
          { id, src, x: tipX, y: tipY, size, rotation },
        ]);
        lastIconAt = elapsed;
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Fade the stroke out then remove the whole overlay from the DOM
        setTimeout(() => {
          canvas.style.transition = 'opacity 1.4s ease';
          canvas.style.opacity = '0';
          setTimeout(() => setDone(true), 1500);
        }, 500);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (done) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden='true'>
      <canvas ref={canvasRef} className={styles.canvas} />
      {trailIcons.map(({ id, src, x, y, size, rotation }) => (
        <img
          key={id}
          src={src}
          alt=''
          className={styles.trailIcon}
          style={
            {
              left: x,
              top: y,
              width: size,
              height: size,
              '--rot': `${rotation}deg`,
            } as CSSProperties
          }
          onAnimationEnd={() =>
            setTrailIcons((prev) => prev.filter((ic) => ic.id !== id))
          }
        />
      ))}
    </div>
  );
};
