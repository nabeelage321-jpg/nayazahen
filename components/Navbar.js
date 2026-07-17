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
  nav_home: { ur: 'ہوم', en: 'Home', pa: 'ہوم', sd: 'ہوم', ps: 'کور' },
  nav_cities: { ur: 'شہر', en: 'Cities', pa: 'شہر', sd: 'شهر', ps: 'ښار' },
  nav_ages: { ur: 'عمر', en: 'Ages', pa: 'عمر', sd: 'عمر', ps: 'عمر' },
  nav_earn: { ur: 'کمائی', en: 'Earn', pa: 'کمائی', sd: 'کمايو', ps: 'کمۍ' },
  nav_blog: { ur: 'بلاگ', en: 'Blog', pa: 'بلاگ', sd: 'بلاگ', ps: 'بلاگ' },
  nav_schools: { ur: 'اسکول', en: 'Schools', pa: 'اسکول', sd: 'اسڪول', ps: 'مدرسې' },
  nav_games: { ur: 'گیمز', en: 'Games', pa: 'گیمز', sd: 'گيمز', ps: 'غیمونه' },
  nav_quiz: { ur: 'کوئز', en: 'Quiz', pa: 'کوئز', sd: 'کوئز', ps: 'کوئز' },
  nav_leaderboard: { ur: 'لیڈر بورڈ', en: 'Leaderboard', pa: 'لیڈر بورڈ', sd: 'لیڈر بورڈ', ps: 'لیڈر بورډ' },
};

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const langRef = useRef(null);
  const moreRef = useRef(null);

  const isRTL = ['ur', 'pa', 'sd', 'ps'].includes(lang);
  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const t = (key) => TEXT[key]?.[lang] || TEXT[key]?.en || key;

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
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
            <Link href="/" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_home')}
            </Link>
            <Link href="/cities" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_cities')}
            </Link>
            <Link href="/ages" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_ages')}
            </Link>
            <Link href="/earn" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_earn')}
            </Link>
            <Link href="/blog" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_blog')}
            </Link>
            <Link href="/schools" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_schools')}
            </Link>
            <Link href="/games" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_games')}
            </Link>
            <Link href="/quiz" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_quiz')}
            </Link>
            <Link href="/leaderboard" className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
              {t('nav_leaderboard')}
            </Link>
            <div className="relative" ref={moreRef}>
              <button onClick={() => setMoreOpen((v) => !v)} className="text-[#0D0D1A] hover:text-[#42188C] transition-colors">
                More
              </button>
              {moreOpen && (
                <div className="absolute right-0 mt-3 w-44 rounded-xl border border-[#E5E3D5] bg-white p-2 shadow-lg">
                  <Link href="/about" onClick={() => setMoreOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-[#0D0D1A] hover:bg-[#F2F1E8]">About</Link>
                  <Link href="/contact" onClick={() => setMoreOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-[#0D0D1A] hover:bg-[#F2F1E8]">Contact</Link>
                  <Link href="/pitb" onClick={() => setMoreOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-[#0D0D1A] hover:bg-[#F2F1E8]">PITB Grant</Link>
                  <Link href="/launch" onClick={() => setMoreOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-[#0D0D1A] hover:bg-[#F2F1E8]">Launch</Link>
                </div>
              )}
            </div>
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
              <Link href="/signup" className="btn-secondary text-sm px-4 py-2">
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
              href="/"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_home')}
            </Link>
            <Link
              href="/cities"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_cities')}
            </Link>
            <Link
              href="/ages"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_ages')}
            </Link>
            <Link
              href="/earn"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_earn')}
            </Link>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_blog')}
            </Link>
            <Link
              href="/schools"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_schools')}
            </Link>
            <Link
              href="/games"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_games')}
            </Link>
            <Link
              href="/quiz"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_quiz')}
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]"
            >
              {t('nav_leaderboard')}
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]">About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]">Contact</Link>
            <Link href="/pitb" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]">PITB Grant</Link>
            <Link href="/launch" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-[#F2F1E8] text-[#0D0D1A]">Launch</Link>
            <div className="flex gap-2 px-3 pt-3 sm:hidden">
              <Link
                href="/signup"
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
