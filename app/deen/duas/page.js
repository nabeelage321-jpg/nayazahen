'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/lang';

const DUAS = [
  { id: 1, category: 'Morning', categoryUr: 'صبح', arabic: 'بِسْمِ اللَّهِ', urdu: 'اللہ کے نام سے', english: 'In the name of Allah', audio: true },
  { id: 2, category: 'Morning', categoryUr: 'صبح', arabic: 'الحمدُ لله', urdu: 'تمام تعریف اللہ کے لیے ہے', english: 'All praise is for Allah', audio: true },
  { id: 3, category: 'Evening', categoryUr: 'شام', arabic: 'أَعُوذُ بِاللَّهِ', urdu: 'میں اللہ کی پناہ میں آتا ہوں', english: 'I seek refuge in Allah', audio: true },
  { id: 4, category: 'Before Eating', categoryUr: 'کھانے سے پہلے', arabic: 'بِسْمِ اللَّهِ', urdu: 'اللہ کے نام سے', english: 'In the name of Allah', audio: true },
  { id: 5, category: 'After Eating', categoryUr: 'کھانے کے بعد', arabic: 'الْحَمْدُ لِلَّهِ', urdu: 'اللہ کا شکر', english: 'Praise be to Allah', audio: true },
  { id: 6, category: 'Before Sleep', categoryUr: 'سونے سے پہلے', arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا', urdu: 'اے اللہ! تیرے نام سے میں مرنا اور جینا ہوں', english: 'O Allah, by Your name I die and live', audio: true },
  { id: 7, category: 'Travel', categoryUr: 'سفر', arabic: 'سُبْحَانَ الَّذِي', urdu: 'پاک ہے وہ', english: 'Glory be to Him', audio: true },
  { id: 8, category: 'Morning', categoryUr: 'صبح', arabic: 'رَبِّ زِدْنِي عِلْمًا', urdu: 'میرے رب! میری علم میں اضافہ کر', english: 'My Lord, increase me in knowledge', audio: true },
  { id: 9, category: 'Evening', categoryUr: 'شام', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ', urdu: 'اے اللہ! میں تجھ سے مانگتا ہوں', english: 'O Allah, I ask You', audio: true },
  { id: 10, category: 'Before Eating', categoryUr: 'کھانے سے پہلے', arabic: 'اللَّهُمَّ بَارِكْ لَنَا', urdu: 'اے اللہ! ہمارے لیے برکت دے', english: 'O Allah, bless for us', audio: true },
];

const CATEGORIES = ['All', 'Morning', 'Evening', 'Before Eating', 'After Eating', 'Before Sleep', 'Travel'];

export default function DuasPage() {
  const { dir, pick } = useLang();
  const [streak, setStreak] = useState(0);
  const [category, setCategory] = useState('All');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = Number(localStorage.getItem('deen-streak') || 0);
    const lastDate = localStorage.getItem('deen-last-practice');
    const today = new Date().toISOString().split('T')[0];
    if (lastDate !== today) {
      setStreak(saved);
    } else {
      setStreak(saved);
    }
  }, []);

  const markPractice = () => {
    if (typeof window === 'undefined') return;
    const today = new Date().toISOString().split('T')[0];
    const lastDate = localStorage.getItem('deen-last-practice');
    const prev = Number(localStorage.getItem('deen-streak') || 0);
    const next = lastDate === today ? prev : prev + 1;
    localStorage.setItem('deen-streak', String(next));
    localStorage.setItem('deen-last-practice', today);
    setStreak(next);
    setMessage(pick('Great job! Keep the streak alive.', 'بہت اچھا! سٹریک زندہ رکھو۔'));
  };

  const visibleDuas = category === 'All' ? DUAS : DUAS.filter((d) => d.category === category);

  return (
    <main dir={dir} className="min-h-screen bg-[#fffdf7] text-[#183a24]">
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-[#f2e6d1] bg-white p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6e22]">
                {pick('Daily Duas', 'روزانہ کی دعائیں')}
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-[#4f2d0f] mt-2">
                {pick('Gentle daily remembrance for your child', 'بچے کے لیے روزانہ کی محبت بھری یاد')} 
              </h1>
            </div>
            <div className="rounded-2xl bg-[#fef4d8] px-4 py-3 text-sm text-[#6a4818]">
              <div className="font-semibold">{pick('Streak', 'سٹریک')} : {streak}</div>
              <button onClick={markPractice} className="mt-2 rounded-full bg-[#8b5a14] px-3 py-2 text-white text-sm">
                {pick('Mark today’s practice', 'آج کی مشق درج کریں')}
              </button>
            </div>
          </div>

          {message && <p className="mt-4 text-sm font-semibold text-[#6a4818]">{message}</p>}

          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-3 py-2 text-sm border ${category === item ? 'bg-[#8b5a14] text-white border-[#8b5a14]' : 'bg-white text-[#6a4818] border-[#ead8b9]'}`}>
                {pick(item, item === 'All' ? 'سب' : item)}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4">
            {visibleDuas.map((dua) => (
              <div key={dua.id} className="rounded-2xl border border-[#efe2c4] bg-[#fffaf0] p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#f9e8bf] px-3 py-1 text-sm font-semibold text-[#7a4f12]">
                    {pick(dua.category, dua.categoryUr)}
                  </span>
                  <div className="flex gap-2">
                    <button className="rounded-full border border-[#d6b370] px-3 py-2 text-sm text-[#7a4f12]">
                      {pick('Play Audio', 'آڈیو چلائیں')}
                    </button>
                    <button className="rounded-full bg-[#8b5a14] px-3 py-2 text-sm text-white">
                      {pick('Memorize', 'حفظ کریں')}
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#a47b2c]">Arabic</p>
                    <p className="mt-2 text-2xl text-[#4f2d0f]">{dua.arabic}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#a47b2c]">Urdu</p>
                    <p className="mt-2 text-[#5f3f13]">{dua.urdu}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#a47b2c]">English</p>
                    <p className="mt-2 text-[#5f3f13]">{dua.english}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
