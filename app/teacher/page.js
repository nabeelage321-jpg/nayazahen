'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';

export default function TeacherPage() {
  const { dir, pick } = useLang();

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e5ecd9] bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">Teacher Portal</p>
            <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">{pick('Support students with modern classroom tools', 'آج کے کلاس روم ٹولز سے طلبہ کی مدد کریں')}</h1>
            <p className="mt-4 text-base leading-8 text-[#4b6d53]">
              {pick('Teachers can upload lessons, manage classroom activities, and invite students to join safe, interactive learning journeys.', 'استاد سبق اپ لوڈ کر سکتے ہیں، کلاس روم سرگرمیاں کا نظم کر سکتے ہیں، اور طلبہ کو محفوظ اور انٹرایکٹو سیکھنے کے سفر میں شامل کر سکتے ہیں۔')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/teacher/upload" className="rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white">{pick('Upload content', 'مواد اپ لوڈ کریں')}</Link>
              <Link href="/premium" className="rounded-full border border-[#d7e9d8] px-5 py-3 text-sm font-semibold text-[#2f8a4a]">{pick('Upgrade to premium', 'پریمیم بنائیں')}</Link>
            </div>
          </div>
          <div className="rounded-[24px] border border-[#e2efe0] bg-[#f7fff8] p-6">
            <h2 className="text-xl font-bold text-[#144a2b]">{pick('Why teachers love it', 'استاد کیوں پسند کرتے ہیں')}</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#4b6d53]">
              <li>• {pick('Fast lesson publishing.', 'تیز سبق شائع کرنا۔')}</li>
              <li>• {pick('Built-in student progress tracking.', 'طلبہ کی پیش رفت کی نگرانی۔')}</li>
              <li>• {pick('Rubax rewards for participation.', 'حصہ داری کے لیے روبیکس انعام۔')}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
