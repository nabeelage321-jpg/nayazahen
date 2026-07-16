'use client';

import Link from 'next/link';

const games = [
  { slug: 'urdu-hero', titleUr: 'اردو ہیرو', titleEn: 'Urdu Hero', age: '4–8', available: true, emoji: '🦸', desc: 'اردو spelling game' },
  { slug: 'math-bazaar', titleUr: 'میتھ بازار', titleEn: 'Math Bazaar', age: '6–10', available: true, emoji: '🛒', desc: 'پکوان اور ریاضی' },
  { slug: 'cricket-champions', titleUr: 'کرکٹ چیمپئنز', titleEn: 'Cricket Champions', age: '7–12', available: true, emoji: '🏏', desc: 'ردیف گیم' },
  { slug: 'kite-flying', titleUr: 'پتنگ اڑانا', titleEn: 'Kite Flying', age: '8–12', available: true, emoji: '🪁', desc: 'کینوس گیم' },
  { slug: 'piggy-bank', titleUr: 'میرا پگی بینک', titleEn: 'Mera Piggy Bank', age: '8–12', available: true, emoji: '🐷', desc: 'مالیاتی سیکھ' },
  { slug: 'story-quest', titleUr: 'کہانی سفر', titleEn: 'Story Quest', age: '5–8', available: false, emoji: '📖', desc: 'Coming soon' },
  { slug: 'quran-quiz', titleUr: 'قرآن کوئز', titleEn: 'Quran Quiz', age: '6–12', available: false, emoji: '📿', desc: 'Coming soon' },
  { slug: 'city-race', titleUr: 'شہر ریس', titleEn: 'City Race', age: '7–10', available: false, emoji: '🚗', desc: 'Coming soon' },
  { slug: 'robot-builder', titleUr: 'روبوٹ بناؤ', titleEn: 'Robot Builder', age: '8–12', available: false, emoji: '🤖', desc: 'Coming soon' },
  { slug: 'space-adventure', titleUr: 'فضائی مہم', titleEn: 'Space Adventure', age: '9–12', available: false, emoji: '🚀', desc: 'Coming soon' },
  { slug: 'music-lab', titleUr: 'موسیقی لیب', titleEn: 'Music Lab', age: '5–9', available: false, emoji: '🎵', desc: 'Coming soon' },
  { slug: 'garden-hero', titleUr: 'باغیچہ ہیرو', titleEn: 'Garden Hero', age: '4–7', available: false, emoji: '🌱', desc: 'Coming soon' },
  { slug: 'puzzle-mosque', titleUr: 'مسجد پہیلی', titleEn: 'Mosque Puzzle', age: '6–10', available: false, emoji: '🕌', desc: 'Coming soon' },
  { slug: 'language-bridge', titleUr: 'زبان پل', titleEn: 'Language Bridge', age: '5–10', available: false, emoji: '🌉', desc: 'Coming soon' },
  { slug: 'market-quest', titleUr: 'مارکیٹ مہم', titleEn: 'Market Quest', age: '7–11', available: false, emoji: '🏪', desc: 'Coming soon' },
  { slug: 'animal-farm', titleUr: 'حیوانی فارم', titleEn: 'Animal Farm', age: '4–8', available: false, emoji: '🐄', desc: 'Coming soon' },
  { slug: 'friendship-forest', titleUr: 'دوستی جنگل', titleEn: 'Friendship Forest', age: '5–9', available: false, emoji: '🌲', desc: 'Coming soon' },
  { slug: 'sky-builder', titleUr: 'آسمان تعمیر', titleEn: 'Sky Builder', age: '8–12', available: false, emoji: '☁️', desc: 'Coming soon' },
  { slug: 'code-hero', titleUr: 'کوڈ ہیرو', titleEn: 'Code Hero', age: '9–12', available: false, emoji: '💻', desc: 'Coming soon' },
  { slug: 'farm-future', titleUr: 'مستقبل کا فارم', titleEn: 'Farm Future', age: '6–10', available: false, emoji: '🚜', desc: 'Coming soon' },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#F2F1E8,_#FAFAF5)] px-4 py-12 text-[#0D0D1A] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <div className="badge mb-4">🎮 Pakistani Learning Games</div>
          <h1 className="font-urdu text-3xl font-black text-[#42188C] md:text-4xl">بچوں کے لیے گیمز</h1>
          <p className="mx-auto mt-3 max-w-2xl font-urdu text-base text-[#5A587A]">یہاں پر پاکستانی انداز میں سیکھنے والے گیمز موجود ہیں۔</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {games.map((game) => (
            <div key={game.slug} className={`card ${!game.available ? 'opacity-70' : ''}`}>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-4xl">{game.emoji}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${game.available ? 'bg-[#E0F5EE] text-[#0A7050]' : 'bg-[#E5E3D5] text-[#5A587A]'}`}>
                  {game.available ? 'Open' : 'Coming Soon'}
                </span>
              </div>
              <h2 className="font-urdu text-xl font-bold text-[#42188C]">{game.titleUr}</h2>
              <p className="mt-1 text-sm text-[#5A587A]">{game.titleEn}</p>
              <p className="mt-2 text-sm text-[#0D0D1A]">عمر: {game.age}</p>
              <p className="mt-2 text-sm text-[#5A587A]">{game.desc}</p>
              {game.available ? (
                <Link href={`/games/${game.slug}`} className="btn-teal mt-4 inline-flex w-full justify-center">
                  Play Now
                </Link>
              ) : (
                <button disabled className="mt-4 inline-flex w-full justify-center rounded-xl bg-[#E5E3D5] px-4 py-3 text-sm font-semibold text-[#5A587A]">
                  <span className="mr-2">🔒</span> Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
