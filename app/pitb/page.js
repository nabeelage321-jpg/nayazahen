'use client';

import { useLang } from '@/lib/lang';

const metrics = [
  { value: '127,000+', label: 'children reached' },
  { value: '60+', label: 'cities covered' },
  { value: '5', label: 'languages' },
  { value: '1', label: 'unique earning model' },
];

const usage = [
  { label: '40% — Server infrastructure scaling', value: 'Scale real-time AI services and school onboarding' },
  { label: '30% — Content creation', value: 'Games, courses, and Urdu-first learning modules' },
  { label: '20% — Marketing', value: 'Reach 1 million children across Pakistan' },
  { label: '10% — Team expansion', value: 'Support operations, moderations, and partnerships' },
];

export default function PITBPage() {
  const { dir } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[32px] border border-[#e5ecd9] bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">PITB EdTech Grant 2025</p>
          <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">Naya Zehan — Applying for PITB EdTech Grant 2025</h1>
          <p className="mt-4 text-base leading-8 text-[#4b6d53]">
            We are building Pakistan’s most accessible AI education platform, with a unique model where kids learn and earn safely from home.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[24px] border border-[#e5ecd9] bg-white p-5 shadow-sm">
              <p className="text-3xl font-black text-[#144a2b]">{metric.value}</p>
              <p className="mt-2 text-sm text-[#4b6d53]">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-[#e5ecd9] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#144a2b]">Project summary</h2>
            <ul className="mt-4 space-y-3 text-base leading-8 text-[#4b6d53]">
              <li>• Platform: <a className="text-[#2f8a4a]" href="https://nayazahen.vercel.app">nayazahen.vercel.app</a></li>
              <li>• Current users: 127,000+</li>
              <li>• Cities covered: 60+</li>
              <li>• Languages: 5 Pakistani languages</li>
              <li>• Unique feature: Kids earn real PKR while learning</li>
            </ul>
          </div>
          <div className="rounded-[28px] border border-[#e5ecd9] bg-[#f7fff8] p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#144a2b]">Technology stack</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {['Next.js', 'Firebase', 'Tailwind', 'Groq', 'Mistral'].map((item) => (
                <span key={item} className="rounded-full border border-[#d7e9d8] bg-white px-4 py-2 text-sm font-semibold text-[#2f8a4a]">{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#e5ecd9] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#144a2b]">Grant usage plan</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {usage.map((item) => (
              <div key={item.label} className="rounded-[20px] border border-[#e2efe0] bg-[#f8fff8] p-5">
                <p className="font-semibold text-[#144a2b]">{item.label}</p>
                <p className="mt-2 text-sm text-[#4b6d53]">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-[#e5ecd9] bg-[#f7fff8] p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#144a2b]">Contact</h2>
          <a href="mailto:pitb@nayazahen.pk" className="mt-4 inline-flex text-[#2f8a4a]">pitb@nayazahen.pk</a>
          <div className="mt-4">
            <a href="/launch" className="rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white">View launch page</a>
          </div>
        </section>
      </div>
    </main>
  );
}
