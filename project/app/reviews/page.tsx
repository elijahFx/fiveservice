import { Metadata } from 'next';
import ReviewsHero from '@/components/reviews/ReviewsHero';
import ReviewsList from '@/components/reviews/ReviewsList';
import FAQ from '@/components/common/FAQ';

export const metadata: Metadata = {
  title: 'Отзывы клиентов о ремонте ноутбуков | FiveService Минск',
  description: 'Реальные отзывы клиентов о ремонте ноутбуков в FiveService. Рейтинг 5.0 из 5.0 на основе 100+ отзывов. Читайте честные мнения на Google Maps и Яндекс Картах.',
  keywords: 'отзывы ремонт ноутбуков, FiveService отзывы, сервисный центр отзывы, ремонт ноутбуков Минск отзывы, Яндекс Карты отзывы, Google Maps отзывы',
  openGraph: {
    title: 'Отзывы клиентов о ремонте ноутбуков | FiveService Минск',
    description: 'Реальные отзывы клиентов о ремонте ноутбуков в FiveService. Рейтинг 5.0 из 5.0 на основе 100+ отзывов.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary',
    title: 'Отзывы клиентов о ремонте ноутбуков | FiveService Минск',
    description: 'Реальные отзывы клиентов о ремонте ноутбуков в FiveService. Рейтинг 5.0 из 5.0.',
  },
  alternates: {
    canonical: 'https://fiveservice.by/reviews',
  },
};

// Компонент для микроразметки страницы отзывов
function ReviewsStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          // CollectionPage для страницы отзывов
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://fiveservice.by/reviews#webpage",
            "name": "Отзывы клиентов о ремонте ноутбуков - FiveService",
            "description": "Реальные отзывы клиентов о качестве ремонта ноутбуков в сервисном центре FiveService Минск",
            "url": "https://fiveservice.by/reviews",
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
                  "name": "Отзывы",
                  "item": "https://fiveservice.by/reviews"
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": 12,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@type": "Review",
                    "itemReviewed": {
                      "@type": "Service",
                      "name": "Ремонт ноутбуков",
                      "provider": {
                        "@type": "Organization",
                        "name": "FiveService"
                      }
                    },
                    "author": {
                      "@type": "Person",
                      "name": "Елена Шорина"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    },
                    "name": "Профессиональный ремонт матрицы и платы",
                    "reviewBody": "Я уже два раза обращалась к ребятам за помощью по ремонту своего ноута. В первый раз была замена матрицы, а второй меняли плату расширения и кнопку вкл. Причем второй раз времени не было совсем, чтобы отвезти в мастерскую самой. Тогда ко мне приехал курьер в обозначенное время. В общем отношением и качеством работы довольна. Всем рекомендую!",
                    "datePublished": "2025-07-04"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "Review",
                    "itemReviewed": {
                      "@type": "Service",
                      "name": "Ремонт ноутбуков",
                      "provider": {
                        "@type": "Organization",
                        "name": "FiveService"
                      }
                    },
                    "author": {
                      "@type": "Person",
                      "name": "Anastasia Cheremnykh"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    },
                    "name": "Качественная замена комплектующих",
                    "reviewBody": "Рекомендую! Если что, то я к вам. Мне нравится, без спама и суеты, всё по работе. Запчасти после замены вернули - тоже +. Бумаги оформляют. гарантию дают. Всё ок.",
                    "datePublished": "2025-07-01"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "Review",
                    "itemReviewed": {
                      "@type": "Service",
                      "name": "Ремонт материнских плат",
                      "provider": {
                        "@type": "Organization",
                        "name": "FiveService"
                      }
                    },
                    "author": {
                      "@type": "Person",
                      "name": "tsobako"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    },
                    "name": "Ремонт разъема оперативной памяти",
                    "reviewBody": "Самый лучший сервис, который можно пройти. Всё делают отлично — от самой простой чистки до ремонта материнской платы. Один раз пришлось менять разъем для оперативной памяти в ноутбуке — мастера выполнили работу без нареканий и очень быстро, а ноутбук ещё работает до сих пор уже несколько лет",
                    "datePublished": "2025-08-03"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "item": {
                    "@type": "Review",
                    "itemReviewed": {
                      "@type": "Service",
                      "name": "Ремонт ноутбуков",
                      "provider": {
                        "@type": "Organization",
                        "name": "FiveService"
                      }
                    },
                    "author": {
                      "@type": "Person",
                      "name": "olga popowa"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    },
                    "name": "Квалифицированная помощь в ремонте",
                    "reviewBody": "Хочу сказать большое спасибо за квалифицированную помощь в ремонте ноутбука. Точно определили проблему, помогли в сопутствующих вопросах. Действительно хороший сервис и специалисты.",
                    "datePublished": "2025-06-15"
                  }
                }
              ]
            }
          },
          // AggregateRating для общего рейтинга
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://fiveservice.by#business",
            "name": "FiveService",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "bestRating": "5.0",
              "worstRating": "1.0",
              "ratingCount": "100",
              "reviewCount": "100"
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Сергей Ермин"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "name": "Быстрый и недорогой ремонт",
                "reviewBody": "Что сказать?! Кроме восторга, слов нет! Ладно то, что быстро сделали диагностику…ладно, что согласился на ремонт и ремонт был быстрый и качественный. Самое главное, мои ожидания по цене были в разы больше, чем ребята из сервиса озвучили. Моё почтение! Если что-то поломается-я у вас!",
                "datePublished": "2025-04-01"
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Елизавета Далбаева"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "name": "Замена дисплея и чистка",
                "reviewBody": "Отличный сервис, лучшая работа! Отдала мой ноут на замену дисплея, чистку и замену памяти, оперативно выполнили и на следующий день написали, что ноутбук готов, я была удивлена, зная сложность выполнения (ожидала ремонт в несколько дней). Все качественно выполнено, буду рекомендовать всем друзьям!",
                "datePublished": "2025-07-01"
              }
            ]
          },
          // FAQ разметка для страницы отзывов
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Какой рейтинг у FiveService?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Наш сервисный центр имеет рейтинг 5.0 из 5.0 на основе более 100 реальных отзывов клиентов на Google Maps и Яндекс Картах."
                }
              },
              {
                "@type": "Question",
                "name": "Где можно оставить отзыв о работе сервиса?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Вы можете оставить отзыв на Google Maps, Яндекс Картах или напрямую на нашем сайте. Мы ценим каждое мнение и используем отзывы для улучшения качества обслуживания."
                }
              },
              {
                "@type": "Question",
                "name": "Все отзывы на сайте реальные?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, все отзывы на нашем сайте являются реальными и взяты с официальных платформ Google Maps и Яндекс Карты. Мы не публикуем заказные или фейковые отзывы."
                }
              },
              {
                "@type": "Question",
                "name": "Как быстро выполняется ремонт по отзывам клиентов?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Согласно отзывам клиентов, большинство ремонтов выполняется в течение 1-3 дней. Срочные ремонты могут быть выполнены в течение 24 часов. Мы всегда информируем клиентов о сроках выполнения работ."
                }
              }
            ]
          },
          // BreadcrumbList для навигации
          {
            "@context": "https://schema.org",
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
                "name": "Отзывы",
                "item": "https://fiveservice.by/reviews"
              }
            ]
          }
        ]),
      }}
    />
  );
}

// Компонент для Dublin Core метаданных
function ReviewsDublinCore() {
  return (
    <>
      <meta name="DC.title" content="Отзывы клиентов о ремонте ноутбуков | FiveService Минск" />
      <meta name="DC.creator" content="FiveService" />
      <meta name="DC.description" content="Реальные отзывы клиентов о ремонте ноутбуков в FiveService. Рейтинг 5.0 из 5.0 на основе 100+ отзывов на Google Maps и Яндекс Картах. Честные мнения о качестве услуг." />
      <meta name="DC.subject" content="отзывы ремонт ноутбуков, FiveService отзывы, сервисный центр отзывы, ремонт ноутбуков Минск отзывы, Яндекс Карты отзывы, Google Maps отзывы, реальные отзывы клиентов" />
      <meta name="DC.publisher" content="FiveService" />
      <meta name="DC.contributor" content="FiveService" />
      <meta name="DC.date" content="2024-01-01" />
      <meta name="DC.type" content="Text.Reviews" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content="https://fiveservice.by/reviews" />
      <meta name="DC.source" content="https://fiveservice.by" />
      <meta name="DC.language" content="ru" />
      <meta name="DC.coverage" content="Минск, Беларусь" />
      <meta name="DC.rights" content="Copyright FiveService 2024" />
      <link rel="canonical" href="https://fiveservice.by/reviews" />
    </>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <ReviewsDublinCore />
      <ReviewsStructuredData />
      <div className="pt-16">
        <ReviewsHero />
        <ReviewsList />
        <FAQ />
      </div>
    </>
  );
}