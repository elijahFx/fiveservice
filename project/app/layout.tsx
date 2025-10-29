// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import SiteMap from "@/components/layout/SiteMap";

const inter = Inter({ subsets: ["latin"] });

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
        url: "/main.webp",
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
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

// Fallback компонент для Suspense
function AnalyticsFallback() {
  return null;
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
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%231e3a8a'/><text x='16' y='20' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='14' font-weight='bold'>FS</text></svg>"
        />
        <link
          rel="apple-touch-icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect width='180' height='180' rx='40' fill='%231e3a8a'/><text x='90' y='110' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='80' font-weight='bold'>FS</text></svg>"
        />
        <link rel="canonical" href="https://fiveservice.by" />
        
        {/* Dublin Core метаданные */}
        <meta name="DC.title" content="Ремонт ноутбуков в Минске | FiveService" />
        <meta name="DC.description" content="Профессиональный ремонт ноутбуков в Минске. Быстро, качественно, с гарантией. Замена экранов, чистка, ремонт материнских плат." />
        <meta name="DC.creator" content="FiveService" />
        <meta name="DC.subject" content="Ремонт ноутбуков, Минск, замена экрана, чистка ноутбука, ремонт материнской платы" />
        <meta name="DC.publisher" content="FiveService" />
        <meta name="DC.contributor" content="FiveService" />
        <meta name="DC.date" content="2024-01-01" />
        <meta name="DC.type" content="Service" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://fiveservice.by" />
        <meta name="DC.source" content="https://fiveservice.by" />
        <meta name="DC.language" content="ru" />
        <meta name="DC.coverage" content="Минск, Беларусь" />
        <meta name="DC.rights" content="Copyright FiveService 2024" />

        {/* Расширенная микроразметка Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              // LocalBusiness разметка
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://fiveservice.by#business",
                name: "FiveService",
                description: "Профессиональный ремонт ноутбуков в Минске. Быстро, качественно, с гарантией.",
                url: "https://fiveservice.by",
                telephone: "+375297349077",
                email: "friends.service129@gmail.com",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "ул. Восточная, 129",
                  addressLocality: "Минск",
                  addressCountry: "BY",
                  postalCode: "220070"
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 53.9023,
                  longitude: 27.5619
                },
                openingHours: [
                  "Mo-Fr 09:00-19:00",
                  "Sa-Su 10:00-16:00"
                ],
                priceRange: "$$",
                serviceArea: {
                  "@type": "GeoCircle",
                  geoMidpoint: {
                    "@type": "GeoCoordinates",
                    latitude: 53.9023,
                    longitude: 27.5619
                  },
                  geoRadius: "20000"
                },
                sameAs: [
                  "https://www.instagram.com/fiveservice.by/",
                  "https://vk.com/fiveservice"
                ]
              },
              // Organization разметка
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://fiveservice.by#organization",
                name: "FiveService",
                url: "https://fiveservice.by",
                logo: "https://fiveservice.by/logo.png",
                description: "Профессиональный ремонт ноутбуков в Минске",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "ул. Восточная, 129",
                  addressLocality: "Минск",
                  addressCountry: "BY"
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+375297349077",
                  contactType: "customer service",
                  areaServed: "BY",
                  availableLanguage: ["Russian", "English"]
                },
                sameAs: [
                  "https://www.instagram.com/fiveservice.by/",
                  "https://vk.com/fiveservice"
                ]
              },
              // BreadcrumbList разметка
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Главная",
                    item: "https://fiveservice.by"
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Ремонт ноутбуков",
                    item: "https://fiveservice.by/repair"
                  }
                ]
              },
              // Service разметка
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Ремонт ноутбуков",
                provider: {
                  "@type": "LocalBusiness",
                  "@id": "https://fiveservice.by#business"
                },
                description: "Профессиональный ремонт ноутбуков любой сложности в Минске",
                serviceType: "Ремонт компьютерной техники",
                areaServed: {
                  "@type": "City",
                  name: "Минск"
                },
                offers: {
                  "@type": "Offer",
                  description: "Бесплатная диагностика и гарантия на работы"
                }
              },
              // FAQ разметка (основные вопросы)
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Сколько времени занимает ремонт ноутбука?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Большинство ремонтов занимает от 1 до 3 рабочих дней. Срочный ремонт возможен в течение 24 часов."
                    }
                  },
                  {
                    "@type": "Question",
                    name: "Даете ли вы гарантию на ремонт?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Да, мы предоставляем гарантию до 12 месяцев на все виды ремонтных работ и установленные комплектующие."
                    }
                  },
                  {
                    "@type": "Question",
                    name: "Работаете ли вы с любыми марками ноутбуков?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Да, мы ремонтируем ноутбуки всех популярных брендов: Apple, Asus, HP, Dell, Lenovo, Acer, Samsung и другие."
                    }
                  }
                ]
              }
            ]),
          }}
        />

        {/* Дополнительная микроразметка для социальных сетей */}
        <meta name="twitter:site" content="@fiveservice" />
        <meta name="twitter:creator" content="@fiveservice" />
        
        {/* Дополнительные Open Graph теги */}
        <meta property="og:site_name" content="FiveService" />
        <meta property="og:phone_number" content="+375297349077" />
        <meta property="og:email" content="friends.service129@gmail.com" />
        <meta property="og:latitude" content="53.9023" />
        <meta property="og:longitude" content="27.5619" />
        <meta property="og:street-address" content="ул. Восточная, 129" />
        <meta property="og:locality" content="Минск" />
        <meta property="og:country-name" content="Беларусь" />

      </head>
      <body className={inter.className}>
        <Suspense fallback={<AnalyticsFallback />}>
          <AnalyticsProvider yandexCounterId={1234567}>
            <Navigation />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
            <SiteMap />
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  );
}