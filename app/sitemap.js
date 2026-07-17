import { CITIES } from '@/data/cities';
import { AGES } from '@/data';

const BASE_URL = 'https://nayazahen.vercel.app';

const staticPages = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: '/cities', priority: 0.9, changefreq: 'weekly' },
  { path: '/ages', priority: 0.9, changefreq: 'weekly' },
  { path: '/earn', priority: 0.8, changefreq: 'weekly' },
  { path: '/games', priority: 0.8, changefreq: 'weekly' },
  { path: '/deen', priority: 0.8, changefreq: 'weekly' },
  { path: '/blog', priority: 0.7, changefreq: 'weekly' },
  { path: '/schools', priority: 0.8, changefreq: 'weekly' },
  { path: '/signup', priority: 0.7, changefreq: 'monthly' },
  { path: '/dashboard', priority: 0.6, changefreq: 'monthly' },
  { path: '/parent', priority: 0.6, changefreq: 'monthly' },
  { path: '/creator', priority: 0.7, changefreq: 'weekly' },
  { path: '/nz-id', priority: 0.7, changefreq: 'monthly' },
  { path: '/premium', priority: 0.7, changefreq: 'monthly' },
  { path: '/teacher', priority: 0.7, changefreq: 'weekly' },
  { path: '/quiz', priority: 0.8, changefreq: 'daily' },
  { path: '/leaderboard', priority: 0.7, changefreq: 'daily' },
  { path: '/khana-ghari', priority: 0.7, changefreq: 'weekly' },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.5, changefreq: 'yearly' },
  { path: '/terms', priority: 0.5, changefreq: 'yearly' },
  { path: '/schools/apply', priority: 0.7, changefreq: 'monthly' },
  { path: '/pitb', priority: 0.7, changefreq: 'monthly' },
  { path: '/launch', priority: 0.8, changefreq: 'weekly' },
];

const blogSlugs = [
  'ai-education-pakistan-2025',
  'kids-earn-money-pakistan',
  'urdu-ai-pakistan',
  'lahore-kids-tech',
  'quran-ai-kids',
  'karachi-ai-education',
  'jazzcash-kids-earn',
  'pakistan-online-school-guide',
];

export default function sitemap() {
  const routes = [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: page.changefreq,
      priority: page.priority,
    })),
    ...CITIES.map((city) => ({
      url: `${BASE_URL}/cities/${city.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    ...AGES.map((age) => ({
      url: `${BASE_URL}/ages/${age.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.75,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.65,
    })),
  ];

  return routes;
}
