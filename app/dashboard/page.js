'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { getRubaxBalance } from '@/lib/rubax';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [role, setRole] = useState('child');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace('/signup');
        return;
      }
      setUser(currentUser);
      setRole(currentUser.email?.includes('parent') ? 'parent' : 'child');
      setBalance(await getRubaxBalance(currentUser.uid));
    });
    return () => unsub();
  }, [router]);

  if (!user) {
    return <div className="min-h-screen bg-[#FAFAF5]" />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF5] px-4 py-10 text-[#0D0D1A] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-gradient-to-r from-[#42188C] to-[#0A7050] p-6 text-white shadow-lg">
          <p className="font-urdu text-2xl font-black">السلام علیکم، {user.displayName || 'بچہ'}!</p>
          <p className="mt-2 text-sm opacity-90">آج کی سرگرمیاں اور Rubax آپ کے ساتھ ہیں۔</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="card">
            <p className="text-sm text-[#5A587A]">Rubax Balance</p>
            <p className="mt-2 text-3xl font-black text-[#B8860A]">{balance}</p>
          </div>
          <div className="card">
            <p className="text-sm text-[#5A587A]">Daily Streak</p>
            <p className="mt-2 text-3xl font-black text-[#42188C]">7 days</p>
          </div>
          <div className="card">
            <p className="text-sm text-[#5A587A]">Recent Activity</p>
            <p className="mt-2 text-sm font-urdu text-[#0D0D1A]">اردو ہیرو مکمل، بازار گیم مکمل</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card">
            <h2 className="font-urdu text-xl font-black text-[#42188C]">فوری لنکس</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/games" className="btn-teal">گیمز</Link>
              <Link href="/earn" className="btn-secondary">کمائی کے کام</Link>
              <Link href="/" className="btn-primary">ذہن استاد</Link>
            </div>
          </div>
          <div className="card">
            <h2 className="font-urdu text-xl font-black text-[#42188C]">والڈن کنٹرولز</h2>
            {role === 'parent' ? (
              <p className="mt-3 text-sm text-[#5A587A]">والدین کے لیے ڈیٹا کنٹرول اور نگرانی فعال ہے۔</p>
            ) : (
              <p className="mt-3 text-sm text-[#5A587A]">بچے کے لیے روزانہ سیکھنے کا خاکہ دکھایا جا رہا ہے۔</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
