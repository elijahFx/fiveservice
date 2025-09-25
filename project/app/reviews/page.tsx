import { Metadata } from 'next';
import ReviewsHero from '@/components/reviews/ReviewsHero';
import ReviewsList from '@/components/reviews/ReviewsList';
import FAQ from '@/components/common/FAQ';

export const metadata: Metadata = {
  title: 'Отзывы клиентов о ремонте ноутбуков | FiveService',
  description: 'Читайте отзывы наших клиентов о качестве ремонта ноутбуков. Реальные отзывы с Google Maps и Яндекс Карт.',
};

export default function ReviewsPage() {
  return (
    <div className="pt-16">
      <ReviewsHero />
      <ReviewsList />
      <FAQ />
    </div>
  );
}