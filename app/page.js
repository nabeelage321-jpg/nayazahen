'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/lang';
import { CITIES } from '@/data/cities';
import { FEATURES, EARN_TASKS, TESTIMONIALS } from '@/data/index';
import LeadForm from '@/components/LeadForm';

/* ---------------------------------------------------------
   Animated counter — counts up once the element scrolls
   into view, then stays put. Respects reduced-motion.
--------------------------------------------------------- */
function AnimatedCounter({ target, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
              setValue(Math.round(target * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const { lang } = useLang();
  const isEn = lang === 'en';

  const stats = [
    { target: 60, suffix: '+', labelEn: 'Cities Covered', labelUr: 'شہر' },
    { target: 500, suffix: '+', labelEn: 'Kids Learning', labelUr: 'بچے سیکھ رہے ہیں' },
    { target: 5, suffix: '', labelEn: 'Languages', labelUr: 'زبانیں' },
    { target: 11, suffix: '', labelEn: 'Ways to Earn', labelUr: 'کمانے کے طریقے' },
  ];

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-plum to-ink text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
          <span className="badge bg-white/10 !text-white border border-white/20">
            پاکستان کا پہلا AI تعلیمی پلیٹ فارم
          </span>

          <h1 className="font-urdu font-black text-4xl sm:text-5xl md:text-6xl leading-[1.6] mt-6 mb-4" dir="rtl">
            نیا ذہن — سیکھیں، کمائیں، آگے بڑھیں
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
            {isEn
              ? 'Free AI education for children ages 3–21, in Urdu, Punjabi, Sindhi, Pashto & English — with real PKR earnings from age 7.'
              : 'عمر 3 سے 21 سال کے بچوں کے لیے مفت AI تعلیم — اردو، پنجابی، سندھی، پشتو اور انگریزی میں۔ عمر 7 سال سے حقیقی کمائی۔'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="btn-primary">
              {isEn ? 'Start Free' : 'مفت شروع کریں'}
            </Link>
            <Link href="/earn" className="btn-secondary !border-white/40 !text-white hover:!bg-white/10">
              {isEn ? 'Start Earning' : 'کمانا شروع کریں'}
            </Link>
          </div>
        </div>

        {/* ============ STATS BAR ============ */}
        <div className="relative border-t border-white/10 bg-black/20">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.labelEn}>
                <div className="font-display font-black text-3xl md:text-4xl text-gold-l">
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-sm text-white/60 mt-1">
                  {isEn ? s.labelEn : s.labelUr}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SIX PILLARS ============ */}
      <section className="section max-w-6xl mx-auto px-6 py-20">
        <h2 className="section-title">
          {isEn ? 'Six Pillars of Naya Zehan' : 'نئے ذہن کے چھ ستون'}
        </h2>
        <p className="section-sub">
          {isEn
            ? 'One platform, six ways to grow — from games to real income.'
            : 'ایک پلیٹ فارم، ترقی کے چھ راستے — گیمز سے لے کر حقیقی آمدنی تک۔'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.id} className="card p-6 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: f.color }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                style={{ backgroundColor: `${f.color}1A` }}
              >
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-ink mb-2">
                {isEn ? f.titleEn : f.titleUr}
              </h3>
              <p className="text-ink3 text-sm leading-relaxed">
                {isEn ? f.descEn : f.descUr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CITIES PREVIEW ============ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="section-title">
          {isEn ? 'Built for Your City' : 'آپ کے شہر کے لیے بنایا گیا'}
        </h2>
        <p className="section-sub">
          {isEn
            ? 'Local content and local earning opportunities in 60+ Pakistani cities.'
            : '60 سے زائد پاکستانی شہروں میں مقامی مواد اور مقامی مواقع۔'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {CITIES.slice(0, 8).map((city) => (
            <Link key={city.id} href={`/cities/${city.id}`} className="card p-5 text-center block">
              <div className="text-3xl mb-2">{city.emoji}</div>
              <div className="font-display font-bold text-ink">{city.name}</div>
              <div className="font-urdu text-ink3 text-sm mb-2" dir="rtl">{city.nameUr}</div>
              <span className="badge">{city.province}</span>
              <div className="text-xs text-ink3 mt-3 flex justify-center gap-3">
                <span>👦 {city.kids}</span>
                <span>🏫 {city.schools}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/cities" className="btn-secondary">
            {isEn ? 'See All Cities' : 'تمام شہر دیکھیں'}
          </Link>
        </div>
      </section>

      {/* ============ EARN TASKS PREVIEW ============ */}
      <section className="bg-gradient-to-br from-teal to-[#043D2B] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-title !text-white">
            {isEn ? 'Kids Really Earn Here' : 'یہاں بچے واقعی کماتے ہیں'}
          </h2>
          <p className="section-sub !text-white/70">
            {isEn
              ? 'Real tasks. Real clients. Real PKR — paid via JazzCash & EasyPaisa.'
              : 'حقیقی کام۔ حقیقی کلائنٹس۔ حقیقی روپے — JazzCash اور EasyPaisa کے ذریعے۔'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EARN_TASKS.slice(0, 6).map((task) => (
              <div key={task.id} className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-6">
                <div className="text-2xl mb-3">{task.icon}</div>
                <h3 className="font-display font-bold text-white mb-1">
                  {isEn ? task.titleEn : task.titleUr}
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  {isEn ? task.descEn : task.descUr}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gold-l font-semibold">{task.perTask}</span>
                  <span className="text-white/50">{task.age}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/earn" className="btn-primary !bg-gold !text-ink">
              {isEn ? 'See All Ways to Earn' : 'کمانے کے تمام طریقے دیکھیں'}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="section-title">
          {isEn ? 'What Families Are Saying' : 'خاندان کیا کہتے ہیں'}
        </h2>
        <p className="section-sub">
          {isEn ? 'Real stories from real Pakistani families.' : 'حقیقی پاکستانی خاندانوں کی کہانیاں۔'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="card p-6">
              <div className="text-3xl mb-3">{t.avatar}</div>
              <p className="text-ink text-sm leading-relaxed mb-4">
                &ldquo;{isEn ? t.quoteEn : t.quoteUr}&rdquo;
              </p>
              <div className="text-sm font-semibold text-ink">
                {isEn ? t.name : t.nameUr}
              </div>
              <div className="text-xs text-ink3">{t.role} · {t.city}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ LEAD FORM ============ */}
      <section className="bg-paper2 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="section-title">
            {isEn ? 'Be First to Know' : 'سب سے پہلے جانیں'}
          </h2>
          <p className="section-sub">
            {isEn
              ? 'Leave your details and we\u2019ll reach out when Naya Zehan launches in your city.'
              : 'اپنی تفصیلات چھوڑیں، جب نیا ذہن آپ کے شہر میں لانچ ہو گا تو ہم رابطہ کریں گے۔'}
          </p>
          <LeadForm />
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-plum py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">
            {isEn ? 'Your Child\u2019s Future Starts Today' : 'آپ کے بچے کا مستقبل آج شروع ہوتا ہے'}
          </h2>
          <p className="text-white/70 mb-8">
            {isEn
              ? 'Join thousands of Pakistani families already learning and earning with Naya Zehan.'
              : 'ہزاروں پاکستانی خاندانوں کے ساتھ شامل ہوں جو پہلے ہی نئے ذہن کے ساتھ سیکھ اور کما رہے ہیں۔'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="btn-primary !bg-white !text-plum">
              {isEn ? 'Get Started Free' : 'مفت شروع کریں'}
            </Link>
            <Link href="/earn" className="btn-teal">
              {isEn ? 'Explore Earning' : 'کمائی دیکھیں'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
