// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';

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
    images: [
      {
        url: 'https://i.imgur.com/KEEU2sM.png',
        width: 300,
        height: 300,
        alt: 'Ремонт ноутбуков в Минске - FiveService',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ремонт ноутбуков в Минске | FiveService',
    description: 'Профессиональный ремонт ноутбуков в Минске. Быстро, качественно, с гарантией.',
    images: ['/opengraph.webp'],
  },
};

// Компонент для скриптов аналитики
function AnalyticsScripts() {
  return (
    <>
      {/* Яндекс.Метрика */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(1234567, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `,
        }}
      />
      {/* Google Analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `,
        }}
      />
      {/* Noscript для Яндекс.Метрики */}
      <noscript>
        <div>
          <img 
            src="https://mc.yandex.ru/watch/1234567" 
            style={{ position: 'absolute', left: '-9999px' }} 
            alt="" 
          />
        </div>
      </noscript>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <AnalyticsScripts />
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
        <AnalyticsProvider yandexCounterId={1234567}>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </AnalyticsProvider>
      </body>
    </html>
  );
}