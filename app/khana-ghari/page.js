'use client';

import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useLang } from '@/lib/lang';
import { auth } from '@/lib/firebase';
import { awardRubax } from '@/lib/rubax';

const MEAL_WINDOWS = [
  { id: 'breakfast', labelEn: 'Breakfast', labelUr: 'ناشتہ', start: 7 * 60, end: 9 * 60, emoji: '🥣' },
  { id: 'lunch', labelEn: 'Lunch', labelUr: 'دوپہر کا کھانا', start: 12 * 60, end: 14 * 60, emoji: '🍛' },
  { id: 'dinner', labelEn: 'Dinner', labelUr: 'شام', start: 19 * 60, end: 21 * 60, emoji: '🥘' },
];

function getMinutes(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function getStatus(now) {
  const minutes = getMinutes(now);
  const active = MEAL_WINDOWS.find((window) => minutes >= window.start && minutes <= window.end);
  if (active) return { active, mode: 'active' };
  const next = MEAL_WINDOWS.find((window) => window.start > minutes) || MEAL_WINDOWS[0];
  return { active: null, mode: 'waiting', next };
}

function formatMinutes(total) {
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  return `${hours}h ${mins}m`;
}

export default function KhanaGhariPage() {
  const { dir, pick } = useLang();
  const [now, setNow] = useState(new Date());
  const [streak, setStreak] = useState(0);
  const [rewarded, setRewarded] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(getStatus(new Date()));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedStreak = Number(localStorage.getItem('khana-ghari-streak') || 0);
    const savedResults = JSON.parse(localStorage.getItem('khana-ghari-results') || '[]');
    setStreak(savedStreak);
    setResults(savedResults);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date();
      setNow(current);
      setStatus(getStatus(current));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    if (status.mode === 'active') {
      const end = status.active.end * 60;
      const current = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const remaining = end * 60 - current;
      return Math.max(0, remaining);
    }
    const nextStart = status.next.start * 60 * 60;
    const current = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const diff = nextStart - current;
    return diff < 0 ? diff + 24 * 3600 : diff;
  }, [now, status]);

  const handleEat = async () => {
    if (!status.active) {
      setMessage(pick('You are outside the active meal window. Try again when the next meal begins.', 'آپ اب فعال کھانے کے وقت سے باہر ہیں۔ اگلے کھانے کے وقت پر دوبارہ کوشش کریں۔'));
      return;
    }

    if (rewarded) {
      setMessage(pick('You already claimed today’s reward for this meal.', 'آپ پہلے ہی اس کھانے کے لیے انعام لے چکے ہیں۔'));
      return;
    }

    const nextStreak = streak + 1;
    setStreak(nextStreak);
    setRewarded(true);
    setMessage(pick('Amazing! You earned a healthy habit badge and 10 Rubax.', 'بہت خوب! آپ نے صحت مند عادت کا بیج اور 10 روبیکس جیت لیے۔'));

    if (typeof window !== 'undefined') {
      localStorage.setItem('khana-ghari-streak', String(nextStreak));
      const nextResults = [
        {
          id: Date.now(),
          meal: status.active.labelEn,
          time: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          score: '10 Rubax',
        },
        ...results,
      ].slice(0, 6);
      localStorage.setItem('khana-ghari-results', JSON.stringify(nextResults));
      setResults(nextResults);
    }

    if (user?.uid) {
      await awardRubax(user.uid, 10, 'Khana Ghari meal streak');
    }
  };

  const leaderboard = [
    { name: 'Ayesha', city: 'Lahore', score: 84 },
    { name: 'Bilal', city: 'Karachi', score: 79 },
    { name: 'Sara', city: 'Islamabad', score: 76 },
    { name: 'Hamza', city: 'Peshawar', score: 73 },
    { name: 'Noor', city: 'Quetta', score: 71 },
    { name: 'Rida', city: 'Faisalabad', score: 68 },
    { name: 'Ali', city: 'Multan', score: 64 },
    { name: 'Hina', city: 'Rawalpindi', score: 61 },
    { name: 'Amir', city: 'Sialkot', score: 58 },
    { name: 'Zain', city: 'Gujranwala', score: 55 },
  ];

  return (
    <main dir={dir} className="min-h-screen bg-[#f4fff7] text-[#173423]">
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[#d9efe0] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">
                {pick('Khana Ghari', 'کھانا گھڑی')}
              </p>
              <h1 className="mt-2 text-3xl font-black text-[#144a2b] sm:text-4xl">
                {pick('The world’s first healthy meal-time game for Pakistani children', 'پاکستانی بچوں کے لیے پہلی صحت مند کھانے کی گیم')}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4b6d53] sm:text-base">
                {pick('Eat on time, earn Rubax, and build a happy routine with family-friendly meal windows.', 'وقت پر کھائیں، روبیکس کمائیں، اور خاندان کے لیے خوشگوار عادت بنائیں۔')}
              </p>
            </div>
            <div className="rounded-2xl border border-[#dff3e4] bg-[#f6fff8] px-4 py-3 text-sm font-semibold text-[#256b3e]">
              {pick('Streak today', 'آج کی سٹریک')} : {streak}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[24px] border border-[#dfeedd] bg-[#f8fff9] p-5">
              {status.active ? (
                <>
                  <div className="inline-flex rounded-full bg-[#1f784a] px-3 py-1 text-sm font-semibold text-white">
                    {pick('Meal window active', 'کھانے کا وقت فعال ہے')}
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-[#144a2b]">
                    {pick('It is time for', 'اب وقت ہے')} {pick(status.active.labelEn, status.active.labelUr)}
                  </h2>
                  <p className="mt-2 text-sm text-[#4b6d53]">
                    {pick('Finish your meal, tap the button, and claim 10 Rubax.', 'اپنا کھانا مکمل کریں، بٹن دبائیں، اور 10 روبیکس حاصل کریں۔')}
                  </p>
                  <div className="mt-5 rounded-2xl bg-[#ebf9ee] p-4 text-center">
                    <p className="text-sm text-[#37724b]">{pick('Ends in', 'باقی ہے')}</p>
                    <p className="mt-2 text-4xl font-black text-[#1f784a]">{formatMinutes(Math.floor(countdown / 60))}</p>
                  </div>
                  <button onClick={handleEat} className="mt-5 w-full rounded-2xl bg-[#1f784a] px-4 py-4 text-lg font-black text-white shadow-sm transition hover:scale-[1.01]">
                    {pick("I'm eating!", 'میں کھا رہا/رہی ہوں!')}
                  </button>
                </>
              ) : (
                <>
                  <div className="inline-flex rounded-full bg-[#7c8a7e] px-3 py-1 text-sm font-semibold text-white">
                    {pick('Next meal soon', 'اگلا کھانا جلد')}
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-[#144a2b]">
                    {pick('Next meal window', 'اگلا کھانے کا وقت')} {pick(status.next.labelEn, status.next.labelUr)}
                  </h2>
                  <p className="mt-2 text-sm text-[#4b6d53]">
                    {pick('Stay ready with water, fruits, or a healthy snack.', 'پانی، پھل یا صحت مند چپاتی کے ساتھ تیار رہیں۔')}
                  </p>
                  <div className="mt-5 rounded-2xl bg-[#f2f5f2] p-4 text-center">
                    <p className="text-sm text-[#5b7061]">{pick('Starts in', 'شروع ہونے میں')}</p>
                    <p className="mt-2 text-4xl font-black text-[#4e6756]">{formatMinutes(Math.floor(countdown / 60))}</p>
                  </div>
                </>
              )}
              {message && <p className="mt-4 rounded-2xl bg-[#eff9f2] px-3 py-3 text-sm font-semibold text-[#2e6a3e]">{message}</p>}
            </div>

            <div className="rounded-[24px] border border-[#dfeedd] bg-[#fbfff9] p-5">
              <h3 className="text-lg font-bold text-[#144a2b]">{pick('Previous meal results', 'پچھلے کھانے کے نتائج')}</h3>
              <div className="mt-4 space-y-2">
                {results.length === 0 ? (
                  <p className="text-sm text-[#4b6d53]">{pick('No meal check-ins yet. Start your first one today.', 'ابھی تک کوئی کھانے کی تصدیق نہیں۔ آج پہلی بار شروع کریں۔')}</p>
                ) : (
                  results.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[#e4efe7] bg-white px-3 py-3 text-sm text-[#3d5948]">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{item.meal}</span>
                        <span className="text-[#1f784a]">{item.score}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#6b7e6e]">{item.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[24px] border border-[#dfeedd] bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-[#144a2b]">{pick('Weekly leaderboard', 'ہفتہ وار لیڈر بورڈ')}</h3>
              <span className="rounded-full bg-[#ebf9ee] px-3 py-1 text-sm font-semibold text-[#2f8a4a]">🍚 🍛 🫓 🥘</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {leaderboard.map((entry, index) => (
                <div key={entry.name} className="rounded-2xl border border-[#e4efe7] bg-[#f8fff9] px-4 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[#144a2b]">#{index + 1} {entry.name}</span>
                    <span className="text-[#2f8a4a]">{entry.score}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#4b6d53]">{entry.city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
