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
      'With over 26 million children out of school, Pakistan needs scale. Here is how AI tutors can reach every child, in every language, for free.',
    excerptUr:
      '2 کروڑ 60 لاکھ سے زیادہ بچے اسکول سے باہر ہیں۔ AI ٹیوٹرز کیسے ہر بچے تک مفت پہنچ سکتے ہیں۔',
  },
  {
    slug: 'kids-earning-real-money-online',
    emoji: '💰',
    category: 'Kids Earning',
    categoryUr: 'بچوں کی کمائی',
    readTime: '5 min read',
    titleEn: 'How Kids as Young as 7 Are Earning Real PKR on Naya Zehan',
    titleUr: '7 سال کے بچے نیا ذہن پر حقیقی روپے کیسے کما رہے ہیں',
    excerptEn:
      'From image labelling to voice recording, small tasks are turning into real JazzCash payments for Pakistani families.',
    excerptUr:
      'تصویر لیبلنگ سے آواز ریکارڈنگ تک، چھوٹے کام اب اصل JazzCash ادائیگیوں میں بدل رہے ہیں۔',
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
      'Most AI tools are built for English speakers first. We flipped the order — and the results speak for themselves.',
    excerptUr:
      'زیادہ تر AI ٹولز انگریزی بولنے والوں کے لیے بنتے ہیں۔ ہم نے ترتیب بدل دی۔',
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
      'From Model Town to Walled City, families across Lahore are logging in every evening to learn together.',
    excerptUr:
      'ماڈل ٹاؤن سے اندرون شہر تک، لاہور کے خاندان ہر شام مل کر سیکھ رہے ہیں۔',
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
      'Pakistan\u2019s largest city has the country\u2019s fastest-growing base of young Naya Zehan earners.',
    excerptUr:
      'پاکستان کا سب سے بڑا شہر — نیا ذہن کے نوجوان کمانے والوں کی سب سے تیزی سے بڑھنے والی تعداد۔',
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
      'Our Deen section pairs gentle AI guidance with tajweed correction — built with input from local qaris.',
    excerptUr:
      'ہمارا دین سیکشن نرم AI رہنمائی کو تجوید کی اصلاح کے ساتھ ملاتا ہے — مقامی قاریوں کے تعاون سے۔',
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
      'Everything parents need to know: costs, accreditation, screen time, and how Naya Zehan fits in.',
    excerptUr:
      'والدین کے لیے ہر ضروری بات — اخراجات، منظوری، اسکرین ٹائم، اور نیا ذہن کا کردار۔',
  },
  {
    slug: 'jazzcash-payments-explained',
    emoji: '📱',
    category: 'Payments',
    categoryUr: 'ادائیگیاں',
    readTime: '5 min read',
    titleEn: 'How JazzCash Withdrawals Work for Young Naya Zehan Earners',
    titleUr: 'نوجوان کمانے والوں کے لیے JazzCash نکلوانا کیسے کام کرتا ہے',
    excerptEn:
      'A step-by-step look at minimum withdrawals, parent approval, and getting paid safely under 18.',
    excerptUr:
      'کم از کم نکلوانے کی رقم، والدین کی منظوری، اور 18 سال سے کم عمر میں محفوظ ادائیگی کا مکمل طریقہ۔',
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
