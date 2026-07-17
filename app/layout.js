import './globals.css'
import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ZehanUstad from '@/components/ZehanUstad'
import ZehanKamai from '@/components/ZehanKamai'
import NanoWidget from '@/components/NanoWidget'
import RubaxWallet from '@/components/RubaxWallet'
import KhanaGhariWidget from '@/components/KhanaGhariWidget'

const siteUrl = 'https://nayazahen.vercel.app';

export const metadata = {
  title: "نیا ذہن | Naya Zehan — Pakistan's First AI Education Platform",
  description: 'Free AI education for every Pakistani child. Learn, earn real PKR, play Pakistani games, study Quran in Urdu, Punjabi, Sindhi, Pashto.',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'Naya Zehan — Pakistan’s AI Education Platform',
    description: 'Free AI education, local-language learning, real earnings, and school tools for Pakistani children.',
    url: siteUrl,
    siteName: 'Naya Zehan',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Naya Zehan' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naya Zehan',
    description: 'Pakistan’s first AI education platform for children.',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:wght@700;900&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#42188C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Naya Zehan',
              alternateName: 'نیا ذہن',
              url: siteUrl,
              logo: `${siteUrl}/og-image.svg`,
              sameAs: [
                'https://www.facebook.com',
                'https://www.instagram.com',
                'https://www.youtube.com',
              ],
              description: 'Pakistan’s AI education platform for children, schools, and creators.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: siteUrl,
              name: 'Naya Zehan',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Naya Zehan',
              educationalCredentialAwarded: 'AI literacy, digital skills, and life skills',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lahore',
                addressCountry: 'PK',
              },
            }),
          }}
        />
      </head>
      <body className="bg-paper font-body text-ink antialiased">
        <LangProvider>
          <Navbar />
          <RubaxWallet />
          <main>{children}</main>
          <Footer />
          <ZehanUstad />
          <ZehanKamai />
          <NanoWidget />
          <KhanaGhariWidget />
        </LangProvider>
      </body>
    </html>
  )
}