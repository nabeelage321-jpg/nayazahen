'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

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

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { labelEn: 'This month', labelUr: 'اس مہینے', value: 'Rs 4,280', noteEn: '3 approved items', noteUr: '3 منظور شدہ اشیاء' },
            { labelEn: 'Pending', labelUr: 'زیر التواء', value: 'Rs 1,120', noteEn: '2 under review', noteUr: '2 جائزہ کے تحت' },
            { labelEn: 'Available', labelUr: 'موجود', value: 'Rs 3,160', noteEn: 'Withdraw to Rubax', noteUr: 'روبیکس میں نکالیں' },
          ].map((card) => (
            <div key={card.labelEn} className="rounded-[24px] border border-[#e5ecd9] bg-[#f8fff8] p-5">
              <p className="text-sm text-[#4b6d53]">{pick(card.labelEn, card.labelUr)}</p>
              <p className="mt-2 text-3xl font-black text-[#144a2b]">{card.value}</p>
              <p className="mt-2 text-sm text-[#4b6d53]">{pick(card.noteEn, card.noteUr)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-[#e5ecd9] bg-[#fcfffb] p-5">
          <h2 className="text-xl font-bold text-[#144a2b]">{pick('Recent activity', 'حالیہ سرگرمی')}</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#4b6d53]">
            <li>• {pick('Story approved and published for Grade 4 AI lesson.', 'کہانی منظور ہو گئی اور Grade 4 AI سبق کے لیے شائع ہو گئی۔')}</li>
            <li>• {pick('Quiz reward credited to your Rubax wallet.', 'کوئز کا انعام آپ کے روبیکس بٹوہ میں داخل کر دیا گیا۔')}</li>
            <li>• {pick('Poster waiting on final review from the school team.', 'پوسٹر اسکول ٹیم کے آخری جائزہ کا انتظار کر رہا ہے۔')}</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
