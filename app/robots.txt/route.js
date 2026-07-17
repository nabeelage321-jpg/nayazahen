import { NextResponse } from 'next/server';

export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /parent/
Disallow: /creator/studio/

Sitemap: https://nayazahen.vercel.app/sitemap.xml
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
