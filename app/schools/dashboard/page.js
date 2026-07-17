'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

const STUDENTS = [
  { name: 'Ayesha Khan', grade: '5', lastActive: '2 min ago', rubax: 250, quizScore: '9/10' },
  { name: 'Bilal Ahmed', grade: '6', lastActive: '10 min ago', rubax: 180, quizScore: '7/10' },
  { name: 'Sara Malik', grade: '4', lastActive: '27 min ago', rubax: 320, quizScore: '10/10' },
  { name: 'Hamza Ali', grade: '7', lastActive: '40 min ago', rubax: 140, quizScore: '6/10' },
];

export default function SchoolDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace('/signup');
        return;
      }
      const role = currentUser?.email?.includes('school') ? 'school' : null;
      if (role !== 'school') {
        router.replace('/signup');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#243569]">Loading dashboard...</div>;

  return (
    <main className="min-h-screen bg-[#f7f9ff] p-4 text-[#23304b] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-[#e7eafd] bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4659d1]">School admin dashboard</p>
            <h1 className="mt-2 text-3xl font-black text-[#243569]">Welcome, {user?.displayName || 'School Admin'}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-[#4659d1] px-4 py-2 text-sm font-semibold text-white">WhatsApp broadcast</button>
            <button className="rounded-full border border-[#e7eafd] px-4 py-2 text-sm font-semibold text-[#243569]">Download weekly report</button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[22px] border border-[#e7eafd] bg-[#f9fbff] p-4">
            <p className="text-sm text-[#4c5b80]">Total students</p>
            <p className="mt-2 text-3xl font-black text-[#243569]">248</p>
          </div>
          <div className="rounded-[22px] border border-[#e7eafd] bg-[#f9fbff] p-4">
            <p className="text-sm text-[#4c5b80]">Active today</p>
            <p className="mt-2 text-3xl font-black text-[#243569]">72</p>
          </div>
          <div className="rounded-[22px] border border-[#e7eafd] bg-[#f9fbff] p-4">
            <p className="text-sm text-[#4c5b80]">Rubax earned this week</p>
            <p className="mt-2 text-3xl font-black text-[#243569]">12,400</p>
          </div>
          <div className="rounded-[22px] border border-[#e7eafd] bg-[#f9fbff] p-4">
            <p className="text-sm text-[#4c5b80]">Quiz participation rate</p>
            <p className="mt-2 text-3xl font-black text-[#243569]">88%</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.7fr]">
          <div className="overflow-hidden rounded-[22px] border border-[#e7eafd]">
            <div className="bg-[#f9fbff] px-4 py-3 text-sm font-semibold text-[#243569]">Student list</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-[#f7f9ff] text-[#4c5b80]">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Grade</th>
                    <th className="px-4 py-3 text-left">Last active</th>
                    <th className="px-4 py-3 text-left">Rubax balance</th>
                    <th className="px-4 py-3 text-left">Quiz score</th>
                  </tr>
                </thead>
                <tbody>
                  {STUDENTS.map((student) => (
                    <tr key={student.name} className="border-t border-[#eef2ff]">
                      <td className="px-4 py-3 font-semibold text-[#243569]">{student.name}</td>
                      <td className="px-4 py-3">{student.grade}</td>
                      <td className="px-4 py-3">{student.lastActive}</td>
                      <td className="px-4 py-3">{student.rubax}</td>
                      <td className="px-4 py-3">{student.quizScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[22px] border border-[#e7eafd] bg-[#f9fbff] p-5">
              <p className="text-sm text-[#4c5b80]">School league position</p>
              <p className="mt-2 text-4xl font-black text-[#243569]">#7</p>
              <p className="mt-2 text-sm text-[#4c5b80]">Among all schools in Pakistan</p>
            </div>
            <div className="rounded-[22px] border border-[#e7eafd] bg-[#f9fbff] p-5">
              <p className="text-sm text-[#4c5b80]">Parent broadcast</p>
              <p className="mt-2 text-sm text-[#4c5b80]">Message every parent about the weekly quiz and healthy meal challenge.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
