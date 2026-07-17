'use client';

import { useLang } from '@/lib/lang';

const points = [
  'We collect minimum data necessary to provide the learning experience.',
  'Children under 13 require a parent account for safety and oversight.',
  'We never sell or share personal data with third parties for marketing purposes.',
  'All AI conversations are private and used only to improve service quality.',
  'Parents can request deletion of all child data at any time.',
  'We follow COPPA-aligned safety practices and Pakistani data protection expectations.',
];

export default function PrivacyPage() {
  const { dir } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-[#e5ecd9] bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">Privacy Policy</p>
        <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">Child safety and privacy come first</h1>
        <p className="mt-4 text-base leading-8 text-[#4b6d53]">
          Naya Zehan is built with privacy by design. We protect children and families with simple rules, responsible data handling, and clear parent controls.
        </p>
        <div className="mt-8 grid gap-4">
          {points.map((point) => (
            <div key={point} className="rounded-[20px] border border-[#e2efe0] bg-[#f8fff8] p-4 text-[#144a2b]">{point}</div>
          ))}
        </div>
        <div className="mt-8 rounded-[24px] border border-[#e5ecd9] bg-[#f7fff8] p-5">
          <p className="font-semibold text-[#144a2b]">Contact privacy team</p>
          <a href="mailto:privacy@nayazahen.pk" className="mt-2 block text-[#2f8a4a]">privacy@nayazahen.pk</a>
        </div>
      </div>
    </main>
  );
}
