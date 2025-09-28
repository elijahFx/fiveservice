"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Article } from "@/lib/data/articles";
import { formatDateToDDMMYYYY } from "@/lib/utils/dates";
import ErrorBoundary from "./ErrorBoundary";

interface ArticleContentProps {
  article: Article;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  // Safe default values
  const safeArticle = {
    id: article?.id || "unknown",
    slug: article?.slug || "unknown",
    title: article?.title || "Заголовок не найден",
    annotation: article?.annotation || "Аннотация не найдена",
    content: article?.content || "<p>Содержание статьи временно недоступно.</p>",
    preview: article?.preview || "/default-article.jpg",
    createdAt: article?.createdAt || new Date().toISOString(),
    readTime: article?.readTime || "5",
    author: article?.author || "Эксперты FiveService",
  };

  const relatedArticles = [
    {
      title: "Признаки неисправности жесткого диска",
      annotation: "Как распознать проблемы с накопителем на ранней стадии",
      preview: "/default-article.jpg",
      slug: "hdd-problems",
      readTime: "6 мин",
      id: "related-1",
    },
    {
      title: "Почему ноутбук медленно работает",
      annotation: "Основные причины снижения производительности",
      preview: "/default-article.jpg",
      slug: "slow-laptop",
      readTime: "5 мин",
      id: "related-2",
    },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: safeArticle.title,
          text: safeArticle.annotation,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <ErrorBoundary>
      <div className="pt-16 min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/articles"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к статьям
            </Link>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {safeArticle.title}
              </h1>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{safeArticle.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDateToDDMMYYYY(safeArticle.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{safeArticle.readTime} минут чтения</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gray-200">
              <Image
                src={safeArticle.preview}
                alt={safeArticle.title}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  e.currentTarget.src = "/default-article.jpg";
                }}
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                {safeArticle.annotation}
              </div>

              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: safeArticle.content.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          </div>

          {/* Author Section */}
          <Card className="p-8 mb-12 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-6">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full">
                <span className="text-white font-bold text-xl">FS</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Команда экспертов FiveService
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Наши специалисты имеют более 13 лет опыта в ремонте ноутбуков и
                  компьютерной техники. Мы делимся знаниями и практическими
                  советами, чтобы помочь вам лучше понимать и обслуживать вашу
                  технику.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="w-4 h-4 mr-2" />
                    <a href="tel:+375297349077">Консультация</a>
                  </Button>
                  <Link href="/services">
                    <Button
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Наши услуги
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          {/* Related Articles */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Похожие статьи
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Card
                  key={relatedArticle.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={relatedArticle.preview}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/default-article.jpg";
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedArticle.title}
                    </h4>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {relatedArticle.annotation}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{relatedArticle.readTime}</span>
                      </div>
                      <Link
                        href={`/articles/${relatedArticle.slug}`}
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm"
                      >
                        Читать →
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </article>
      </div>
    </ErrorBoundary>
  );
};

export default ArticleContent;