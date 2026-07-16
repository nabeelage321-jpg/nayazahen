'use client';

import { useMemo, useState } from 'react';

const questions = [
  { prompt: 'ایک کلو آلو Rs 80، تین کلو کیا ہوں گے؟', options: ['Rs 240', 'Rs 180', 'Rs 200'], answer: 'Rs 240' },
  { prompt: 'دو dozen ڈوزی Rs 120، ایک dozen کیا ہوگا؟', options: ['Rs 60', 'Rs 80', 'Rs 40'], answer: 'Rs 60' },
  { prompt: 'ایک گلاس دودھ Rs 60، پانچ گلاس کیا ہوں گے؟', options: ['Rs 300', 'Rs 240', 'Rs 180'], answer: 'Rs 300' },
  { prompt: 'ایک پیکیج بسکٹ Rs 40، چار پیکیج کیا ہوں گے؟', options: ['Rs 120', 'Rs 160', 'Rs 180'], answer: 'Rs 160' },
  { prompt: 'تین لیموں کی قیمت Rs 45، ایک لیموں کی قیمت کیا ہوگی؟', options: ['Rs 15', 'Rs 20', 'Rs 10'], answer: 'Rs 15' },
  { prompt: 'ایک کلو چینی Rs 140، دو کلو کیا ہوں گے؟', options: ['Rs 280', 'Rs 240', 'Rs 300'], answer: 'Rs 280' },
  { prompt: 'دو کلو کیلے Rs 100، ایک کلو کیا ہوگا؟', options: ['Rs 50', 'Rs 40', 'Rs 60'], answer: 'Rs 50' },
  { prompt: 'ایک بکس کی قیمت Rs 75، تین بکس کیا ہوں گے؟', options: ['Rs 225', 'Rs 200', 'Rs 250'], answer: 'Rs 225' },
  { prompt: 'ایک گھنٹے میں Rs 20، پانچ گھنٹے میں کیا ہوگا؟', options: ['Rs 100', 'Rs 120', 'Rs 80'], answer: 'Rs 100' },
  { prompt: 'ایک پتے کی قیمت Rs 25، چار پتے کی قیمت کیا ہوگی؟', options: ['Rs 75', 'Rs 100', 'Rs 50'], answer: 'Rs 75' },
];

export default function MathBazaarGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const progress = useMemo(() => ((index + 1) / questions.length) * 100, [index]);

  function handleAnswer(option) {
    if (option === question.answer) setScore((prev) => prev + 1);
    if (index === questions.length - 1) {
      setFinished(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-[#FFF8E8] p-6 text-[#0D0D1A]">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="font-urdu text-3xl font-black text-[#0A7050]">بازار مکمل!</h1>
          <p className="mt-3 font-urdu text-lg">آپ نے {score} میں سے {score} درست جواب دیے۔</p>
          <p className="mt-2 text-sm text-[#5A587A]">آپ کو 10 Rubax Coins مل گئے۔</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#E0F5EE,_#FAFAF5)] p-6 text-[#0D0D1A]">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-urdu text-2xl font-black text-[#0A7050]">میتھ بازار</h1>
          <span className="rounded-full bg-[#E0F5EE] px-3 py-1 text-sm text-[#0A7050]">اسکور: {score}</span>
        </div>
        <div className="mb-4 h-2 rounded-full bg-[#E5E3D5]">
          <div className="h-2 rounded-full bg-[#0A7050]" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="mb-4 rounded-2xl bg-[#FEF6D8] p-4 text-center text-xl font-semibold">{question.prompt}</p>
        <div className="grid gap-3">
          {question.options.map((option) => (
            <button key={option} onClick={() => handleAnswer(option)} className="rounded-xl border border-[#E5E3D5] bg-[#FAFAF5] px-4 py-3 text-left text-sm hover:bg-[#E0F5EE]">
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
