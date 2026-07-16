'use client';

import Link from 'next/link';
import { AGES } from '@/data';
import { useLang } from '@/lib/lang';

export default function AgesPage() {
  const { dir, isEn, pick } = useLang();
  const fontClass = isEn ? '' : 'font-urdu';

  const t = {
    kicker: pick('9 Stages, Ages 3–21', '9 مراحل، عمر 3–21'),
    title: pick('A Program for Every Age', 'ہر عمر کے لیے پروگرام'),
    sub: pick(
      'From first taps on a tablet to first real paychecks — Naya Zehan grows with your child.',
      'ٹیبلٹ پر پہلی چھو سے لے کر پہلی حقیقی تنخواہ تک — نیا ذہن آپ کے بچے کے ساتھ بڑھتا ہے۔'
    ),
    years: pick('years', 'سال'),
  };

  return (
    <div dir={dir} className={fontClass}>
      <section className="pt-20 pb-10 px-6 text-center bg-paper2 border-b border-paper3">
        <p className="badge inline-block mb-4">{t.kicker}</p>
        <h1 className="font-display text-4xl md:text-6xl font-black text-ink mb-4">
          {t.title}
        </h1>
        <p className="text-lg text-ink3 max-w-2xl mx-auto">{t.sub}</p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGES.map((age) => (
            <Link
              key={age.id}
              href={`/ages/${age.id}`}
              className="card p-6 block hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{age.icon}</div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: age.color }}
                >
                  {age.range} {t.years}
                </span>
              </div>

              <h2 className="font-display font-bold text-xl text-ink mb-2">
                {pick(age.stage, age.stageUr)}
              </h2>

              <p className="text-sm text-ink3 mb-4">
                {pick(age.focusEn, age.focusUr)}
              </p>

              <span
                className="inline-block text-xs font-bold px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: `${age.color}1A`,
                  color: age.color,
                }}
              >
                💰 {age.earning}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
