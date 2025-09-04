import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/articles/ArticleContent';
import { getArticleBySlug } from '@/lib/data/articles';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const { articles } = await import('@/lib/data/articles');
    
    // Defensive check to ensure articles is a valid array
    if (!Array.isArray(articles)) {
      console.error('Articles data is not available or not an array');
      return [];
    }
    
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Failed to load articles data:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Статья не найдена | FiveService',
    };
  }

  return {
    title: article.seo.title,
    description: article.seo.description,
    keywords: article.seo.keywords.join(', '),
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      images: [article.image],
      type: 'article',
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return <ArticleContent article={article} />;
}