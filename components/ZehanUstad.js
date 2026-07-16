'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLang } from '@/lib/lang';

const starterMessages = [
  { sender: 'bot', text: 'السلام علیکم بیٹا! میں ذہن استاد ہوں۔ آج کیا سیکھنا ہے؟' },
];

export default function ZehanUstad() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [freeCount, setFreeCount] = useState(0);

  const texts = useMemo(() => ({
    title: lang === 'en' ? 'Zehan Ustad' : 'ذہن استاد',
    placeholder: lang === 'en' ? 'Ask me anything' : 'اپنا سوال لکھو',
    send: lang === 'en' ? 'Send' : 'بھیجو',
    upgrade: lang === 'en' ? 'Free limit reached. Upgrade for unlimited help.' : 'مفت حد پوری ہو گئی۔ لامحدود مدد کے لیے اپ گریڈ کریں۔',
    rateLimit: lang === 'en' ? 'Please wait a moment and try again.' : 'تھوڑا رکو بیٹا — دوبارہ کوشش کریں',
  }), [lang]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  async function handleSend() {
    if (!input.trim()) return;

    if (freeCount >= 10) {
      setToast(texts.upgrade);
      return;
    }

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);
    setFreeCount((prev) => prev + 1);

    try {
      const res = await fetch('/api/ustad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages.slice(-6) }),
      });
      const data = await res.json();

      if (res.status === 429 || data?.error === 'rate_limit') {
        setToast(texts.rateLimit);
        setMessages((prev) => [...prev, { sender: 'bot', text: texts.rateLimit }]);
      } else if (data?.text) {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.text }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'میں اس وقت جواب نہیں دے سکتا۔' }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'میں اس وقت جواب نہیں دے سکتا۔' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 rounded-full bg-[#42188C] px-4 py-3 text-white shadow-lg"
        >
          <span className="text-xl">👨‍🏫</span>
          <span className={`font-semibold ${lang === 'en' ? '' : 'font-urdu'}`}>{texts.title}</span>
        </button>
      ) : (
        <div className="w-[92vw] max-w-sm rounded-3xl border border-[#E5E3D5] bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-3xl bg-[#42188C] px-4 py-3 text-white">
            <div>
              <p className={`text-sm font-semibold ${lang === 'en' ? '' : 'font-urdu'}`}>{texts.title}</p>
              <p className="text-xs opacity-80">ذ — AI Tutor</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full bg-white/20 px-2 py-1 text-sm">
              ×
            </button>
          </div>

          <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto px-3 py-3">
            {messages.map((msg, index) => (
              <div key={`${msg.sender}-${index}`} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-[#42188C] text-white' : 'bg-[#F2F1E8] text-[#0D0D1A]'}`}>
                  <p className={lang === 'en' ? '' : 'font-urdu'}>{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-[#5A587A]">... سوچ رہا ہے</p>}
          </div>

          <div className="border-t border-[#E5E3D5] p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {['سوال پوچھو', 'مشق سمجھاؤ', 'ترتیب دو'].map((item) => (
                <button key={item} onClick={() => setInput(item)} className="rounded-full bg-[#EDE8FA] px-2.5 py-1 text-xs text-[#42188C]">
                  {item}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 rounded-xl border border-[#E5E3D5] px-3 py-2 text-sm outline-none"
                placeholder={texts.placeholder}
              />
              <button onClick={handleSend} className="rounded-xl bg-[#42188C] px-3 py-2 text-sm font-semibold text-white">
                {texts.send}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="mt-2 rounded-xl bg-[#0D0D1A] px-3 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
