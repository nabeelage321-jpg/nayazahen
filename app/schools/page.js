'use client';

import { useState } from 'react';

const BENEFITS = [
  {
    icon: '🤖',
    titleEn: 'AI Tutor for Every Student',
    titleUr: 'ہر طالب علم کے لیے AI ٹیوٹر',
    descEn: 'Zehan Ustad guides each child at their own pace, in Urdu or English, 24/7.',
  },
  {
    icon: '📊',
    titleEn: 'Teacher Dashboard',
    titleUr: 'اساتذہ کا ڈیش بورڈ',
    descEn: 'Track class progress, weak topics, and engagement at a glance.',
  },
  {
    icon: '💰',
    titleEn: 'Real Earning for Students',
    titleUr: 'طالب علموں کے لیے اصل کمائی',
    descEn: 'Students 7+ complete real micro-tasks and get paid via JazzCash/EasyPaisa.',
  },
  {
    icon: '🕌',
    titleEn: 'Deen & Values Built In',
    titleUr: 'دین اور اقدار شامل',
    descEn: 'Islamic studies and character education woven into the curriculum.',
  },
  {
    icon: '🛡️',
    titleEn: 'Safe & Moderated',
    titleUr: 'محفوظ اور نگرانی شدہ',
    descEn: 'Parent dashboards, content moderation, and NADRA-style verification.',
  },
  {
    icon: '🏆',
    titleEn: 'School League & Rankings',
    titleUr: 'اسکول لیگ اور درجہ بندی',
    descEn: 'Friendly inter-school competitions that motivate students to learn more.',
  },
];

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    nameUr: 'اسٹارٹر',
    price: 'Free',
    priceSub: 'ہمیشہ کے لیے مفت',
    limit: 'Up to 50 students',
    features: [
      'Zehan Ustad AI tutor',
      'Basic teacher dashboard',
      'Community support',
      'Standard content library',
    ],
    highlighted: false,
  },
  {
    id: 'school',
    name: 'School',
    nameUr: 'اسکول',
    price: 'Rs 5,000',
    priceSub: 'فی مہینہ',
    limit: 'Up to 500 students',
    features: [
      'Everything in Starter',
      'Full analytics dashboard',
      'Zehan Kamai earning program',
      'Priority support',
      'Custom school branding',
    ],
    highlighted: true,
  },
  {
    id: 'district',
    name: 'District',
    nameUr: 'ڈسٹرکٹ',
    price: 'Custom',
    priceSub: 'حسبِ ضرورت قیمت',
    limit: 'Unlimited students',
    features: [
      'Everything in School',
      'Multi-campus management',
      'Dedicated account manager',
      'On-site training',
      'API & integration support',
    ],
    highlighted: false,
  },
];

export default function SchoolsPage() {
  return (
    <main className="min-h-screen bg-paper">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #F0C030 0%, #B8860A 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-24 text-center relative z-10">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur">
            For Schools & Institutions
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
            Bring AI Education to Your School
          </h1>
          <p className="font-urdu text-2xl text-white/95 mb-4" dir="rtl">
            اپنے اسکول میں AI تعلیم اور کمائی کا پروگرام لائیں
          </p>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Give your students Pakistan's first AI tutor, teacher analytics, and
            a real earning program — free to start.
          </p>
          <a
            href="#pricing"
            className="inline-block bg-ink text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition"
          >
            View Pricing Plans
          </a>
        </div>
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <div
          className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10"
          aria-hidden="true"
        />
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="section-title">Why Schools Choose Naya Zehan</h2>
        <p className="section-sub">
          A complete AI education toolkit built for Pakistani classrooms —
          from Grade 1 to Grade 12.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => (
            <div key={i} className="card p-6">
              <div className="text-3xl mb-4">{b.icon}</div>
              <h3 className="font-display font-bold text-lg text-ink mb-1">
                {b.titleEn}
              </h3>
              <p className="font-urdu text-sm text-plum mb-2" dir="rtl">
                {b.titleUr}
              </p>
              <p className="text-ink3 text-sm leading-relaxed">{b.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <p className="section-sub">
          Start free. Upgrade as your school grows. No hidden fees.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col border-2 transition-all ${
                plan.highlighted
                  ? 'border-teal bg-white shadow-xl scale-105 relative'
                  : 'border-paper3 bg-white shadow-card'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display font-black text-2xl text-ink mb-1">
                {plan.name}
              </h3>
              <p className="font-urdu text-ink3 mb-4" dir="rtl">
                {plan.nameUr}
              </p>
              <div className="mb-1">
                <span className="text-3xl font-black text-ink">{plan.price}</span>
              </div>
              <p className="text-xs text-ink3 mb-4">{plan.priceSub}</p>
              <p className="badge inline-block w-fit mb-6 px-3 py-1">
                {plan.limit}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink3">
                    <span className="text-teal font-bold">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#lead-form"
                className={`text-center py-3 rounded-xl font-semibold transition ${
                  plan.highlighted
                    ? 'btn-teal'
                    : 'btn-secondary'
                }`}
              >
                {plan.price === 'Free' ? 'Start Free' : 'Get Started'}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Lead form */}
      <section id="lead-form" className="max-w-2xl mx-auto px-4 pb-24">
        <LeadForm />
      </section>
    </main>
  );
}

function LeadForm() {
  const [form, setForm] = useState({
    schoolName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    students: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Lead capture — wire this up to Firestore 'leads' collection or CRM.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="card p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-display font-bold text-2xl text-ink mb-2">
          Thank you!
        </h3>
        <p className="font-urdu text-plum mb-2" dir="rtl">
          شکریہ! ہماری ٹیم جلد آپ سے رابطہ کرے گی۔
        </p>
        <p className="text-ink3 text-sm">
          Our team will reach out within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <h3 className="font-display font-bold text-2xl text-ink mb-1 text-center">
        Bring Naya Zehan to Your School
      </h3>
      <p className="font-urdu text-ink3 text-center mb-6" dir="rtl">
        اپنی معلومات درج کریں، ہماری ٹیم آپ سے رابطہ کرے گی
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="schoolName"
            value={form.schoolName}
            onChange={handleChange}
            placeholder="School name"
            required
            className="rounded-xl border border-paper3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="rounded-xl border border-paper3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="rounded-xl border border-paper3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone number"
            required
            className="rounded-xl border border-paper3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="rounded-xl border border-paper3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="number"
            name="students"
            value={form.students}
            onChange={handleChange}
            placeholder="Number of students"
            className="rounded-xl border border-paper3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: '#B8860A' }}
        >
          {submitting ? 'Submitting...' : 'Request a Demo'}
        </button>
      </form>
    </div>
  );
}
