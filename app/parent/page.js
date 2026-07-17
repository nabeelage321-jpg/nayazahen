'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';

const CHILDREN = [
  { id: 1, name: 'Amina', age: '8', progress: '82%', rubax: 240 },
  { id: 2, name: 'Bilal', age: '11', progress: '67%', rubax: 180 },
];

export default function ParentPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasesAllowed, setPurchasesAllowed] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace('/signup');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const shareReport = () => {
    const message = encodeURIComponent(`Weekly Naya Zehan report for ${user?.displayName || 'your child'}: 3 learning sessions, 2 tasks completed, 320 Rubax earned.`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#f8fbff] text-[#183a24] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="rounded-[2rem] border border-[#dceaf8] bg-white p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4a6e9c]">Parent Dashboard</p>
              <h1 className="text-3xl md:text-4xl font-black text-[#163a5c] mt-2">Welcome, {user?.displayName || 'Parent'}</h1>
            </div>
            <button onClick={shareReport} className="rounded-full bg-[#2563eb] px-4 py-2 text-white font-semibold">
              Share Weekly Report on WhatsApp
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="rounded-[2rem] border border-[#dceaf8] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#163a5c]">My Children</h2>
            <div className="mt-4 space-y-3">
              {CHILDREN.map((child) => (
                <div key={child.id} className="rounded-2xl border border-[#e6f0fb] bg-[#f8fbff] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#163a5c]">{child.name}</p>
                      <p className="text-sm text-[#4a6e9c]">Age {child.age}</p>
                    </div>
                    <div className="text-sm font-semibold text-[#2563eb]">{child.rubax} Rubax</div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-[#e8f0fb] overflow-hidden">
                    <div className="h-full rounded-full bg-[#2563eb]" style={{ width: child.progress }} />
                  </div>
                  <div className="mt-2 text-sm text-[#4a6e9c]">Progress: {child.progress}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#dceaf8] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#163a5c]">Weekly Activity Summary</h2>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#eff6ff] p-4">
                <p className="text-sm text-[#4a6e9c]">Time spent</p>
                <p className="text-2xl font-black text-[#163a5c]">4.2h</p>
              </div>
              <div className="rounded-2xl bg-[#eff6ff] p-4">
                <p className="text-sm text-[#4a6e9c]">Tasks completed</p>
                <p className="text-2xl font-black text-[#163a5c]">18</p>
              </div>
              <div className="rounded-2xl bg-[#eff6ff] p-4">
                <p className="text-sm text-[#4a6e9c]">Rubax earned</p>
                <p className="text-2xl font-black text-[#163a5c]">320</p>
              </div>
            </div>
          </section>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="rounded-[2rem] border border-[#dceaf8] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#163a5c]">Purchase Controls</h2>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#e6f0fb] bg-[#f8fbff] p-4">
              <div>
                <p className="font-semibold text-[#163a5c]">Allow purchases</p>
                <p className="text-sm text-[#4a6e9c]">Turn this off when you want to limit child spending.</p>
              </div>
              <button onClick={() => setPurchasesAllowed((v) => !v)} className={`rounded-full px-4 py-2 text-sm font-semibold ${purchasesAllowed ? 'bg-[#2563eb] text-white' : 'bg-[#e8f0fb] text-[#163a5c]'}`}>
                {purchasesAllowed ? 'Enabled' : 'Blocked'}
              </button>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#dceaf8] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#163a5c]">Wallet Overview</h2>
            <div className="mt-4 rounded-2xl bg-[#eff6ff] p-6 text-center">
              <p className="text-sm text-[#4a6e9c]">Total available Rubax</p>
              <p className="text-4xl font-black text-[#163a5c] mt-2">420</p>
              <Link href="/earn" className="mt-4 inline-flex rounded-full bg-[#2563eb] px-4 py-2 text-white font-semibold">View earning tasks</Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
