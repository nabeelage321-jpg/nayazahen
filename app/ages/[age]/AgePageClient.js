'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

// Builds a 4-stage / 16-week roadmap skeleton around the age group's stage + focus copy.
function buildRoadmap(age, pick) {
  const stageLabel = pick(age.stage, age.stageUr);

  return [
    {
      weeks: pick('Weeks 1–4', 'ہفتہ 1–4'),
      titleEn: 'Get Comfortable',
      titleUr: 'خود اعتمادی حاصل کریں',
      descEn: `Kids meet Zehan Ustad, explore the basics, and warm up with guided practice suited to the ${stageLabel} stage.`,
      descUr: `بچے زہن استاد سے ملتے ہیں، بنیادی باتیں سیکھتے ہیں اور ${stageLabel} کے مطابق رہنمائی کے ساتھ مشق کرتے ہیں۔`,
      icon: '🌱',
    },
    {
      weeks: pick('Weeks 5–8', 'ہفتہ 5–8'),
      titleEn: 'Build the Skill',
      titleUr: 'مہارت پیدا کریں',
      descEn: age.focusEn,
      descUr: age.focusUr,
      icon: '🛠️',
    },
    {
      weeks: pick('Weeks 9–12', 'ہفتہ 9–12'),
      titleEn: 'Apply It for Real',
      titleUr: 'حقیقی زندگی میں استعمال کریں',
      descEn: `Kids put the skill to work on real tasks and, where age-eligible, take on their first paid mini-projects.`,
      descUr: `بچے اس مہارت کو حقیقی کاموں میں استعمال کرتے ہیں اور، عمر کے مطابق، پہلے ادا شدہ منی پراجیکٹس شروع کرتے ہیں۔`,
      icon: '🚀',
    },
    {
      weeks: pick('Weeks 13–16', 'ہفتہ 13–16'),
      titleEn: 'Earn & Level Up',
      titleUr: 'کمائیں اور آگے بڑھیں',
      descEn: `Kids complete the stage with a finished portfolio piece and, if eligible, their first JazzCash or EasyPaisa payout.`,
      descUr: `بچے اس مرحلے کو ایک مکمل پورٹ فولیو کے ساتھ ختم کرتے ہیں اور، اگر اہل ہوں، پہلی جاز کیش یا ایزی پیسہ ادائیگی حاصل کرتے ہیں۔`,
      icon: '🏆',
    },
  ];
}

export default function AgePageClient({ age, prevAge, nextAge, earnTasks }) {
  const { dir, isEn, pick } = useLang();
  const fontClass = isEn ? '' : 'font-urdu';
  const roadmap = buildRoadmap(age, pick);

  const t = {
    kicker: pick('Naya Zehan Program', 'نیا ذہن پروگرام'),
    earning: pick('Earning potential', 'کمائی کی صلاحیت'),
    roadmapTitle: pick('Your 16-Week Roadmap', '16 ہفتوں کا منصوبہ'),
    roadmapSub: pick(
      `Exactly how a child in the ${age.range} age group grows with Naya Zehan.`,
      `${age.range} سال کی عمر کا بچہ نیا ذہن کے ساتھ کیسے آگے بڑھتا ہے۔`
    ),
    tasksTitle: pick('Tasks They Can Start With', 'وہ کام جن سے شروعات کر سکتے ہیں'),
    tasksSub: pick(
      'Real, age-appropriate ways to earn while learning.',
      'سیکھتے ہوئے کمانے کے حقیقی اور عمر کے مطابق طریقے۔'
    ),
    perTask: pick('per task', 'فی کام'),
    prev: pick('Previous stage', 'پچھلا مرحلہ'),
    next: pick('Next stage', 'اگلا مرحلہ'),
    allAges: pick('All Ages', 'تمام عمریں'),
    ctaBtn: pick('Start This Program', 'یہ پروگرام شروع کریں'),
  };

  return (
    <div dir={dir} className={fontClass}>
      {/* HERO */}
      <section
        className="pt-20 pb-16 px-6 text-center"
        style={{
          background: `linear-gradient(135deg, ${age.color} 0%, ${age.color}CC 100%)`,
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl mb-4">{age.icon}</div>
          <p className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white mb-4">
            {t.kicker}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-3">
            {age.range} {pick('Years', 'سال')}
          </h1>
          <p className="text-xl text-white/90 font-display font-bold mb-4">
            {pick(age.stage, age.stageUr)}
          </p>
          <p className="text-white/85 text-lg mb-8">{pick(age.focusEn, age.focusUr)}</p>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5">
            <span>💰</span>
            <span className="text-sm font-bold text-ink">
              {t.earning}: {age.earning}
            </span>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">{t.roadmapTitle}</h2>
          <p className="section-sub">{t.roadmapSub}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roadmap.map((m, i) => (
              <div key={i} className="card p-6">
                <div className="text-3xl mb-3">{m.icon}</div>
                <span
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-3"
                  style={{ backgroundColor: age.color }}
                >
                  {m.weeks}
                </span>
                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  {pick(m.titleEn, m.titleUr)}
                </h3>
                <p className="text-sm text-ink3">{pick(m.descEn, m.descUr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELEVANT EARN TASKS */}
      {earnTasks.length > 0 && (
        <section className="py-16 px-6 bg-paper2">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title">{t.tasksTitle}</h2>
            <p className="section-sub">{t.tasksSub}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                    <span className="text-teal font-bold">
                      {task.perTask} {t.perTask}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-plum py-14 px-6 text-center">
        <Link href="/signup" className="btn-teal inline-block px-8 py-4 text-lg">
          {t.ctaBtn}
        </Link>
      </section>

      {/* PREV / NEXT NAVIGATION */}
      <section className="py-10 px-6 border-t border-paper3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {prevAge ? (
            <Link
              href={`/ages/${prevAge.id}`}
              className="card px-5 py-4 flex items-center gap-3 flex-1 hover:-translate-y-1 transition-transform"
            >
              <span className="text-2xl">{isEn ? '←' : '→'}</span>
              <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                <div className="text-xs text-ink3">{t.prev}</div>
                <div className="font-bold text-ink">
                  {prevAge.icon} {pick(prevAge.stage, prevAge.stageUr)}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          <Link
            href="/ages"
            className="text-sm font-bold text-plum whitespace-nowrap px-4"
          >
            {t.allAges}
          </Link>

          {nextAge ? (
            <Link
              href={`/ages/${nextAge.id}`}
              className="card px-5 py-4 flex items-center gap-3 flex-1 justify-end hover:-translate-y-1 transition-transform"
            >
              <div className={dir === 'rtl' ? 'text-left' : 'text-right'}>
                <div className="text-xs text-ink3">{t.next}</div>
                <div className="font-bold text-ink">
                  {nextAge.icon} {pick(nextAge.stage, nextAge.stageUr)}
                </div>
              </div>
              <span className="text-2xl">{isEn ? '→' : '←'}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>
    </div>
  );
}
