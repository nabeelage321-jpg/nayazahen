'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/lang';
import { CITIES, PROVINCES } from '@/data/cities';

export default function CitiesPage() {
  const { lang } = useLang();
  const isEn = lang === 'en';

  const [search, setSearch] = useState('');
  const [province, setProvince] = useState('all');

  const filteredCities = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CITIES.filter((city) => {
      const matchesProvince = province === 'all' || city.province === province;
      const matchesSearch =
        q === '' ||
        city.name.toLowerCase().includes(q) ||
        city.nameUr.includes(search.trim());
      return matchesProvince && matchesSearch;
    });
  }, [search, province]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* ============ HEADER ============ */}
      <div className="text-center mb-10">
        <h1 className="section-title">
          {isEn ? 'Naya Zehan in Your City' : 'آپ کے شہر میں نیا ذہن'}
        </h1>
        <p className="section-sub">
          {isEn
            ? `Explore local learning and earning opportunities across ${CITIES.length}+ Pakistani cities.`
            : `${CITIES.length} سے زائد پاکستانی شہروں میں مقامی مواقع دیکھیں۔`}
        </p>
      </div>

      {/* ============ SEARCH ============ */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isEn ? 'Search a city…' : 'شہر تلاش کریں…'}
          className="w-full rounded-xl border border-paper3 bg-white px-5 py-3 text-ink placeholder:text-ink3 focus:outline-none focus:ring-2 focus:ring-plum"
        />
      </div>

      {/* ============ PROVINCE FILTERS ============ */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button
          onClick={() => setProvince('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            province === 'all'
              ? 'bg-plum text-white'
              : 'bg-plum-p text-plum hover:bg-plum/10'
          }`}
        >
          {isEn ? 'All Provinces' : 'تمام صوبے'}
        </button>
        {PROVINCES.map((p) => (
          <button
            key={p}
            onClick={() => setProvince(p)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              province === p
                ? 'bg-plum text-white'
                : 'bg-plum-p text-plum hover:bg-plum/10'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* ============ RESULTS COUNT ============ */}
      <p className="text-center text-sm text-ink3 mb-6">
        {isEn
          ? `${filteredCities.length} ${filteredCities.length === 1 ? 'city' : 'cities'} found`
          : `${filteredCities.length} شہر ملے`}
      </p>

      {/* ============ CITY GRID ============ */}
      {filteredCities.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredCities.map((city) => (
            <Link key={city.id} href={`/cities/${city.id}`} className="card p-5 text-center block">
              <div className="text-3xl mb-2">{city.emoji}</div>
              <div className="font-display font-bold text-ink leading-tight">{city.name}</div>
              <div className="font-urdu text-ink3 text-sm mb-2" dir="rtl">
                {city.nameUr}
              </div>
              <span className="badge">{city.province}</span>
              <div className="text-xs text-ink3 mt-3 flex justify-center gap-3">
                <span>👦 {city.kids}</span>
                <span>🏫 {city.schools}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-ink3">
            {isEn
              ? 'No cities match your search. Try a different name or province.'
              : 'کوئی شہر نہیں ملا۔ مختلف نام یا صوبہ آزمائیں۔'}
          </p>
        </div>
      )}
    </main>
  );
}
