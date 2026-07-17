'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

const CREATOR_TYPES = [
  {
    id: 'content',
    titleEn: 'Content Creator',
    titleUr: 'کونٹینٹ بنانے والا',
    earningsEn: 'Earn up to Rs 5,000/month',
    earningsUr: 'ماہانہ Rs 5,000 تک کمائیں',
    ageEn: 'Ages 10+',
    ageUr: '10 سال سے زیادہ',
    skillsEn: 'Writing, quizzes, stories',
    skillsUr: 'لکھنا، کوئز، کہانیاں',
  },
  {
    id: 'poster',
    titleEn: 'Poster Designer',
    titleUr: 'پوسٹر ڈیزائنر',
    earningsEn: 'Earn up to Rs 7,000/month',
    earningsUr: 'ماہانہ Rs 7,000 تک کمائیں',
    ageEn: 'Ages 12+',
    ageUr: '12 سال سے زیادہ',
    skillsEn: 'Design, Canva, colours',
    skillsUr: 'ڈیزائن، Canva، رنگ',
  },
  {
    id: 'quiz',
    titleEn: 'Quiz Maker',
    titleUr: 'کوئز بنانے والا',
    earningsEn: 'Earn up to Rs 6,000/month',
    earningsUr: 'ماہانہ Rs 6,000 تک کمائیں',
    ageEn: 'Ages 11+',
    ageUr: '11 سال سے زیادہ',
    skillsEn: 'Questions, answers, logic',
    skillsUr: 'سوالات، جوابات، منطق',
  },
  {
    id: 'tutor',
    titleEn: 'Peer Tutor',
    titleUr: 'پیر ٹیوٹر',
    earningsEn: 'Earn up to Rs 8,000/month',
    earningsUr: 'ماہانہ Rs 8,000 تک کمائیں',
    ageEn: 'Ages 13+',
    ageUr: '13 سال سے زیادہ',
    skillsEn: 'Teaching, patience, clarity',
    skillsUr: 'سکھانا، صبر، وضاحت',
  },
];

export default function CreatorPage() {
  const { dir, pick } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] text-[#183a24]">
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[#e5ecd9] bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">Creator Hub</p>
              <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">
                {pick('Turn your skills into income', 'اپنی مہارتوں کو آمدنی میں بدلیں')}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#4b6d53]">
                {pick('Build content for Pakistani students, earn Rubax, and grow your reputation in a safe platform built for young creators.', 'پاکستانی طلبہ کے لیے مواد بنائیں، روبیکس کمائیں، اور نوجوان تخلیق کاروں کے لیے بنے محفوظ پلیٹ فارم پر اپنی شناخت بنائیں۔')}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/creator/studio" className="rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white">
                  {pick('Start Creating Today', 'آج تخلیق شروع کریں')}
                </Link>
                <Link href="/nz-id" className="rounded-full border border-[#d7e9d8] px-5 py-3 text-sm font-semibold text-[#2f8a4a]">
                  {pick('Get NZ-ID', 'NZ-ID پائیں')}
                </Link>
              </div>
            </div>
            <div className="rounded-[24px] border border-[#e2efe0] bg-[#f7fff8] p-6 text-center">
              <div className="text-6xl">👧🏽📚✨</div>
              <h2 className="mt-4 text-xl font-bold text-[#144a2b]">{pick('Real earnings for real creators', 'حقیقی تخلیق کاروں کے لیے حقیقی کمائی')}</h2>
              <p className="mt-3 text-sm leading-7 text-[#4b6d53]">
                {pick('Ahmed from Lahore earned Rs 2,400 last month by creating quizzes and stories for Naya Zehan.', 'احمد، لاہور سے، نے نیا ذہن کے لیے کوئز اور کہانیاں بنا کر پچھلے مہینے Rs 2,400 کمایے۔')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black text-[#144a2b]">{pick('Choose your path', 'اپنا راستہ منتخب کریں')}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {CREATOR_TYPES.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-[#e5ecd9] bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-[#144a2b]">{pick(item.titleEn, item.titleUr)}</h3>
                <div className="mt-3 space-y-2 text-sm text-[#4b6d53]">
                  <p><span className="font-semibold">{pick('Earnings', 'کمائی')}:</span> {pick(item.earningsEn, item.earningsUr)}</p>
                  <p><span className="font-semibold">{pick('Age', 'عمر')}:</span> {pick(item.ageEn, item.ageUr)}</p>
                  <p><span className="font-semibold">{pick('Skills', 'مہارتیں')}:</span> {pick(item.skillsEn, item.skillsUr)}</p>
                </div>
                <Link href="/creator/studio" className="mt-5 inline-flex rounded-full bg-[#1f784a] px-4 py-2 text-sm font-semibold text-white">
                  {pick('Start Creating', 'تخلیق شروع کریں')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[#e5ecd9] bg-[#f8fff8] p-6 sm:p-8">
          <h2 className="text-2xl font-black text-[#144a2b]">{pick('How it works', 'یہ کیسے کام کرتا ہے')}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {['Create', 'Submit', 'Review (24-48hrs)', 'Publish', 'Earn'].map((step, index) => (
              <div key={step} className="rounded-[20px] border border-[#e2efe0] bg-white p-4 text-center">
                <div className="text-sm font-semibold text-[#2f8a4a]">0{index + 1}</div>
                <p className="mt-2 font-semibold text-[#144a2b]">{pick(step, step === 'Create' ? 'بنانا' : step === 'Submit' ? 'جمع کرائیں' : step === 'Review (24-48hrs)' ? 'جائزہ (24-48 گھنٹے)' : step === 'Publish' ? 'شائع کریں' : 'کمائیں')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
