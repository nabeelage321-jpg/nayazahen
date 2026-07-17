'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const POSTS = [
  {
    slug: 'ai-education-pakistan-2025',
    title: 'How AI is Changing Education in Pakistan in 2025',
    titleUr: '2025 میں AI پاکستان میں تعلیم کیسے بدل رہا ہے',
    date: 'July 1, 2025',
    category: 'AI Education',
    author: 'Naya Zehan Team',
    content: `Artificial Intelligence is transforming education across Pakistan. From Lahore to Quetta, children who never had access to quality education are now learning through AI-powered platforms. Naya Zehan is leading this revolution by providing free AI education to every Pakistani child regardless of their location or economic background. The platform supports 5 languages including Urdu, Punjabi, Sindhi, and Pashto, making education truly accessible. Pakistani children are not just consuming AI — they are earning from it. Students as young as 7 are completing AI tasks like image labelling and voice recording, earning real PKR paid directly to JazzCash or EasyPaisa accounts. This creator economy model is unique to Naya Zehan and is changing how Pakistani families think about technology. Schools across Pakistan are joining the platform to give their students a competitive edge. With AI skills becoming essential in the job market, learning AI from childhood gives Pakistani kids a massive advantage. The future belongs to those who understand and use AI — and Pakistani children are leading the way.`,
  },
  {
    slug: 'kids-earn-money-pakistan',
    title: 'How Pakistani Kids Are Earning Real Money from Home',
    titleUr: 'پاکستانی بچے گھر سے اصل رقم کیسے کما رہے ہیں',
    date: 'July 5, 2025',
    category: 'Earning',
    author: 'Naya Zehan Team',
    content: `Pakistani children are discovering a new way to earn money — through AI micro-tasks on Naya Zehan. A 7-year-old in Karachi earned Rs 300 in her first week by labelling images for AI training datasets. A 12-year-old in Lahore made Rs 8,000 last month by setting up chatbots for local restaurants. The earning system is simple: complete a task, get reviewed, earn Rubax coins, convert to PKR. All payments go through JazzCash or EasyPaisa with parent approval required for children under 18. There are 11 different task types ranging from voice recording at Rs 100 per recording to dollar freelancing for teenagers earning Rs 30,000+ per month. The platform uses NADRA verification to ensure all creators are legitimate and payments are secure. Parents love the system because it teaches financial responsibility while generating real income. Teachers love it because it motivates students to learn digital skills. This is not pocket money — this is the beginning of Pakistan's next generation of digital entrepreneurs.`,
  },
  {
    slug: 'urdu-ai-pakistan',
    title: 'Why Urdu AI Matters for 220 Million Pakistanis',
    titleUr: '220 ملین پاکستانیوں کے لیے اردو AI کیوں ضروری ہے',
    date: 'July 8, 2025',
    category: 'Language',
    author: 'Naya Zehan Team',
    content: `Less than 8% of Pakistani children can learn effectively in English. Yet almost all AI tools — from ChatGPT to educational apps — are built primarily for English speakers. This creates a massive digital divide that disadvantages 220 million Pakistanis. Naya Zehan is solving this problem with AI Nano — Pakistan's first Urdu-speaking AI grandmother. She talks to children from age 4, tells stories in Urdu, helps with homework, and notices when children are sad. The platform supports not just Urdu but also Punjabi, Sindhi, and Pashto — covering the linguistic diversity of Pakistan. When a child in Quetta can learn about AI in Balochi, or a child in Peshawar gets homework help in Pashto, the impact is transformational. Language is identity. By building AI in Pakistani languages, Naya Zehan is telling every Pakistani child: your language matters, your culture matters, you matter. The next generation of AI users and creators will speak Urdu, and Pakistan will lead this revolution.`,
  },
  {
    slug: 'lahore-kids-tech',
    title: 'Lahore Kids Are Leading the AI Revolution',
    titleUr: 'لاہور کے بچے AI انقلاب کی قیادت کر رہے ہیں',
    date: 'July 10, 2025',
    category: 'City Stories',
    author: 'Naya Zehan Team',
    content: `With 2.8 million children and over 3,200 schools, Lahore is becoming Pakistan's AI education capital. The city's young population is embracing technology at an unprecedented rate. Naya Zehan has seen massive adoption in Lahore's DHA, Gulberg, and even areas like Shahdara and Badami Bagh where quality education was previously inaccessible. A school in Model Town reported that after joining Naya Zehan, student engagement increased by 60% and 23 students earned their first PKR income within the first month. The Lahore Fort Mystery game — one of Naya Zehan's most popular games — takes children on a virtual tour of the iconic Mughal landmark while teaching history and problem-solving. Lahore's rich cultural heritage is woven throughout the platform, making learning feel personal and relevant. From the food of Burns Road to the gardens of Shalimar, Lahore's identity is celebrated through AI-powered education. The City of Gardens is growing a new crop — a generation of AI-literate children ready to take on the world.`,
  },
  {
    slug: 'quran-ai-kids',
    title: "Teaching Quran with AI — A Parent's Guide",
    titleUr: 'AI سے قرآن پڑھانا — والدین کی رہنمائی',
    date: 'July 12, 2025',
    category: 'Deen',
    author: 'Naya Zehan Team',
    content: `Teaching Quran to children has always required patience, repetition, and the right teacher. AI is now making this easier while keeping the spiritual essence intact. Naya Zehan's Deen section offers interactive Tajweed levels that guide children through Arabic pronunciation step by step. The system uses voice recognition to check recitation and provides gentle corrections — just like a human Qari but available 24 hours a day. Parents worry that technology might distract children from religious learning. The opposite is proving true. Children who engage with Quran through gamified learning show higher retention and more enthusiasm for Islamic studies. The 99 Names of Allah trading card game has become especially popular — children collect cards, memorize meanings, and quiz each other. Daily Duas with streak tracking encourages children to remember Allah throughout the day. AI Islamic Stories feature Nano — the AI grandmother — telling stories of prophets and companions in a warm, engaging way. Technology and faith are not opposites — when done right, AI can bring children closer to their Deen.`,
  },
  {
    slug: 'karachi-ai-education',
    title: 'Karachi Schools Embracing AI — 5 Success Stories',
    titleUr: 'کراچی کے اسکول AI اپنا رہے ہیں — 5 کامیاب کہانیاں',
    date: 'July 14, 2025',
    category: 'City Stories',
    author: 'Naya Zehan Team',
    content: `Karachi — Pakistan's largest city with 3.2 million children — is witnessing an AI education revolution. Five schools across the city's diverse neighborhoods show how Naya Zehan is reaching every child. Al-Noor School in Orangi Town: 200 students, 15 earning Rubax weekly. The school's principal says attendance improved after students started earning. Beaconhouse branch in Clifton: Using Naya Zehan as supplementary learning, top students now compete in the 4PM Daily Quiz. Government school in Lyari: 300 students access Naya Zehan on shared tablets. AI Nano helps children who struggle with reading. St. Patrick's School: Teacher portal used by 8 teachers who upload supplementary materials and earn 30% revenue share. Karachi Grammar School: School League participants, won the first inter-school quiz championship. Karachi's diversity is Naya Zehan's strength. The platform serves children from mansions in DHA and tin-roofed homes in Korangi with equal quality. Education equity is not a slogan — it is built into every line of code.`,
  },
  {
    slug: 'jazzcash-kids-earn',
    title: 'JazzCash & EasyPaisa: How Kids Get Paid in Pakistan',
    titleUr: 'JazzCash اور EasyPaisa: پاکستان میں بچوں کو ادائیگی کیسے ہوتی ہے',
    date: 'July 15, 2025',
    category: 'Payments',
    author: 'Naya Zehan Team',
    content: `The question every parent asks: how does my child actually receive the money? Naya Zehan has designed a simple, safe payment system using Pakistan's most popular mobile wallets. When a child completes an earning task and gets approved, Rubax coins are added to their account. 1000 Rubax equals Rs 100. The minimum withdrawal is Rs 200 — achievable in one week of consistent work. Withdrawals require parent approval for children under 18. The parent receives a WhatsApp notification, reviews the request, and approves it. The money is then sent to the parent's JazzCash or EasyPaisa number — not directly to the child — adding an extra layer of protection. JazzCash works for Jazz SIM users while EasyPaisa works for Telenor users. Bank transfers to any Pakistani bank will be available in Phase 6. The earning cycle typically takes 3-5 business days from task completion to payment. This transparency builds trust with Pakistani families who were initially skeptical about online earning for children. Over 2,000 successful withdrawals have been processed, with zero complaints about payment delays.`,
  },
  {
    slug: 'pakistan-online-school-guide',
    title: 'The Complete Guide to Online Education in Pakistan 2025',
    titleUr: '2025 میں پاکستان میں آن لائن تعلیم کی مکمل رہنمائی',
    date: 'July 16, 2025',
    category: 'Education',
    author: 'Naya Zehan Team',
    content: `Online education in Pakistan has exploded since 2020, but not all platforms are equal. This guide helps parents choose the right platform for their children. What to look for: language support (Urdu is essential), age-appropriate content, safety features, earning opportunities, and curriculum alignment with Pakistan's education board. What to avoid: platforms with no Urdu support, those requiring expensive subscriptions upfront, platforms without parental controls, and those with inappropriate advertisements. Naya Zehan stands out by being completely free for basic features, supporting 5 Pakistani languages, having strict content moderation, offering earning opportunities from age 7, and following Pakistan's national curriculum for Classes 1-12. Other notable platforms include Khan Academy (English only, free), Sabaq (Urdu, good for exam prep), and various YouTube channels. The key insight: free platforms are beating paid ones in Pakistan because affordability is the primary barrier to education. A platform that charges Rs 1,000 per month excludes 80% of Pakistani families. Naya Zehan's freemium model — free forever for basics, affordable premium for advanced features — is the right model for Pakistan's economic reality.`,
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
