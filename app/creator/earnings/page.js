'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

// Phase 0: the previous version of this page showed hardcoded rupee
// hardcoded rupee amounts and invented activity items.
// Those figures were not real, so they have been removed. No payout
// exists yet — see the earning plan in the project agent file. This
// page will show real, reviewed submissions and their status in
// Phase 1, and real amounts only once a payout flow exists.

export default function CreatorEarningsPage() {
  const { dir, pick } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e5ecd9] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">{pick('Earnings', 'کمائی')}</p>
            <h1 className="mt-2 text-3xl font-black text-[#144a2b] sm:text-4xl">{pick('Creator payout overview', 'کریٹر ادائیگی کا جائزہ')}</h1>
          </div>
          <Link href="/creator/studio" className="rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white">
            {pick('Submit more content', 'مزید مواد جمع کرائیں')}
          </Link>
        </div>

        <div className="mt-8 rounded-[24px] border border-[#e5ecd9] bg-[#f8fff8] p-5">
          <h2 className="text-xl font-bold text-[#144a2b]">{pick('No payout figures yet', 'ابھی ادائیگی کے اعداد نہیں ہیں')}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#4b6d53]">
            {pick('Content you submit in the Creator Studio is stored for review. Earnings and payouts will appear here only after a review process and a real payout flow are in place. Until then, this page does not show any rupee amounts.', 'کریٹر اسٹوڈیو میں جمع کیا گیا مواد جائزہ کے لیے محفوظ ہوتا ہے۔ کمائی اور ادائیگیاں یہاں صرف اس وقت ظاہر ہوں گی جب جائزہ کا عمل اور حقیقی ادائیگی کا نظام موجود ہو۔ تب تک اس صفحے پر کوئی روپے کی رقم نہیں دکھائی جائے گی۔')}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#4b6d53]">
            {pick('Your Rubax balance from quizzes and games is already live on your dashboard.', 'کوئز اور گیمز سے آپ کا روبیکس بیلنس پہلے ہی آپ کے ڈیش بورڈ پر موجود ہے۔')}
          </p>
        </div>
      </div>
    </main>
  );
}
