'use client';

import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { awardRubax } from '@/lib/rubax';
import { useLang } from '@/lib/lang';

const SUBJECTS = ['Math', 'Urdu', 'Science', 'English', 'Islamiat', 'Pakistan Studies', 'General Knowledge'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getTodaySubject(date = new Date()) {
  const day = date.getDay();
  return SUBJECTS[day % SUBJECTS.length];
}

const QUIZ_BANK = {
  Math: [
    { question: 'What is 12 + 8?', options: ['20', '18', '22', '16'], correct: '20' },
    { question: 'Which number is even?', options: ['7', '9', '4', '5'], correct: '4' },
    { question: 'What is 9 × 3?', options: ['24', '27', '30', '21'], correct: '27' },
    { question: 'What is the next number: 5, 10, 15, __?', options: ['16', '18', '20', '25'], correct: '20' },
    { question: 'If a triangle has 3 sides, how many sides does a square have?', options: ['3', '4', '5', '6'], correct: '4' },
    { question: 'What is 50 ÷ 5?', options: ['5', '8', '10', '12'], correct: '10' },
    { question: 'What is 15 - 7?', options: ['6', '8', '7', '9'], correct: '8' },
    { question: 'What is the value of 1 dozen?', options: ['10', '12', '13', '14'], correct: '12' },
    { question: 'Which shape has 4 equal sides?', options: ['Circle', 'Triangle', 'Rectangle', 'Square'], correct: 'Square' },
    { question: 'What is the place value of 4 in 45?', options: ['Ones', 'Hundreds', 'Tens', 'Zero'], correct: 'Tens' },
  ],
  Urdu: [
    { question: 'غیر متماثل لفظ کیا ہے؟', options: ['گلابی', 'بچہ', 'باغ', 'کتاب'], correct: 'بچہ' },
    { question: 'جملہ میں ایک لفظ کے لیے مناسب جواب ہے:', options: ['کیا', 'آج', 'بہت', 'سنسار'], correct: 'آج' },
    { question: 'کون سا لفظ روزمرہ کے لیے ہے؟', options: ['مکمل', 'سورج', 'پرسکون', 'شاندار'], correct: 'سورج' },
    { question: 'یہ کیا ہے؟', options: ['گھر', 'پھل', 'شہر', 'باغ'], correct: 'گھر' },
    { question: 'آواز کی درست شکل کیا ہے؟', options: ['بچہ', 'بچہ', 'بچہ', 'بچہ'], correct: 'بچہ' },
    { question: 'سچا جواب کون سا ہے؟', options: ['کتاب', 'قلم', 'بہت', 'نئی'], correct: 'کتاب' },
    { question: 'لفظ "آسمان" کا مطلب کیا ہے؟', options: ['زمین', 'آسمان', 'درخت', 'پانی'], correct: 'آسمان' },
    { question: 'کون سا لفظ رنگ کی نشاندہی کرتا ہے؟', options: ['سفید', 'جلد', 'باغ', 'پانی'], correct: 'سفید' },
    { question: 'کون سا جملہ درست ہے؟', options: ['میں نے بازار گیا۔', 'میں بازار گیا۔', 'میں بازار گئی۔', 'میں بازار گئے۔'], correct: 'میں بازار گیا۔' },
    { question: 'کون سا لفظ معیاری ہے؟', options: ['بچے', 'بچوں', 'بچو', 'بچہ'], correct: 'بچے' },
  ],
  Science: [
    { question: 'The sun gives us?', options: ['Water', 'Light and heat', 'Sound', 'Sand'], correct: 'Light and heat' },
    { question: 'Plants need what to grow?', options: ['Rock', 'Air and water', 'Plastic', 'Smoke'], correct: 'Air and water' },
    { question: 'Which part of the body helps us breathe?', options: ['Lungs', 'Teeth', 'Hair', 'Nose'], correct: 'Lungs' },
    { question: 'What do we wear on our feet?', options: ['Hat', 'Shoes', 'Gloves', 'Cap'], correct: 'Shoes' },
    { question: 'Which is a natural source of light?', options: ['Torch', 'Lamp', 'Sun', 'Mobile'], correct: 'Sun' },
    { question: 'Water freezes into what?', options: ['Steam', 'Ice', 'Smoke', 'Cloud'], correct: 'Ice' },
    { question: 'Which is a living thing?', options: ['Stone', 'Plant', 'Book', 'Chair'], correct: 'Plant' },
    { question: 'The Earth is surrounded by?', options: ['Water', 'Air', 'Fire', 'Sand'], correct: 'Air' },
    { question: 'What do bees collect?', options: ['Wood', 'Pollen', 'Paper', 'Dust'], correct: 'Pollen' },
    { question: 'Which planet do we live on?', options: ['Mars', 'Earth', 'Jupiter', 'Venus'], correct: 'Earth' },
  ],
  English: [
    { question: 'Choose the correct word: I ___ to school every day.', options: ['go', 'goes', 'going', 'gone'], correct: 'go' },
    { question: 'What is the opposite of big?', options: ['large', 'small', 'tall', 'wide'], correct: 'small' },
    { question: 'Which word means a place to sleep?', options: ['bed', 'table', 'chair', 'door'], correct: 'bed' },
    { question: 'Complete the sentence: She is my ____.', options: ['friend', 'car', 'book', 'house'], correct: 'friend' },
    { question: 'Which is a fruit?', options: ['chair', 'apple', 'shoe', 'pen'], correct: 'apple' },
    { question: 'Choose the correct article: ___ elephant.', options: ['a', 'an', 'the', 'is'], correct: 'an' },
    { question: 'Which word is a verb?', options: ['run', 'blue', 'happy', 'table'], correct: 'run' },
    { question: 'What is the plural of child?', options: ['childs', 'children', 'childes', 'child'], correct: 'children' },
    { question: 'Which sentence is correct?', options: ['He go to school.', 'He goes to school.', 'He going to school.', 'He gone to school.'], correct: 'He goes to school.' },
    { question: 'What do we use to write?', options: ['pencil', 'spoon', 'plate', 'shoe'], correct: 'pencil' },
  ],
  Islamiat: [
    { question: 'What is the name of the holy book of Muslims?', options: ['Bible', 'Torah', 'Quran', 'Gita'], correct: 'Quran' },
    { question: 'Who is the last Prophet?', options: ['Musa', 'Isa', 'Muhammad', 'Ibrahim'], correct: 'Muhammad' },
    { question: 'What do Muslims say before eating?', options: ['Alhamdulillah', 'Bismillah', 'SubhanAllah', 'Astaghfirullah'], correct: 'Bismillah' },
    { question: 'What is the name of Allah’s house in Makkah?', options: ['Masjid Quba', 'Masjid Nabawi', 'Kaaba', 'Masjid Ayesha'], correct: 'Kaaba' },
    { question: 'What is prayer called in Islam?', options: ['Zakat', 'Salah', 'Hajj', 'Sawm'], correct: 'Salah' },
    { question: 'Which month is fasting observed in Islam?', options: ['Rajab', 'Ramadan', 'Shaban', 'Dhul Hijjah'], correct: 'Ramadan' },
    { question: 'How many pillars of Islam are there?', options: ['4', '5', '6', '7'], correct: '5' },
    { question: 'What is the first pillar of Islam?', options: ['Salah', 'Hajj', 'Shahada', 'Zakat'], correct: 'Shahada' },
    { question: 'What is the meaning of Bismillah?', options: ['In the name of Allah', 'All praise to Allah', 'Glory be to Allah', 'Praise be to Allah'], correct: 'In the name of Allah' },
    { question: 'What is charity called in Islam?', options: ['Zakat', 'Salah', 'Sawm', 'Hajj'], correct: 'Zakat' },
  ],
  'Pakistan Studies': [
    { question: 'What is the capital of Pakistan?', options: ['Karachi', 'Islamabad', 'Lahore', 'Peshawar'], correct: 'Islamabad' },
    { question: 'What is the national language of Pakistan?', options: ['Arabic', 'Urdu', 'English', 'Persian'], correct: 'Urdu' },
    { question: 'Which mountain range is in Pakistan?', options: ['Alps', 'Himalayas', 'Andes', 'Rockies'], correct: 'Himalayas' },
    { question: 'Which city is known as the city of lights?', options: ['Lahore', 'Karachi', 'Faisalabad', 'Quetta'], correct: 'Lahore' },
    { question: 'What is the national flower of Pakistan?', options: ['Rose', 'Jasmine', 'Tulip', 'Lotus'], correct: 'Jasmine' },
    { question: 'Who is the founder of Pakistan?', options: ['Allama Iqbal', 'Quaid-e-Azam', 'Zia ul Haq', 'Ayub Khan'], correct: 'Quaid-e-Azam' },
    { question: 'Which river flows through Punjab?', options: ['Nile', 'Indus', 'Amazon', 'Yangtze'], correct: 'Indus' },
    { question: 'Pakistan shares a border with which country to the west?', options: ['China', 'India', 'Iran', 'Afghanistan'], correct: 'Iran' },
    { question: 'Which province has the largest population?', options: ['Balochistan', 'Punjab', 'Sindh', 'Khyber Pakhtunkhwa'], correct: 'Punjab' },
    { question: 'What is Pakistan’s national animal?', options: ['Markhor', 'Lion', 'Tiger', 'Camel'], correct: 'Markhor' },
  ],
  'General Knowledge': [
    { question: 'Which country is known as the land of the rising sun?', options: ['China', 'Japan', 'India', 'Pakistan'], correct: 'Japan' },
    { question: 'How many days are there in a leap year?', options: ['364', '365', '366', '367'], correct: '366' },
    { question: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 'Pacific' },
    { question: 'Which instrument measures temperature?', options: ['Barometer', 'Thermometer', 'Compass', 'Scale'], correct: 'Thermometer' },
    { question: 'Which is the capital of Turkey?', options: ['Ankara', 'Istanbul', 'Izmir', 'Bursa'], correct: 'Ankara' },
    { question: 'What is the national fruit of Pakistan?', options: ['Mango', 'Apple', 'Banana', 'Orange'], correct: 'Mango' },
    { question: 'Which animal is known as the king of the jungle?', options: ['Elephant', 'Tiger', 'Lion', 'Bear'], correct: 'Lion' },
    { question: 'How many months are there in a year?', options: ['10', '11', '12', '13'], correct: '12' },
    { question: 'Which planet is famous for its rings?', options: ['Mars', 'Venus', 'Saturn', 'Mercury'], correct: 'Saturn' },
    { question: 'Which city is called the city of gardens?', options: ['Lahore', 'Islamabad', 'Peshawar', 'Karachi'], correct: 'Lahore' },
  ],
};

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export default function QuizPage() {
  const { dir, pick } = useLang();
  const [user, setUser] = useState(null);
  const [now, setNow] = useState(new Date());
  const [live, setLive] = useState(false);
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [finished, setFinished] = useState(false);
  const [rewarded, setRewarded] = useState(false);
  const [message, setMessage] = useState('');
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date();
      setNow(current);
      const hour = current.getHours();
      const minute = current.getMinutes();
      setLive(hour === 16 && minute >= 0 && minute <= 30);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('quiz-scores') || '[]');
      setScores(saved);
    }
  }, []);

  useEffect(() => {
    const currentSubject = getTodaySubject(now);
    setSubject(currentSubject);
    setQuestions(QUIZ_BANK[currentSubject] || []);
  }, [now]);

  useEffect(() => {
    if (!live || finished || !questions.length) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [live, finished, currentIndex, questions]);

  const nextTime = useMemo(() => {
    const target = new Date(now);
    target.setHours(16, 0, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    return Math.max(0, Math.floor((target - now) / 1000));
  }, [now]);

  const handleAnswer = async (option) => {
    if (answered) return;
    const currentQuestion = questions[currentIndex];
    const isCorrect = option === currentQuestion?.correct;
    if (isCorrect) setScore((prev) => prev + 1);
    setAnswered(true);
    setSelected(option);
    setMessage(isCorrect ? pick('Correct!', 'درست!)') : pick('Not quite — try the next one.', 'نہیں — اگلی کوشش کریں۔'));

    if (currentIndex === questions.length - 1) {
      const finalScore = score + (isCorrect ? 1 : 0);
      setFinished(true);
      const earned = 10 + finalScore * 2;
      if (!rewarded && user?.uid) {
        await awardRubax(user.uid, earned, 'Quiz win');
        setRewarded(true);
      }
      if (typeof window !== 'undefined') {
        const history = [
          { id: Date.now(), subject, score: finalScore, earned },
          ...scores,
        ].slice(0, 6);
        localStorage.setItem('quiz-scores', JSON.stringify(history));
        setScores(history);
      }
      return;
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(30);
      setMessage('');
    }, 1000);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <main dir={dir} className="min-h-screen bg-[#f7f8ff] text-[#1d2a43]">
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e7eafd] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4659d1]">
                {pick('4 PM Daily Quiz', '4 بجے روزانہ کوئز')}
              </p>
              <h1 className="mt-2 text-3xl font-black text-[#243569] sm:text-4xl">
                {live ? pick('Live quiz right now', 'ابھی لائیو کوئز') : pick('Ready for the next quiz', 'اگلے کوئز کے لیے تیار')}
              </h1>
            </div>
            <div className="rounded-2xl border border-[#e7eafd] bg-[#f7f8ff] px-4 py-3 text-sm text-[#44517b]">
              {pick('Today’s subject', 'آج کا موضوع')} : {pick(subject || 'Loading', subject || 'لوڈ ہو رہا ہے')}
            </div>
          </div>

          {live && !finished ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.6fr]">
              <div className="rounded-[24px] border border-[#e7eafd] bg-[#f9fbff] p-5">
                <div className="flex items-center justify-between text-sm font-semibold text-[#44517b]">
                  <span>{pick('Question', 'سوال')} {currentIndex + 1}/10</span>
                  <span>{pick('Time left', 'باقی وقت')} {formatTime(timeLeft)}</span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-[#243569]">{currentQuestion?.question}</h2>
                <div className="mt-5 grid gap-3">
                  {currentQuestion?.options.map((option) => (
                    <button key={option} onClick={() => handleAnswer(option)} disabled={answered} className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${answered ? 'cursor-default' : 'hover:bg-[#eef2ff]'}` + (answered && option === currentQuestion.correct ? ' border-[#2f9e44] bg-[#e8f8ec]' : ' border-[#dfe6f7] bg-white') }>
                      {option}
                    </button>
                  ))}
                </div>
                {message && <p className="mt-4 rounded-2xl bg-[#eef2ff] px-3 py-3 text-sm font-semibold text-[#4659d1]">{message}</p>}
              </div>
              <div className="rounded-[24px] border border-[#e7eafd] bg-[#f9fbff] p-5">
                <h3 className="text-lg font-bold text-[#243569]">{pick('Quick stats', 'فوری اعداد و شمار')}</h3>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl bg-white p-3 text-sm text-[#44517b]">
                    <p>{pick('Score', 'اسکور')}</p>
                    <p className="mt-1 text-2xl font-black text-[#243569]">{score}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 text-sm text-[#44517b]">
                    <p>{pick('Live window', 'لائیو ونڈو')}</p>
                    <p className="mt-1 text-2xl font-black text-[#243569]">4:00–4:30 PM</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 text-sm text-[#44517b]">
                    <p>{pick('Reward', 'انعام')}</p>
                    <p className="mt-1 text-2xl font-black text-[#243569]">10+ Rubax</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_0.7fr]">
              <div className="rounded-[24px] border border-[#e7eafd] bg-[#f9fbff] p-5">
                {!finished ? (
                  <>
                    <h2 className="text-2xl font-black text-[#243569]">{pick('Countdown to the next 4 PM quiz', 'اگلے 4 بجے کے کوئز تک گنتی')}</h2>
                    <div className="mt-5 rounded-2xl bg-[#eef2ff] p-6 text-center">
                      <p className="text-sm font-semibold text-[#44517b]">{pick('Next quiz starts in', 'اگلا کوئز شروع ہوگا')}</p>
                      <p className="mt-3 text-5xl font-black text-[#4659d1]">{formatTime(nextTime)}</p>
                    </div>
                    <p className="mt-4 text-sm text-[#44517b]">{pick('Today’s subject is', 'آج کا موضوع ہے')} <span className="font-semibold text-[#243569]">{pick(subject, subject)}</span>.</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-[#243569]">{pick('Quiz complete', 'کوئز مکمل')}</h2>
                    <p className="mt-3 text-sm text-[#44517b]">{pick('You scored', 'آپ کا سکور')} {score}/10</p>
                    <div className="mt-5 rounded-2xl bg-[#e8f8ec] p-5 text-center text-[#2f9e44]">
                      <p className="text-sm font-semibold">{pick('Rubax earned', 'روبیکس حاصل کیے')}</p>
                      <p className="mt-2 text-4xl font-black">{10 + score * 2}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="rounded-[24px] border border-[#e7eafd] bg-[#f9fbff] p-5">
                <h3 className="text-lg font-bold text-[#243569]">{pick('Previous quiz scores', 'پچھلے کوئز کے اسکور')}</h3>
                <div className="mt-4 space-y-2">
                  {scores.length === 0 ? (
                    <p className="text-sm text-[#44517b]">{pick('No scores yet. Join the live quiz today.', 'ابھی تک کوئی اسکور نہیں۔ آج لائیو کوئز میں شمولیت اختیار کریں۔')}</p>
                  ) : (
                    scores.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-[#e7eafd] bg-white px-3 py-3 text-sm text-[#44517b]">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{item.subject}</span>
                          <span className="text-[#4659d1]">{item.score}/10</span>
                        </div>
                        <p className="mt-1 text-xs">{pick('Rubax earned', 'روبیکس حاصل کیے')} {item.earned}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
