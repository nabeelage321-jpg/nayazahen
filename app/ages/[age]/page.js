import { notFound } from 'next/navigation';
import { AGES, EARN_TASKS } from '@/data';
import AgePageClient from './AgePageClient';

export async function generateStaticParams() {
  return AGES.map((a) => ({ age: a.id }));
}

export async function generateMetadata({ params }) {
  const age = AGES.find((a) => a.id === params.age);

  if (!age) {
    return {
      title: 'Naya Zehan | نیا ذہن',
      description: "Pakistan's first AI education platform for children ages 3–21.",
    };
  }

  const titleEn = `Ages ${age.range}: ${age.stage} | Naya Zehan`;
  const titleUr = `عمر ${age.range}: ${age.stageUr} | نیا ذہن`;
  const descEn = `${age.focusEn} Free AI education for kids aged ${age.range} in Pakistan, with real earning potential of ${age.earning}.`;
  const descUr = `${age.focusUr} پاکستان میں ${age.range} سال کے بچوں کے لیے مفت AI تعلیم، کمائی کا امکان ${age.earning}۔`;

  return {
    title: `${titleEn} | ${titleUr}`,
    description: `${descEn} — ${descUr}`,
    keywords: [
      `AI education Pakistan ages ${age.range}`,
      `kids earn money Pakistan age ${age.range}`,
      age.stage,
    ],
    openGraph: {
      title: titleEn,
      description: descEn,
      url: `https://nayazahen.pk/ages/${age.id}`,
      siteName: 'Naya Zehan',
      locale: 'ur_PK',
      alternateLocale: 'en_PK',
      type: 'website',
    },
    alternates: {
      canonical: `https://nayazahen.pk/ages/${age.id}`,
    },
  };
}

// Pulls the leading number out of an age range like "10–11", "9", or "8+"
function minAge(str) {
  const match = String(str).match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

// Pulls the highest number out of a range like "10–11" (falls back to minAge)
function maxAge(str) {
  const matches = String(str).match(/\d+/g);
  if (!matches) return 0;
  return parseInt(matches[matches.length - 1], 10);
}

export default function AgePage({ params }) {
  const index = AGES.findIndex((a) => a.id === params.age);

  if (index === -1) {
    notFound();
  }

  const age = AGES[index];
  const prevAge = index > 0 ? AGES[index - 1] : null;
  const nextAge = index < AGES.length - 1 ? AGES[index + 1] : null;

  const ageMax = maxAge(age.range);
  const relevantTasks = EARN_TASKS.filter((task) => minAge(task.age) <= ageMax).slice(
    0,
    6
  );

  return (
    <AgePageClient
      age={age}
      prevAge={prevAge}
      nextAge={nextAge}
      earnTasks={relevantTasks}
    />
  );
}
