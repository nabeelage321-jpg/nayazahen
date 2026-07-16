import './globals.css'
import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: "نیا ذہن | Naya Zehan — Pakistan's First AI Education Platform",
  description: 'Free AI education for every Pakistani child. Learn, earn real PKR, play Pakistani games, study Quran in Urdu, Punjabi, Sindhi, Pashto.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:wght@700;900&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#42188C" />
      </head>
      <body className="bg-paper font-body text-ink antialiased">
        <LangProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  )
}