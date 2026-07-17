'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

const FEATURES = [
  {
    id: 'quran',
    icon: '📖',
    titleEn: 'Quran Classes',
    titleUr: 'قرآن کلاسز',
    descEn: 'Interactive Tajweed lessons from levels 1 to 5 with gentle progress tracking.',
    descUr: 'لیول 1 سے 5 تک باقاعدہ تجوید سیکھنے اور ترقی کا پچھلا نظام۔',
    href: '/deen/quran',
    action: 'Start',
  },
  {
    id: 'naat',
    icon: '🎤',
    titleEn: 'Naat Muqabla',
    titleUr: 'نعت مقابلہ',
    descEn: 'Record and submit your naat for feedback and celebration.',
    descUr: 'اپنی نعت ریکارڈ کرو اور جائزے کے لیے جمع کرو۔',
    href: '#',
    action: 'Coming Soon',
  },
  {
    id: 'drama',
    icon: '🎭',
    titleEn: 'Islamic Drama',
    titleUr: 'اسلامی ڈراما',
    descEn: 'Choose a script, rehearse, and record a short Islamic drama.',
    descUr: 'اسکرپ منتخب کرو، مشق کرو اور ایک مختصر اسلامی ڈراما ریکارڈ کرو۔',
    href: '#',
    action: 'Coming Soon',
  },
  {
    id: 'duas',
    icon: '🙏',
    titleEn: 'Daily Duas',
    titleUr: 'روزانہ کی دعائیں',
    descEn: 'Learn essential duas with audio support, games, and streak tracking.',
    descUr: 'آواز، کھیل اور سٹریک ٹریکنگ کے ساتھ ضروری دعائیں سیکھو۔',
    href: '/deen/duas',
    action: 'Start',
  },
  {
    id: 'names',
    icon: '🌙',
    titleEn: '99 Names of Allah',
    titleUr: 'اللہ کے 99 نام',
    descEn: 'Discover, practice, and quiz yourself with beautiful name cards.',
    descUr: 'خوبصورت کارڈز کے ساتھ نام سیکھو اور خود کو چیک کرو۔',
    href: '/deen/99names',
    action: 'Start',
  },
  {
    id: 'stories',
    icon: '✨',
    titleEn: 'AI Islamic Stories',
    titleUr: 'AI اسلامی کہانیاں',
    descEn: 'Interactive stories with Nano to make learning values fun and memorable.',
    descUr: 'نانو کے ساتھ انٹرایکٹو کہانیاں تاکہ سیکھنا زیادہ دلچسپ ہو۔',
    href: '#',
    action: 'Coming Soon',
  },
];

export default function DeenPage() {
  const { dir, isEn, pick } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#f7fcf7] text-[#183a24]">
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(31,120,74,0.25), transparent 25%), radial-gradient(circle at 80% 20%, rgba(97,168,78,0.2), transparent 25%), linear-gradient(135deg, #eef9ee 0%, #dff0de 100%)',
        }} />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage:
            'linear-gradient(120deg, transparent 0%, transparent 30%, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0.55) 70%, transparent 70%), repeating-linear-gradient(0deg, transparent 0 24px, rgba(31,120,74,0.08) 24px 26px), repeating-linear-gradient(90deg, transparent 0 24px, rgba(31,120,74,0.08) 24px 26px)',
        }} />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <div>
            <div className="inline-block rounded-full border border-[#2f8a4a] bg-white/80 px-4 py-2 text-sm font-semibold text-[#2f8a4a] mb-4">
              {pick('Islamic Learning Hub', 'اسلامی سیکھنے کا مرکز')}
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-[#144a2b]">
              {pick('Grow in faith, knowledge, and character', 'ایمان، علم اور کردار میں ترقی')} 
            </h1>
            <p className="text-lg md:text-xl text-[#2f4e36] leading-8 max-w-2xl">
              {pick('A warm Islamic learning space for Pakistani children with Quran, duas, stories, and joyful practice.', 'پاکستانی بچوں کے لیے ایک گرم اسلامی سیکھنے کی جگہ جہاں قرآن، دعائیں، کہانیاں اور خوشگوار مشق۔')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/deen/quran" className="rounded-full bg-[#1f784a] px-6 py-3 font-semibold text-white shadow">
                {pick('Start Quran', 'قرآن شروع کریں')}
              </Link>
              <Link href="/deen/duas" className="rounded-full border border-[#2f8a4a] bg-white px-6 py-3 font-semibold text-[#1f784a]">
                {pick('Daily Duas', 'روزانہ کی دعائیں')}
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-[#cfe9d4] bg-white/80 p-6 shadow-lg backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4f8f5d]">
              {pick('Phase 3 learning path', 'فیز 3 سیکھنے کا راستہ')}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[#2b4d37]">
              <li>• {pick('Learn Quran with step-by-step Tajweed', 'تجوید کے ساتھ مرحلہ وار قرآن سیکھیں')}</li>
              <li>• {pick('Build a daily duas habit', 'روزانہ کی دعاؤں کی عادت بنائیں')}</li>
              <li>• {pick('Memorize Allah’s names with playful cards', 'کھیلوں والی کارڈز سے اللہ کے نام حفظ کریں')}</li>
              <li>• {pick('Grow through stories, reflection, and encouragement', 'کہانیوں، فکر اور حوصلہ افزائی کے ساتھ ترقی کریں')}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {FEATURES.map((item) => (
            <div key={item.id} className="rounded-3xl border border-[#d8ead9] bg-white p-6 shadow-sm">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h2 className="text-xl font-bold text-[#144a2b] mb-2">
                {pick(item.titleEn, item.titleUr)}
              </h2>
              <p className="text-sm leading-7 text-[#446850] mb-5">
                {pick(item.descEn, item.descUr)}
              </p>
              {item.href === '#' ? (
                <button className="rounded-full border border-[#a7cfa7] px-4 py-2 text-sm font-semibold text-[#3b6a45]">
                  {pick('Coming Soon', 'جلد آ رہا ہے')}
                </button>
              ) : (
                <Link href={item.href} className="inline-flex rounded-full bg-[#1f784a] px-4 py-2 text-sm font-semibold text-white">
                  {item.action === 'Start' ? pick('Start', 'شروع کریں') : item.action}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
