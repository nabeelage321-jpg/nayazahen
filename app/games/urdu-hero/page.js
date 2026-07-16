'use client';

import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { awardRubax } from '@/lib/rubax';

const questions = [
  { prompt: 'بچے', answer: 'بچے' },
  { prompt: 'ہوا', answer: 'ہوا' },
  { prompt: 'پانی', answer: 'پانی' },
  { prompt: 'شام', answer: 'شام' },
  { prompt: 'سورج', answer: 'سورج' },
  { prompt: 'کتاب', answer: 'کتاب' },
  { prompt: 'گھر', answer: 'گھر' },
  { prompt: 'دانا', answer: 'دانا' },
  { prompt: 'باغ', answer: 'باغ' },
  { prompt: 'نانو', answer: 'نانو' },
];

export default function UrduHeroGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [finished, setFinished] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsub();
  }, []);

  const question = questions[index];
  const progress = useMemo(() => ((index + 1) / questions.length) * 100, [index]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!question) return;
    if (answer.trim() === question.answer) {
      setScore((prev) => prev + 1);
    }

    if (index === questions.length - 1) {
      finishGame(score + (answer.trim() === question.answer ? 1 : 0));
    } else {
      setIndex((prev) => prev + 1);
      setAnswer('');
    }
  }

  async function finishGame(finalScore) {
    setFinished(true);
    if (user?.uid) {
      await awardRubax(user.uid, 10, 'Urdu Hero completion');
      await setDoc(doc(db, 'users', user.uid, 'gameScores', 'urdu-hero'), {
        score: finalScore,
        completedAt: new Date().toISOString(),
      }, { merge: true });
    }
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] p-6 text-[#0D0D1A]">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="font-urdu text-3xl font-black text-[#42188C]">مکمل!</h1>
          <p className="mt-3 font-urdu text-lg">آپ نے {score} میں سے {score} درست جواب دیے۔</p>
          <p className="mt-2 text-sm text-[#5A587A]">آپ کو 10 Rubax Coins مل گئے۔</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF5] p-6 text-[#0D0D1A]">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-urdu text-2xl font-black text-[#42188C]">اردو ہیرو</h1>
          <span className="rounded-full bg-[#E0F5EE] px-3 py-1 text-sm text-[#0A7050]">اسکور: {score}</span>
        </div>
        <div className="mb-4 h-2 rounded-full bg-[#E5E3D5]">
          <div className="h-2 rounded-full bg-[#42188C]" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="mb-4 text-center text-4xl font-semibold">{question?.prompt}</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="w-full rounded-xl border border-[#E5E3D5] px-4 py-3 text-lg" placeholder="اردو میں لکھو" />
          <button className="btn-teal w-full justify-center">اگلا سوال</button>
        </form>
      </div>
    </div>
  );
}
