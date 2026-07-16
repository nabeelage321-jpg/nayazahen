'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

export default function CityPageClient({ city, nearbyCities, earnTasks, ages }) {
  const { lang, dir, isEn, pick } = useLang();
  const fontClass = isEn ? '' : 'font-urdu';

  const t = {
    heroKicker: pick('Now live in', 'اب دستیاب ہے'),
    kids: pick('Kids Ready to Learn', 'تعلیم کے منتظر بچے'),
    schools: pick('Partner Schools', 'شراکت دار اسکول'),
    pop: pick('City Population', 'شہر کی آبادی'),
    earnTitle: pick('Ways Kids in', 'میں بچے'),
    earnTitle2: pick('Are Earning', 'یوں کما رہے ہیں'),
    earnSub: pick(
      'Real Pakistani rupees, paid straight to JazzCash or EasyPaisa.',
      'حقیقی پاکستانی روپے، سیدھا جاز کیش یا ایزی پیسہ میں۔'
    ),
    perTask: pick('per task', 'فی کام'),
    monthly: pick('per month', 'ماہانہ'),
    agesTitle: pick('Programs by Age', 'عمر کے مطابق پروگرام'),
    agesSub: pick(
      `Every stage from 3 to 21, built for kids in ${city.name}.`,
      `3 سے 21 سال تک ہر مرحلہ، ${city.nameUr} کے بچوں کے لیے۔`
    ),
    seeProgram: pick('See program', 'پروگرام دیکھیں'),
    nearbyTitle: pick('Nearby Cities', 'قریبی شہر'),
    nearbySub: pick(
      `Other cities in ${city.province} joining Naya Zehan.`,
      `${city.province} کے دیگر شہر جو نیا ذہن میں شامل ہو رہے ہیں۔`
    ),
    ctaTitle: pick(
      `Bring Naya Zehan to your family in ${city.name}`,
      `${city.nameUr} میں اپنے خاندان کے لیے نیا ذہن لائیں`
    ),
    ctaSub: pick(
      'Free to join. Takes two minutes. No credit card, ever.',
      'شامل ہونا مفت ہے۔ صرف دو منٹ لگتے ہیں۔'
    ),
    ctaBtn: pick('Start Free Today', 'آج ہی مفت شروع کریں'),
  };

  return (
    <div dir={dir} className={fontClass}>
      {/* HERO */}
      <section className="bg-paper2 border-b border-paper3 pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-6xl mb-4">{city.emoji}</div>
          <p className="badge inline-block mb-4">{t.heroKicker} {city.province}</p>
          <h1 className="font-display text-4xl md:text-6xl font-black text-ink mb-4">
            {pick(city.name, city.nameUr)}
          </h1>
          <p className="text-lg md:text-xl text-ink3 max-w-2xl mx-auto mb-10">
            {pick(city.tagEn, city.tagUr)}
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="card py-6 px-3">
              <div className="text-2xl md:text-3xl font-display font-black text-plum">
                {city.kids}
              </div>
              <div className="text-xs md:text-sm text-ink3 mt-1">{t.kids}</div>
            </div>
            <div className="card py-6 px-3">
              <div className="text-2xl md:text-3xl font-display font-black text-teal">
                {city.schools}+
              </div>
              <div className="text-xs md:text-sm text-ink3 mt-1">{t.schools}</div>
            </div>
            <div className="card py-6 px-3">
              <div className="text-2xl md:text-3xl font-display font-black text-ink">
                {city.pop}
              </div>
              <div className="text-xs md:text-sm text-ink3 mt-1">{t.pop}</div>
            </div>
          </div>
        </div>
      </section>

      {/* EARNING TASKS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">
            {t.earnTitle} {pick(city.name, city.nameUr)} {t.earnTitle2}
          </h2>
          <p className="section-sub">{t.earnSub}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {earnTasks.map((task) => (
              <div key={task.id} className="card p-6">
                <div className="text-4xl mb-3">{task.icon}</div>
                <h3 className="font-display font-bold text-lg text-ink mb-1">
                  {pick(task.titleEn, task.titleUr)}
                </h3>
                <p className="text-sm text-ink3 mb-4">
                  {pick(task.descEn, task.descUr)}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="badge">{task.age}</span>
                  <span className="text-teal font-bold">{task.perTask}</span>
                </div>
                <div className="mt-2 text-xs text-ink3">
                  {task.monthly} {t.monthly}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGE PROGRAMS */}
      <section className="py-16 px-6 bg-paper2">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">{t.agesTitle}</h2>
          <p className="section-sub">{t.agesSub}</p>

          <div className="grid sm:grid-cols-3 gap-6">
            {ages.map((age) => (
              <Link
                key={age.id}
                href={`/ages/${age.id}`}
                className="card p-6 block hover:-translate-y-1 transition-transform"
              >
                <div className="text-4xl mb-3">{age.icon}</div>
                <span
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-3"
                  style={{ backgroundColor: age.color }}
                >
                  {age.range} {pick('years', 'سال')}
                </span>
                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  {pick(age.stage, age.stageUr)}
                </h3>
                <p className="text-sm text-ink3 mb-3">
                  {pick(age.focusEn, age.focusUr)}
                </p>
                <span className="text-teal text-sm font-bold">
                  {t.seeProgram} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY CITIES */}
      {nearbyCities.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title">{t.nearbyTitle}</h2>
            <p className="section-sub">{t.nearbySub}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {nearbyCities.map((nc) => (
                <Link
                  key={nc.id}
                  href={`/cities/${nc.id}`}
                  className="card p-6 text-center block hover:-translate-y-1 transition-transform"
                >
                  <div className="text-4xl mb-2">{nc.emoji}</div>
                  <h3 className="font-display font-bold text-ink">
                    {pick(nc.name, nc.nameUr)}
                  </h3>
                  <p className="text-xs text-ink3 mt-1">{nc.kids} {t.kids}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section className="bg-plum py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-white/80 mb-8 text-lg">{t.ctaSub}</p>
          <Link href="/signup" className="btn-teal inline-block px-8 py-4 text-lg">
            {t.ctaBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
