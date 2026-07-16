'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLang } from '@/lib/lang';
import { CITIES } from '@/data/cities';

const TABS = ['parent', 'school', 'student'];

const TEXT = {
  tab_parent: { ur: 'والدین', en: 'Parent', pa: 'ماں باپ', sd: 'والدين', ps: 'مور پلار' },
  tab_school: { ur: 'اسکول', en: 'School', pa: 'اسکول', sd: 'اسڪول', ps: 'ښوونځی' },
  tab_student: { ur: 'طالب علم', en: 'Student', pa: 'طالب علم', sd: 'شاگرد', ps: 'زده کوونکی' },

  title_parent: {
    ur: 'اپنے بچے کے مستقبل میں سرمایہ کاری کریں',
    en: "Invest in your child's future",
    pa: 'اپنے بچے دے مستقبل وچ سرمایہ کاری کرو',
    sd: 'پنهنجي ٻار جي مستقبل ۾ سيڙپڪاري ڪريو',
    ps: 'د خپل ماشوم په راتلونکي کې پانګونه وکړئ',
  },
  title_school: {
    ur: 'اپنے اسکول کو ہمارے ساتھ رجسٹر کریں',
    en: 'Register your school with us',
    pa: 'اپنا اسکول ساڈے نال رجسٹر کرو',
    sd: 'پنهنجو اسڪول اسان سان رجسٽر ڪريو',
    ps: 'خپل ښوونځی زموږ سره راجسټر کړئ',
  },
  title_student: {
    ur: 'اپنا سفر آج ہی شروع کریں',
    en: 'Start your journey today',
    pa: 'اپنا سفر اج ای شروع کرو',
    sd: 'اڄ ئي پنهنجو سفر شروع ڪريو',
    ps: 'خپل سفر نن ورځ پیل کړئ',
  },

  name_label: { ur: 'پورا نام', en: 'Full Name', pa: 'پورا ناں', sd: 'پورو نالو', ps: 'بشپړ نوم' },
  name_placeholder: {
    ur: 'اپنا نام درج کریں',
    en: 'Enter your name',
    pa: 'اپنا ناں لکھو',
    sd: 'پنهنجو نالو داخل ڪريو',
    ps: 'خپل نوم دننه کړئ',
  },
  phone_label: { ur: 'فون نمبر', en: 'Phone Number', pa: 'فون نمبر', sd: 'فون نمبر', ps: 'د تلیفون شمېره' },
  phone_placeholder: {
    ur: '03xx-xxxxxxx',
    en: '03xx-xxxxxxx',
    pa: '03xx-xxxxxxx',
    sd: '03xx-xxxxxxx',
    ps: '03xx-xxxxxxx',
  },
  city_label: { ur: 'شہر', en: 'City', pa: 'شہر', sd: 'شهر', ps: 'ښار' },
  city_placeholder: {
    ur: 'اپنا شہر منتخب کریں',
    en: 'Select your city',
    pa: 'اپنا شہر چنو',
    sd: 'پنهنجو شهر چونڊيو',
    ps: 'خپل ښار وټاکئ',
  },
  submit: {
    ur: 'ابھی رجسٹر کریں',
    en: 'Register Now',
    pa: 'ہُنے رجسٹر کرو',
    sd: 'هاڻي رجسٽر ڪريو',
    ps: 'اوس راجسټر شئ',
  },
  submitting: { ur: 'بھیجا جا رہا ہے...', en: 'Submitting...', pa: 'بھیجیا جا رہیا اے...', sd: 'موڪلجي رهيو آهي...', ps: 'لیږل کیږي...' },
  success: {
    ur: 'شکریہ! ہماری ٹیم جلد آپ سے رابطہ کرے گی۔',
    en: "Thank you! Our team will contact you soon.",
    pa: 'شکریہ! ساڈی ٹیم چھیتی رابطہ کرے گی۔',
    sd: 'مهرباني! اسان جي ٽيم جلد توهان سان رابطو ڪندي.',
    ps: 'مننه! زموږ ټیم به ژر له تاسو سره اړیکه ونیسي.',
  },
  error: {
    ur: 'کچھ غلط ہو گیا، براہ کرم دوبارہ کوشش کریں۔',
    en: 'Something went wrong. Please try again.',
    pa: 'کجھ غلط ہو گیا، دوبارہ کوشش کرو۔',
    sd: 'ڪجهه غلط ٿي ويو، مهرباني ڪري ٻيهر ڪوشش ڪريو.',
    ps: 'یو څه garbage شو، مهرباني وکړئ بیا هڅه وکړئ.',
  },
  error_fields: {
    ur: 'براہ کرم تمام خانے پُر کریں۔',
    en: 'Please fill in all fields.',
    pa: 'براہ کرم سارے خانے پُر کرو۔',
    sd: 'مهرباني ڪري سڀ خانا ڀريو.',
    ps: 'مهرباني وکړئ ټول ساحې ډک کړئ.',
  },
};

export default function LeadForm() {
  const { lang } = useLang();
  const isRTL = ['ur', 'pa', 'sd', 'ps'].includes(lang);
  const t = (key) => TEXT[key]?.[lang] || TEXT[key]?.en || key;

  const [activeTab, setActiveTab] = useState('parent');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const cityLabel = (c) => c[lang] || c.en || c.id;

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim() || !city) {
      setStatus('error');
      setErrorMsg(t('error_fields'));
      return;
    }

    setStatus('submitting');

    try {
      await addDoc(collection(db, 'leads'), {
        name: name.trim(),
        phone: phone.trim(),
        city,
        tab: activeTab,
        lang,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setName('');
      setPhone('');
      setCity('');
    } catch (err) {
      console.error('Error saving lead:', err);
      setStatus('error');
      setErrorMsg(t('error'));
    }
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`card max-w-lg mx-auto ${isRTL ? 'font-urdu text-right' : ''}`}>
      {/* Tabs */}
      <div className="flex rounded-lg bg-[#F2F1E8] p-1 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveTab(tab);
              setStatus('idle');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-[#42188C] shadow-sm'
                : 'text-[#0D0D1A]/60 hover:text-[#0D0D1A]'
            }`}
          >
            {t(`tab_${tab}`)}
          </button>
        ))}
      </div>

      <h2 className="section-title text-xl mb-1">{t(`title_${activeTab}`)}</h2>

      {status === 'success' ? (
        <div className="mt-4 rounded-lg bg-[#0A7050]/10 border border-[#0A7050]/30 text-[#0A7050] px-4 py-4 text-sm">
          {t('success')}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#0D0D1A] mb-1.5">
              {t('name_label')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('name_placeholder')}
              className={`w-full rounded-lg border border-[#E5E3D5] bg-white px-4 py-2.5 text-sm text-[#0D0D1A] placeholder:text-[#0D0D1A]/40 focus:outline-none focus:ring-2 focus:ring-[#42188C]/30 focus:border-[#42188C] ${
                isRTL ? 'text-right' : ''
              }`}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[#0D0D1A] mb-1.5">
              {t('phone_label')}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('phone_placeholder')}
              dir="ltr"
              className={`w-full rounded-lg border border-[#E5E3D5] bg-white px-4 py-2.5 text-sm text-[#0D0D1A] placeholder:text-[#0D0D1A]/40 focus:outline-none focus:ring-2 focus:ring-[#42188C]/30 focus:border-[#42188C] ${
                isRTL ? 'text-right' : ''
              }`}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-[#0D0D1A] mb-1.5">
              {t('city_label')}
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`w-full rounded-lg border border-[#E5E3D5] bg-white px-4 py-2.5 text-sm text-[#0D0D1A] focus:outline-none focus:ring-2 focus:ring-[#42188C]/30 focus:border-[#42188C] ${
                isRTL ? 'text-right' : ''
              }`}
            >
              <option value="" disabled>
                {t('city_placeholder')}
              </option>
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {cityLabel(c)}
                </option>
              ))}
            </select>
          </div>

          {status === 'error' && errorMsg && (
            <div className="rounded-lg bg-[#B83008]/10 border border-[#B83008]/30 text-[#B83008] px-4 py-3 text-sm">
              {errorMsg}
            </div>
          )}

          <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full py-2.5 disabled:opacity-60">
            {status === 'submitting' ? t('submitting') : t('submit')}
          </button>
        </form>
      )}
    </div>
  );
}
