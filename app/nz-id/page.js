'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLang } from '@/lib/lang';

const initialValues = {
  fullName: '',
  age: '',
  city: '',
  guardianName: '',
  email: '',
  note: '',
};

export default function NZIDPage() {
  const { dir, pick } = useLang();
  const [form, setForm] = useState(initialValues);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      await addDoc(collection(db, 'nz_id_requests'), {
        ...form,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      setStatus(pick('Your NZ-ID request has been received. We will contact you soon.', 'آپ کی NZ-ID درخواست موصول ہو گئی ہے۔ ہم جلد آپ سے رابطہ کریں گے۔'));
      setForm(initialValues);
    } catch (error) {
      console.error(error);
      setStatus(pick('Could not submit the request. Please try again.', 'درخواست جمع نہیں ہو سکی۔ دوبارہ کوشش کریں۔'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e5ecd9] bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">NZ-ID</p>
            <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">{pick('Create your learner identity card', 'اپنا سیکھنے کی شناختی کارڈ بنائیں')}</h1>
            <p className="mt-4 text-base leading-8 text-[#4b6d53]">
              {pick('The NZ-ID gives your child a trusted profile in Naya Zehan with achievements, badges, and safe learning history.', 'NZ-ID آپ کے بچے کو نیا ذہن میں ایک قابلِ اعتماد پروفائل دیتی ہے جس میں کامیابیاں، بیجز اور محفوظ سیکھنے کی تاریخ ہوتی ہے۔')}
            </p>
            <div className="mt-6 rounded-[24px] border border-[#e2efe0] bg-[#f7fff8] p-5">
              <h2 className="text-lg font-bold text-[#144a2b]">{pick('What you get', 'آپ کو کیا ملتا ہے')}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#4b6d53]">
                <li>{pick('A unique digital learner profile.', 'ایک منفرد ڈیجیٹل سیکھنے والا پروفائل۔')}</li>
                <li>{pick('Achievement badges and milestone history.', 'کامیابی کے بیجز اور مقام کی تاریخ۔')}</li>
                <li>{pick('Access to creator and teacher programs.', 'کریٹر اور ٹیچر پروگراموں تک رسائی۔')}</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[24px] border border-[#e5ecd9] bg-[#fcfffb] p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('Full name', 'مکمل نام')}</span>
                <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('Age', 'عمر')}</span>
                <input required value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('City', 'شہر')}</span>
                <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b]">
                <span className="mb-2 block">{pick('Guardian name', 'نگران کا نام')}</span>
                <input required value={form.guardianName} onChange={(e) => setForm({ ...form, guardianName: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b] sm:col-span-2">
                <span className="mb-2 block">{pick('Email', 'ای میل')}</span>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
              <label className="text-sm font-semibold text-[#144a2b] sm:col-span-2">
                <span className="mb-2 block">{pick('Note', 'نوٹ')}</span>
                <textarea rows="3" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
              </label>
            </div>
            <button disabled={submitting} className="mt-6 rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-70">
              {submitting ? pick('Submitting...', 'جمع کرایا جا رہا ہے...') : pick('Request NZ-ID', 'NZ-ID کے لیے درخواست دیں')}
            </button>
            {status ? <p className="mt-4 text-sm text-[#2f8a4a]">{status}</p> : null}
          </form>
        </div>
      </div>
    </main>
  );
}
