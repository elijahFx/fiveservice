export interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const response = await fetch('https://testend2.site/api/articles', {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`https://testend2.site/api/articles/${slug}`, {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const article = await response.json();
    return article;
  } catch (error) {
    console.error('Failed to fetch article by slug:', error);
    return null;
  }
}

// Альтернативная функция если API не поддерживает получение по slug
export async function getArticleBySlugFromList(slug: string): Promise<Article | null> {
  try {
    const articles = await getAllArticles();
    return articles.find(article => article.slug === slug) || null;
  } catch (error) {
    console.error('Failed to fetch article by slug from list:', error);
    return null;
  }
}