'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Login page — this route was linked from /signup ("Already have an
// account? Log in" and the post-signup success screen) but did not
// exist, so those links returned 404. This page fixes that: existing
// users sign in with email + password, or with Google, and go to
// /dashboard. It does NOT create accounts — that is /signup.

function mapFirebaseError(code) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'ای میل یا پاس ورڈ غلط ہے۔';
    case 'auth/invalid-email':
      return 'براہ کرم درست ای میل درج کریں۔';
    case 'auth/popup-closed-by-user':
      return 'سائن ان منسوخ کر دیا گیا۔';
    default:
      return 'کچھ غلط ہو گیا، دوبارہ کوشش کریں۔';
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('براہ کرم ای میل اور پاس ورڈ دونوں درج کریں۔');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError(mapFirebaseError(err.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="section-title mb-2">واپس خوش آمدید</h1>
          <p className="section-sub mb-0">
            Log in to your Naya Zehan account and continue learning.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {error && (
            <p className="rounded-xl bg-[#FAE8E0] px-4 py-3 text-sm text-[#B83008]">
              {error}
            </p>
          )}

          <div>
            <label className="text-sm font-semibold text-ink" htmlFor="email">
              ای میل
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-paper3 bg-white px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-ink" htmlFor="password">
              پاس ورڈ
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="آپ کا پاس ورڈ"
              className="mt-1 w-full rounded-xl border border-paper3 bg-white px-4 py-2.5 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 disabled:opacity-60"
          >
            {loading ? 'براہ کرم انتظار کریں...' : 'لاگ اِن کریں'}
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-paper3" />
            <span className="text-xs text-ink3">or</span>
            <div className="h-px flex-1 bg-paper3" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="btn-secondary w-full py-3 disabled:opacity-60"
          >
            {googleLoading ? 'براہ کرم انتظار کریں...' : 'Google سے لاگ اِن کریں'}
          </button>

          <p className="text-center text-sm text-ink3 mt-2">
            اکاؤنٹ نہیں ہے؟{' '}
            <Link href="/signup" className="text-plum font-semibold">
              سائن اپ کریں
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
