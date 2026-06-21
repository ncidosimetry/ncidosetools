import { type PointerEvent, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const viewBox = {
  width: 640,
  height: 320,
};

const particles = [
  { sx: 56, sy: 110, mx: 230, my: 120, ex: 572, ey: 136, delay: 0, duration: 5.8, r: 2.2 },
  { sx: 34, sy: 146, mx: 248, my: 144, ex: 602, ey: 158, delay: 0.28, duration: 6.4, r: 1.5 },
  { sx: 78, sy: 185, mx: 286, my: 172, ex: 586, ey: 190, delay: 0.62, duration: 6.1, r: 1.9 },
  { sx: 106, sy: 82, mx: 276, my: 112, ex: 548, ey: 98, delay: 0.96, duration: 5.5, r: 1.4 },
  { sx: 24, sy: 214, mx: 242, my: 190, ex: 612, ey: 220, delay: 1.22, duration: 6.8, r: 2.4 },
  { sx: 118, sy: 132, mx: 340, my: 136, ex: 620, ey: 122, delay: 1.54, duration: 5.7, r: 1.7 },
  { sx: 64, sy: 244, mx: 316, my: 212, ex: 580, ey: 238, delay: 1.86, duration: 6.2, r: 1.5 },
  { sx: 42, sy: 58, mx: 254, my: 94, ex: 596, ey: 72, delay: 2.14, duration: 6.6, r: 2 },
  { sx: 156, sy: 168, mx: 356, my: 158, ex: 606, ey: 176, delay: 2.48, duration: 5.9, r: 1.6 },
  { sx: 92, sy: 278, mx: 332, my: 234, ex: 620, ey: 260, delay: 2.76, duration: 6.5, r: 1.8 },
  { sx: 28, sy: 126, mx: 210, my: 154, ex: 522, ey: 144, delay: 3.08, duration: 6, r: 1.4 },
  { sx: 128, sy: 102, mx: 370, my: 118, ex: 590, ey: 104, delay: 3.38, duration: 5.6, r: 2.1 },
  { sx: 84, sy: 200, mx: 304, my: 180, ex: 560, ey: 204, delay: 3.72, duration: 6.3, r: 1.6 },
  { sx: 18, sy: 166, mx: 264, my: 150, ex: 612, ey: 168, delay: 4.04, duration: 6.1, r: 2 },
  { sx: 112, sy: 230, mx: 336, my: 206, ex: 594, ey: 224, delay: 4.36, duration: 5.8, r: 1.5 },
  { sx: 54, sy: 88, mx: 300, my: 118, ex: 622, ey: 112, delay: 4.7, duration: 6.7, r: 1.7 },
  { sx: 146, sy: 118, mx: 184, my: 108, ex: 246, ey: 122, delay: 0.2, duration: 8.2, r: 1.1, slow: true },
  { sx: 250, sy: 176, mx: 306, my: 190, ex: 362, ey: 182, delay: 1.3, duration: 9.4, r: 1.2, slow: true },
  { sx: 364, sy: 132, mx: 412, my: 114, ex: 448, ey: 138, delay: 2.1, duration: 8.8, r: 1, slow: true },
  { sx: 452, sy: 212, mx: 494, my: 224, ex: 530, ey: 206, delay: 3.2, duration: 9.6, r: 1.3, slow: true },
  { sx: 512, sy: 92, mx: 546, my: 112, ex: 560, ey: 84, delay: 4.4, duration: 8.6, r: 1.1, slow: true },
];

type PointerPosition = {
  x: number;
  y: number;
};

const pointerRadius = 86;
const pointerStrength = 54;

const pointOnCurve = (particle: (typeof particles)[number], progress: number) => {
  const t = progress;
  const oneMinusT = 1 - t;

  return {
    x:
      oneMinusT * oneMinusT * particle.sx +
      2 * oneMinusT * t * particle.mx +
      t * t * particle.ex,
    y:
      oneMinusT * oneMinusT * particle.sy +
      2 * oneMinusT * t * particle.my +
      t * t * particle.ey,
  };
};

const repelFromPointer = (
  point: PointerPosition,
  pointer: PointerPosition | null,
) => {
  if (!pointer) return point;

  const dx = point.x - pointer.x;
  const dy = point.y - pointer.y;
  const distance = Math.hypot(dx, dy);

  if (distance >= pointerRadius) return point;

  const angle = distance > 0.1 ? Math.atan2(dy, dx) : Math.PI * 0.25;
  const force = (1 - distance / pointerRadius) ** 2 * pointerStrength;

  return {
    x: point.x + Math.cos(angle) * force,
    y: point.y + Math.sin(angle) * force,
  };
};

const particleColor = (alpha: number) => `hsla(199, 89%, 48%, ${alpha})`;

const seededRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
};

export const RadiationTransportVisual = () => {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<PointerPosition | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let latestTime = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(bounds.width * dpr));
      canvas.height = Math.max(1, Math.floor(bounds.height * dpr));
    };

    const draw = (time: number, scheduleNextFrame = true) => {
      latestTime = time;
      const bounds = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      if (bounds.width <= 0 || bounds.height <= 0) {
        if (scheduleNextFrame) {
          frameRef.current = window.requestAnimationFrame((nextTime) => draw(nextTime));
        }
        return;
      }

      const scaleX = bounds.width / viewBox.width;
      const scaleY = bounds.height / viewBox.height;
      const radiusScale = Math.min(scaleX, scaleY);
      const mobileScale = bounds.width < 480 ? 1.55 : 1;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (const [index, particle] of particles.entries()) {
        const sizeNoise = seededRandom(index + 1);
        const pulseNoise = seededRandom((index + 1) * 3.7);
        const sizeMultiplier = particle.slow
          ? 1.35 + sizeNoise * 0.7
          : 1.55 + sizeNoise * 1.15;
        const rawProgress = reduceMotion
          ? particle.delay % 1
          : ((time / 1000 + particle.delay) / particle.duration) % 1;
        const progress = particle.slow
          ? 0.5 + Math.sin(rawProgress * Math.PI * 2) * 0.5
          : rawProgress;
        const basePoint = pointOnCurve(particle, progress);
        const point = repelFromPointer(basePoint, pointerRef.current);
        const fade = particle.slow
          ? 0.3 + Math.sin(rawProgress * Math.PI * 2) * 0.1
          : Math.sin(progress * Math.PI) * 0.92;
        const randomPulse =
          1 + Math.sin(time / 880 + pulseNoise * Math.PI * 2) * (particle.slow ? 0.12 : 0.22);
        const radius =
          particle.r *
          sizeMultiplier *
          randomPulse *
          (particle.slow ? 0.92 : 0.78 + Math.sin(progress * Math.PI) * 0.42) *
          radiusScale *
          mobileScale;
        const minRadius = bounds.width < 480 ? (particle.slow ? 2.2 : 3.4) : 0;
        const screenPoint = {
          x: point.x * scaleX,
          y: point.y * scaleY,
        };

        context.beginPath();
        context.shadowBlur = particle.slow ? 10 + sizeNoise * 6 : 16 + sizeNoise * 10;
        context.shadowColor = particleColor(0.4);
        context.fillStyle = particleColor(Math.max(0, fade));
        context.arc(screenPoint.x, screenPoint.y, Math.max(radius, minRadius), 0, Math.PI * 2);
        context.fill();
      }

      if (!reduceMotion && scheduleNextFrame) {
        frameRef.current = window.requestAnimationFrame((nextTime) => draw(nextTime));
      }
    };

    const redrawAfterResize = () => {
      resize();
      draw(latestTime || performance.now(), false);
    };

    resize();
    const observer =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            redrawAfterResize();
          })
        : null;

    observer?.observe(canvas);
    window.addEventListener("resize", redrawAfterResize);
    window.addEventListener("orientationchange", redrawAfterResize);
    frameRef.current = window.requestAnimationFrame((time) => draw(time));

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", redrawAfterResize);
      window.removeEventListener("orientationchange", redrawAfterResize);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [reduceMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    pointerRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * viewBox.width,
      y: ((event.clientY - bounds.top) / bounds.height) * viewBox.height,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate mx-auto mt-1 h-[180px] w-full max-w-[860px] overflow-hidden sm:mt-2 sm:h-[210px] lg:h-[230px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerRef.current = null;
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </motion.div>
  );
};
