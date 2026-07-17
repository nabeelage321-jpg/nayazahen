'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLang } from '@/lib/lang';

const launchDate = new Date('2025-08-14T00:00:00');

function getTimeRemaining() {
  const diff = launchDate.getTime() - new Date().getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function LaunchPage() {
  const { dir } = useLang();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      await addDoc(collection(db, 'launch_waitlist'), {
        email,
        createdAt: serverTimestamp(),
      });
      setStatus('You are on the launch list.');
      setEmail('');
    } catch (error) {
      console.error(error);
      setStatus('Could not join the waitlist right now.');
    } finally {
      setSubmitting(false);
    }
  }

  const timerCards = useMemo(() => [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ], [timeLeft]);

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[32px] border border-[#e5ecd9] bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">Launch announcement</p>
          <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">Pakistan's AI Education Revolution Begins</h1>
          <p className="mt-4 text-base leading-8 text-[#4b6d53]">
            Our public launch is set for Pakistan Independence Day. Join the countdown and be the first to know about the next wave of learning, earning, and school competition.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {timerCards.map((card) => (
              <div key={card.label} className="rounded-[20px] border border-[#e2efe0] bg-[#f7fff8] p-4 text-center">
                <p className="text-3xl font-black text-[#144a2b]">{card.value}</p>
                <p className="mt-1 text-sm text-[#4b6d53]">{card.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[24px] border border-[#e2efe0] bg-[#f7fff8] p-5">
            <h2 className="text-xl font-bold text-[#144a2b]">Launching soon</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#4b6d53]">
              <li>AI Nano voice calls</li>
              <li>JazzCash/EasyPaisa live payments</li>
              <li>School League Season 1</li>
              <li>Creator marketplace</li>
            </ul>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#e5ecd9] bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-black text-[#144a2b]">Get launch updates</h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">Email</span>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
            <button disabled={submitting} className="mt-4 rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-70">
              {submitting ? 'Joining...' : 'Join waitlist'}
            </button>
          </form>
          <div className="mt-6 rounded-[24px] border border-[#e5ecd9] bg-[#f8fff8] p-5">
            <h3 className="text-lg font-bold text-[#144a2b]">Referral bonus</h3>
            <p className="mt-2 text-sm text-[#4b6d53]">Refer 3 friends and earn a 500 Rubax bonus when the launch begins.</p>
            <a href="https://wa.me/?text=Naya%20Zehan%20launch%20is%20coming%20soon" className="mt-4 inline-flex rounded-full bg-[#1f784a] px-4 py-2 text-sm font-semibold text-white">Share on WhatsApp</a>
          </div>
          {status ? <p className="mt-4 text-sm text-[#2f8a4a]">{status}</p> : null}
        </section>
      </div>
    </main>
  );
}
