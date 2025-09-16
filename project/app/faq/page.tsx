import { Metadata } from 'next';
import FaqHero from '@/components/faq/FaqHero';
import FaqList from '@/components/faq/FaqList';

export const metadata: Metadata = {
  title: 'Частые вопросы о ремонте ноутбуков | FiveService',
  description: 'Ответы на частые вопросы о ремонте ноутбуков. Сроки, цены, гарантии. Задайте свой вопрос нашему мастеру.',
  keywords: 'частые вопросы, FAQ, ремонт ноутбуков, сроки ремонта, гарантия, цены',
};

export default function FaqPage() {
  return (
    <div className="pt-16">
      <FaqHero />
      <FaqList />
    </div>
  );
}