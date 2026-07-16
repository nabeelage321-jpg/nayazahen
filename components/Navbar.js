'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/lang';

const LANGUAGES = [
  { code: 'ur', flag: '🇵🇰', name: 'اردو', rtl: true },
  { code: 'en', flag: '🇬🇧', name: 'English', rtl: false },
  { code: 'pa', flag: '🇵🇰', name: 'پنجابی', rtl: true },
  { code: 'sd', flag: '🇵🇰', name: 'سنڌي', rtl: true },
  { code: 'ps', flag: '🇦🇫', name: 'پښتو', rtl: true },
];

const TEXT = {
  login: { ur: 'لاگ ان', en: 'Login', pa: 'لاگ ان', sd: 'لاگ ان', ps: 'ننوتل' },
  signup: { ur: 'مفت اکاؤنٹ بنائیں', en: 'Sign Up', pa: 'سائن اپ', sd: 'سائن اپ', ps: 'نوم لیکنه' },
  nav_courses: { ur: 'کورسز', en: 'Courses', pa: 'کورسز', sd: 'ڪورس', ps: 'کورسونه' },
  nav_teachers: { ur: 'اساتذہ', en: 'Teachers', pa: 'اساتذہ', sd: 'استاد', ps: 'ښوونکي' },
  nav_pricing: { ur: 'قیمت', en: 'Pricing', pa: 'قیمت', sd: 'قيمت', ps: 'نرخونه' },
  nav_about: { ur: 'ہمارے بارے میں', en: 'About', pa: 'ساڈے بارے', sd: 'اسان بابت', ps: 'زموږ په اړه' },
};

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const isRTL = ['ur', 'pa', 'sd', 'ps'].includes(lang);
  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const t = (key) => TEXT[key]?.[lang] || TEXT[key]?.en || key;

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      dir={isRTL ? 'rtl' : 'ltr'}
      className="sticky top-0 z-50 bg-[#FAFAF5] border-b border-[#E5E3D5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🧠</span>
            <span className={`text-xl font-bold text-[#42188C] ${isRTL ? 'font-urdu' : ''}`}>
              {isRTL ? 'نیا ذہن' : 'Naya Zehan'}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className={`hidden md:flex items-center gap-8 ${isRTL ? 'font-urdu' : ''}`}>
            <Link href="/courses" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_courses')}
            </Link>
            <Link href="/teachers" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_teachers')}
            </Link>
            <Link href="/pricing" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_pricing')}
            </Link>
            <Link href="/about" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_about')}
            </Link>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E5E3D5] bg-white hover:bg-[#F2F1E8] transition-colors text-sm"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <span>{currentLang.flag}</span>
                <span className={currentLang.rtl ? 'font-urdu' : ''}>{currentLang.name}</span>
                <svg
                  className={`w-3.5 h-3.5 text-[#0D0D1A]/60 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <div
                  className="absolute end-0 mt-2 w-44 rounded-lg border border-[#E5E3D5] bg-white shadow-lg overflow-hidden z-50"
                  role="listbox"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[#F2F1E8] transition-colors ${
                        l.code === lang ? 'bg-[#F2F1E8] text-[#42188C] font-semibold' : 'text-[#0D0D1A]'
                      } ${l.rtl ? 'font-urdu flex-row-reverse justify-end' : ''}`}
                      role="option"
                      aria-selected={l.code === lang}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login / Signup - desktop only */}
            <div className={`hidden sm:flex items-center gap-2 ${isRTL ? 'font-urdu' : ''}`}>
              <Link href="/login" className="btn-secondary text-sm px-4 py-2">
                {t('login')}
              </Link>
              <Link href="/signup" className="btn-primary text-sm px-4 py-2">
                {t('signup')}
              </Link>
            </div>

            {/* Hamburger - mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg hover:bg-[#F2F1E8] transition-colors"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6 text-[#0D0D1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={`md:hidden pb-4 flex flex-col gap-1 ${isRTL ? 'font-urdu text-right' : ''}`}>
            <Link
              href="/courses"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_courses')}
            </Link>
            <Link
              href="/teachers"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_teachers')}
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_pricing')}
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_about')}
            </Link>
            <div className="flex gap-2 px-3 pt-3 sm:hidden">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-secondary text-sm px-4 py-2 flex-1 text-center"
              >
                {t('login')}
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-sm px-4 py-2 flex-1 text-center"
              >
                {t('signup')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
