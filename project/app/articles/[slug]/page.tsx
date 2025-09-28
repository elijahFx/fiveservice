import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/articles/ArticleContent';
import { getArticleBySlug, getArticleBySlugFromList, getAllArticles } from '@/lib/api/articles';
import { articles as localArticles, getArticleBySlug as getLocalArticleBySlug } from '@/lib/data/articles';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Force dynamic rendering - no static generation
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    let article = await getArticleBySlug(params.slug);
    
    if (!article) {
      article = await getArticleBySlugFromList(params.slug);
    }
    
    if (!article) {
      // Try local articles as fallback
      article = getLocalArticleBySlug(params.slug) as any || null;
    }
    
    if (!article) {
      return {
        title: 'Статья не найдена | FiveService',
      };
    }

    return {
      title: article?.seo?.title || `${article.title} | FiveService`,
      description: article?.seo?.description || (article as any).annotation || (article as any).excerpt || '',
      keywords: article?.seo?.keywords?.join(', '),
      openGraph: {
        title: article?.seo?.title || article.title,
        description: article?.seo?.description || (article as any).annotation || (article as any).excerpt || '',
        images: (article as any).image || (article as any).preview || "/og-image.jpg",
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
      // Try local articles as fallback
      article = getLocalArticleBySlug(params.slug) as any || null;
    }

    if (!article) {
      notFound();
    }

    // Normalize API article shape to UI Article expected by ArticleContent
    const normalizedArticle: any = {
      id: (article as any).id ?? params.slug,
      slug: (article as any).slug ?? params.slug,
      title: (article as any).title ?? '',
      annotation: (article as any).annotation ?? (article as any).excerpt ?? '',
      content: (article as any).content ?? '',
      preview: (article as any).preview ?? (article as any).image ?? '/opengraph.webp',
      createdAt: (article as any).createdAt ?? new Date().toISOString(),
      readTime: (article as any).readTime ?? '5',
      author: (article as any).author ?? 'Эксперты FiveService',
      seo: (article as any).seo ?? { title: '', description: '', keywords: [] },
    };

    return <ArticleContent article={normalizedArticle} />;
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}