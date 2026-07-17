'use client';

import { useLang } from '@/lib/lang';

const stats = [
  { value: '127,000+', label: 'kids' },
  { value: '60+', label: 'cities' },
  { value: '5', label: 'languages' },
  { value: '11', label: 'earning tasks' },
];

const values = ['Free forever for basics', 'Pakistani languages first', 'Safety first', 'Real earnings'];
const partners = ['Firebase', 'Google AI', 'Groq', 'Mistral'];

export default function AboutPage() {
  const { dir } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[32px] border border-[#e5ecd9] bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">About Naya Zehan</p>
          <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">Every Pakistani child deserves world-class AI education — free</h1>
          <p className="mt-4 text-base leading-8 text-[#4b6d53]">
            We believe the next generation of Pakistani builders, teachers, and entrepreneurs should learn AI early, learn in their own language, and earn while they grow.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[24px] border border-[#e5ecd9] bg-white p-5 shadow-sm">
              <p className="text-3xl font-black text-[#144a2b]">{stat.value}</p>
              <p className="mt-2 text-sm text-[#4b6d53]">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-[#e5ecd9] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#144a2b]">Why we built Naya Zehan</h2>
            <p className="mt-4 text-base leading-8 text-[#4b6d53]">
              Pakistan has extraordinary talent, but too many children still lack access to modern, safe, and practical learning tools. We built Naya Zehan to bring AI education, local language support, and real earning paths into one platform for families, schools, and creators.
            </p>
          </div>
          <div className="rounded-[28px] border border-[#e5ecd9] bg-[#f7fff8] p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#144a2b]">Our vision</h2>
            <p className="mt-4 text-base leading-8 text-[#4b6d53]">
              Pakistan leading the world in AI literacy by 2030.
            </p>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#e5ecd9] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#144a2b]">Built by passionate Pakistanis</h2>
          <p className="mt-4 text-base leading-8 text-[#4b6d53]">
            Our team is building for students, teachers, parents, and creators across the country. We are designing for the realities of Pakistani homes, schools, and internet access.
          </p>
        </section>

        <section className="rounded-[28px] border border-[#e5ecd9] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#144a2b]">Partners</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {partners.map((partner) => (
              <span key={partner} className="rounded-full border border-[#d7e9d8] bg-[#f8fff8] px-4 py-2 text-sm font-semibold text-[#2f8a4a]">{partner}</span>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-[#e5ecd9] bg-[#f7fff8] p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#144a2b]">PITB Grant</h2>
          <p className="mt-4 text-base leading-8 text-[#4b6d53]">
            We are applying for the PITB grant to scale to 1 million children across Pakistan.
          </p>
        </section>

        <section className="rounded-[28px] border border-[#e5ecd9] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#144a2b]">Values</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {values.map((value) => (
              <div key={value} className="rounded-[20px] border border-[#e2efe0] bg-[#f8fff8] p-4 text-sm font-semibold text-[#144a2b]">{value}</div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
