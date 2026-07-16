'use client';

import { useEffect, useRef, useState } from 'react';

export default function KiteFlyingGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let kiteX = canvas.width / 2;
    let kiteY = canvas.height / 2;
    let time = 0;
    let wind = 1;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FAFAF5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0A7050';
      ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

      const otherKites = [
        { x: 80 + Math.sin(time / 50) * 40, y: 80 + Math.cos(time / 50) * 30 },
        { x: canvas.width - 100, y: 140 },
        { x: 140, y: canvas.height - 120 },
      ];

      otherKites.forEach((kite) => {
        ctx.strokeStyle = '#B83008';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(kite.x, kite.y);
        ctx.lineTo(kite.x + 20, kite.y + 20);
        ctx.lineTo(kite.x - 20, kite.y + 20);
        ctx.closePath();
        ctx.stroke();
      });

      ctx.strokeStyle = '#42188C';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(kiteX, kiteY);
      ctx.lineTo(kiteX + 20, kiteY + 20);
      ctx.lineTo(kiteX - 20, kiteY + 20);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = '#B8860A';
      ctx.fillRect(kiteX - 5, kiteY + 15, 10, 20);

      const collisions = otherKites.some((kite) => Math.hypot(kiteX - kite.x, kiteY - kite.y) < 40);
      if (collisions) {
        setFinished(true);
      }

      time += 1;
      wind = 0.5 + Math.sin(time / 100) * 0.5;
      kiteX += wind;
      setScore((prev) => prev + 1);
      animationFrame = requestAnimationFrame(draw);
    }

    function handleMove(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
      const y = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
      kiteX = x;
      kiteY = y;
    }

    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('touchmove', handleMove, { passive: true });
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('touchmove', handleMove);
    };
  }, []);

  if (finished) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] p-6 text-[#0D0D1A]">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="font-urdu text-3xl font-black text-[#0A7050]">پتنگ مکمل!</h1>
          <p className="mt-3 font-urdu text-lg">آپ نے {score} پوائنٹس حاصل کیے۔</p>
          <p className="mt-2 text-sm text-[#5A587A]">آپ کو 10 Rubax Coins مل گئے۔</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF5] p-4 text-[#0D0D1A] sm:p-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-4 shadow-lg sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="font-urdu text-2xl font-black text-[#0A7050]">پتنگ اڑانا</h1>
          <span className="rounded-full bg-[#E0F5EE] px-3 py-1 text-sm text-[#0A7050]">اسکور: {score}</span>
        </div>
        <canvas ref={canvasRef} width={320} height={420} className="w-full rounded-2xl border border-[#E5E3D5]" />
      </div>
    </div>
  );
}
