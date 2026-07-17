'use client';

import { useMemo, useState } from 'react';
import { useLang } from '@/lib/lang';

const ENTRIES = [
  { name: 'Ayesha', city: 'Lahore', score: 930, rubax: 430, subject: 'Math' },
  { name: 'Bilal', city: 'Karachi', score: 910, rubax: 400, subject: 'Science' },
  { name: 'Sara', city: 'Islamabad', score: 900, rubax: 385, subject: 'Urdu' },
  { name: 'Hamza', city: 'Peshawar', score: 890, rubax: 370, subject: 'English' },
  { name: 'Noor', city: 'Quetta', score: 880, rubax: 360, subject: 'Islamiat' },
  { name: 'Rida', city: 'Faisalabad', score: 870, rubax: 350, subject: 'Pakistan Studies' },
  { name: 'Ali', city: 'Multan', score: 860, rubax: 340, subject: 'General Knowledge' },
  { name: 'Hina', city: 'Rawalpindi', score: 850, rubax: 330, subject: 'Math' },
  { name: 'Amir', city: 'Sialkot', score: 840, rubax: 320, subject: 'Science' },
  { name: 'Zain', city: 'Gujranwala', score: 830, rubax: 310, subject: 'Urdu' },
];

export default function QuizLeaderboardPage() {
  const { dir, pick } = useLang();
  const [range, setRange] = useState('Weekly');
  const [level, setLevel] = useState('My City');
  const [subject, setSubject] = useState('All');

  const filtered = useMemo(() => {
    return ENTRIES.filter((entry) => subject === 'All' || entry.subject === subject);
  }, [subject]);

  return (
    <main dir={dir} className="min-h-screen bg-[#f7f9ff] text-[#23304b]">
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e7eafd] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4659d1]">{pick('Quiz leaderboard', 'کوئز لیڈر بورڈ')}</p>
              <h1 className="mt-2 text-3xl font-black text-[#243569]">{pick('Track the sharpest minds in Pakistan', 'پاکستان کے سب سے ذہین ذہنوں کو دیکھیں')}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={range} onChange={(e) => setRange(e.target.value)} className="rounded-full border border-[#e7eafd] bg-[#f7f9ff] px-3 py-2 text-sm">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>All Time</option>
              </select>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-full border border-[#e7eafd] bg-[#f7f9ff] px-3 py-2 text-sm">
                <option>My School</option>
                <option>My City</option>
                <option>Pakistan</option>
              </select>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-full border border-[#e7eafd] bg-[#f7f9ff] px-3 py-2 text-sm">
                <option>All</option>
                <option>Math</option>
                <option>Urdu</option>
                <option>Science</option>
                <option>English</option>
                <option>Islamiat</option>
                <option>Pakistan Studies</option>
                <option>General Knowledge</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {filtered.map((entry, index) => {
              const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
              return (
                <div key={entry.name} className={`flex flex-col gap-3 rounded-[20px] border p-4 sm:flex-row sm:items-center sm:justify-between ${index < 3 ? 'border-[#ffd37d] bg-[#fff9eb]' : 'border-[#e7eafd] bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2ff] text-xl">{medal}</div>
                    <div>
                      <p className="font-bold text-[#243569]">#{index + 1} {entry.name}</p>
                      <p className="text-sm text-[#4c5b80]">{entry.city} • {entry.subject}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-[#4c5b80]">
                    <div className="rounded-full bg-[#f7f9ff] px-3 py-2">{pick('Score', 'اسکور')} {entry.score}</div>
                    <div className="rounded-full bg-[#f7f9ff] px-3 py-2">{pick('Rubax', 'روبیکس')} {entry.rubax}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
