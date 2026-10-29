'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

// Phase 0: the previous version of this page showed a hardcoded list
// of names, scores and Rubax amounts. Those figures were not real, so
// they have been removed. This page will be wired to real quiz results
// in Phase 1.

export default function QuizLeaderboardPage() {
  const { dir, pick } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#f7f9ff] text-[#23304b]">
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e7eafd] bg-white p-5 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4659d1]">{pick('Quiz leaderboard', 'کوئز لیڈر بورڈ')}</p>
          <h1 className="mt-2 text-3xl font-black text-[#243569]">{pick('Track the sharpest minds in Pakistan', 'پاکستان کے سب سے ذہین ذہنوں کو دیکھیں')}</h1>
          <div className="mt-6 rounded-[24px] border border-[#e7eafd] bg-[#f9fbff] p-5 text-center">
            <h2 className="text-xl font-black text-[#243569]">{pick('Quiz leaderboard coming soon', 'کوئز لیڈر بورڈ جلد آ رہا ہے')}</h2>
            <p className="mt-2 text-sm text-[#4c5b80]">{pick('Real quiz scores and Rubax will appear here once enough learners have taken quizzes. Take a quiz now to start earning Rubax.', 'حقیقی کوئز اسکور اور روبیکس یہاں ظاہر ہوں گے جب کافی سیکھنے والے کوئز دے چکے ہوں گے۔ ابھی کوئز دیں اور روبیکس کمانا شروع کریں۔')}</p>
            <Link href="/quiz" className="mt-4 inline-flex rounded-full bg-[#4659d1] px-4 py-2 text-sm font-semibold text-white">{pick('Take a quiz', 'کوئز دیں')}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
