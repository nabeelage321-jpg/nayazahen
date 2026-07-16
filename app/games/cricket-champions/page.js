'use client';

import { useMemo, useState } from 'react';

const totalBalls = 12;

export default function CricketChampionsGame() {
  const [ball, setBall] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('اگلا گیند');
  const [finished, setFinished] = useState(false);

  const progress = useMemo(() => ((ball + 1) / totalBalls) * 100, [ball]);

  function handleBat() {
    const hit = Math.random() > 0.4;
    if (hit) {
      const runs = Math.floor(Math.random() * 6) + 1;
      setScore((prev) => prev + runs);
      setStatus(`چلایا ${runs} رنز`);
    } else {
      setStatus('اووٹ!');
    }

    if (ball === totalBalls - 1) {
      setFinished(true);
    } else {
      setBall((prev) => prev + 1);
    }
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-[#FFF8E8] p-6 text-[#0D0D1A]">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="font-urdu text-3xl font-black text-[#42188C]">کرکٹ مکمل!</h1>
          <p className="mt-3 font-urdu text-lg">آپ نے {score} رنز بنائے۔</p>
          <p className="mt-2 text-sm text-[#5A587A]">آپ کو {score} Rubax Coins مل گئے۔</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#FEF6D8,_#FAFAF5)] p-6 text-[#0D0D1A]">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-urdu text-2xl font-black text-[#42188C]">کرکٹ چیمپئنز</h1>
          <span className="rounded-full bg-[#FEF6D8] px-3 py-1 text-sm text-[#B8860A]">اسکور: {score}</span>
        </div>
        <div className="mb-4 h-2 rounded-full bg-[#E5E3D5]">
          <div className="h-2 rounded-full bg-[#B8860A]" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="mb-4 rounded-2xl bg-[#FEF6D8] p-6 text-center text-xl font-semibold">{status}</div>
        <div className="flex justify-center">
          <button onClick={handleBat} className="rounded-full bg-[#42188C] px-8 py-4 text-xl font-black text-white">بات کریں</button>
        </div>
      </div>
    </div>
  );
}
