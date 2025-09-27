import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/articles/ArticleContent';
import { getArticleBySlug, getArticleBySlugFromList } from '@/lib/api/articles';

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
      images: "undefined",
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {

  console.log(params);
  

  try {
    let article = await getArticleBySlug(params.slug);
    
    if (!article) {
      article = await getArticleBySlugFromList(params.slug);
    }

    if (!article) {
      notFound();
    }

    const articleWithFormattedDate = {
      ...article,
      date: new Date(article.createdAt).toLocaleDateString('ru-RU'),
      annotation: article.annotation
    };

    return <ArticleContent article={articleWithFormattedDate} />;
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}