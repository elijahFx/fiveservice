import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/articles/ArticleContent';
import { getArticleBySlug, getArticleBySlugFromList, getAllArticles } from '@/lib/api/articles';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const articles = await getAllArticles(); // или специальный метод для получения slug
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
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
      title: article?.seo?.title || `${article.title} | FiveService`,
      description: article?.seo?.description || article.annotation,
      keywords: article?.seo?.keywords?.join(', '),
      openGraph: {
        title: article?.seo?.title || article.title,
        description: article?.seo?.description || article.annotation,
        images: article.image || "/og-image.jpg",
        type: 'article',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Статья | FiveService',
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
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