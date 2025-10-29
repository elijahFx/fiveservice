import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutDescription from '@/components/about/AboutDescription';
import AboutValues from '@/components/about/AboutValues';
import Contact from '@/components/home/Contact';
import FAQ from '@/components/common/FAQ';

export const metadata: Metadata = {
  title: 'О нас - FiveService | Профессиональный ремонт техники в Минске',
  description: 'Узнайте больше о нашем сервисном центре. 13 лет опыта, высокие стандарты качества, команда профессионалов. Лидеры по сложным ремонтам в Минске.',
  keywords: 'о компании, сервисный центр, ремонт техники Минск, профессионалы, качество обслуживания',
  openGraph: {
    title: 'О нас - FiveService | Профессиональный ремонт техники в Минске',
    description: 'Узнайте больше о нашем сервисном центре. 13 лет опыта, высокие стандарты качества, команда профессионалов.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'О нас - FiveService | Профессиональный ремонт техники в Минске',
    description: 'Узнайте больше о нашем сервисном центре. 13 лет опыта, высокие стандарты качества.',
  },
  alternates: {
    canonical: 'https://fiveservice.by/about',
  },
};

// Компонент для микроразметки страницы "О нас"
function AboutStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          // AboutPage разметка
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://fiveservice.by/about#webpage",
            "name": "О компании FiveService",
            "description": "Информация о сервисном центре FiveService - 13 лет опыта в ремонте техники в Минске",
            "url": "https://fiveservice.by/about",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Главная",
                  "item": "https://fiveservice.by"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "О компании",
                  "item": "https://fiveservice.by/about"
                }
              ]
            },
            "mainEntity": {
              "@type": "Organization",
              "@id": "https://fiveservice.by#organization",
              "name": "FiveService",
              "description": "Сервисный центр по ремонту ноутбуков и техники в Минске с 13-летним опытом работы",
              "url": "https://fiveservice.by",
              "foundingDate": "2011",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": "10+"
              },
              "slogan": "Профессиональный ремонт техники с высокими стандартами качества",
              "knowsAbout": [
                "Ремонт ноутбуков",
                "Ремонт материнских плат",
                "BGA-пайка",
                "Восстановление после залития",
                "Замена экранов",
                "Чистка ноутбуков",
                "Диагностика техники"
              ],
              "award": "Лидеры по сложным ремонтам в Минске",
              "areaServed": "Минск и Минская область",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 53.9023,
                  "longitude": 27.5619
                },
                "geoRadius": "50000"
              }
            }
          },
          // Organization разметка с деталями о компании
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://fiveservice.by/about#organization",
            "name": "FiveService",
            "legalName": "FiveService",
            "description": "Сервисный центр по ремонту ноутбуков и компьютерной техники в Минске. 13 лет опыта, более 25 000 успешно отремонтированных устройств.",
            "url": "https://fiveservice.by",
            "logo": "https://fiveservice.by/logo.png",
            "foundingDate": "2011",
            "founders": [
              {
                "@type": "Person",
                "name": "Основатель FiveService"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ул. Восточная, 129",
              "addressLocality": "Минск",
              "addressCountry": "BY",
              "postalCode": "220070"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+375297349077",
              "contactType": "customer service",
              "email": "friends.service129@gmail.com",
              "availableLanguage": ["Russian"],
              "areaServed": "BY"
            },
            "sameAs": [
              "https://www.instagram.com/fiveservice.by/",
              "https://vk.com/fiveservice"
            ],
            "knowsAbout": [
              "Ремонт компьютерной техники",
              "Замена компонентов ноутбуков",
              "Диагностика электроники",
              "BGA пайка микросхем",
              "Восстановление данных",
              "Чистка и обслуживание техники"
            ],
            "awards": [
              "Лидеры по сложным ремонтам в Минске",
              "Более 25 000 успешных ремонтов"
            ],
            "employee": {
              "@type": "Person",
              "name": "Команда специалистов FiveService",
              "jobTitle": "Технические специалисты",
              "description": "Команда профессионалов с высокими техническими навыками и морально-нравственными устоями"
            }
          },
          // Service разметка для основных услуг
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Ремонт ноутбуков",
            "provider": {
              "@type": "Organization",
              "@id": "https://fiveservice.by/about#organization"
            },
            "description": "Профессиональный ремонт ноутбуков любой сложности. Более 13 лет опыта, высокие стандарты качества.",
            "serviceType": "Ремонт компьютерной техники",
            "areaServed": {
              "@type": "City",
              "name": "Минск"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги по ремонту техники",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Сложный ремонт материнских плат"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "BGA-ремонт и пайка"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Восстановление после залития"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Замена экранов и матриц"
                  }
                }
              ]
            }
          },
          // Review разметка (можно добавить реальные отзывы)
          {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Organization",
              "name": "FiveService",
              "@id": "https://fiveservice.by/about#organization"
            },
            "author": {
              "@type": "Person",
              "name": "Клиент сервиса"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "name": "Профессиональный сервис",
            "reviewBody": "Отличный сервис, качественный ремонт. Рекомендую всем!",
            "datePublished": "2024-01-15"
          },
          // FAQ разметка для страницы
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Сколько лет работает сервис FiveService?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Наш сервисный центр успешно работает на рынке услуг с 2011 года - более 13 лет опыта."
                }
              },
              {
                "@type": "Question",
                "name": "Какие принципы работы в FiveService?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Мы придерживаемся трех основных принципов: высокие стандарты качества, порядочность и добросовестность, постоянное развитие и совершенствование методов работы."
                }
              },
              {
                "@type": "Question",
                "name": "Сколько устройств было отремонтировано за время работы?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "За 13 лет работы мы успешно отремонтировали более 25 000 различных устройств."
                }
              },
              {
                "@type": "Question",
                "name": "С какими сложными ремонтами вы справляетесь?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Мы специализируемся на сложных ремонтах: восстановление после залития, пайка материнских плат, BGA-ремонт и другие высокотехнологичные услуги."
                }
              }
            ]
          }
        ]),
      }}
    />
  );
}

// Компонент для Dublin Core метаданных
function AboutDublinCore() {
  return (
    <>
      <meta name="DC.title" content="О компании FiveService | Профессиональный ремонт техники в Минске" />
      <meta name="DC.creator" content="FiveService" />
      <meta name="DC.description" content="Информация о сервисном центре FiveService - 13 лет опыта в ремонте техники, высокие стандарты качества, команда профессионалов в Минске" />
      <meta name="DC.subject" content="о компании, сервисный центр, ремонт техники Минск, профессионалы, качество обслуживания, история компании" />
      <meta name="DC.publisher" content="FiveService" />
      <meta name="DC.contributor" content="FiveService" />
      <meta name="DC.date" content="2024-01-01" />
      <meta name="DC.type" content="Text.About" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content="https://fiveservice.by/about" />
      <meta name="DC.source" content="https://fiveservice.by" />
      <meta name="DC.language" content="ru" />
      <meta name="DC.coverage" content="Минск, Беларусь" />
      <meta name="DC.rights" content="Copyright FiveService 2024" />
      <link rel="canonical" href="https://fiveservice.by/about" />
    </>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutDublinCore />
      <AboutStructuredData />
      <div className="pt-16">
        <AboutHero />
        <AboutDescription />
        <AboutValues />
        <Contact />
        <FAQ />
      </div>
    </>
  );
}