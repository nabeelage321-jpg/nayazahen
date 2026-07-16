'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';
import { EARN_TASKS } from '@/data/index';

export default function EarnPage() {
  const { lang } = useLang();
  const isEn = lang === 'en';

  const steps = [
    {
      n: '01',
      icon: '📝',
      titleEn: 'Sign Up & Verify Age',
      titleUr: 'سائن اپ اور عمر کی تصدیق',
      descEn: 'Create a free account. Under-18 accounts link to a parent for approval.',
      descUr: 'مفت اکاؤنٹ بنائیں۔ 18 سال سے کم عمر اکاؤنٹس والدین کی منظوری سے منسلک ہوتے ہیں۔',
    },
    {
      n: '02',
      icon: '🎯',
      titleEn: 'Pick a Task',
      titleUr: 'ایک کام منتخب کریں',
      descEn: 'Choose from 11 age-appropriate tasks — labelling, design, voice, tutoring & more.',
      descUr: '11 عمر کے مطابق کاموں میں سے چنیں — لیبلنگ، ڈیزائن، آواز، ٹیوٹرنگ اور مزید۔',
    },
    {
      n: '03',
      icon: '✅',
      titleEn: 'Complete & Submit',
      titleUr: 'مکمل کریں اور جمع کروائیں',
      descEn: 'Zehan Kamai guides you through the task and checks your work before submission.',
      descUr: 'زہن کمائی آپ کو کام میں رہنمائی دیتا ہے اور جمع کروانے سے پہلے کام چیک کرتا ہے۔',
    },
    {
      n: '04',
      icon: '💸',
      titleEn: 'Get Paid',
      titleUr: 'ادائیگی حاصل کریں',
      descEn: 'Cash out from Rs 200 via JazzCash or EasyPaisa, with parent approval if under 18.',
      descUr: 'Rs 200 سے JazzCash یا EasyPaisa کے ذریعے نکالیں، 18 سال سے کم عمر پر والدین کی منظوری درکار ہے۔',
    },
  ];

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="bg-gradient-to-br from-teal to-[#053B2A] text-white">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <span className="badge bg-white/10 !text-white border border-white/20">
            {isEn ? 'Kamai · Creator Economy for Kids' : 'کمائی · بچوں کے لیے کمائی کا نظام'}
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl mt-6 mb-4">
            {isEn ? 'Real Skills. Real Clients. Real PKR.' : 'حقیقی ہنر۔ حقیقی کلائنٹس۔ حقیقی روپے۔'}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            {isEn
              ? 'From age 7, kids on Naya Zehan complete real digital tasks for real clients — and get paid straight to a parent-approved wallet.'
              : 'عمر 7 سال سے، نیا ذہن پر بچے حقیقی کلائنٹس کے لیے حقیقی ڈیجیٹل کام کرتے ہیں — اور والدین کی منظوری والے والیٹ میں براہ راست ادائیگی پاتے ہیں۔'}
          </p>
          <Link href="/signup" className="btn-primary !bg-gold !text-ink">
            {isEn ? 'Start Earning Today' : 'آج ہی کمانا شروع کریں'}
          </Link>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="section-title">{isEn ? 'How It Works' : 'یہ کیسے کام کرتا ہے'}</h2>
        <p className="section-sub">
          {isEn ? 'Four simple steps from sign-up to your first payout.' : 'سائن اپ سے پہلی ادائیگی تک چار آسان مراحل۔'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.n} className="card p-6 relative">
              <div className="text-xs font-bold text-teal/60 tracking-widest mb-3">{step.n}</div>
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="font-display font-bold text-ink mb-2">
                {isEn ? step.titleEn : step.titleUr}
              </h3>
              <p className="text-ink3 text-sm leading-relaxed">
                {isEn ? step.descEn : step.descUr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ALL TASKS ============ */}
      <section className="bg-paper2 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-title">{isEn ? 'All Ways to Earn' : 'کمانے کے تمام طریقے'}</h2>
          <p className="section-sub">
            {isEn ? '11 tasks, matched to your child\u2019s age and skill level.' : '11 کام، آپ کے بچے کی عمر اور مہارت کے مطابق۔'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EARN_TASKS.map((task) => (
              <div key={task.id} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{task.icon}</div>
                  <span className="badge">{task.age}</span>
                </div>
                <h3 className="font-display font-bold text-ink mb-1">
                  {isEn ? task.titleEn : task.titleUr}
                </h3>
                <p className="text-ink3 text-sm leading-relaxed mb-4">
                  {isEn ? task.descEn : task.descUr}
                </p>
                <div className="flex items-center justify-between text-sm pt-3 border-t border-paper3">
                  <div>
                    <div className="text-ink3 text-xs">{isEn ? 'Per task' : 'فی کام'}</div>
                    <div className="font-semibold text-teal">{task.perTask}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-ink3 text-xs">{isEn ? 'Monthly' : 'ماہانہ'}</div>
                    <div className="font-semibold text-gold">{task.monthly}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PAYMENT METHODS ============ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="section-title">{isEn ? 'Getting Paid' : 'ادائیگی کیسے ملتی ہے'}</h2>
        <p className="section-sub">
          {isEn
            ? 'Minimum withdrawal Rs 200. Parent approval required for accounts under 18.'
            : 'کم از کم نکاسی Rs 200۔ 18 سال سے کم عمر اکاؤنٹس کے لیے والدین کی منظوری لازمی ہے۔'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-coral-p flex items-center justify-center text-3xl mx-auto mb-4">
              📱
            </div>
            <h3 className="font-display font-bold text-ink mb-2">JazzCash</h3>
            <p className="text-ink3 text-sm">
              {isEn ? 'Instant transfer to any JazzCash wallet.' : 'کسی بھی JazzCash والیٹ میں فوری منتقلی۔'}
            </p>
          </div>

          <div className="card p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-p flex items-center justify-center text-3xl mx-auto mb-4">
              💳
            </div>
            <h3 className="font-display font-bold text-ink mb-2">EasyPaisa</h3>
            <p className="text-ink3 text-sm">
              {isEn ? 'Instant transfer to any EasyPaisa wallet.' : 'کسی بھی EasyPaisa والیٹ میں فوری منتقلی۔'}
            </p>
          </div>

          <div className="card p-8 text-center opacity-70">
            <div className="w-16 h-16 rounded-2xl bg-plum-p flex items-center justify-center text-3xl mx-auto mb-4">
              🏦
            </div>
            <h3 className="font-display font-bold text-ink mb-2">
              {isEn ? 'Bank Transfer' : 'بینک ٹرانسفر'}
            </h3>
            <p className="text-ink3 text-sm mb-2">
              {isEn ? 'Direct transfer for older creators.' : 'بڑی عمر کے کمانے والوں کے لیے براہ راست منتقلی۔'}
            </p>
            <span className="badge">{isEn ? 'Coming Soon' : 'جلد آ رہا ہے'}</span>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-plum py-20">
        <div className="max-w-2xl mx-auto px-6 text-center text-white">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">
            {isEn ? 'Ready to Start Earning?' : 'کمانا شروع کرنے کے لیے تیار ہیں؟'}
          </h2>
          <p className="text-white/70 mb-8">
            {isEn
              ? 'Sign up in minutes and pick your first task today.'
              : 'منٹوں میں سائن اپ کریں اور آج ہی اپنا پہلا کام منتخب کریں۔'}
          </p>
          <Link href="/signup" className="btn-primary !bg-white !text-plum">
            {isEn ? 'Sign Up Free' : 'مفت سائن اپ کریں'}
          </Link>
        </div>
      </section>
    </main>
  );
}
