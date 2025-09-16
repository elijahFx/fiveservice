import { Metadata } from 'next';
import ArticlesList from '@/components/articles/ArticlesList';
import ArticlesHero from '@/components/articles/ArticlesHero';

export const metadata: Metadata = {
  title: 'Полезные статьи о ремонте ноутбуков | FiveService',
  description: 'Узнайте больше о ремонте и обслуживании ноутбуков. Полезные советы и инструкции от профессионалов.',
};

export default function ArticlesPage() {
  return (
    <div className="pt-16">
      <ArticlesHero />
      <ArticlesList />
    </div>
  );
}