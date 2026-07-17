'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLang } from '@/lib/lang';

const initialForm = {
  teacherName: '',
  school: '',
  title: '',
  subject: '',
  description: '',
  email: '',
};

export default function TeacherUploadPage() {
  const { dir, pick } = useLang();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      await addDoc(collection(db, 'teacher_content'), {
        ...form,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      setStatus(pick('Lesson submitted. We will review it soon.', 'سبق جمع کرایا گیا۔ ہم جلد جائزہ لیں گے۔'));
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus(pick('Could not submit your lesson. Please try again.', 'اپنا سبق جمع نہیں ہو سکا۔ دوبارہ کوشش کریں۔'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e5ecd9] bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">Teacher Upload</p>
            <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">{pick('Share a lesson with the community', 'بنیاد کے ساتھ ایک سبق شیئر کریں')}</h1>
            <p className="mt-4 text-base leading-8 text-[#4b6d53]">
              {pick('Add a classroom-ready lesson, worksheet, or activity for students across Pakistan.', 'پاکستان بھر کے طلبہ کے لیے کلاس روم کے لیے تیار سبق، ورک شیٹ یا سرگرمی شامل کریں۔')}
            </p>
            <div className="mt-6 rounded-[24px] border border-[#e2efe0] bg-[#f7fff8] p-5">
              <h2 className="text-lg font-bold text-[#144a2b]">{pick('What to include', 'کیا شامل کریں')}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#4b6d53]">
                <li>{pick('Clear learning objective.', 'واضح سیکھنے کا مقصد۔')}</li>
                <li>{pick('Simple steps for students.', 'طلبہ کے لیے سادہ مراحل۔')}</li>
                <li>{pick('Local examples and child-friendly tone.', 'مقامی مثالیں اور بچوں کے لیے دوستانہ لہجہ۔')}</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[24px] border border-[#e5ecd9] bg-[#fcfffb] p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('Teacher name', 'استاد کا نام')}</span>
                <input required value={form.teacherName} onChange={(e) => setForm({ ...form, teacherName: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('School', 'اسکول')}</span>
                <input required value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b] sm:col-span-2">
                <span className="mb-2 block">{pick('Title', 'عنوان')}</span>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('Subject', 'موضوع')}</span>
                <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('Email', 'ای میل')}</span>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b] sm:col-span-2">
                <span className="mb-2 block">{pick('Description', 'تفصیل')}</span>
                <textarea required rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
            </div>
            <button disabled={submitting} className="mt-6 rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-70">
              {submitting ? pick('Submitting...', 'جمع کرایا جا رہا ہے...') : pick('Submit lesson', 'سبق جمع کرائیں')}
            </button>
            {status ? <p className="mt-4 text-sm text-[#2f8a4a]">{status}</p> : null}
          </form>
        </div>
      </div>
    </main>
  );
}
