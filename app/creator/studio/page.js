'use client';

import { useMemo, useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLang } from '@/lib/lang';

const defaultDraft = {
  title: '',
  type: 'story',
  description: '',
  age: '8',
  topic: '',
  email: '',
};

export default function CreatorStudioPage() {
  const { dir, pick } = useLang();
  const [form, setForm] = useState(defaultDraft);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const titleLabel = useMemo(() => pick('Creator Studio', 'کریٹر اسٹوڈیو'), [pick]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      await addDoc(collection(db, 'creator_submissions'), {
        ...form,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      setStatus(pick('Submission received. We will review it soon.', 'جمع کرائی گئی۔ ہم جلد جائزہ لیں گے۔'));
      setForm(defaultDraft);
    } catch (error) {
      console.error(error);
      setStatus(pick('Could not save submission. Please try again.', 'جمع کرائی نہیں ہو سکی۔ دوبارہ کوشش کریں۔'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e5ecd9] bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">{pick('Studio', 'اسٹوڈیو')}</p>
            <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">{titleLabel}</h1>
            <p className="mt-4 text-base leading-8 text-[#4b6d53]">
              {pick('Share your idea, draft, or lesson and help build a brighter learning experience for Pakistani students.', 'اپنا خیال، مسودہ یا سبق شیئر کریں اور پاکستانی طلبہ کے لیے ایک روشن سیکھنے کا تجربہ بنانے میں مدد کریں۔')}
            </p>
            <div className="mt-6 rounded-[24px] border border-[#e2efe0] bg-[#f7fff8] p-5">
              <h2 className="text-lg font-bold text-[#144a2b]">{pick('Quick tips', 'فوری تجاویز')}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#4b6d53]">
                <li>{pick('Keep the language simple and friendly.', 'زبان سادہ اور دوستانہ رکھیں۔')}</li>
                <li>{pick('Use local examples from Pakistan.', 'پاکستان سے متعلق مثالیں استعمال کریں۔')}</li>
                <li>{pick('Make it useful for ages 6 to 14.', '6 سے 14 سال کی عمر کے لیے مفید بنائیں۔')}</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[24px] border border-[#e5ecd9] bg-[#fcfffb] p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('Title', 'عنوان')}</span>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" placeholder={pick('My story about AI', 'میری AI کے بارے میں کہانی')} />
              </label>
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('Type', 'قسم')}</span>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2">
                  <option value="story">{pick('Story', 'کہانی')}</option>
                  <option value="quiz">{pick('Quiz', 'کوئز')}</option>
                  <option value="poster">{pick('Poster', 'پوسٹر')}</option>
                  <option value="lesson">{pick('Lesson', 'سبق')}</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-[#144a2b] sm:col-span-2">
                <span className="mb-2 block">{pick('Description', 'تفصیل')}</span>
                <textarea required rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" placeholder={pick('Describe your idea, target age, and learning goal.', 'اپنا خیال، ہدف کی عمر اور سیکھنے کا مقصد بیان کریں۔')} />
              </label>
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('Age', 'عمر')}</span>
                <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('Topic', 'موضوع')}</span>
                <input value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" placeholder={pick('AI, math, Urdu...', 'AI، ریاضی، اردو...')} />
              </label>
              <label className="text-sm font-semibold text-[#144a2b] sm:col-span-2">
                <span className="mb-2 block">{pick('Email', 'ای میل')}</span>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" placeholder="name@example.com" />
              </label>
            </div>
            <button disabled={submitting} className="mt-6 rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-70">
              {submitting ? pick('Submitting...', 'جمع کرایا جا رہا ہے...') : pick('Submit for review', 'جائزہ کے لیے جمع کرائیں')}
            </button>
            {status ? <p className="mt-4 text-sm text-[#2f8a4a]">{status}</p> : null}
          </form>
        </div>
      </div>
    </main>
  );
}
