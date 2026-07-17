export const dynamic = 'force-static';

import { AGES, EARN_TASKS } from '@/data/index';
import AgePageClient from './AgePageClient';

export async function generateStaticParams() {
  return [
    { age: 'age-3-4' },
    { age: 'age-5-6' },
    { age: 'age-7-8' },
    { age: 'age-9' },
    { age: 'age-10-11' },
    { age: 'age-12' },
    { age: 'age-13-15' },
    { age: 'age-16-18' },
    { age: 'age-19-21' },
  ];
}

export async function generateMetadata({ params }) {
  const age = AGES.find((a) => a.id === params.age);
  if (!age) return { title: 'Naya Zehan' };
  return {
    title: `Ages ${age.range} | ${age.stage} | Naya Zehan`,
    description: age.focusEn,
  };
}

export default function AgePage({ params }) {
  const age = AGES.find((a) => a.id === params.age);
  if (!age) return <div>Not found</div>;
  const earnTasks = EARN_TASKS.slice(0, 4);
  const idx = AGES.findIndex((a) => a.id === params.age);
  const prevAge = AGES[idx - 1] || null;
  const nextAge = AGES[idx + 1] || null;
  return (
    <AgePageClient
      age={age}
      prevAge={prevAge}
      nextAge={nextAge}
      earnTasks={earnTasks}
    />
  );
}
