'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

const TEXT = {
  tagline: {
    ur: 'پاکستان کا پہلا مصنوعی ذہانت پر مبنی تعلیمی پلیٹ فارم۔ ہر بچے تک معیاری تعلیم پہنچانا۔',
    en: "Pakistan's first AI-powered education platform. Quality learning for every child.",
    pa: 'پاکستان دا پہلا اے آئی تعلیمی پلیٹ فارم۔ ہر بچے تک معیاری تعلیم۔',
    sd: 'پاڪستان جو پھريون AI تعليمي پليٽ فارم۔ هر ٻار تائين معياري تعليم.',
    ps: 'د پاکستان لومړی د AI زده کړې پلیټ فارم. هر ماشوم ته کيفيت لرونکې زده کړه.',
  },
  platform: { ur: 'پلیٹ فارم', en: 'Platform', pa: 'پلیٹ فارم', sd: 'پليٽ فارم', ps: 'پلیټ فارم' },
  platform_courses: { ur: 'کورسز', en: 'Courses', pa: 'کورسز', sd: 'ڪورس', ps: 'کورسونه' },
  platform_teachers: { ur: 'اساتذہ', en: 'Teachers', pa: 'اساتذہ', sd: 'استاد', ps: 'ښوونکي' },
  platform_pricing: { ur: 'قیمتیں', en: 'Pricing', pa: 'قیمتاں', sd: 'قيمتون', ps: 'نرخونه' },
  platform_app: { ur: 'موبائل ایپ', en: 'Mobile App', pa: 'موبائل ایپ', sd: 'موبائل ايپ', ps: 'د موبایل اېپ' },
  learn: { ur: 'سیکھیں', en: 'Learn', pa: 'سکھو', sd: 'سکو', ps: 'زده کړه' },
  learn_matric: { ur: 'میٹرک', en: 'Matric', pa: 'میٹرک', sd: 'ميٽرڪ', ps: 'میټرک' },
  learn_fsc: { ur: 'ایف ایس سی', en: 'FSc / Intermediate', pa: 'ایف ایس سی', sd: 'ايف ايس سي', ps: 'FSc' },
  learn_entry_test: { ur: 'انٹری ٹیسٹ کی تیاری', en: 'Entry Test Prep', pa: 'انٹری ٹیسٹ تیاری', sd: 'انٽري ٽيسٽ تياري', ps: 'د ننوتلو ازموینه' },
  learn_english: { ur: 'انگلش کورسز', en: 'English Courses', pa: 'انگلش کورسز', sd: 'انگلش ڪورس', ps: 'د انګلیسي کورسونه' },
  cities: { ur: 'مقبول شہر', en: 'Popular Cities', pa: 'مشہور شہر', sd: 'مشھور شھر', ps: 'مشهور ښارونه' },
  city_lahore: { ur: 'لاہور', en: 'Lahore', pa: 'لہور', sd: 'لاهور', ps: 'لاهور' },
  city_karachi: { ur: 'کراچی', en: 'Karachi', pa: 'کراچی', sd: 'ڪراچي', ps: 'کراچي' },
  city_islamabad: { ur: 'اسلام آباد', en: 'Islamabad', pa: 'اسلام آباد', sd: 'اسلام آباد', ps: 'اسلام آباد' },
  city_faisalabad: { ur: 'فیصل آباد', en: 'Faisalabad', pa: 'فیصل آباد', sd: 'فيصل آباد', ps: 'فیصل آباد' },
  city_multan: { ur: 'ملتان', en: 'Multan', pa: 'ملتان', sd: 'ملتان', ps: 'ملتان' },
  city_peshawar: { ur: 'پشاور', en: 'Peshawar', pa: 'پشاور', sd: 'پشاور', ps: 'پېښور' },
  rights: {
    ur: 'جملہ حقوق محفوظ ہیں۔',
    en: 'All rights reserved.',
    pa: 'سارے حقوق محفوظ ہیں۔',
    sd: 'سڀ حق محفوظ آهن.',
    ps: 'ټول حقونه خوندي دي.',
  },
};

const PLATFORM_LINKS = [
  { label: 'Cities', href: '/cities' },
  { label: 'Ages', href: '/ages' },
  { label: 'Earn', href: '/earn' },
  { label: 'Games', href: '/games' },
  { label: 'Deen', href: '/deen' },
  { label: 'Schools', href: '/schools' },
];

const LEARN_LINKS = [
  { label: 'Quran', href: '/deen/quran' },
  { label: 'Daily Duas', href: '/deen/duas' },
  { label: '99 Names', href: '/deen/99names' },
  { label: 'Quiz', href: '/quiz' },
];

const TOOLS_LINKS = [
  { label: 'NZ-ID', href: '/nz-id' },
  { label: 'Premium', href: '/premium' },
  { label: 'Teacher Portal', href: '/teacher' },
  { label: 'Creator Hub', href: '/creator' },
];

const POPULAR_CITY_LINKS = [
  { label: 'Lahore', href: '/cities/lahore' },
  { label: 'Karachi', href: '/cities/karachi' },
  { label: 'Islamabad', href: '/cities/islamabad' },
  { label: 'Peshawar', href: '/cities/peshawar' },
  { label: 'Quetta', href: '/cities/quetta' },
  { label: 'Multan', href: '/cities/multan' },
];

export default function Footer() {
  const { lang } = useLang();
  const isRTL = ['ur', 'pa', 'sd', 'ps'].includes(lang);
  const t = (key) => TEXT[key]?.[lang] || TEXT[key]?.en || key;

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} className="bg-[#0D0D1A] text-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 ${isRTL ? 'font-urdu text-right' : ''}`}>
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧠</span>
              <span className="text-lg font-bold text-white">
                {isRTL ? 'نیا ذہن' : 'Naya Zehan'}
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{t('tagline')}</p>
          </div>

          {/* Platform column */}
          <div>
            <h3 className="text-sm font-semibold text-[#B8860A] uppercase tracking-wide mb-4">
              {t('platform')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn column */}
          <div>
            <h3 className="text-sm font-semibold text-[#B8860A] uppercase tracking-wide mb-4">
              {t('learn')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {LEARN_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools column */}
          <div>
            <h3 className="text-sm font-semibold text-[#B8860A] uppercase tracking-wide mb-4">
              Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              {TOOLS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular cities column */}
          <div>
            <h3 className="text-sm font-semibold text-[#B8860A] uppercase tracking-wide mb-4">
              {t('cities')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {POPULAR_CITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-4 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">🇵🇰 Made in Pakistan</span>
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/terms" className="hover:text-white">Terms of Service</a>
            <a href="/contact" className="hover:text-white">Contact</a>
            <a href="/about" className="hover:text-white">About</a>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-urdu">نیا ذہن © 2025</span>
            <span>Launch: Aug 14, 2025</span>
            <p>{t('rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
