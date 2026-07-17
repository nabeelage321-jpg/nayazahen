'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const POSTS = {
  'ai-education-pakistan-2026': {
    category: 'AI Education',
    categoryUr: 'AI تعلیم',
    titleEn: 'Why AI Education Is Pakistan’s Best Shot at Closing the Learning Gap',
    titleUr: 'پاکستان میں AI تعلیم — سیکھنے کے فرق کو ختم کرنے کا بہترین موقع',
    contentEn: [
      'Pakistan has one of the world’s largest youth populations, but access to quality learning remains unequal. AI can help by giving every learner a patient tutor, instant feedback, and multilingual support.',
      'Naya Zehan combines simple lessons, stories, and activities so that young learners can practice at their own pace. That makes learning more welcoming, especially in communities where traditional tutoring is expensive or unavailable.',
      'This is why AI education matters so much for Pakistan: it can expand access without losing warmth, culture, or local relevance.',
    ],
    contentUr: [
      'پاکستان کی نوجوان آبادی دنیا میں سب سے بڑی ہے، مگر معیاری سیکھنے تک رسائی اب بھی برابر نہیں ہے۔ AI اس لیے مدد کر سکتا ہے کیونکہ یہ ہر learner کو صبر والا ٹیوٹر، فوری رائے اور کثیر زبانی معاونت دے سکتا ہے۔',
      'نیا ذہن سادہ سبق، کہانیاں اور سرگرمیاں جوڑتا ہے تاکہ نوجوان سیکھنے والے اپنی اپنی رفتار سے مشق کر سکیں۔ یہ سیکھنے کو زیادہ خوشگوار بناتا ہے، خاص طور پر وہ جگہوں پر جہاں روایتی تدریس مہنگی یا دستیاب نہیں ہوتی۔',
      'اسی لیے پاکستان کے لیے AI تعلیم بہت اہم ہے: یہ گرمی، ثقافت اور مقامی مناسبیت کے ساتھ رسائی کو وسیع کر سکتی ہے۔',
    ],
  },
  'kids-earning-real-money-online': {
    category: 'Kids Earning',
    categoryUr: 'بچوں کی کمائی',
    titleEn: 'How Kids as Young as 7 Are Earning Real PKR on Naya Zehan',
    titleUr: '7 سال کے بچے نیا ذہن پر حقیقی روپے کیسے کما رہے ہیں',
    contentEn: [
      'Children can start small. A simple quiz, a voice recording, or a short story can become a trusted task that pays real money through safe parent-approved systems.',
      'For families in Pakistan, this means children can build confidence and a sense of responsibility while learning valuable digital skills.',
    ],
    contentUr: [
      'بچے چھوٹا آغاز کر سکتے ہیں۔ ایک سادہ کوئز، آواز ریکارڈنگ، یا مختصر کہانی ایک قابلِ اعتماد کام بن سکتی ہے جو والدین کی منظوری سے حقیقی رقم ادا کرے۔',
      'پاکستان کے خاندانوں کے لیے یہ مطلب ہے کہ بچے خود اعتمادی اور ذمہ داری کا احساس بنا سکتے ہیں جبکہ ڈیجیٹل مہارتیں سیکھتے ہیں۔',
    ],
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const post = POSTS[slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-[#fdfcf7] px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-[24px] border border-[#e5ecd9] bg-white p-8 text-center">
          <h1 className="text-2xl font-black text-[#144a2b]">Post not found</h1>
          <p className="mt-3 text-[#4b6d53]">The blog post you requested is not available yet.</p>
          <Link href="/blog" className="mt-6 inline-flex rounded-full bg-[#1f784a] px-4 py-2 text-sm font-semibold text-white">
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfcf7] px-4 py-16">
      <article className="mx-auto max-w-4xl rounded-[28px] border border-[#e5ecd9] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">{post.category}</p>
        <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">{post.titleEn}</h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-[#4b6d53]">
          {post.contentEn.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <Link href="/blog" className="mt-8 inline-flex rounded-full bg-[#1f784a] px-4 py-2 text-sm font-semibold text-white">
          Back to blog
        </Link>
      </article>
    </main>
  );
}
