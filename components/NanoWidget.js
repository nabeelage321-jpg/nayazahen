'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '@/lib/lang';

const storyPool = [
  'نانو کہتی ہیں کہ ایک بار ایک بچہ نے آسمان میں پرندوں کو دیکھ کر کہا کہ وہ بھی اتنا اُڑا جائے گا۔ نانو نے کہا کہ علم کے ساتھ ہر ایک خواب ممکن ہوتا ہے۔',
  'ایک دن ایک لڑکی نے بارش میں کھڑی ہو کر کہا کہ وہ اپنی کڑیا کو نہیں بچا سکتی۔ نانو نے کہا کہ ایک چھوٹی سی دُعا بھی بہت طاقتور ہوتی ہے۔',
  'نانو کہتی ہیں کہ ایک چھوٹا سا بچہ ہر صبح ایک نیا سوال لاتا تھا۔ اس سوال نے اس کے دل کو روشن کیا۔',
];

export default function NanoWidget() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('نانو یہاں ہیں، بیٹا — کیا تمہارا دل بھیجا چاہتا ہے؟');
  const [input, setInput] = useState('');
  const [mood, setMood] = useState('happy');
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);
  const speechRef = useRef(null);
  const idleTimerRef = useRef(null);

  const emoji = useMemo(() => ({ happy: '😊', proud: '🤩', tired: '😴', worried: '😟' }[mood] || '😊'), [mood]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ur-PK';
      recognition.continuous = false;
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results).map((result) => result[0].transcript).join(' ');
        setInput(transcript);
        setListening(false);
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }

    return () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      idleTimerRef.current = window.setTimeout(() => {
        const randomStory = storyPool[Math.floor(Math.random() * storyPool.length)];
        setMessage(randomStory);
      }, 30000);
      return () => window.clearTimeout(idleTimerRef.current);
    }
  }, [isOpen, message]);

  async function handleSend(text = input) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setLoading(true);
    setMessage('نانو سوچ رہی ہیں...');
    try {
      const res = await fetch('/api/nano', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      setMood(data?.mood || 'happy');
      setMessage(data?.text || 'نانو ابھی تک جواب نہیں دے سکی۔');
      speak(data?.text || 'نانو ابھی تک جواب نہیں دے سکی۔');
    } catch (error) {
      setMood('worried');
      setMessage('نانو تھوڑی دیر بعد دوبارہ آتی ہیں۔');
    } finally {
      setLoading(false);
      setInput('');
    }
  }

  function speak(text) {
    if (typeof window === 'undefined') return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const urduVoice = voices.find((voice) => /ur|pk|urdu/i.test(voice.lang)) || voices[0];
      if (urduVoice) utterance.voice = urduVoice;
      utterance.lang = 'ur-PK';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
      speechRef.current = utterance;
    }
  }

  function startListening() {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-3 rounded-full bg-[#42188C] px-4 py-3 text-white shadow-xl">
          <span className="animate-float text-2xl">👵</span>
          <span className="font-urdu">نانو</span>
        </button>
      ) : (
        <div className="w-[92vw] max-w-md rounded-3xl border border-[#E5E3D5] bg-[#FAFAF5] p-3 shadow-2xl">
          <div className="mb-3 flex items-center justify-between rounded-2xl bg-[#42188C] px-3 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{emoji}</span>
              <div>
                <p className="font-urdu text-sm">نانو</p>
                <p className="text-xs opacity-80">آج کی کہانی</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full bg-white/20 px-2 py-1 text-sm">×</button>
          </div>

          <div className="rounded-2xl bg-white p-3 text-sm text-[#0D0D1A] shadow-sm">
            <p className="font-urdu leading-7">{message}</p>
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 rounded-xl border border-[#E5E3D5] px-3 py-2 text-sm outline-none"
              placeholder="نانو سے بات کرو"
            />
            <button onClick={startListening} className="rounded-xl bg-[#0A7050] px-3 py-2 text-white">
              {listening ? '…' : '🎤'}
            </button>
            <button onClick={() => handleSend()} className="rounded-xl bg-[#42188C] px-3 py-2 text-white">
              {loading ? '…' : 'ارسال'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
