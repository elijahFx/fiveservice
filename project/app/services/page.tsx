import { Metadata } from 'next';
import ServicesList from '@/components/services/ServicesList';
import ServiceHero from '@/components/services/ServiceHero';
import FAQ from '@/components/common/FAQ';

export const metadata: Metadata = {
  title: 'Все услуги по ремонту ноутбуков | FiveService Минск',
  description: 'Полный спектр услуг по ремонту ноутбуков в Минске. Замена экранов, чистка, ремонт материнских плат, восстановление данных. Гарантия качества.',
  keywords: 'услуги ремонта ноутбуков, замена экрана ноутбука, чистка ноутбука, ремонт материнской платы, диагностика ноутбука, восстановление данных Минск',
  openGraph: {
    title: 'Все услуги по ремонту ноутбуков | FiveService Минск',
    description: 'Полный спектр услуг по ремонту ноутбуков в Минске. Замена экранов, чистка, ремонт материнских плат, восстановление данных.',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/serviceslight.webp',
        width: 1200,
        height: 630,
        alt: 'Услуги по ремонту ноутбуков в FiveService Минск',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Все услуги по ремонту ноутбуков | FiveService Минск',
    description: 'Полный спектр услуг по ремонту ноутбуков в Минске. Профессиональный ремонт с гарантией.',
    images: ['/serviceslight.webp'],
  },
  alternates: {
    canonical: 'https://fiveservice.by/services',
  },
};

// Компонент для микроразметки страницы услуг
function ServicesStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          // CollectionPage разметка для страницы услуг
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://fiveservice.by/services#webpage",
            "name": "Услуги по ремонту ноутбуков - FiveService",
            "description": "Полный спектр услуг по ремонту и обслуживанию ноутбуков в Минске. Диагностика, чистка, ремонт компонентов, замена комплектующих.",
            "url": "https://fiveservice.by/services",
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
                  "name": "Услуги",
                  "item": "https://fiveservice.by/services"
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": 5,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@type": "Service",
                    "name": "Диагностика ноутбуков",
                    "description": "Комплексная и срочная диагностика оборудования",
                    "provider": {
                      "@type": "Organization",
                      "name": "FiveService"
                    },
                    "areaServed": "Минск",
                    "offers": {
                      "@type": "Offer",
                      "price": "55.00",
                      "priceCurrency": "BYN"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "Service",
                    "name": "Чистка ноутбуков",
                    "description": "Профессиональная чистка ноутбуков от пыли и загрязнений",
                    "provider": {
                      "@type": "Organization",
                      "name": "FiveService"
                    },
                    "areaServed": "Минск",
                    "offers": {
                      "@type": "Offer",
                      "price": "75.00",
                      "priceCurrency": "BYN"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "Service",
                    "name": "Ремонт компонентов ноутбуков",
                    "description": "Ремонт разъемов, материнских плат и других компонентов",
                    "provider": {
                      "@type": "Organization",
                      "name": "FiveService"
                    },
                    "areaServed": "Минск"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "item": {
                    "@type": "Service",
                    "name": "Замена компонентов ноутбуков",
                    "description": "Замена матриц, клавиатур, кулеров и других комплектующих",
                    "provider": {
                      "@type": "Organization",
                      "name": "FiveService"
                    },
                    "areaServed": "Минск"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "item": {
                    "@type": "Service",
                    "name": "Программные услуги",
                    "description": "Установка ОС, чистка от вирусов, восстановление данных",
                    "provider": {
                      "@type": "Organization",
                      "name": "FiveService"
                    },
                    "areaServed": "Минск"
                  }
                }
              ]
            }
          },
          // Service разметка для каждой категории услуг
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Ремонт ноутбуков в Минске",
            "provider": {
              "@type": "Organization",
              "@id": "https://fiveservice.by#organization"
            },
            "description": "Профессиональный ремонт ноутбуков любой сложности в Минске. 13 лет опыта, гарантия качества.",
            "serviceType": "Ремонт компьютерной техники",
            "areaServed": {
              "@type": "City",
              "name": "Минск"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Категории услуг по ремонту ноутбуков",
              "itemListElement": [
                {
                  "@type": "OfferCatalog",
                  "name": "Диагностика",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Комплексная диагностика оборудования",
                        "description": "Полная диагностика всех компонентов ноутбука",
                        "offers": {
                          "@type": "Offer",
                          "price": "55.00",
                          "priceCurrency": "BYN"
                        }
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Срочная диагностика оборудования",
                        "description": "Экспресс-диагностика в сжатые сроки",
                        "offers": {
                          "@type": "Offer",
                          "price": "110.00",
                          "priceCurrency": "BYN"
                        }
                      }
                    }
                  ]
                },
                {
                  "@type": "OfferCatalog",
                  "name": "Чистка",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Чистка ноутбуков Стандарт",
                        "description": "Базовая чистка системы охлаждения",
                        "offers": {
                          "@type": "Offer",
                          "price": "75.00",
                          "priceCurrency": "BYN"
                        }
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Чистка ноутбуков Gaming",
                        "description": "Углубленная чистка игровых ноутбуков",
                        "offers": {
                          "@type": "Offer",
                          "price": "125.00",
                          "priceCurrency": "BYN"
                        }
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Чистка ноутбуков Extreme Pro",
                        "description": "Комплексная чистка с заменом термопасты",
                        "offers": {
                          "@type": "Offer",
                          "price": "195.00",
                          "priceCurrency": "BYN"
                        }
                      }
                    }
                  ]
                },
                {
                  "@type": "OfferCatalog",
                  "name": "Ремонт компонентов",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Ремонт разъемов",
                        "description": "Восстановление USB, HDMI, аудио разъемов"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Ремонт материнских плат",
                        "description": "Ремонт системы питания, мультиконтроллера, аудиокодека"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Восстановление после залития",
                        "description": "Чистка и ремонт после попадания жидкости",
                        "offers": {
                          "@type": "Offer",
                          "price": "250.00",
                          "priceCurrency": "BYN"
                        }
                      }
                    }
                  ]
                },
                {
                  "@type": "OfferCatalog",
                  "name": "Замена компонентов",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Замена матрицы ноутбука",
                        "description": "Замена экрана ноутбука с гарантией",
                        "offers": {
                          "@type": "Offer",
                          "price": "130.00",
                          "priceCurrency": "BYN"
                        }
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Замена клавиатуры",
                        "description": "Замена клавиатуры ноутбука"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Замена процессора",
                        "description": "Замена центрального процессора",
                        "offers": {
                          "@type": "Offer",
                          "price": "350.00",
                          "priceCurrency": "BYN"
                        }
                      }
                    }
                  ]
                },
                {
                  "@type": "OfferCatalog",
                  "name": "Программные услуги",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Установка операционной системы",
                        "description": "Чистая установка Windows, Linux",
                        "offers": {
                          "@type": "Offer",
                          "price": "60.00",
                          "priceCurrency": "BYN"
                        }
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Чистка от вирусов",
                        "description": "Удаление вирусов и вредоносных программ",
                        "offers": {
                          "@type": "Offer",
                          "price": "60.00",
                          "priceCurrency": "BYN"
                        }
                      }
                    }
                  ]
                }
              ]
            }
          },
          // FAQ разметка для страницы услуг
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Сколько стоит диагностика ноутбука?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Комплексная диагностика стоит 55 рублей, срочная диагностика - 110 рублей. При выполнении ремонта стоимость диагностики не взимается."
                }
              },
              {
                "@type": "Question",
                "name": "Какие виды чистки ноутбуков вы предлагаете?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Мы предлагаем три варианта чистки: Стандарт (75 руб.) - базовая чистка, Gaming (125 руб.) - для игровых ноутбуков, Extreme Pro (195 руб.) - комплексная чистка с заменой термопасты."
                }
              },
              {
                "@type": "Question",
                "name": "Делаете ли вы ремонт материнских плат?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, мы специализируемся на сложном ремонте материнских плат: ремонт системы питания (250 руб.), замена мультиконтроллера (130 руб.), восстановление после залития (250 руб.), перепрошивка BIOS (110 руб.)."
                }
              },
              {
                "@type": "Question",
                "name": "Сколько стоит замена экрана ноутбука?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Замена матрицы ноутбука стоит 130 рублей (работа), замена с проклейкой - 160 рублей. Цена самой матрицы зависит от модели и рассчитывается отдельно."
                }
              },
              {
                "@type": "Question",
                "name": "Предоставляете ли вы гарантию на ремонт?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, мы предоставляем гарантию до 12 месяцев на все виды ремонтных работ и установленные комплектующие."
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
                "name": "Услуги",
                "item": "https://fiveservice.by/services"
              }
            ]
          }
        ]),
      }}
    />
  );
}

// Компонент для Dublin Core метаданных
function ServicesDublinCore() {
  return (
    <>
      <meta name="DC.title" content="Все услуги по ремонту ноутбуков | FiveService Минск" />
      <meta name="DC.creator" content="FiveService" />
      <meta name="DC.description" content="Полный спектр услуг по ремонту ноутбуков в Минске: диагностика, чистка, ремонт компонентов, замена комплектующих, программные услуги. Цены и описание." />
      <meta name="DC.subject" content="услуги ремонта ноутбуков, замена экрана ноутбука, чистка ноутбука, ремонт материнской платы, диагностика ноутбука, восстановление данных Минск, цены на ремонт ноутбуков" />
      <meta name="DC.publisher" content="FiveService" />
      <meta name="DC.contributor" content="FiveService" />
      <meta name="DC.date" content="2024-01-01" />
      <meta name="DC.type" content="Text.Services" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content="https://fiveservice.by/services" />
      <meta name="DC.source" content="https://fiveservice.by" />
      <meta name="DC.language" content="ru" />
      <meta name="DC.coverage" content="Минск, Беларусь" />
      <meta name="DC.rights" content="Copyright FiveService 2024" />
      <link rel="canonical" href="https://fiveservice.by/services" />
    </>
  );
}

export default function ServicesPage() {
  return (
    <>
      <ServicesDublinCore />
      <ServicesStructuredData />
      <div className="pt-16">
        <ServiceHero />
        <ServicesList />
        <FAQ />
      </div>
    </>
  );
}