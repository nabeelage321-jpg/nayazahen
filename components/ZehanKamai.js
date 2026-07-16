'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLang } from '@/lib/lang';

const starterMessages = [
  { sender: 'bot', text: 'السلام علیکم! میں ذہن کمائی ہوں۔ آج کس طرح کمانا چاہتے ہو؟' },
];

const suggestions = ['image labelling', 'voice recording', 'poster design', 'social captions'];

export default function ZehanKamai() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const texts = useMemo(() => ({
    title: lang === 'en' ? 'Zehan Kamai' : 'ذہن کمائی',
    placeholder: lang === 'en' ? 'Tell me a skill idea' : 'ایک کام کی آئیڈیا لکھو',
    send: lang === 'en' ? 'Send' : 'بھیجو',
    rateLimit: lang === 'en' ? 'Please wait a moment and try again.' : 'تھوڑا رکو بیٹا — دوبارہ کوشش کریں',
  }), [lang]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  async function handleSend(messageText = input) {
    const trimmed = messageText.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/kamai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: messages.slice(-4), age: 10 }),
      });
      const data = await res.json();

      if (res.status === 429 || data?.error === 'rate_limit') {
        setToast(texts.rateLimit);
        setMessages((prev) => [...prev, { sender: 'bot', text: texts.rateLimit }]);
      } else if (data?.text) {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.text }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'میں ابھی تجویز دے نہیں سکتا۔' }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'میں ابھی تجویز دے نہیں سکتا۔' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-3 rounded-full bg-[#0A7050] px-4 py-3 text-white shadow-lg">
          <span className="text-xl">💰</span>
          <span className={`font-semibold ${lang === 'en' ? '' : 'font-urdu'}`}>{texts.title}</span>
        </button>
      ) : (
        <div className="w-[92vw] max-w-sm rounded-3xl border border-[#E0F5EE] bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-3xl bg-[#0A7050] px-4 py-3 text-white">
            <div>
              <p className={`text-sm font-semibold ${lang === 'en' ? '' : 'font-urdu'}`}>{texts.title}</p>
              <p className="text-xs opacity-80">ک — Earn Skills</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full bg-white/20 px-2 py-1 text-sm">×</button>
          </div>

          <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto px-3 py-3">
            {messages.map((msg, index) => (
              <div key={`${msg.sender}-${index}`} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-[#0A7050] text-white' : 'bg-[#E0F5EE] text-[#0D0D1A]'}`}>
                  <p className={lang === 'en' ? '' : 'font-urdu'}>{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-[#5A587A]">... سوچ رہا ہے</p>}
          </div>

          <div className="border-t border-[#E0F5EE] p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button key={item} onClick={() => handleSend(item)} className="rounded-full bg-[#E0F5EE] px-2.5 py-1 text-xs text-[#0A7050]">
                  {item}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 rounded-xl border border-[#E0F5EE] px-3 py-2 text-sm outline-none"
                placeholder={texts.placeholder}
              />
              <button onClick={() => handleSend()} className="rounded-xl bg-[#0A7050] px-3 py-2 text-sm font-semibold text-white">
                {texts.send}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="mt-2 rounded-xl bg-[#0D0D1A] px-3 py-2 text-sm text-white shadow-lg">{toast}</div>}
    </div>
  );
}
