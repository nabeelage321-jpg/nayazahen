'use client';

import { useState } from 'react';
import Link from 'next/link';

const POSTS = [
  {
    slug: 'ai-education-pakistan-2026',
    emoji: '🤖',
    category: 'AI Education',
    categoryUr: 'AI تعلیم',
    readTime: '6 min read',
    titleEn: 'Why AI Education Is Pakistan\u2019s Best Shot at Closing the Learning Gap',
    titleUr: 'پاکستان میں AI تعلیم — سیکھنے کے فرق کو ختم کرنے کا بہترین موقع',
    excerptEn:
      'Pakistan needs learning that reaches every child, in their own language, for free. Here is how AI tutors are designed to help.',
    excerptUr:
      'پاکستان کو ایسی تعلیم چاہیے جو ہر بچے تک اس کی اپنی زبان میں مفت پہنچے۔ AI ٹیوٹرز اس میں کیسے مدد کے لیے بنائے گئے ہیں۔',
  },
  {
    slug: 'kids-earning-real-money-online',
    emoji: '💰',
    category: 'Kids Earning',
    categoryUr: 'بچوں کی کمائی',
    readTime: '5 min read',
    titleEn: 'How Learning and Earning Rubax Works on Naya Zehan',
    titleUr: 'نیا ذہن پر Rubax سیکھنا اور کمانا کیسے کام کرتا ہے',
    excerptEn:
      'Rubax points, parent approval, and what still has to be built before any real payout.',
    excerptUr:
      'Rubax پوائنٹس، والدین کی منظوری، اور اصل ادائیگی سے پہلے کیا بنانا باقی ہے۔',
  },
  {
    slug: 'urdu-ai-why-it-matters',
    emoji: '🗣️',
    category: 'Urdu AI',
    categoryUr: 'اردو AI',
    readTime: '7 min read',
    titleEn: 'Why Urdu-First AI Changes Everything for Pakistani Learners',
    titleUr: 'اردو میں AI — پاکستانی طلبہ کے لیے ایک انقلاب',
    excerptEn:
      'Most AI tools are built for English speakers first. Here is why flipping that order matters for Pakistani learners.',
    excerptUr:
      'زیادہ تر AI ٹولز انگریزی بولنے والوں کے لیے بنتے ہیں۔ ترتیب بدلنے سے پاکستانی طلبہ کو کیا فائدہ ہوتا ہے۔',
  },
  {
    slug: 'lahore-ai-learning-stories',
    emoji: '🕌',
    category: 'City Stories',
    categoryUr: 'شہر کی کہانیاں',
    readTime: '4 min read',
    titleEn: 'Lahore\u2019s Young Learners: Inside a City Embracing AI Education',
    titleUr: 'لاہور کے نوجوان سیکھنے والے — AI تعلیم اپنانے والا شہر',
    excerptEn:
      'What Lahore families can do on Naya Zehan today: city learning, games, quiz, and Deen.',
    excerptUr:
      'لاہور کے خاندان نیا ذہن پر آج کیا کر سکتے ہیں: شہر کی تعلیم، گیمز، کوئز، اور دین۔',
  },
  {
    slug: 'karachi-ai-learning-stories',
    emoji: '🌊',
    category: 'City Stories',
    categoryUr: 'شہر کی کہانیاں',
    readTime: '4 min read',
    titleEn: 'Karachi\u2019s Digital Generation: Learning and Earning by the Sea',
    titleUr: 'کراچی کی ڈیجیٹل نسل — سیکھنا اور کمانا سمندر کنارے',
    excerptEn:
      'What Karachi families can do on Naya Zehan today: city learning, games, quiz, and Deen.',
    excerptUr:
      'کراچی کے خاندان نیا ذہن پر آج کیا کر سکتے ہیں: شہر کی تعلیم، گیمز، کوئز، اور دین۔',
  },
  {
    slug: 'quran-ai-companion',
    emoji: '📖',
    category: 'Quran AI',
    categoryUr: 'قرآن AI',
    readTime: '6 min read',
    titleEn: 'Meet the AI Companion Helping Kids Memorize the Quran',
    titleUr: 'وہ AI ساتھی جو بچوں کو قرآن حفظ کرنے میں مدد دیتا ہے',
    excerptEn:
      'The Deen section offers Quran, duas, and the 99 Names to explore with gentle guidance.',
    excerptUr:
      'ہمارا دین سیکشن قرآن، دعائیں، اور اللہ کے 99 نام نرم رہنمائی کے ساتھ پیش کرتا ہے۔',
  },
  {
    slug: 'online-school-guide-pakistan',
    emoji: '🏫',
    category: 'Guides',
    categoryUr: 'رہنمائی',
    readTime: '8 min read',
    titleEn: 'The Complete Guide to Online Schooling in Pakistan (2026)',
    titleUr: 'پاکستان میں آن لائن تعلیم کا مکمل رہنما (2026)',
    excerptEn:
      'What parents should check: language, age fit, safety, screen time, and how Naya Zehan fits in.',
    excerptUr:
      'والدین کو کیا جانچنا چاہیے: زبان، عمر کی مناسبت، حفاظت، اسکرین ٹائم، اور نیا ذہن کا کردار۔',
  },
  {
    slug: 'jazzcash-payments-explained',
    emoji: '📱',
    category: 'Payments',
    categoryUr: 'ادائیگیاں',
    readTime: '5 min read',
    titleEn: 'How JazzCash Payments Are Planned to Work for Naya Zehan Earners',
    titleUr: 'نیا ذہن کے کمانے والوں کے لیے JazzCash ادائیگیاں کیسے منصوبہ کی گئی ہیں',
    excerptEn:
      'Planned steps only: parent wallet, parent approval, and why no payout is live yet.',
    excerptUr:
      'صرف منصوبہ شدہ مراحل: والدین کا والٹ، والدین کی منظوری، اور ادائیگی ابھی کیوں شروع نہیں ہوئی۔',
  },
];

export default function BlogPage() {
  const [lang, setLang] = useState('ur'); // 'ur' | 'en' — current display language

  const isUrdu = lang === 'ur';

  return (
    <main className="min-h-screen bg-paper">
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10 text-center">
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setLang('ur')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              isUrdu ? 'bg-plum text-white' : 'bg-white text-ink3 border border-paper3'
            }`}
          >
            اردو
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              !isUrdu ? 'bg-plum text-white' : 'bg-white text-ink3 border border-paper3'
            }`}
          >
            English
          </button>
        </div>
        <h1 className="section-title">
          {isUrdu ? 'نیا ذہن بلاگ' : 'Naya Zehan Blog'}
        </h1>
        <p className="section-sub">
          {isUrdu
            ? 'AI تعلیم، کمائی، اور پاکستان بھر کی کہانیاں'
            : 'Stories on AI education, earning, and communities across Pakistan.'}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {POSTS.map((post) => (
          <article key={post.slug} className="card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{post.emoji}</span>
              <span className="badge px-3 py-1">
                {isUrdu ? post.categoryUr : post.category}
              </span>
            </div>

            <p className="text-xs text-ink3 mb-2">{post.readTime}</p>

            <h2
              className={`font-display font-bold text-lg text-ink mb-2 flex-1 ${
                isUrdu ? 'font-urdu' : ''
              }`}
              dir={isUrdu ? 'rtl' : 'ltr'}
            >
              {isUrdu ? post.titleUr : post.titleEn}
            </h2>

            <p
              className={`text-sm text-ink3 mb-5 leading-relaxed ${
                isUrdu ? 'font-urdu' : ''
              }`}
              dir={isUrdu ? 'rtl' : 'ltr'}
            >
              {isUrdu ? post.excerptUr : post.excerptEn}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="text-teal font-semibold text-sm inline-flex items-center gap-1 mt-auto"
            >
              {isUrdu ? 'مزید پڑھیں' : 'Read more'}
              <span aria-hidden="true">{isUrdu ? '\u2190' : '\u2192'}</span>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
