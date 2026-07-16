'use client';

import { useMemo, useState } from 'react';

const weeks = [
  { title: 'ہفتہ 1', prompt: 'آپ کو Rs 500 وظیفہ ملا۔ آپ کیا کریں گے؟', choices: [{ label: 'بچتہ', effect: 'آپ نے بچتہ کیا۔' }, { label: 'خرچ', effect: 'آپ نے کچھ خریدی۔' }, { label: 'عطیہ', effect: 'آپ نے خیرات کی۔' }, { label: 'سرمایہ کاری', effect: 'آپ نے ادھار میں ڈال دیا۔' }] },
  { title: 'ہفتہ 2', prompt: 'ایک اچانک ضرورت آئی۔ آپ کیا کریں گے؟', choices: [{ label: 'بچتہ', effect: 'آپ نے اپنا بچتہ محفوظ رکھا۔' }, { label: 'خرچ', effect: 'آپ نے ضرورت پوری کر لی۔' }, { label: 'عطیہ', effect: 'آپ نے دوسروں کی مدد کی۔' }, { label: 'سرمایہ کاری', effect: 'آپ نے مستقبل کے لیے منصوبہ بنایا۔' }] },
  { title: 'ہفتہ 3', prompt: 'آپ کے پاس Rs 1000 ہیں۔ آپ کیا کریں گے؟', choices: [{ label: 'بچتہ', effect: 'آپ نے محفوظ طریقے سے بچایا۔' }, { label: 'خرچ', effect: 'آپ نے نئی چیز خریدی۔' }, { label: 'عطیہ', effect: 'آپ نے کمیونٹی کو مدد دی۔' }, { label: 'سرمایہ کاری', effect: 'آپ نے سیکھنے کے لیے رقم لگائی۔' }] },
  { title: 'ہفتہ 4', prompt: 'آخری ہفتہ۔ آپ کا مقصد کیا ہے؟', choices: [{ label: 'بچتہ', effect: 'آپ نے بقا کے لیے منصوبہ بنایا۔' }, { label: 'خرچ', effect: 'آپ نے خوشی کے لیے خرچ کیا۔' }, { label: 'عطیہ', effect: 'آپ نے ایک اچھی بات کی۔' }, { label: 'سرمایہ کاری', effect: 'آپ نے آنے والے دنوں کے لیے تیار کیا۔' }] },
];

export default function PiggyBankGame() {
  const [weekIndex, setWeekIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('اپنے فیصلے کو منتخب کریں۔');
  const [finished, setFinished] = useState(false);

  const week = weeks[weekIndex];
  const progress = useMemo(() => ((weekIndex + 1) / weeks.length) * 100, [weekIndex]);

  function handleChoice(choice) {
    const goodChoices = ['بچتہ', 'سرمایہ کاری', 'عطیہ'];
    if (goodChoices.includes(choice.label)) {
      setScore((prev) => prev + 1);
    }
    setFeedback(choice.effect);
    if (weekIndex === weeks.length - 1) {
      setFinished(true);
    } else {
      setWeekIndex((prev) => prev + 1);
    }
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] p-6 text-[#0D0D1A]">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="font-urdu text-3xl font-black text-[#0A7050]">مالیاتی سیکھ مکمل!</h1>
          <p className="mt-3 font-urdu text-lg">آپ نے {score} اچھے فیصلے کیے۔</p>
          <p className="mt-2 text-sm text-[#5A587A]">آپ کو 10 Rubax Coins مل گئے۔</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#E0F5EE,_#FAFAF5)] p-6 text-[#0D0D1A]">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-urdu text-2xl font-black text-[#0A7050]">میرا پگی بینک</h1>
          <span className="rounded-full bg-[#E0F5EE] px-3 py-1 text-sm text-[#0A7050]">اسکور: {score}</span>
        </div>
        <div className="mb-4 h-2 rounded-full bg-[#E5E3D5]">
          <div className="h-2 rounded-full bg-[#0A7050]" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="mb-4 rounded-2xl bg-[#FEF6D8] p-4 text-center text-lg font-semibold">{week.prompt}</div>
        <div className="grid gap-3">
          {week.choices.map((choice) => (
            <button key={choice.label} onClick={() => handleChoice(choice)} className="rounded-xl border border-[#E5E3D5] bg-[#FAFAF5] px-4 py-3 text-left text-sm hover:bg-[#E0F5EE]">
              {choice.label}
            </button>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-[#E0F5EE] p-3 text-sm text-[#0A7050]">{feedback}</p>
      </div>
    </div>
  );
}
