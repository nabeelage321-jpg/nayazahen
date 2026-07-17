'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/lang';

const DATA = [
  { name: 'Ayesha', city: 'Lahore', metric: 930, category: 'Earners' },
  { name: 'Bilal', city: 'Karachi', metric: 905, category: 'Quizzers' },
  { name: 'Sara', city: 'Islamabad', metric: 890, category: 'Khana Ghari' },
  { name: 'Hamza', city: 'Peshawar', metric: 880, category: 'Games' },
  { name: 'Noor', city: 'Quetta', metric: 870, category: 'Earners' },
  { name: 'Rida', city: 'Faisalabad', metric: 860, category: 'Quizzers' },
  { name: 'Ali', city: 'Multan', metric: 850, category: 'Khana Ghari' },
  { name: 'Hina', city: 'Rawalpindi', metric: 840, category: 'Games' },
  { name: 'Amir', city: 'Sialkot', metric: 830, category: 'Earners' },
  { name: 'Zain', city: 'Gujranwala', metric: 820, category: 'Quizzers' },
  { name: 'Muneeb', city: 'Hyderabad', metric: 815, category: 'Khana Ghari' },
  { name: 'Kiran', city: 'Muzaffarabad', metric: 810, category: 'Games' },
  { name: 'Tania', city: 'Sukkur', metric: 805, category: 'Earners' },
  { name: 'Daniyal', city: 'Abbottabad', metric: 800, category: 'Quizzers' },
  { name: 'Farah', city: 'Bahawalpur', metric: 795, category: 'Khana Ghari' },
  { name: 'Usman', city: 'Mardan', metric: 790, category: 'Games' },
  { name: 'Maham', city: 'Mirpur', metric: 785, category: 'Earners' },
  { name: 'Ubaid', city: 'Larkana', metric: 780, category: 'Quizzers' },
  { name: 'Sana', city: 'Okara', metric: 775, category: 'Khana Ghari' },
  { name: 'Junaid', city: 'Sheikhupura', metric: 770, category: 'Games' },
];

export default function LeaderboardPage() {
  const { dir, pick } = useLang();
  const [tab, setTab] = useState('Earners');
  const [level, setLevel] = useState('Pakistan');
  const [time, setTime] = useState('This Week');

  const rows = useMemo(() => DATA.filter((item) => item.category === tab), [tab]);

  return (
    <main dir={dir} className="min-h-screen bg-[#f7f9ff] text-[#23304b]">
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e7eafd] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4659d1]">{pick('Platform leaderboard', 'پلیٹ فارم لیڈر بورڈ')}</p>
              <h1 className="mt-2 text-3xl font-black text-[#243569]">{pick('See who is shining across the country', 'دیکھیں کہ ملک بھر میں کون روشن ہے')}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={tab} onChange={(e) => setTab(e.target.value)} className="rounded-full border border-[#e7eafd] bg-[#f7f9ff] px-3 py-2 text-sm">
                <option>Earners</option>
                <option>Quizzers</option>
                <option>Khana Ghari</option>
                <option>Games</option>
              </select>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-full border border-[#e7eafd] bg-[#f7f9ff] px-3 py-2 text-sm">
                <option>City</option>
                <option>Province</option>
                <option>Pakistan</option>
              </select>
              <select value={time} onChange={(e) => setTime(e.target.value)} className="rounded-full border border-[#e7eafd] bg-[#f7f9ff] px-3 py-2 text-sm">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {rows.map((entry, index) => {
              const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
              return (
                <div key={entry.name} className={`flex flex-col gap-3 rounded-[20px] border p-4 sm:flex-row sm:items-center sm:justify-between ${index < 3 ? 'border-[#ffd37d] bg-[#fff9eb]' : 'border-[#e7eafd] bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2ff] text-xl">{medal}</div>
                    <div>
                      <p className="font-bold text-[#243569]">#{index + 1} {entry.name}</p>
                      <p className="text-sm text-[#4c5b80]">{entry.city} • {level}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-[#4c5b80]">
                    <div className="rounded-full bg-[#f7f9ff] px-3 py-2">{pick('Metric', 'میٹرک')} {entry.metric}</div>
                    <div className="rounded-full bg-[#f7f9ff] px-3 py-2">{pick('Time', 'وقت')} {time}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[24px] border border-[#e7eafd] bg-[#f9fbff] p-5 text-center">
            <h2 className="text-xl font-black text-[#243569]">{pick('Join to see your rank', 'اپنا رینک دیکھنے کے لیے شامل ہوں')}</h2>
            <p className="mt-2 text-sm text-[#4c5b80]">{pick('Create your free profile and start climbing the leaderboard today.', 'اپنا مفت پروفائل بنائیں اور آج ہی لیڈر بورڈ پر چڑھنا شروع کریں۔')}</p>
            <Link href="/signup" className="mt-4 inline-flex rounded-full bg-[#4659d1] px-4 py-2 text-sm font-semibold text-white">{pick('Sign up now', 'ابھی سائن اپ کریں')}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
