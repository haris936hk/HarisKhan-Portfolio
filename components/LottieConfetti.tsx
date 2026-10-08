"use client";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
}

const CONFETTI_COLORS = [
  "#CBACF9",
  "#E2CBFF",
  "#393BB2",
  "#00F0FF",
  "#FF61D8",
  "#60A5FA",
  "#34D399",
  "#FBBF24",
];

export default function LottieConfetti({
  autoplay = true,
}: {
  autoplay?: boolean;
  loop?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particleCount = 50;
    const particles: Particle[] = [];
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.75;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI / 180) * (270 + (Math.random() - 0.5) * 90);
      const speed = 4 + Math.random() * 7;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 4,
        color:
          CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
      });
    }

    const startTime = performance.now();
    const duration = 2500; // 2.5s duration

    const render = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.rotationSpeed;
        p.alpha = Math.max(0, 1 - elapsed / duration);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [autoplay]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200}
      className="pointer-events-none"
      style={{ width: 400, height: 200 }}
    />
  );
}
