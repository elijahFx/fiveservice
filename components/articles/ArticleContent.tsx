'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Share2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Article } from '@/lib/data/articles';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  const relatedArticles = [
    {
      title: 'Признаки неисправности жесткого диска',
      excerpt: 'Как распознать проблемы с накопителем на ранней стадии',
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      slug: 'hdd-problems',
      readTime: '6 мин'
    },
    {
      title: 'Почему ноутбук медленно работает',
      excerpt: 'Основные причины снижения производительности',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      slug: 'slow-laptop',
      readTime: '5 мин'
    }
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
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
        <header className="mb-12">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span>Эксперты FiveService</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{article.readTime} чтения</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12">
          <div className="prose prose-lg max-w-none">
            <div className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              {article.excerpt}
            </div>
            
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </div>

        {/* Author Section */}
        <Card className="p-8 mb-12 bg-navy-50 border-navy-200">
          <div className="flex items-start space-x-6">
            <div className="flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full">
              <span className="text-white font-bold text-xl">FS</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Команда экспертов FiveService
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Наши специалисты имеют более 13 лет опыта в ремонте ноутбуков и компьютерной техники. 
                Мы делимся знаниями и практическими советами, чтобы помочь вам лучше понимать 
                и обслуживать вашу технику.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-navy-600 hover:bg-navy-700">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href="tel:+375297349077">Консультация</a>
                </Button>
                <Link href="/services">
                  <Button variant="outline" className="border-navy-600 text-navy-600 hover:bg-navy-50">
                    Наши услуги
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Related Articles */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Похожие статьи</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((relatedArticle, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-navy-600 transition-colors">
                    {relatedArticle.title}
                  </h4>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {relatedArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{relatedArticle.readTime}</span>
                    </div>
                    <Link
                      href={`/articles/${relatedArticle.slug}`}
                      className="text-navy-600 font-medium hover:text-navy-700 transition-colors text-sm"
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

      <style jsx global>{`
        .article-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin: 2rem 0 1rem 0;
          line-height: 1.2;
        }

        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin: 1.5rem 0 0.75rem 0;
          line-height: 1.3;
        }

        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.7;
          color: #4b5563;
        }

        .article-content ul, .article-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
          color: #4b5563;
        }

        .article-content strong {
          font-weight: 600;
          color: #1f2937;
        }

        .article-content code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          color: #1e3a8a;
        }

        .article-content blockquote {
          border-left: 4px solid #1e3a8a;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6b7280;
          background-color: #f8fafc;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
        }

        @media (max-width: 768px) {
          .article-content h2 {
            font-size: 1.5rem;
          }
          
          .article-content h3 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticleContent;