"use client";

import { useRef, useEffect } from "react";

interface Segment {
  x: number;
  y: number;
}

interface Bolt {
  segments: Segment[];
  life: number;
  maxLife: number;
  alpha: number;
  width: number;
  branches: Segment[][];
}

function createBranches(segments: Segment[]): Segment[][] {
  const branches: Segment[][] = [];
  const count = 1 + Math.floor(Math.random() * 2);
  for (let b = 0; b < count; b++) {
    const idx = 1 + Math.floor(Math.random() * (segments.length - 2));
    const origin = segments[idx];
    const segs: Segment[] = [{ x: origin.x, y: origin.y }];
    let bx = origin.x;
    let by = origin.y;
    const bSteps = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < bSteps; i++) {
      bx += (Math.random() - 0.5) * 40 + (Math.random() > 0.5 ? 15 : -15);
      by += 10 + Math.random() * 25;
      segs.push({ x: bx, y: by });
    }
    branches.push(segs);
  }
  return branches;
}

function createBolt(cw: number, ch: number): Bolt {
  const startX = Math.random() * cw;
  const startY = Math.random() * ch * 0.3;
  const segments: Segment[] = [];
  let x = startX;
  let y = startY;
  const length = 80 + Math.random() * 200;
  const steps = 6 + Math.floor(Math.random() * 8);

  for (let i = 0; i <= steps; i++) {
    segments.push({ x, y });
    x += (Math.random() - 0.5) * 60;
    y += length / steps;
  }

  return {
    segments,
    life: 0,
    maxLife: 15 + Math.random() * 20,
    alpha: 0.06 + Math.random() * 0.1,
    width: 0.5 + Math.random() * 1,
    branches: Math.random() > 0.5 ? createBranches(segments) : [],
  };
}

function drawBoltSegs(
  ctx: CanvasRenderingContext2D,
  segments: Segment[],
  alpha: number,
  width: number
) {
  ctx.beginPath();
  ctx.moveTo(segments[0].x, segments[0].y);
  for (let i = 1; i < segments.length; i++) ctx.lineTo(segments[i].x, segments[i].y);
  ctx.strokeStyle = `rgba(249,115,22,${alpha * 0.4})`;
  ctx.lineWidth = width + 4;
  ctx.shadowColor = "rgba(249,115,22,0.6)";
  ctx.shadowBlur = 15;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(segments[0].x, segments[0].y);
  for (let i = 1; i < segments.length; i++) ctx.lineTo(segments[i].x, segments[i].y);
  ctx.strokeStyle = `rgba(255,200,120,${alpha * 0.8})`;
  ctx.lineWidth = width;
  ctx.shadowColor = "rgba(249,115,22,0.3)";
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

export function LightningCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bolts: Bolt[] = [];
    let animId: number;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function animate() {
      const cw = canvas!.width;
      const ch = canvas!.height;
      ctx!.clearRect(0, 0, cw, ch);

      if (Math.random() < 0.006) bolts.push(createBolt(cw, ch));

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life++;
        let fa = b.alpha;
        if (b.life < 3) fa = b.alpha * (b.life / 3);
        else if (b.life > b.maxLife - 5)
          fa = b.alpha * ((b.maxLife - b.life) / 5);
        if (b.life > 2 && b.life < b.maxLife - 3 && Math.random() < 0.3)
          fa *= 0.3 + Math.random() * 0.7;

        drawBoltSegs(ctx!, b.segments, fa, b.width);
        b.branches.forEach((br) => drawBoltSegs(ctx!, br, fa * 0.6, b.width * 0.6));

        if (b.life >= b.maxLife) bolts.splice(i, 1);
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
