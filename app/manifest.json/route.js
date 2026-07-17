import { NextResponse } from 'next/server';

const manifest = {
  name: 'Naya Zehan — نیا ذہن',
  short_name: 'Naya Zehan',
  description: 'Pakistan’s first AI education platform for children, creators, schools, and families.',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#FAFAF5',
  theme_color: '#42188C',
  orientation: 'portrait',
  icons: [
    {
      src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"%3E%3Crect width="192" height="192" rx="40" fill="%2342188C"/%3E%3Ctext x="50%25" y="54%25" dominant-baseline="middle" text-anchor="middle" font-size="92" font-family="Arial, sans-serif" fill="white"%3E🧠%3C/text%3E%3C/svg%3E',
      sizes: '192x192',
      type: 'image/svg+xml',
    },
    {
      src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"%3E%3Crect width="512" height="512" rx="96" fill="%2342188C"/%3E%3Ctext x="50%25" y="54%25" dominant-baseline="middle" text-anchor="middle" font-size="240" font-family="Arial, sans-serif" fill="white"%3E🧠%3C/text%3E%3C/svg%3E',
      sizes: '512x512',
      type: 'image/svg+xml',
    },
  ],
};

export function GET() {
  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
    },
  });
}
