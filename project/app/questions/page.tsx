import { Metadata } from 'next';
import QuestionsHero from '@/components/questions/QuestionsHero';
import QuestionsList from '@/components/questions/QuestionsList';
import DynamicQuestionList from '@/components/questions/DynamicQuestionsList';

export const metadata: Metadata = {
  title: 'Частые вопросы о ремонте ноутбуков | FiveService Минск',
  description: 'Ответы на частые вопросы о ремонте ноутбуков: сроки, цены, гарантия, диагностика. Консультация мастера. Ремонт всех брендов в Минске.',
  keywords: 'частые вопросы, FAQ, ремонт ноутбуков, сроки ремонта, гарантия, цены на ремонт, диагностика ноутбука, замена экрана, чистка ноутбука',
  openGraph: {
    title: 'Частые вопросы о ремонте ноутбуков | FiveService Минск',
    description: 'Ответы на частые вопросы о ремонте ноутбуков: сроки, цены, гарантия, диагностика. Консультация мастера в Минске.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary',
    title: 'Частые вопросы о ремонте ноутбуков | FiveService Минск',
    description: 'Ответы на частые вопросы о ремонте ноутбуков: сроки, цены, гарантия, диагностика.',
  },
  alternates: {
    canonical: 'https://fiveservice.by/questions',
  },
};

// Компонент для микроразметки страницы вопросов
function QuestionsStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          // FAQPage разметка для всей страницы
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://fiveservice.by/questions#webpage",
            "name": "Частые вопросы о ремонте ноутбуков - FiveService",
            "description": "Ответы на популярные вопросы о ремонте и обслуживании ноутбуков в сервисном центре FiveService Минск",
            "url": "https://fiveservice.by/questions",
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
                  "name": "Вопросы и ответы",
                  "item": "https://fiveservice.by/questions"
                }
              ]
            },
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Сколько времени занимает диагностика ноутбука?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Диагностика занимает от 1 до 2 дней в зависимости от сложности случая. При срочном ремонте возможна экспресс-диагностика в течение нескольких часов."
                }
              },
              {
                "@type": "Question",
                "name": "Как происходит согласование стоимости ремонта?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "После диагностики мы предоставляем детальную смету работ и запчастей. Стоимость согласовывается с клиентом до начала ремонта. При изменении стоимости во время ремонта - дополнительное согласование."
                }
              },
              {
                "@type": "Question",
                "name": "Какие документы вы предоставляете при ремонте?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Мы оформляем заказ-наряд при приеме техники и даем гарантию на работы. Для юридических лиц предоставляем УПД/акты выполненных работ, все необходимые бухгалтерские документы."
                }
              },
              {
                "@type": "Question",
                "name": "С какими брендами ноутбуков вы работаете?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lenovo, ASUS, Acer, HP, Dell, MSI, Apple, Xiaomi и другие. Ремонтируем игровые ноутбуки, ультрабуки, бизнес-класс и бюджетные модели. Работаем со всеми популярными производителями."
                }
              },
              {
                "@type": "Question",
                "name": "Есть ли бесплатный курьер по Минску?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, мы предоставляем бесплатный курьер по Минску. Заберём устройство и привезём обратно после ремонта. Удобно и быстро - вам не нужно тратить время на поездки в сервис."
                }
              },
              {
                "@type": "Question",
                "name": "Сохранятся ли мои данные на диске при ремонте?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, в 99% случаев данные сохраняются. Работы с платой или системой охлаждения не затрагивают SSD/HDD. При необходимости замены накопителя мы помогаем с переносом данных."
                }
              },
              {
                "@type": "Question",
                "name": "Что делать, если залили ноутбук жидкостью?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Срочно: отключите питание, вытащите аккумулятор, не сушите феном, не пытайтесь включать. Несите на профессиональную мойку в сервисный центр - чем быстрее, тем выше шансы спасти устройство."
                }
              },
              {
                "@type": "Question",
                "name": "Выезжаете ли вы на дом или в офис для ремонта?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Нет, на дому невозможно выполнить профессиональный ремонт техники. Для сложных работ нужна лаборатория с паяльным оборудованием, микроскопами и специальными инструментами."
                }
              },
              {
                "@type": "Question",
                "name": "Опасно ли, если ноутбук греется и шумит?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, перегрев приводит к деградации чипов и сокращает срок службы компонентов. Рекомендуем чистку системы охлаждения и замену термопасты для предотвращения серьезных поломок."
                }
              },
              {
                "@type": "Question",
                "name": "Вы используете оригинальные запчасти или аналоги?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ставим оригинал либо качественный аналог по согласованию с клиентом. Всегда тестируем совместимость и даем гарантию на установленные компоненты."
                }
              },
              {
                "@type": "Question",
                "name": "Какие способы оплаты принимаете? Работаете с юрлицами?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Наличные и банковская карта. Для юрлиц - УПД/акт, безналичный расчёт, гарантийные обязательства. Работаем с ИП и организациями по договору."
                }
              },
              {
                "@type": "Question",
                "name": "Что делать, если ноутбук не заряжается или шатается разъем питания?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Часто требуется замена DC-разъёма или ремонт узла зарядки. Сделаем аккуратно, без «скруток», с гарантией на работу. Используем качественные компоненты."
                }
              },
              {
                "@type": "Question",
                "name": "Экран треснул или мерцает - что делать?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Трещины - только замена матрицы. Мерцание или полосы - проверим шлейф, подсветку, видеочип. Диагностируем причину и предложим оптимальное решение."
                }
              },
              {
                "@type": "Question",
                "name": "Ноутбук тормозит - поможет ли установка SSD?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, переход на SSD ускоряет загрузку и работу в 3–5 раз. Установим SSD, перенесём систему и данные. Это самое эффективное обновление для старых ноутбуков."
                }
              },
              {
                "@type": "Question",
                "name": "Можно ли сделать ремонт срочно сегодня/завтра?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, делаем экспресс-работы по предварительному согласованию и наличию мастера и деталей. Срочный ремонт возможен в течение 24 часов для многих типовых поломок."
                }
              },
              {
                "@type": "Question",
                "name": "Платная ли диагностика ноутбука?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Диагностика стоит 55 BYN. При согласии на ремонт в нашем сервисе стоимость диагностики не оплачивается. Диагностика может длиться до 2 дней в сложных случаях."
                }
              }
            ]
          },
          // QAPage для дополнительной структуры
          {
            "@context": "https://schema.org",
            "@type": "QAPage",
            "name": "Вопросы и ответы по ремонту ноутбуков",
            "mainEntity": {
              "@type": "Question",
              "name": "Частые вопросы о ремонте ноутбуков в FiveService",
              "answerCount": 16,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "На этой странице собраны ответы на самые популярные вопросы клиентов о ремонте ноутбуков: сроки, цены, гарантия, диагностика, замена компонентов и другие аспекты обслуживания техники в сервисном центре FiveService в Минске."
              }
            }
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
                "name": "Вопросы и ответы",
                "item": "https://fiveservice.by/questions"
              }
            ]
          }
        ]),
      }}
    />
  );
}

// Компонент для Dublin Core метаданных
function QuestionsDublinCore() {
  return (
    <>
      <meta name="DC.title" content="Частые вопросы о ремонте ноутбуков | FiveService Минск" />
      <meta name="DC.creator" content="FiveService" />
      <meta name="DC.description" content="Ответы на частые вопросы о ремонте ноутбуков: сроки ремонта, цены, гарантия, диагностика, замена компонентов. Консультация мастера сервисного центра FiveService в Минске." />
      <meta name="DC.subject" content="частые вопросы, FAQ, ремонт ноутбуков, сроки ремонта, гарантия, цены на ремонт, диагностика ноутбука, замена экрана, чистка ноутбука, восстановление данных" />
      <meta name="DC.publisher" content="FiveService" />
      <meta name="DC.contributor" content="FiveService" />
      <meta name="DC.date" content="2024-01-01" />
      <meta name="DC.type" content="Text.FAQ" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content="https://fiveservice.by/questions" />
      <meta name="DC.source" content="https://fiveservice.by" />
      <meta name="DC.language" content="ru" />
      <meta name="DC.coverage" content="Минск, Беларусь" />
      <meta name="DC.rights" content="Copyright FiveService 2024" />
      <link rel="canonical" href="https://fiveservice.by/questions" />
    </>
  );
}

export default function QuestionsPage() {
  return (
    <>
      <QuestionsDublinCore />
      <QuestionsStructuredData />
      <div className="pt-16">
        <QuestionsHero />
        <QuestionsList />
        <DynamicQuestionList />
      </div>
    </>
  );
}