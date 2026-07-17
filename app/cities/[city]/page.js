import { notFound } from 'next/navigation';
import { CITIES } from '@/data/cities';
import { AGES, EARN_TASKS } from '@/data';
import CityPageClient from './CityPageClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.id }));
}

export async function generateMetadata({ params }) {
  const city = CITIES.find((c) => c.id === params.city);

  if (!city) {
    return {
      title: 'Naya Zehan | نیا ذہن',
      description: "Pakistan's first AI education platform for children ages 3–21.",
    };
  }

  const titleEn = `AI Education in ${city.name} for Kids | Naya Zehan`;
  const titleUr = `${city.nameUr} میں بچوں کے لیے AI تعلیم | نیا ذہن`;
  const descEn = `Free AI education and real earning opportunities for kids in ${city.name}, ${city.province}. ${city.tagEn}. Join ${city.kids} kids across ${city.schools}+ schools already learning with Naya Zehan.`;
  const descUr = `${city.nameUr}، ${city.province} میں بچوں کے لیے مفت AI تعلیم اور کمائی کے حقیقی مواقع۔ ${city.tagUr}`;

  const title = `${titleEn} | ${titleUr}`;
  const description = `${descEn} — ${descUr}`;

  return {
    title,
    description,
    keywords: [
      `AI education Pakistan ${city.name}`,
      `kids earn money Pakistan ${city.name}`,
      `${city.name} online school`,
      `${city.nameUr} AI تعلیم`,
    ],
    openGraph: {
      title: titleEn,
      description: descEn,
      url: `https://nayazahen.pk/cities/${city.id}`,
      siteName: 'Naya Zehan',
      locale: 'ur_PK',
      alternateLocale: 'en_PK',
      type: 'website',
    },
    alternates: {
      canonical: `https://nayazahen.pk/cities/${city.id}`,
    },
  };
}

export default function CityPage({ params }) {
  const city = CITIES.find((c) => c.id === params.city);

  if (!city) {
    notFound();
  }

  const nearbyCities = CITIES.filter(
    (c) => c.province === city.province && c.id !== city.id
  ).slice(0, 4);

  const earnTasks = EARN_TASKS.slice(0, 4);
  const ages = AGES.slice(0, 3);

  return (
    <CityPageClient
      city={city}
      nearbyCities={nearbyCities}
      earnTasks={earnTasks}
      ages={ages}
    />
  );
}
