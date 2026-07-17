'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

const PLANS = [
  {
    nameEn: 'Starter',
    nameUr: 'اسٹارٹر',
    priceEn: 'Rs 299/month',
    priceUr: 'Rs 299/ماہ',
    featuresEn: ['Priority access to new lessons', 'Creator studio tools', 'Basic analytics'],
    featuresUr: ['نئی سبقوں تک ترجیحی رسائی', 'کریٹر اسٹوڈیو ٹولز', 'بنیادی تجزیہ'],
  },
  {
    nameEn: 'Family',
    nameUr: 'خاندان',
    priceEn: 'Rs 599/month',
    priceUr: 'Rs 599/ماہ',
    featuresEn: ['Everything in Starter', 'Parent progress reports', 'Family badges'],
    featuresUr: ['اسٹارٹر کی سب چیزیں', 'والدین کی پیش رفت کی رپورٹس', 'خاندان کے بیجز'],
  },
  {
    nameEn: 'School',
    nameUr: 'اسکول',
    priceEn: 'Rs 1,499/month',
    priceUr: 'Rs 1,499/ماہ',
    featuresEn: ['Everything in Family', 'Classroom management', 'Dedicated support'],
    featuresUr: ['خاندان کی سب چیزیں', 'کلاس روم مینجمنٹ', 'مخصوص مدد'],
  },
];

export default function PremiumPage() {
  const { dir, pick } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e5ecd9] bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">Premium</p>
          <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">{pick('Choose a plan that grows with your family', 'اپنے خاندان کے ساتھ بڑھنے والا پلان منتخب کریں')}</h1>
          <p className="mt-4 text-base leading-8 text-[#4b6d53]">
            {pick('Premium unlocks richer learning experiences, exclusive activities, and safer tools for parents, teachers, and creators.', 'پریمیم میں زیادہ بھرپور سیکھنے کا تجربہ، خصوصی سرگرمیاں، اور والدین، استادوں اور تخلیق کاروں کے لیے محفوظ ٹولز شامل ہوتے ہیں۔')}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div key={plan.nameEn} className="rounded-[24px] border border-[#e5ecd9] bg-[#fcfffb] p-5">
              <h2 className="text-xl font-bold text-[#144a2b]">{pick(plan.nameEn, plan.nameUr)}</h2>
              <p className="mt-2 text-sm text-[#4b6d53]">{pick(plan.priceEn, plan.priceUr)}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#4b6d53]">
                {plan.featuresEn.map((feature, index) => (
                  <li key={feature}>• {pick(feature, plan.featuresUr[index])}</li>
                ))}
              </ul>
              <Link href="/signup" className="mt-6 inline-flex rounded-full bg-[#1f784a] px-4 py-2 text-sm font-semibold text-white">
                {pick('Upgrade now', 'ابھی اپ گریڈ کریں')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
