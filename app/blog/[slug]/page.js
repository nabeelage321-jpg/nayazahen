'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const POSTS = [
  {
    slug: 'ai-education-pakistan-2025',
    title: 'How AI Tutors Are Designed to Help Pakistani Learners',
    titleUr: 'AI ٹیوٹرز پاکستانی طلبہ کی مدد کے لیے کیسے بنائے گئے ہیں',
    date: 'October 30, 2026',
    category: 'AI Education',
    author: 'Naya Zehan Team',
    content: `Artificial intelligence can help a child practise a topic again and again, at their own pace, without fear of asking the same question twice. That is the idea behind Naya Zehan: short, guided learning in Urdu and English, with quizzes, games, and a tutor that asks guiding questions instead of simply giving the answer away.

The platform is built around age bands, from early years to older students, and around city pages that families can explore together. Learning here is meant to be supplementary: it supports what a child learns at school and at home, it does not replace a school or a teacher.

Parents can start simply. Choose an age band, try a quiz, and play one game together. Watch what your child enjoys and where they get stuck, and use that to decide what to practise next. The goal is steady, small progress, not speed and not screen time for its own sake.`,
  },
  {
    slug: 'kids-earn-money-pakistan',
    title: 'Learning and Earning Rubax on Naya Zehan: How It Is Designed to Work',
    titleUr: 'نیا ذہن پر Rubax سیکھنا اور کمانا کیسے ڈیزائن کیا گیا ہے',
    date: 'October 30, 2026',
    category: 'Earning',
    author: 'Naya Zehan Team',
    content: `Rubax is the points system inside Naya Zehan. Children earn Rubax by learning: completing quizzes, playing learning games, and finishing guided activities. Their balance is shown on their dashboard, and parents can see it too.

The design rule that matters most is about money. A child never holds money directly. Any future payout would go through a parent wallet, and a parent would have to approve it. That rule exists to protect children, and it applies to every earning feature.

Payout is not live today. No conversion rate has been fixed yet, and no withdrawal has been processed. When a rate and a payout method are ready, they will be published clearly before anyone is asked to rely on them. Until then, Rubax should be treated as learning points, not as income.`,
  },
  {
    slug: 'urdu-ai-pakistan',
    title: 'Why Urdu-First AI Matters for Pakistani Learners',
    titleUr: 'پاکستانی طلبہ کے لیے اردو فرسٹ AI کیوں ضروری ہے',
    date: 'October 30, 2026',
    category: 'Language',
    author: 'Naya Zehan Team',
    content: `Most AI tools are built for English speakers first. A child who thinks and speaks in Urdu has to translate twice: once to understand the question, and once to give the answer. That extra step slows learning down and hides what the child actually knows.

Naya Zehan is built Urdu-first in its layout and in its learning content, with English alongside it. The aim is simple: a child should be able to learn, ask questions, and practise in the language they are most comfortable in, and build English skills from that strong base rather than instead of it.

Other Pakistani languages, including Punjabi, Sindhi, and Pashto, are part of the longer-term goal. They are not fully translated on the site today, and we will not claim otherwise. Urdu-first is the starting point, and it is already a big change from English-only tools.`,
  },
  {
    slug: 'lahore-kids-tech',
    title: 'AI Learning in Lahore: A Guide for Parents and Families',
    titleUr: 'لاہور میں AI تعلیم: والدین اور خاندانوں کے لیے رہنما',
    date: 'October 30, 2026',
    category: 'City Stories',
    author: 'Naya Zehan Team',
    content: `This is a guide, not a report about other families. It is for Lahore parents who want to try AI learning at home and are not sure where to start.

Start with the Lahore city page, then pick your child's age band. Try a quiz together first, because it shows quickly what your child already knows and what needs practice. Then try one game. Games on Naya Zehan are learning games: Urdu spelling, maths in a bazaar setting, cricket, kite flying, and saving with a piggy bank.

Keep sessions short and regular, and sit with younger children while they learn. If something is confusing, that is useful information, not failure. Note it, practise that topic again another day, and ask a teacher if it keeps coming up. Learning that fits into family life lasts longer than a long session once in a while.`,
  },
  {
    slug: 'quran-ai-kids',
    title: "Teaching Quran with AI: A Parent's Guide to the Deen Section",
    titleUr: 'AI سے قرآن پڑھانا: دین سیکشن کے لیے والدین کی رہنمائی',
    date: 'October 30, 2026',
    category: 'Deen',
    author: 'Naya Zehan Team',
    content: `Teaching Quran to children takes patience, repetition, and a good teacher. AI cannot replace that teacher, but it can help with regular practice between lessons.

The Deen section on Naya Zehan brings together Quran learning, daily duas, and the 99 Names of Allah. Children can explore these pages, practise short duas, and learn the meanings of the names at their own pace. The idea is gentle, regular exposure, not pressure to finish quickly.

Parents should still check recitation with a local teacher, especially for pronunciation. If an AI suggestion and your child's teacher disagree, follow the teacher. Technology and faith work best together when technology stays in its place: a practice helper, while the teacher remains the guide.`,
  },
  {
    slug: 'karachi-ai-education',
    title: 'AI Learning in Karachi: A Guide for Parents and Families',
    titleUr: 'کراچی میں AI تعلیم: والدین اور خاندانوں کے لیے رہنما',
    date: 'October 30, 2026',
    category: 'City Stories',
    author: 'Naya Zehan Team',
    content: `This is a guide, not a report about other schools or families. It is for Karachi parents who want to try AI learning at home and are not sure where to start.

Start with the Karachi city page, then pick your child's age band. Try a quiz together first, because it shows quickly what your child already knows and what needs practice. Then try one game. The games are built around everyday Pakistani settings, so children recognise the words, the money, and the situations in them.

Karachi families often share devices, so a practical tip helps: agree a short daily slot, keep the device in a shared room for younger children, and review the dashboard together at the end of the week. Small, regular practice beats a long session that only happens once.`,
  },
  {
    slug: 'jazzcash-kids-earn',
    title: 'JazzCash and EasyPaisa Payments: The Planned Model, Explained Honestly',
    titleUr: 'JazzCash اور EasyPaisa ادائیگیاں: منصوبہ شدہ ماڈل کی ایماندارانہ وضاحت',
    date: 'October 30, 2026',
    category: 'Payments',
    author: 'Naya Zehan Team',
    content: `Parents ask the same question first: how would my child actually receive money? Here is the planned model, and what is not true yet.

In the planned model, a child earns Rubax by learning. A parent would hold the wallet, approve any withdrawal, and receive any payment to the parent's own mobile wallet number, never directly to the child. That parent-approval step is the core safety rule.

What is not true yet: payout is not live, no conversion rate has been fixed, and no withdrawals have been processed. Anyone telling you a rate, a withdrawal time, or a payment history for Naya Zehan today is getting ahead of the facts. When payout is ready, the rate, the minimum, and the steps will be published in full before it opens.`,
  },
  {
    slug: 'pakistan-online-school-guide',
    title: 'A Parent’s Guide to Online Education in Pakistan',
    titleUr: 'پاکستان میں آن لائن تعلیم کے لیے والدین کی رہنمائی',
    date: 'October 30, 2026',
    category: 'Education',
    author: 'Naya Zehan Team',
    content: `Online learning can help, but not every platform fits every child. Before choosing one, check a few things that matter more than a fancy homepage.

First, language: can your child learn in Urdu, or only in English? Second, age fit: is the content made for your child's age, or is it the same for everyone? Third, safety: are there parental controls, and is there any direct messaging with strangers? Fourth, cost: what is free, what is paid, and can you stop the paid part easily?

Naya Zehan is designed as a free supplementary learning platform, not as a replacement for school. Use it alongside schoolwork, keep sessions short, and review progress with your child. If a platform promises income, exam results, or a curriculum certificate, ask for proof in writing before you rely on it.`,
  },
  {
    slug: 'ai-education-pakistan-2026',
    title: 'Why AI Education Matters for Pakistan’s Learners in 2026',
    titleUr: '2026 میں پاکستان کے طلبہ کے لیے AI تعلیم کیوں ضروری ہے',
    date: 'October 30, 2026',
    category: 'AI Education',
    author: 'Naya Zehan Team',
    content: `Pakistan needs learning that can reach every child, in their own language, without waiting for a perfect classroom. That is a big need, and AI tutors are one tool that can help meet it, not a magic answer on their own.

An AI tutor can do three things well. It can repeat a topic as many times as a child needs. It can ask a guiding question instead of handing over the answer. And it can be available at home, in the evening, when a parent is free to sit with the child.

Naya Zehan is built on that idea: age bands from early years to older students, city pages families can explore, quizzes, learning games, and a tutor designed to guide rather than give answers away. Used alongside school, and with a parent involved, it can make practice steadier and more enjoyable. That steady practice, not a claim about national results, is what this platform is for.`,
  },
  {
    slug: 'kids-earning-real-money-online',
    title: 'How Learning and Earning Rubax Works on Naya Zehan',
    titleUr: 'نیا ذہن پر Rubax سیکھنا اور کمانا کیسے کام کرتا ہے',
    date: 'October 30, 2026',
    category: 'Kids Earning',
    author: 'Naya Zehan Team',
    content: `Children earn Rubax on Naya Zehan by learning. Quizzes, learning games, and guided activities add Rubax to the dashboard balance, where parents can see it too. The points are a way to reward effort and regular practice.

There are different kinds of earning tasks on the platform, from learning activities to creative work for older children. The exact tasks available depend on age, and every task is meant to teach a skill first. Earning is a side effect of learning, not a job, and it should never replace schoolwork or rest.

The money part is separate, and it is not live yet. A child never holds money directly in the design: a parent holds the wallet and must approve any future payout. No rate has been fixed, and no payout has been made. Treat Rubax today as learning points, and wait for a published rate and method before expecting any payment.`,
  },
  {
    slug: 'urdu-ai-why-it-matters',
    title: 'Why Urdu-First AI Changes Learning for Pakistani Children',
    titleUr: 'اردو فرسٹ AI پاکستانی بچوں کی تعلیم کیوں بدلتا ہے',
    date: 'October 30, 2026',
    category: 'Urdu AI',
    author: 'Naya Zehan Team',
    content: `Most AI tools are built for English speakers first. For a Pakistani child, that means learning in a second language before they have even understood the topic. The child may know the answer and still fail the question, because the words got in the way.

Flipping the order changes that. When a tutor explains in Urdu, asks in Urdu, and lets the child answer in Urdu, the child can show what they actually know. English can then be built on top, as a skill, instead of being a wall in front of every other subject.

Naya Zehan is designed Urdu-first for this reason, with English alongside it. Other Pakistani languages are a longer-term goal and are not fully translated today. The honest starting point is Urdu-first, and for many children that alone removes the biggest barrier to using AI for learning.`,
  },
  {
    slug: 'lahore-ai-learning-stories',
    title: 'AI Learning in Lahore: A Guide for Parents and Families',
    titleUr: 'لاہور میں AI تعلیم: والدین اور خاندانوں کے لیے رہنما',
    date: 'October 30, 2026',
    category: 'City Stories',
    author: 'Naya Zehan Team',
    content: `This guide is for Lahore families who want to try AI learning at home. It does not report on other families, because we are not publishing stories we have not verified.

Start on the Lahore city page, choose your child's age band, and try a quiz together. A quiz is a quick way to see what your child already knows and what needs more practice, without a long lesson first.

Then try one learning game. The games use familiar settings, from a bazaar to a cricket match, so the maths and language in them feel like real life. Keep the session short, sit with younger children, and review the dashboard together at the end of the week. Regular, short practice, with a parent nearby, is the pattern that works best.`,
  },
  {
    slug: 'karachi-ai-learning-stories',
    title: 'AI Learning in Karachi: A Guide for Parents and Families',
    titleUr: 'کراچی میں AI تعلیم: والدین اور خاندانوں کے لیے رہنما',
    date: 'October 30, 2026',
    category: 'City Stories',
    author: 'Naya Zehan Team',
    content: `This guide is for Karachi families who want to try AI learning at home. It does not report on other families or schools, because we are not publishing stories we have not verified.

Start on the Karachi city page, choose your child's age band, and try a quiz together. A quiz is a quick way to see what your child already knows and what needs more practice, without a long lesson first.

Then try one learning game. The games use familiar settings, so the words and numbers in them feel like real life. If your family shares one device, agree a short daily slot in a shared room, and review the dashboard together at the end of the week. Small, regular practice beats a long session that only happens once.`,
  },
  {
    slug: 'quran-ai-companion',
    title: 'Quran Learning with AI: A Guide for Parents',
    titleUr: 'AI کے ساتھ قرآن سیکھنا: والدین کے لیے رہنما',
    date: 'October 30, 2026',
    category: 'Quran AI',
    author: 'Naya Zehan Team',
    content: `The Deen section on Naya Zehan brings together Quran learning, daily duas, and the 99 Names of Allah. Children can explore these pages, practise short duas, and learn meanings at their own pace, with gentle guidance rather than pressure.

AI can help with regular practice, but it cannot replace a teacher, especially for pronunciation. Parents should check recitation with a local teacher, and if an AI suggestion and the teacher disagree, follow the teacher.

Use the Deen pages as a practice helper between lessons, not as a replacement for lessons. Short, regular practice, with a parent nearby for younger children, keeps the learning calm and respectful. That is the right place for technology in Quran learning.`,
  },
  {
    slug: 'online-school-guide-pakistan',
    title: 'The Complete Guide to Online Schooling in Pakistan (2026)',
    titleUr: 'پاکستان میں آن لائن تعلیم کا مکمل رہنما (2026)',
    date: 'October 30, 2026',
    category: 'Guides',
    author: 'Naya Zehan Team',
    content: `Parents choosing online learning should check four things before anything else: language, age fit, safety, and cost.

Language first: can your child learn in Urdu, or only in English? Age fit second: is the content made for your child's age band? Safety third: are there parental controls, and can strangers message your child? Cost fourth: what is free, what is paid, and how easily can you stop paying?

Think about screen time as well. Short, regular sessions with a parent nearby work better than long, unsupervised ones. And remember what a platform is: Naya Zehan is a supplementary learning platform, not a school. It supports schoolwork, it does not replace a school, a teacher, or a certificate. If a platform promises exam results or income, ask for proof before you rely on it.`,
  },
  {
    slug: 'jazzcash-payments-explained',
    title: 'How JazzCash Payments Are Planned to Work for Naya Zehan Earners',
    titleUr: 'نیا ذہن کے کمانے والوں کے لیے JazzCash ادائیگیاں کیسے منصوبہ کی گئی ہیں',
    date: 'October 30, 2026',
    category: 'Payments',
    author: 'Naya Zehan Team',
    content: `This post explains the planned payment model only. No payout is live today, and this is not a how-to for withdrawing money right now.

In the planned model, a child earns Rubax by learning. A parent holds the wallet, reviews any withdrawal request, and approves it. Any payment would go to the parent's own mobile wallet number, never directly to the child. That parent-approval step is the core safety rule, and it applies to children under 18.

Before payout can open, three things still have to be fixed and published: the conversion rate, the minimum withdrawal, and the exact steps and timing. None of those are fixed yet, and no withdrawals have been processed. When they are ready, they will be published in full first. Until then, Rubax is learning points, not money in hand.`,
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const post = POSTS.find((item) => item.slug === slug);

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

  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#fdfcf7] px-4 py-16">
      <article className="mx-auto max-w-4xl rounded-[28px] border border-[#e5ecd9] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">{post.category}</p>
        <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">{post.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#4b6d53]">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        <div className="mt-8 space-y-4 text-base leading-8 text-[#4b6d53]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link href="/blog" className="mt-8 inline-flex rounded-full bg-[#1f784a] px-4 py-2 text-sm font-semibold text-white">
          Back to blog
        </Link>
      </article>
    </main>
  );
}
