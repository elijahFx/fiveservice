import { Metadata } from 'next';
import QuestionsHero from '@/components/questions/QuestionsHero';
import QuestionsList from '@/components/questions/QuestionsList';
import DynamicQuestionList from '@/components/questions/DynamicQuestionsList';

export const metadata: Metadata = {
  title: 'Частые вопросы о ремонте ноутбуков | FiveService',
  description: 'Ответы на частые вопросы о ремонте ноутбуков. Сроки, цены, гарантии. Задайте свой вопрос нашему мастеру.',
  keywords: 'частые вопросы, FAQ, ремонт ноутбуков, сроки ремонта, гарантия, цены',
};

export default function QuestionsPage() {
  return (
    <div className="pt-16">
      <QuestionsHero />
      <QuestionsList />
      <DynamicQuestionList />
    </div>
  );
}