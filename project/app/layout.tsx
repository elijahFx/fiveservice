import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ремонт ноутбуков в Минске | FiveService',
  description: 'Профессиональный ремонт ноутбуков в Минске. Быстро, качественно, с гарантией. Замена экранов, чистка, ремонт материнских плат. +375 29 734 90 77',
  keywords: 'ремонт ноутбуков, Минск, замена экрана, чистка ноутбука, ремонт материнской платы',
  openGraph: {
    title: 'Ремонт ноутбуков в Минске | FiveService',
    description: 'Профессиональный ремонт ноутбуков в Минске. Быстро, качественно, с гарантией.',
    type: 'website',
    locale: 'ru_RU',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%231e3a8a'/><text x='16' y='20' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='14' font-weight='bold'>FS</text></svg>" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect width='180' height='180' rx='40' fill='%231e3a8a'/><text x='90' y='110' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='80' font-weight='bold'>FS</text></svg>" />
        <link rel="canonical" href="https://fiveservice.by" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "FiveService",
              "description": "Профессиональный ремонт ноутбуков в Минске",
              "url": "https://fiveservice.by",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Восточная, 129",
                "addressLocality": "Минск",
                "addressCountry": "BY"
              },
              "telephone": "+375297349077",
              "email": "friends.service129@gmail.com",
              "openingHours": [
                "Mo-Fr 09:00-19:00",
                "Sa-Su 10:00-16:00"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}