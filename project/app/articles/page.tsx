import { Metadata } from "next";
import ArticlesList from "@/components/articles/ArticlesList";
import { getAllArticles } from "@/lib/api/articles";
import FAQ from "@/components/common/FAQ";

export const metadata: Metadata = {
  title: "Статьи о ремонте ноутбуков и техники | FiveService Минск",
  description: "Полезные статьи и руководства по ремонту ноутбуков, компьютеров, устранению неисправностей. Советы мастеров сервисного центра FiveService в Минске.",
  keywords: "статьи о ремонте ноутбуков, руководство по ремонту техники, советы по обслуживанию, устранение неисправностей, ремонт компьютеров, мануалы по ремонту",
  openGraph: {
    title: "Статьи о ремонте ноутбуков и техники | FiveService Минск",
    description: "Полезные статьи и руководства по ремонту ноутбуков, компьютеров, устранению неисправностей. Советы мастеров сервисного центра.",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary",
    title: "Статьи о ремонте ноутбуков и техники | FiveService Минск",
    description: "Полезные статьи и руководства по ремонту ноутбуков, компьютеров, устранению неисправностей.",
  },
  alternates: {
    canonical: "https://fiveservice.by/articles",
  },
};

// Компонент для микроразметки страницы статей
async function ArticlesStructuredData() {
  const articles = await getAllArticles();
  
  const articleList = articles.map((article: any) => ({
    "@type": "Article" as const,
    "@id": `https://fiveservice.by/articles/${article.slug}#article`,
    "headline": article.title,
    "description": article.excerpt || article.description,
    "datePublished": article.date || article.createdAt,
    "dateModified": article.updatedAt || article.date || article.createdAt,
    "author": {
      "@type": "Organization" as const,
      "name": "FiveService",
      "url": "https://fiveservice.by"
    },
    "publisher": {
      "@type": "Organization" as const,
      "name": "FiveService",
      "logo": {
        "@type": "ImageObject" as const,
        "url": "https://fiveservice.by/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage" as const,
      "@id": `https://fiveservice.by/articles/${article.slug}`
    },
    "keywords": article.keywords || "ремонт ноутбуков, сервисный центр, техническое обслуживание",
    "articleSection": article.category || "Ремонт техники",
    "inLanguage": "ru"
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          // CollectionPage для страницы статей
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://fiveservice.by/articles#webpage",
            "name": "Статьи о ремонте техники - FiveService",
            "description": "Коллекция полезных статей и руководств по ремонту ноутбуков, компьютеров и другой техники от сервисного центра FiveService",
            "url": "https://fiveservice.by/articles",
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
                  "name": "Статьи",
                  "item": "https://fiveservice.by/articles"
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": articles.length,
              "itemListElement": articles.map((article: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Article",
                  "headline": article.title,
                  "description": article.excerpt || article.description,
                  "url": `https://fiveservice.by/articles/${article.slug}`,
                  "datePublished": article.date || article.createdAt,
                  "author": {
                    "@type": "Organization",
                    "name": "FiveService"
                  }
                }
              }))
            }
          },
          // Blog разметка
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": "https://fiveservice.by/articles#blog",
            "name": "Блог сервисного центра FiveService",
            "description": "Полезные статьи и руководства по ремонту и обслуживанию компьютерной техники",
            "url": "https://fiveservice.by/articles",
            "publisher": {
              "@type": "Organization",
              "name": "FiveService",
              "url": "https://fiveservice.by"
            },
            "blogPost": articleList.slice(0, 10), // Ограничиваем количество для производительности
            "inLanguage": "ru"
          },
          // CreativeWork для общего описания
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "Статьи о ремонте техники",
            "description": "Экспертные материалы по ремонту ноутбуков, компьютеров и электроники от профессиональных мастеров сервисного центра",
            "author": {
              "@type": "Organization",
              "name": "FiveService"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FiveService"
            },
            "datePublished": "2024-01-01",
            "inLanguage": "ru",
            "keywords": "ремонт ноутбуков, обслуживание компьютеров, технические статьи, руководства по ремонту"
          },
          // FAQ разметка для страницы статей
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Кто пишет статьи для блога FiveService?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Все статьи пишутся профессиональными мастерами и техническими специалистами сервисного центра FiveService на основе многолетнего опыта ремонта техники."
                }
              },
              {
                "@type": "Question",
                "name": "Как часто обновляется блог?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Мы регулярно публикуем новые статьи - примерно 2-3 раза в месяц. Все материалы актуальны и проверены на практике нашими специалистами."
                }
              },
              {
                "@type": "Question",
                "name": "Можно ли использовать статьи для самостоятельного ремонта?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, многие статьи содержат пошаговые инструкции для самостоятельного ремонта. Однако для сложных работ рекомендуем обращаться к профессионалам, чтобы избежать дополнительных повреждений."
                }
              },
              {
                "@type": "Question",
                "name": "Охватывают ли статьи ремонт всех марок ноутбуков?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, в наших статьях рассматривается ремонт ноутбуков всех популярных брендов: Lenovo, ASUS, Acer, HP, Dell, Apple, MSI и других."
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
                "name": "Статьи",
                "item": "https://fiveservice.by/articles"
              }
            ]
          }
        ]),
      }}
    />
  );
}

// Компонент для Dublin Core метаданных
function ArticlesDublinCore() {
  return (
    <>
      <meta name="DC.title" content="Статьи о ремонте ноутбуков и техники | FiveService Минск" />
      <meta name="DC.creator" content="FiveService" />
      <meta name="DC.description" content="Полезные статьи и руководства по ремонту ноутбуков, компьютеров, устранению неисправностей. Советы мастеров сервисного центра FiveService в Минске. Экспертные материалы по техническому обслуживанию." />
      <meta name="DC.subject" content="статьи о ремонте ноутбуков, руководство по ремонту техники, советы по обслуживанию, устранение неисправностей, ремонт компьютеров, мануалы по ремонту, технические статьи" />
      <meta name="DC.publisher" content="FiveService" />
      <meta name="DC.contributor" content="FiveService" />
      <meta name="DC.date" content="2024-01-01" />
      <meta name="DC.type" content="Text.Articles" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content="https://fiveservice.by/articles" />
      <meta name="DC.source" content="https://fiveservice.by" />
      <meta name="DC.language" content="ru" />
      <meta name="DC.coverage" content="Минск, Беларусь" />
      <meta name="DC.rights" content="Copyright FiveService 2024" />
      <link rel="canonical" href="https://fiveservice.by/articles" />
    </>
  );
}

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  
  return (
    <>
      <ArticlesDublinCore />
      {/* @ts-ignore */}
      <ArticlesStructuredData />
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Полезные статьи
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Советы, инструкции и полезная информация по ремонту и обслуживанию
              техники
            </p>
          </div>
          {/* @ts-ignore */}
          <ArticlesList articles={articles} />
        </div>
      </div>
    </>
  );
}