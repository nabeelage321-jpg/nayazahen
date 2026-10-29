'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

// Phase 0: the previous version of this page showed a hardcoded list
// of names and scores. Those figures were not real, so they have been
// removed. This page now shows the leaderboard as coming soon, and
// will be wired to real Firestore results in Phase 1.

export default function LeaderboardPage() {
  const { dir, pick } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#f7f9ff] text-[#23304b]">
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e7eafd] bg-white p-5 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4659d1]">{pick('Platform leaderboard', 'پلیٹ فارم لیڈر بورڈ')}</p>
          <h1 className="mt-2 text-3xl font-black text-[#243569]">{pick('See who is shining across the country', 'دیکھیں کہ ملک بھر میں کون روشن ہے')}</h1>
          <div className="mt-6 rounded-[24px] border border-[#e7eafd] bg-[#f9fbff] p-5 text-center">
            <h2 className="text-xl font-black text-[#243569]">{pick('Leaderboard coming soon', 'لیڈر بورڈ جلد آ رہا ہے')}</h2>
            <p className="mt-2 text-sm text-[#4c5b80]">{pick('Real rankings from quizzes, games and Khana Ghari will appear here once enough learners have joined. Your own Rubax balance is already live on your dashboard.', 'کوئز، گیمز اور کھانا گھڑی کے حقیقی رینک یہاں ظاہر ہوں گے جب کافی سیکھنے والے شامل ہو جائیں گے۔ آپ کا اپنا روبیکس بیلنس پہلے ہی آپ کے ڈیش بورڈ پر موجود ہے۔')}</p>
            <Link href="/signup" className="mt-4 inline-flex rounded-full bg-[#4659d1] px-4 py-2 text-sm font-semibold text-white">{pick('Sign up now', 'ابھی سائن اپ کریں')}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
