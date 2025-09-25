import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/articles/ArticleContent';
import { getAllArticles, getArticleBySlug, getArticleBySlugFromList } from '@/lib/api/articles';
import FAQ from '@/components/common/FAQ';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  let article = await getArticleBySlug(params.slug);
  
  if (!article) {
    article = await getArticleBySlugFromList(params.slug);
  }
  
  if (!article) {
    return {
      title: 'Статья не найдена | FiveService',
    };
  }

  return {
    title: article?.seo?.title,
    description: article?.seo?.description,
    keywords: article?.seo?.keywords.join(', '),
    openGraph: {
      title: article?.seo?.title,
      description: article?.seo?.description,
      images: [article?.preview],
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Пробуем получить статью напрямую по API
  let article = await getArticleBySlug(params.slug);
  
  // Если не получилось, пробуем из списка
  if (!article) {
    article = await getArticleBySlugFromList(params.slug);
  }

  if (!article) {
    notFound();
  }

  // Преобразуем дату и добавляем readTime (если нужно)
  const articleWithFormattedDate = {
    ...article,
    date: new Date(article.createdAt).toLocaleDateString('ru-RU'),
    annotation: article.excerpt // Используем excerpt вместо annotation
  };

  return <ArticleContent article={articleWithFormattedDate} />;
}