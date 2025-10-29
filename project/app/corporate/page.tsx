import { Metadata } from 'next';
import CorporateHero from '@/components/corporate/CorporateHero';
import CorporateServices from '@/components/corporate/CorporateServices';
import CorporateBenefits from '@/components/corporate/CorporateBenefits';

export const metadata: Metadata = {
  title: 'Корпоративное обслуживание ноутбуков для юридических лиц | FiveService Минск',
  description: 'Профессиональное техническое обслуживание IT-парка для бизнеса. Обслуживание юридических лиц: договоры, скидки, выездной сервис, безналичный расчет.',
  keywords: 'корпоративное обслуживание, IT-аутсорсинг, обслуживание юридических лиц, ремонт ноутбуков для бизнеса, сервисный контракт, IT-поддержка компаний, обслуживание оргтехники',
  openGraph: {
    title: 'Корпоративное обслуживание ноутбуков для юридических лиц | FiveService Минск',
    description: 'Профессиональное техническое обслуживание IT-парка для бизнеса. Договоры, скидки, выездной сервис, безналичный расчет.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary',
    title: 'Корпоративное обслуживание ноутбуков для юридических лиц | FiveService Минск',
    description: 'Профессиональное техническое обслуживание IT-парка для бизнеса. Договоры, скидки, выездной сервис.',
  },
  alternates: {
    canonical: 'https://fiveservice.by/corporate',
  },
};

// Компонент для микроразметки страницы корпоративного обслуживания
function CorporateStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          // Service разметка для корпоративных услуг
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://fiveservice.by/corporate#service",
            "name": "Корпоративное обслуживание ноутбуков и IT-оборудования",
            "provider": {
              "@type": "Organization",
              "@id": "https://fiveservice.by#organization",
              "name": "FiveService",
              "description": "Сервисный центр по ремонту и обслуживанию компьютерной техники в Минске"
            },
            "description": "Комплексное обслуживание IT-парка для юридических лиц и бизнеса. Ремонт ноутбуков, компьютеров, оргтехники. Сервисные контракты, выездное обслуживание, IT-аутсорсинг.",
            "serviceType": "IT-обслуживание и ремонт",
            "areaServed": {
              "@type": "City",
              "name": "Минск"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Корпоративные услуги для бизнеса",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Сервисное обслуживание по договору",
                    "description": "Годовое обслуживание IT-оборудования с фиксированной стоимостью"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Выездной IT-специалист",
                    "description": "Выезд специалиста в офис для диагностики и ремонта оборудования"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Корпоративный ремонт ноутбуков",
                    "description": "Ремонт ноутбуков сотрудников с приоритетным обслуживанием"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Обслуживание рабочих станций",
                    "description": "Настройка, ремонт и обслуживание стационарных компьютеров"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "IT-аутсорсинг",
                    "description": "Полное техническое сопровождение IT-инфраструктуры компании"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Обслуживание оргтехники",
                    "description": "Ремонт и обслуживание принтеров, МФУ, сканеров"
                  }
                }
              ]
            },
            "termsOfService": "https://fiveservice.by/terms",
            "providerMobility": "dynamic"
          },
          // Corporation разметка для целевой аудитории
          {
            "@context": "https://schema.org",
            "@type": "Corporation",
            "name": "Корпоративные клиенты FiveService",
            "description": "Юридические лица и организации, пользующиеся услугами IT-обслуживания",
            "url": "https://fiveservice.by/corporate",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Минск",
              "addressCountry": "BY"
            }
          },
          // OfferCatalog для бизнес-преимуществ
          {
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            "name": "Преимущества корпоративного обслуживания",
            "itemListElement": [
              {
                "@type": "Offer",
                "name": "Скидки до 20% для юридических лиц",
                "description": "Специальные цены при заключении договора на обслуживание"
              },
              {
                "@type": "Offer",
                "name": "Приоритетное обслуживание",
                "description": "Внеочередной ремонт для корпоративных клиентов"
              },
              {
                "@type": "Offer",
                "name": "Безналичный расчет",
                "description": "Работаем с юридическими лицами по безналичному расчету"
              },
              {
                "@type": "Offer",
                "name": "Полный пакет документов",
                "description": "Акты, счета-фактуры, договоры для бухгалтерии"
              },
              {
                "@type": "Offer",
                "name": "Выездной сервис",
                "description": "Выезд специалиста в офис для оперативного ремонта"
              },
              {
                "@type": "Offer",
                "name": "Гибкая система оплаты",
                "description": "Оплата по факту выполнения работ или по постоплате"
              }
            ]
          },
          // FAQ разметка для корпоративных вопросов
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Какие документы предоставляются для бухгалтерии?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Мы предоставляем полный пакет документов: договор на обслуживание, акты выполненных работ, счета-фактуры, все необходимые документы для налоговой отчетности и бухгалтерского учета."
                }
              },
              {
                "@type": "Question",
                "name": "Предоставляются ли скидки для корпоративных клиентов?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, мы предоставляем скидки до 20% для юридических лиц при заключении договора на годовое обслуживание. Размер скидки зависит от объема услуг и количества обслуживаемой техники."
                }
              },
              {
                "@type": "Question",
                "name": "Возможен ли выезд специалиста в офис?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, мы предоставляем услугу выездного IT-специалиста для оперативной диагностики и ремонта оборудования непосредственно в офисе клиента. Это позволяет минимизировать простои в работе сотрудников."
                }
              },
              {
                "@type": "Question",
                "name": "Как происходит оплата для юридических лиц?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Работаем по безналичному расчету. Оплата может производиться по факту выполнения работ или по постоплате в соответствии с условиями договора. Предоставляем все закрывающие документы."
                }
              },
              {
                "@type": "Question",
                "name": "Какое оборудование можно включить в договор обслуживания?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "В договор обслуживания можно включить: ноутбуки, стационарные компьютеры, мониторы, принтеры, МФУ, сканеры и другую оргтехнику. Составляем индивидуальный перечень оборудования для каждого клиента."
                }
              },
              {
                "@type": "Question",
                "name": "Есть ли услуга IT-аутсорсинга?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, мы предоставляем услуги IT-аутсорсинга: полное техническое сопровождение IT-инфраструктуры компании, включая регулярное обслуживание, экстренный ремонт, консультации и техническую поддержку сотрудников."
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
                "name": "Корпоративным клиентам",
                "item": "https://fiveservice.by/corporate"
              }
            ]
          }
        ]),
      }}
    />
  );
}

// Компонент для Dublin Core метаданных
function CorporateDublinCore() {
  return (
    <>
      <meta name="DC.title" content="Корпоративное обслуживание ноутбуков для юридических лиц | FiveService Минск" />
      <meta name="DC.creator" content="FiveService" />
      <meta name="DC.description" content="Профессиональное техническое обслуживание IT-парка для бизнеса. Обслуживание юридических лиц: договоры, скидки до 20%, выездной сервис, безналичный расчет, IT-аутсорсинг." />
      <meta name="DC.subject" content="корпоративное обслуживание, IT-аутсорсинг, обслуживание юридических лиц, ремонт ноутбуков для бизнеса, сервисный контракт, IT-поддержка компаний, обслуживание оргтехники, безналичный расчет для юрлиц" />
      <meta name="DC.publisher" content="FiveService" />
      <meta name="DC.contributor" content="FiveService" />
      <meta name="DC.date" content="2024-01-01" />
      <meta name="DC.type" content="Text.Service" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content="https://fiveservice.by/corporate" />
      <meta name="DC.source" content="https://fiveservice.by" />
      <meta name="DC.language" content="ru" />
      <meta name="DC.coverage" content="Минск, Беларусь" />
      <meta name="DC.rights" content="Copyright FiveService 2024" />
      <link rel="canonical" href="https://fiveservice.by/corporate" />
    </>
  );
}

export default function CorporatePage() {
  return (
    <>
      <CorporateDublinCore />
      <CorporateStructuredData />
      <div className="pt-16">
        <CorporateHero />
        <CorporateBenefits />
        <CorporateServices />
      </div>
    </>
  );
}