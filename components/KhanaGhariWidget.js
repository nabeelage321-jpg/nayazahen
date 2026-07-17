'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const MEAL_WINDOWS = [
  { id: 'breakfast', label: 'Breakfast', start: 7 * 60, end: 9 * 60 },
  { id: 'lunch', label: 'Lunch', start: 12 * 60, end: 14 * 60 },
  { id: 'dinner', label: 'Dinner', start: 19 * 60, end: 21 * 60 },
];

function getMinutes(date) {
  return date.getHours() * 60 + date.getMinutes();
}

export default function KhanaGhariWidget() {
  const [now, setNow] = useState(new Date());
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setStreak(Number(localStorage.getItem('khana-ghari-streak') || 0));
  }, []);

  const isActive = useMemo(() => {
    const minutes = getMinutes(now);
    return MEAL_WINDOWS.some((window) => minutes >= window.start && minutes <= window.end);
  }, [now]);

  return (
    <Link href="/khana-ghari" className={`fixed bottom-4 left-4 z-40 flex max-w-[280px] items-center gap-3 rounded-full border px-4 py-3 shadow-lg backdrop-blur ${isActive ? 'border-[#2f8a4a] bg-[#1f784a] text-white' : 'border-[#d9e2d8] bg-white text-[#173423]'}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">🍽️</div>
      <div className="min-w-0">
        <p className="text-sm font-semibold">{isActive ? 'Meal time' : 'Soon'}</p>
        <p className="truncate text-xs opacity-90">{isActive ? 'Tap to earn Rubax' : `Streak ${streak}`}</p>
      </div>
    </Link>
  );
}
