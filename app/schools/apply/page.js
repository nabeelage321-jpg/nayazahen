'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLang } from '@/lib/lang';
import { CITIES } from '@/data/cities';

const initialState = {
  schoolName: '',
  principalName: '',
  city: 'Lahore',
  students: '',
  grades: '',
  phone: '',
  email: '',
  source: '',
};

export default function SchoolApplyPage() {
  const { dir } = useLang();
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      await addDoc(collection(db, 'school_applications'), {
        ...form,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      setStatus('Application received. We will reach out within 48 hours.');
      setForm(initialState);
    } catch (error) {
      console.error(error);
      setStatus('Could not submit the application right now. Please email us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-[#e5ecd9] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">School onboarding</p>
          <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">Bring Naya Zehan to your school</h1>
          <p className="mt-4 text-base leading-8 text-[#4b6d53]">
            Support your students with free learning, local-language AI content, and real earning opportunities.
          </p>
          <div className="mt-6 rounded-[24px] border border-[#e2efe0] bg-[#f7fff8] p-5">
            <h2 className="text-lg font-bold text-[#144a2b]">What you get</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#4b6d53]">
              <li>AI learning content for students</li>
              <li>Parent-friendly progress insights</li>
              <li>School league and class activities</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#e5ecd9] bg-white p-8 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">School name</span>
              <input required value={form.schoolName} onChange={(e) => setForm({ ...form, schoolName: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">Principal name</span>
              <input required value={form.principalName} onChange={(e) => setForm({ ...form, principalName: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">City</span>
              <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2">
                {CITIES.map((city) => <option key={city.id} value={city.name}>{city.name}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">Number of students</span>
              <input required value={form.students} onChange={(e) => setForm({ ...form, students: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
            <label className="text-sm font-semibold text-[#144a2b] sm:col-span-2">
              <span className="mb-2 block">Grades taught</span>
              <input required value={form.grades} onChange={(e) => setForm({ ...form, grades: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">Phone number</span>
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">Email</span>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
            <label className="text-sm font-semibold text-[#144a2b] sm:col-span-2">
              <span className="mb-2 block">How did you hear about us?</span>
              <input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
          </div>
          <button disabled={submitting} className="mt-6 rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-70">
            {submitting ? 'Submitting...' : 'Apply now'}
          </button>
          {status ? <p className="mt-4 text-sm text-[#2f8a4a]">{status}</p> : null}
        </form>
      </div>
    </main>
  );
}
