'use client';

import { useLang } from '@/lib/lang';

const sections = [
  {
    title: 'Age requirements',
    body: 'Children under 13 must use the platform through a parent or guardian account. Teen creators may use the platform with agreement to parent guidance and safety rules.',
  },
  {
    title: 'Creator content rules',
    body: 'All content must be safe, age-appropriate, and respectful. Inappropriate or harmful content is not allowed.',
  },
  {
    title: 'Earning rules',
    body: 'Earning is subject to parent approval for minors. All payments follow platform review and may be delayed for verification.',
  },
  {
    title: 'School partnership terms',
    body: 'Schools must provide accurate information, respect student privacy, and use the platform responsibly for educational purposes.',
  },
  {
    title: 'Acceptable use',
    body: 'Users may not bypass safety controls, impersonate others, or misuse the platform for fraud or harassment.',
  },
];

export default function TermsPage() {
  const { dir } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-[#e5ecd9] bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">Terms of Service</p>
        <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">Community rules for learning, earning, and growth</h1>
        <div className="mt-8 grid gap-4">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[20px] border border-[#e2efe0] bg-[#f8fff8] p-5">
              <h2 className="text-lg font-bold text-[#144a2b]">{section.title}</h2>
              <p className="mt-2 text-base leading-8 text-[#4b6d53]">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
