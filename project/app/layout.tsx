// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SiteMap from "@/components/layout/SiteMap";
import Script from "next/script";
import LazyCookieConsent from "@/components/layout/LazyCookieConsent"; // ← Импортируем здесь

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Ремонт ноутбуков в Минске | FiveService",
  description:
    "Профессиональный ремонт ноутбуков в Минске. Быстро, качественно, с гарантией. Замена экранов, чистка, ремонт материнских плат. +375 29 734 90 77",
  keywords:
    "ремонт ноутбуков, Минск, замена экрана, чистка ноутбука, ремонт материнской платы",
  openGraph: {
    title: "Ремонт ноутбуков в Минске | FiveService",
    description:
      "Профессиональный ремонт ноутбуков в Минске. Быстро, качественно, с гарантией.",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "https://i.imgur.com/KEEU2sM.png",
        width: 300,
        height: 300,
        alt: "Ремонт ноутбуков в Минске - FiveService",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ремонт ноутбуков в Минске | FiveService",
    description:
      "Профессиональный ремонт ноутбуков в Минске. Быстро, качественно, с гарантией.",
    images: ["/opengraph.webp"],
  },
};

// Предзагрузка критических ресурсов
function PreloadResources() {
  return (
    <>
      <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://mc.yandex.ru" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    </>
  );
}

// Аналитика с быстрой загрузкой после интерактивности
function FastAnalytics() {
  return (
    <>
      {/* Яндекс.Метрика - загружается сразу после интерактивности страницы */}
      <Script
        id="yandex-metrica"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              k=e.createElement(t),a=e.getElementsByTagName(t)[0];
              k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
            ym(1234567, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          `,
        }}
      />

      {/* Google Analytics - загружается одновременно с Яндекс.Метрикой */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `,
        }}
      />

      {/* Noscript для пользователей с отключенным JavaScript */}
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/1234567"
            style={{ position: "absolute", left: "-9999px" }}
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
        <PreloadResources />
		    <link rel="manifest" href="/manifest.json" /> 
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FiveService" /> 
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='white'/><text x='16' y='21' text-anchor='middle' fill='%231e3a8a' font-family='Arial, sans-serif' font-size='16' font-weight='bold'>FS</text></svg>"
        />
        <link
          rel="apple-touch-icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect width='180' height='180' rx='40' fill='white'/><text x='90' y='115' text-anchor='middle' fill='%231e3a8a' font-family='Arial, sans-serif' font-size='90' font-weight='bold'>FS</text></svg>"
        />
        <link rel="canonical" href="https://fiveservice.by" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "FiveService",
              description: "Профессиональный ремонт ноутбуков в Минске",
              url: "https://fiveservice.by",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Восточная, 129",
                addressLocality: "Минск",
                addressCountry: "BY",
              },
              telephone: "+375297349077",
              email: "friends.service129@gmail.com",
              openingHours: ["Mo-Fr 09:00-19:00", "Sa-Su 10:00-16:00"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Основной контент страницы */}
        <Navigation />
        <main>{children}</main>
        <Footer />
        
        {/* Вспомогательные компоненты */}
        <ScrollToTop />
        <SiteMap />
        
        {/* CookieConsent с отложенной загрузкой */}
        <LazyCookieConsent />
        
        {/* Аналитика загружается после того как страница стала интерактивной */}
        <FastAnalytics />
      </body>
    </html>
  );
}