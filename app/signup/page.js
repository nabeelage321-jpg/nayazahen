'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const ROLES = [
  { id: 'parent', labelEn: 'Parent', labelUr: 'والدین', icon: '👪' },
  { id: 'student', labelEn: 'Student', labelUr: 'طالب علم', icon: '🎒' },
  { id: 'teacher', labelEn: 'Teacher', labelUr: 'استاد', icon: '📚' },
  { id: 'school', labelEn: 'School', labelUr: 'اسکول', icon: '🏫' },
];

export default function SignupPage() {
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', city: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successName, setSuccessName] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const saveUserToFirestore = async (uid, { name, email, city }) => {
    await setDoc(doc(db, 'users', uid), {
      name,
      email,
      role,
      city,
      rubax: 0,
      createdAt: serverTimestamp(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('براہ کرم پہلے اپنا کردار منتخب کریں۔');
      return;
    }
    if (!form.name || !form.email || !form.password || !form.city) {
      setError('براہ کرم تمام خانے پُر کریں۔');
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(cred.user, { displayName: form.name });

      await saveUserToFirestore(cred.user.uid, {
        name: form.name,
        email: form.email,
        city: form.city,
      });

      setSuccessName(form.name);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    if (!role) {
      setError('براہ کرم پہلے اپنا کردار منتخب کریں۔');
      return;
    }

    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await saveUserToFirestore(user.uid, {
        name: user.displayName || '',
        email: user.email || '',
        city: form.city || '',
      });

      setSuccessName(user.displayName || '');
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(mapFirebaseError(err.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-paper px-4">
        <div className="card max-w-md w-full text-center p-10">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="font-urdu text-3xl font-black text-plum mb-3" dir="rtl">
            خوش آمدید، {successName || 'دوست'}!
          </h1>
          <p className="font-urdu text-ink3 text-lg leading-loose mb-2" dir="rtl">
            نیا ذہن میں آپ کا استقبال ہے۔ اب سیکھنے، کھیلنے اور کمانے کا سفر شروع
            کریں!
          </p>
          <p className="text-ink3 text-sm mb-8">
            Welcome to Naya Zehan — your journey to learn, play and earn starts now.
          </p>
          <Link
            href="/login"
            className="btn-primary inline-block px-8 py-3 rounded-xl font-semibold"
          >
            لاگ اِن پر جائیں
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="section-title mb-2">نیا ذہن میں شامل ہوں</h1>
          <p className="section-sub mb-0">
            Create your free Naya Zehan account and start your family's AI
            education journey.
          </p>
        </div>

        <div className="card p-8">
          {/* Role selector */}
          <p className="text-sm font-semibold text-ink mb-3">
            آپ کون ہیں؟ / Who are you?
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 py-4 transition-all ${
                  role === r.id
                    ? 'border-plum bg-[#EDE8FA] text-plum'
                    : 'border-paper3 bg-white text-ink3 hover:border-plum-l'
                }`}
              >
                <span className="text-2xl">{r.icon}</span>
                <span className="text-sm font-semibold">{r.labelEn}</span>
                <span className="font-urdu text-xs" dir="rtl">
                  {r.labelUr}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1">
                Full name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="آپ کا نام"
                className="w-full rounded-xl border border-paper3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-plum"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-paper3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-plum"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="کم از کم 6 حروف"
                className="w-full rounded-xl border border-paper3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-plum"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="آپ کا شہر — مثلاً لاہور"
                className="w-full rounded-xl border border-paper3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-plum"
              />
            </div>

            {error && (
              <p className="font-urdu text-sm text-[#B83008] text-center" dir="rtl">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-xl font-semibold disabled:opacity-60"
            >
              {loading ? 'اکاؤنٹ بن رہا ہے...' : 'اکاؤنٹ بنائیں'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-paper3" />
            <span className="text-xs text-ink3">or</span>
            <div className="h-px flex-1 bg-paper3" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="btn-secondary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span>🔵</span>
            {googleLoading ? 'براہ کرم انتظار کریں...' : 'Google سے سائن اپ کریں'}
          </button>

          <p className="text-center text-sm text-ink3 mt-6">
            پہلے سے اکاؤنٹ ہے؟{' '}
            <Link href="/login" className="text-plum font-semibold">
              لاگ اِن کریں
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function mapFirebaseError(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'یہ ای میل پہلے سے استعمال ہو رہی ہے۔';
    case 'auth/invalid-email':
      return 'براہ کرم درست ای میل درج کریں۔';
    case 'auth/weak-password':
      return 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے۔';
    case 'auth/popup-closed-by-user':
      return 'سائن اپ منسوخ کر دیا گیا۔';
    default:
      return 'کچھ غلط ہو گیا، دوبارہ کوشش کریں۔';
  }
}
