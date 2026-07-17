'use client';

import { useMemo, useState } from 'react';
import { useLang } from '@/lib/lang';

const NAMES = [
  { id: 1, name: 'ٱلرَّحْمَـٰن', transliteration: 'Ar-Rahman', meaningEn: 'The Most Compassionate', meaningUr: 'بہت مہربان' },
  { id: 2, name: 'ٱلرَّحِيم', transliteration: 'Ar-Raheem', meaningEn: 'The Most Merciful', meaningUr: 'بہت رحم کرنے والا' },
  { id: 3, name: 'ٱلْمَلِك', transliteration: 'Al-Malik', meaningEn: 'The King', meaningUr: 'بادشاہ' },
  { id: 4, name: 'ٱلْقُدُّوس', transliteration: 'Al-Quddus', meaningEn: 'The Most Holy', meaningUr: 'بہت پاک' },
  { id: 5, name: 'ٱلسَّلَام', transliteration: 'As-Salam', meaningEn: 'The Source of Peace', meaningUr: 'امن کا ذریعہ' },
  { id: 6, name: 'ٱلْمُؤْمِن', transliteration: 'Al-Mu’min', meaningEn: 'The Giver of Security', meaningUr: 'امان دینے والا' },
  { id: 7, name: 'ٱلْمُهَيْمِن', transliteration: 'Al-Muhaymin', meaningEn: 'The Guardian', meaningUr: 'نگرانی کرنے والا' },
  { id: 8, name: 'ٱلْعَزِيز', transliteration: 'Al-Azeez', meaningEn: 'The Almighty', meaningUr: 'بہت زبردست' },
  { id: 9, name: 'ٱلْجَبَّار', transliteration: 'Al-Jabbar', meaningEn: 'The Compeller', meaningUr: 'زبردست طاقت والا' },
  { id: 10, name: 'ٱلْمُتَكَبِّر', transliteration: 'Al-Mutakabbir', meaningEn: 'The Majestic', meaningUr: 'عظمت والا' },
  { id: 11, name: 'ٱلْخَالِق', transliteration: 'Al-Khaaliq', meaningEn: 'The Creator', meaningUr: 'بنانے والا' },
  { id: 12, name: 'ٱلْبَارِئ', transliteration: 'Al-Baari', meaningEn: 'The Evolver', meaningUr: 'پیدا کرنے والا' },
  { id: 13, name: 'ٱلْمُصَوِّر', transliteration: 'Al-Musawwir', meaningEn: 'The Fashioner', meaningUr: 'شکل دینے والا' },
  { id: 14, name: 'ٱلْغَفَّار', transliteration: 'Al-Ghaffar', meaningEn: 'The Forgiving', meaningUr: 'بخشنے والا' },
  { id: 15, name: 'ٱلْقَهَّار', transliteration: 'Al-Qahhaar', meaningEn: 'The Subduer', meaningUr: 'مغلوب کرنے والا' },
  { id: 16, name: 'ٱلْوَهَّاب', transliteration: 'Al-Wahhab', meaningEn: 'The Bestower', meaningUr: 'بخشش کرنے والا' },
  { id: 17, name: 'ٱلرَّزَّاق', transliteration: 'Ar-Razzaq', meaningEn: 'The Provider', meaningUr: 'رزق دینے والا' },
  { id: 18, name: 'ٱلْفَتَّاح', transliteration: 'Al-Fattah', meaningEn: 'The Opener', meaningUr: 'کھولنے والا' },
  { id: 19, name: 'ٱلْعَلِيم', transliteration: 'Al-Aleem', meaningEn: 'The All-Knowing', meaningUr: 'سب کچھ جاننے والا' },
  { id: 20, name: 'ٱلْقَابِض', transliteration: 'Al-Qabid', meaningEn: 'The Constrictor', meaningUr: 'تنگ کرنے والا' },
  { id: 21, name: 'ٱلْبَاسِط', transliteration: 'Al-Basit', meaningEn: 'The Expander', meaningUr: 'وسیع کرنے والا' },
  { id: 22, name: 'ٱلْخَافِض', transliteration: 'Al-Khafid', meaningEn: 'The Abaser', meaningUr: 'ذلیل کرنے والا' },
  { id: 23, name: 'ٱلرَّافِع', transliteration: 'Ar-Rafi', meaningEn: 'The Exalter', meaningUr: 'بلند کرنے والا' },
  { id: 24, name: 'ٱلْمُعِزُّ', transliteration: 'Al-Mu’izz', meaningEn: 'The Honourer', meaningUr: 'عزت دینے والا' },
  { id: 25, name: 'ٱلْمُذِلُّ', transliteration: 'Al-Mudhill', meaningEn: 'The Dishonourer', meaningUr: 'ذلیل کرنے والا' },
  { id: 26, name: 'ٱلسَّمِيع', transliteration: 'As-Sami', meaningEn: 'The All-Hearing', meaningUr: 'سب کچھ سننے والا' },
  { id: 27, name: 'ٱلْبَصِير', transliteration: 'Al-Baseer', meaningEn: 'The All-Seeing', meaningUr: 'سب کچھ دیکھنے والا' },
  { id: 28, name: 'ٱلْحَكَم', transliteration: 'Al-Hakam', meaningEn: 'The Judge', meaningUr: 'فیصلہ کرنے والا' },
  { id: 29, name: 'ٱلْعَدْل', transliteration: 'Al-‘Adl', meaningEn: 'The Utterly Just', meaningUr: 'بے حد انصاف کرنے والا' },
  { id: 30, name: 'ٱللَّطِيف', transliteration: 'Al-Lateef', meaningEn: 'The Subtle One', meaningUr: 'نرم اور باریک' },
  { id: 31, name: 'ٱلْخَبِير', transliteration: 'Al-Khabeer', meaningEn: 'The Acquainted', meaningUr: 'سب سے باخبر' },
  { id: 32, name: 'ٱلْحَلِيم', transliteration: 'Al-Haleem', meaningEn: 'The Most Forbearing', meaningUr: 'بہت بردبار' },
  { id: 33, name: 'ٱلْعَظِيم', transliteration: 'Al-Azeem', meaningEn: 'The Magnificent', meaningUr: 'بہت عظیم' },
  { id: 34, name: 'ٱلْغَفُور', transliteration: 'Al-Ghafoor', meaningEn: 'The Forgiving', meaningUr: 'بہت معاف کرنے والا' },
  { id: 35, name: 'ٱلشَّكُور', transliteration: 'Ash-Shakoor', meaningEn: 'The Appreciative', meaningUr: 'شکر گزار' },
  { id: 36, name: 'ٱلْعَلِي', transliteration: 'Al-Aliyy', meaningEn: 'The Most High', meaningUr: 'سب سے بلند' },
  { id: 37, name: 'ٱلْكَبِير', transliteration: 'Al-Kabeer', meaningEn: 'The Greatest', meaningUr: 'سب سے بڑا' },
  { id: 38, name: 'ٱلْحَفِيظ', transliteration: 'Al-Hafeez', meaningEn: 'The Preserver', meaningUr: 'حفاظت کرنے والا' },
  { id: 39, name: 'ٱلْمُقِيت', transliteration: 'Al-Muqeet', meaningEn: 'The Sustainer', meaningUr: 'پوری کرنے والا' },
  { id: 40, name: 'ٱلْحَسِيب', transliteration: 'Al-Hasib', meaningEn: 'The Reckoner', meaningUr: 'حساب لینے والا' },
  { id: 41, name: 'ٱلْجَلِيل', transliteration: 'Al-Jaleel', meaningEn: 'The Majestic', meaningUr: 'بہت عظمت والا' },
  { id: 42, name: 'ٱلْكَرِيم', transliteration: 'Al-Kareem', meaningEn: 'The Generous', meaningUr: 'بہت کریم' },
  { id: 43, name: 'ٱلرَّقِيب', transliteration: 'Ar-Raqeeb', meaningEn: 'The Watchful', meaningUr: 'نگرانی کرنے والا' },
  { id: 44, name: 'ٱلْمُجِيب', transliteration: 'Al-Mujeeb', meaningEn: 'The Responsive', meaningUr: 'پاسخ دینے والا' },
  { id: 45, name: 'ٱلْوَاسِع', transliteration: 'Al-Waasi', meaningEn: 'The Vast', meaningUr: 'وسیع' },
  { id: 46, name: 'ٱلْحَكِيم', transliteration: 'Al-Hakeem', meaningEn: 'The Wise', meaningUr: 'حکمت والا' },
  { id: 47, name: 'ٱلْوَدُود', transliteration: 'Al-Wadood', meaningEn: 'The Most Loving', meaningUr: 'بہت محبت کرنے والا' },
  { id: 48, name: 'ٱلْمَجِيد', transliteration: 'Al-Majeed', meaningEn: 'The Glorious', meaningUr: 'بہت شاندار' },
  { id: 49, name: 'ٱلْبَاعِث', transliteration: 'Al-Ba’ith', meaningEn: 'The Resurrector', meaningUr: 'پیدا کرنے والا' },
  { id: 50, name: 'ٱلشَّهِيد', transliteration: 'Ash-Shaheed', meaningEn: 'The Witness', meaningUr: 'گواہ' },
  { id: 51, name: 'ٱلْحَق', transliteration: 'Al-Haqq', meaningEn: 'The Truth', meaningUr: 'سچ' },
  { id: 52, name: 'ٱلْوَكِيل', transliteration: 'Al-Wakeel', meaningEn: 'The Trustee', meaningUr: 'بھروسہ کرنے والا' },
  { id: 53, name: 'ٱلْقَوِي', transliteration: 'Al-Qawwiy', meaningEn: 'The Strong', meaningUr: 'بہت مضبوط' },
  { id: 54, name: 'ٱلْمَتِين', transliteration: 'Al-Mateen', meaningEn: 'The Firm', meaningUr: 'مضبوط' },
  { id: 55, name: 'ٱلْوَلِي', transliteration: 'Al-Waliyy', meaningEn: 'The Protecting Friend', meaningUr: 'دوست اور محافظ' },
  { id: 56, name: 'ٱلْحَمِيد', transliteration: 'Al-Hameed', meaningEn: 'The Praiseworthy', meaningUr: 'ستائش والے' },
  { id: 57, name: 'ٱلْمُحْصِي', transliteration: 'Al-Muhsi', meaningEn: 'The Counter', meaningUr: 'شمار کرنے والا' },
  { id: 58, name: 'ٱلْمُبْدِئ', transliteration: 'Al-Mubdi', meaningEn: 'The Originator', meaningUr: 'آغاز کرنے والا' },
  { id: 59, name: 'ٱلْمُعِيد', transliteration: 'Al-Mu’eed', meaningEn: 'The Restorer', meaningUr: 'دوبارہ بنانے والا' },
  { id: 60, name: 'ٱلْمُحْيِي', transliteration: 'Al-Muhyi', meaningEn: 'The Giver of Life', meaningUr: 'زندگی دینے والا' },
  { id: 61, name: 'ٱلْمُمِيت', transliteration: 'Al-Mumeet', meaningEn: 'The Taker of Life', meaningUr: 'زندگی چھیننے والا' },
  { id: 62, name: 'ٱلْحَي', transliteration: 'Al-Hayy', meaningEn: 'The Ever-Living', meaningUr: 'ہمیشہ زندہ' },
  { id: 63, name: 'ٱلْقَيُّوم', transliteration: 'Al-Qayyoom', meaningEn: 'The Sustainer', meaningUr: 'سب کا سہارا' },
  { id: 64, name: 'ٱلْوَاجِد', transliteration: 'Al-Waajid', meaningEn: 'The Perceiver', meaningUr: 'پہچاننے والا' },
  { id: 65, name: 'ٱلْمَاجِد', transliteration: 'Al-Maajid', meaningEn: 'The Noble', meaningUr: 'بہت شرافت والا' },
  { id: 66, name: 'ٱلْوَاحِد', transliteration: 'Al-Waahid', meaningEn: 'The One', meaningUr: 'ایک' },
  { id: 67, name: 'ٱلْأَحَد', transliteration: 'Al-Ahad', meaningEn: 'The Unique', meaningUr: 'یگانه' },
  { id: 68, name: 'ٱلْصَّمَد', transliteration: 'As-Samad', meaningEn: 'The Eternal', meaningUr: 'ہمیشہ رہنے والا' },
  { id: 69, name: 'ٱلْقَادِر', transliteration: 'Al-Qadir', meaningEn: 'The Capable', meaningUr: 'طاقت رکھنے والا' },
  { id: 70, name: 'ٱلْمُقْتَدِر', transliteration: 'Al-Muqtadir', meaningEn: 'The Powerful', meaningUr: 'قدرت والا' },
  { id: 71, name: 'ٱلْمُقَدِّم', transliteration: 'Al-Muqaddim', meaningEn: 'The Expediter', meaningUr: 'آگے کرنے والا' },
  { id: 72, name: 'ٱلْمُؤَخِّر', transliteration: 'Al-Mu’akhkhir', meaningEn: 'The Delayer', meaningUr: 'پچھے کرنے والا' },
  { id: 73, name: 'ٱلأَوَّل', transliteration: 'Al-Awwal', meaningEn: 'The First', meaningUr: 'پہلا' },
  { id: 74, name: 'ٱلْآخِر', transliteration: 'Al-Aakhir', meaningEn: 'The Last', meaningUr: 'آخری' },
  { id: 75, name: 'ٱلظَّاهِر', transliteration: 'Az-Zaahir', meaningEn: 'The Manifest', meaningUr: 'ظاہر' },
  { id: 76, name: 'ٱلْبَاطِن', transliteration: 'Al-Baatin', meaningEn: 'The Hidden', meaningUr: 'پوشیدہ' },
  { id: 77, name: 'ٱلْوَالِي', transliteration: 'Al-Waali', meaningEn: 'The Governor', meaningUr: 'حاکم' },
  { id: 78, name: 'ٱلْمُتَعَالِي', transliteration: 'Al-Muta’ali', meaningEn: 'The Most Exalted', meaningUr: 'بہت اعلی' },
  { id: 79, name: 'ٱلْبَر', transliteration: 'Al-Barr', meaningEn: 'The Source of Goodness', meaningUr: 'نیکی کا ذریعہ' },
  { id: 80, name: 'ٱلتَّوَّاب', transliteration: 'At-Tawwab', meaningEn: 'The Ever-Pardoning', meaningUr: 'ہمیشہ بخشنے والا' },
  { id: 81, name: 'ٱلْمُنْتَقِم', transliteration: 'Al-Muntaqim', meaningEn: 'The Avenger', meaningUr: 'بدلہ لینے والا' },
  { id: 82, name: 'ٱلْعَفُو', transliteration: 'Al-‘Afuww', meaningEn: 'The Pardoner', meaningUr: 'معاف کرنے والا' },
  { id: 83, name: 'ٱلرَّؤُوف', transliteration: 'Ar-Ra’oof', meaningEn: 'The Most Kind', meaningUr: 'بہت مہربان' },
  { id: 84, name: 'مَالِكُ الْمُلْك', transliteration: 'Malik-ul-Mulk', meaningEn: 'Owner of Dominion', meaningUr: 'سلطنت کا مالک' },
  { id: 85, name: 'ذُو الْجَلَالِ وَالْإِكْرَام', transliteration: 'Dhul-Jalaali Wal-Ikram', meaningEn: 'Lord of Glory and Honour', meaningUr: 'عزت اور وقار والا' },
  { id: 86, name: 'ٱلْمُقْسِط', transliteration: 'Al-Muqsit', meaningEn: 'The Just One', meaningUr: 'انصاف کرنے والا' },
  { id: 87, name: 'ٱلْجَامِع', transliteration: 'Al-Jaami', meaningEn: 'The Gatherer', meaningUr: 'ایک جگہ جمع کرنے والا' },
  { id: 88, name: 'ٱلْغَنِي', transliteration: 'Al-Ghaniy', meaningEn: 'The Self-Sufficient', meaningUr: 'بے نیاز' },
  { id: 89, name: 'ٱلْمُغْنِي', transliteration: 'Al-Mughni', meaningEn: 'The Enricher', meaningUr: 'دولت دینے والا' },
  { id: 90, name: 'ٱلْمَانِع', transliteration: 'Al-Mani', meaningEn: 'The Preventer', meaningUr: 'روکنے والا' },
  { id: 91, name: 'ٱلضَّار', transliteration: 'Ad-Daarr', meaningEn: 'The Distresser', meaningUr: 'تکلیف دینے والا' },
  { id: 92, name: 'ٱلنَّافِع', transliteration: 'An-Naafi', meaningEn: 'The Benefactor', meaningUr: 'فائدہ پہنچانے والا' },
  { id: 93, name: 'ٱلنُّور', transliteration: 'An-Noor', meaningEn: 'The Light', meaningUr: 'روشنی' },
  { id: 94, name: 'ٱلْهَادِي', transliteration: 'Al-Haadi', meaningEn: 'The Guide', meaningUr: 'رہنماء' },
  { id: 95, name: 'ٱلْبَدِيع', transliteration: 'Al-Badee', meaningEn: 'The Originator', meaningUr: 'نئی چیزوں کا خالق' },
  { id: 96, name: 'ٱلْبَاقِي', transliteration: 'Al-Baaki', meaningEn: 'The Everlasting', meaningUr: 'ہمیشہ باقی رہنے والا' },
  { id: 97, name: 'ٱلْوَارِث', transliteration: 'Al-Waarith', meaningEn: 'The Inheritor', meaningUr: 'وارث' },
  { id: 98, name: 'ٱلرَّشِيد', transliteration: 'Ar-Rasheed', meaningEn: 'The Guide to the Right Path', meaningUr: 'راستے کا رہنما' },
  { id: 99, name: 'ٱلصَّبُور', transliteration: 'As-Saboor', meaningEn: 'The Most Patient', meaningUr: 'بہت صبر والا' },
];

export default function NamesPage() {
  const { dir, pick } = useLang();
  const [flipped, setFlipped] = useState({});
  const [learned, setLearned] = useState([]);

  const progress = useMemo(() => Math.round((learned.length / NAMES.length) * 100), [learned.length]);

  const toggleCard = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
    setLearned((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <main dir={dir} className="min-h-screen bg-[#f8fcfb] text-[#183a24]">
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-[#dfeedd] bg-white p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f8a4a]">
                {pick('99 Names of Allah', 'اللہ کے 99 نام')}
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-[#144a2b] mt-2">
                {pick('Tap to flip and learn each name', 'ہر نام کو سیکھنے کے لیے کلک کریں')}
              </h1>
            </div>
            <div className="rounded-2xl bg-[#ebf8ee] px-4 py-3 text-sm text-[#2f4e36]">
              <div className="font-semibold">{pick('Progress', 'ترقی')} : {learned.length}/{NAMES.length}</div>
              <div className="mt-2 h-2 w-44 rounded-full bg-[#d9efdd] overflow-hidden">
                <div className="h-full rounded-full bg-[#1f784a]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-[#1f784a] px-4 py-2 text-sm font-semibold text-white">
              {pick('Quiz Mode', 'کوئز موڈ')}
            </button>
            <span className="rounded-full border border-[#dfeedd] px-4 py-2 text-sm text-[#2f4e36]">
              {pick('Tap any card to flip it', 'کسی بھی کارڈ پر کلک کر کے پلٹیں')}
            </span>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {NAMES.map((item) => {
              const isFlipped = Boolean(flipped[item.id]);
              return (
                <button key={item.id} onClick={() => toggleCard(item.id)} className="h-40 rounded-3xl border border-[#dfeedd] bg-[#fbfffb] p-4 text-left shadow-sm transition-transform hover:-translate-y-1">
                  <div className="flex items-center justify-between text-xs text-[#4c6d53]">
                    <span>#{item.id}</span>
                    <span>{learned.includes(item.id) ? '✓' : '○'}</span>
                  </div>
                  <div className="mt-4">
                    {isFlipped ? (
                      <div>
                        <p className="text-lg font-semibold text-[#144a2b]">{pick(item.meaningEn, item.meaningUr)}</p>
                        <p className="mt-2 text-sm text-[#4c6d53]">{item.transliteration}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-2xl font-black text-[#144a2b]">{item.name}</p>
                        <p className="mt-2 text-sm text-[#4c6d53]">{item.transliteration}</p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
