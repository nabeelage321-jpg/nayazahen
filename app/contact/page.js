'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLang } from '@/lib/lang';

const initialForm = {
  name: '',
  email: '',
  subject: 'General',
  message: '',
};

export default function ContactPage() {
  const { dir, pick } = useLang();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      await addDoc(collection(db, 'contacts'), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setStatus('Thanks! Your message has been received.');
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus('Could not send your message right now. Please email us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main dir={dir} className="min-h-screen bg-[#fdfcf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[28px] border border-[#e5ecd9] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">Contact</p>
          <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">Get in touch with Naya Zehan</h1>
          <p className="mt-4 text-base leading-8 text-[#4b6d53]">
            Reach our team for schools, partnerships, media, and support. We reply as quickly as possible.
          </p>
          <div className="mt-6 space-y-3">
            <div className="rounded-[20px] border border-[#e5ecd9] bg-[#f8fff8] p-4">
              <p className="font-semibold text-[#144a2b]">Schools</p>
              <a href="mailto:schools@nayazahen.pk" className="mt-1 block text-[#2f8a4a]">schools@nayazahen.pk</a>
            </div>
            <div className="rounded-[20px] border border-[#e5ecd9] bg-[#f8fff8] p-4">
              <p className="font-semibold text-[#144a2b]">Media</p>
              <a href="mailto:media@nayazahen.pk" className="mt-1 block text-[#2f8a4a]">media@nayazahen.pk</a>
            </div>
            <div className="rounded-[20px] border border-[#e5ecd9] bg-[#f8fff8] p-4">
              <p className="font-semibold text-[#144a2b]">Support</p>
              <a href="mailto:support@nayazahen.pk" className="mt-1 block text-[#2f8a4a]">support@nayazahen.pk</a>
            </div>
          </div>
          <div className="mt-6 rounded-[24px] border border-[#e2efe0] bg-[#f7fff8] p-5">
            <p className="font-semibold text-[#144a2b]">Office</p>
            <p className="mt-2 text-[#4b6d53]">Lahore, Pakistan</p>
            <p className="mt-2 text-[#4b6d53]">WhatsApp: +92-XXX-XXXXXXX</p>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#e5ecd9] bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4">
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">Name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">Email</span>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">Subject</span>
              <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2">
                <option>General</option>
                <option>Schools</option>
                <option>Partners</option>
                <option>Support</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-[#144a2b]">
              <span className="mb-2 block">Message</span>
              <textarea required rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-[#dbe8da] px-3 py-2" />
            </label>
          </div>
          <button disabled={submitting} className="mt-6 rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-70">
            {submitting ? 'Sending...' : 'Send message'}
          </button>
          {status ? <p className="mt-4 text-sm text-[#2f8a4a]">{status}</p> : null}
        </form>
      </div>
    </main>
  );
}
