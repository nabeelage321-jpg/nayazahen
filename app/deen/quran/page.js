'use client';

import { useLang } from '@/lib/lang';

const LEVELS = [
  {
    id: 1,
    titleEn: 'Level 1: Basic Arabic Letters',
    titleUr: 'لیول 1: بنیادی عربی حروف',
    unlocked: true,
    progress: 72,
    lessons: [
      { titleEn: 'Recognise Arabic letters', titleUr: 'عربی حروف پہچانیں' },
      { titleEn: 'Practise short letter sounds', titleUr: 'مختصر آوازیں سیکھیں' },
      { titleEn: 'Trace and copy letters', titleUr: 'حروف کو ٹریس اور نقل کریں' },
    ],
  },
  {
    id: 2,
    titleEn: 'Level 2: Harakat (Vowel Marks)',
    titleUr: 'لیول 2: حرکات',
    unlocked: false,
    progress: 0,
    lessons: [
      { titleEn: 'Learn fatha, kasra, damma', titleUr: 'فتحہ، کسرہ، ضمہ سیکھیں' },
      { titleEn: 'Read simple words', titleUr: 'سادہ الفاظ پڑھیے' },
    ],
  },
  {
    id: 3,
    titleEn: 'Level 3: Madd (Elongation)',
    titleUr: 'لیول 3: مد',
    unlocked: false,
    progress: 0,
    lessons: [
      { titleEn: 'Recognise long vowels', titleUr: 'لمبے حروف پہچانیں' },
      { titleEn: 'Practice joining words', titleUr: 'لفظوں کو جوڑنا سیکھیں' },
    ],
  },
  {
    id: 4,
    titleEn: 'Level 4: Tanween and Sukoon',
    titleUr: 'لیول 4: تنوین اور سکوون',
    unlocked: false,
    progress: 0,
    lessons: [
      { titleEn: 'Learn tanween symbols', titleUr: 'تنوین کے نشانات سیکھیں' },
      { titleEn: 'Understand stopping marks', titleUr: 'رکنے کے نشانات سمجھیں' },
    ],
  },
  {
    id: 5,
    titleEn: 'Level 5: Full Tajweed Rules',
    titleUr: 'لیول 5: مکمل تجوید',
    unlocked: false,
    progress: 0,
    lessons: [
      { titleEn: 'Review all tajweed rules', titleUr: 'سارے تجوید کے اصول دہرائیں' },
      { titleEn: 'Read a short verse slowly', titleUr: 'ایک مختصر آیت آہستہ پڑھیے' },
    ],
  },
];

export default function QuranPage() {
  const { dir, pick } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#f6fff8] text-[#183a24]">
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-[#dfeedd] bg-white p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f8a4a]">
                {pick('Quran Learning Path', 'قرآن سیکھنے کا راستہ')}
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-[#144a2b] mt-2">
                {pick('Tajweed levels for gentle progress', 'تجوید کے لیے نرم ترقی')} 
              </h1>
            </div>
            <div className="rounded-2xl bg-[#ebf8ee] px-4 py-3 text-sm text-[#2f4e36]">
              {pick('Progress: 1 of 5 levels unlocked', 'ترقی: 1 میں سے 5 لیول کھلے ہیں')}
            </div>
          </div>

          <div className="mt-8 grid gap-5">
            {LEVELS.map((level) => (
              <div key={level.id} className="rounded-2xl border border-[#dfeedd] bg-[#fbfffb] p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-[#144a2b]">{pick(level.titleEn, level.titleUr)}</h2>
                      {!level.unlocked && <span className="text-2xl">🔒</span>}
                    </div>
                    <p className="text-sm text-[#4c6d53] mt-2">
                      {pick('Progress tracker for this level', 'اس لیول کی ترقی کا ٹریکر')}
                    </p>
                  </div>
                  <div className="min-w-[180px]">
                    <div className="h-2 rounded-full bg-[#e8f5ea] overflow-hidden">
                      <div className="h-full rounded-full bg-[#1f784a]" style={{ width: `${level.progress}%` }} />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[#2f4e36]">{level.progress}%</p>
                  </div>
                </div>

                <div className="mt-5 grid md:grid-cols-2 gap-3">
                  {level.lessons.map((lesson, idx) => (
                    <div key={idx} className="rounded-xl border border-[#e4f0e6] bg-white p-4">
                      <p className="text-sm font-semibold text-[#1f784a]">{pick('Lesson', 'سبق')} {idx + 1}</p>
                      <p className="mt-2 text-[#2b4d37]">{pick(lesson.titleEn, lesson.titleUr)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
