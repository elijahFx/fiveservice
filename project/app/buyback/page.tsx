import BuybackContent from '@/components/buyback/BuybackContent';
import BuybackHero from '@/components/buyback/BuybackHero';
import BuybackPreparation from '@/components/buyback/BuybackPreparation';
import BuybackPricing from '@/components/buyback/BuybackPricing';
import BuybackSteps from '@/components/buyback/BuybackSteps';
import { Metadata } from 'next';
;

export const metadata: Metadata = {
  title: 'Скупка ноутбуков в Минске: продайте нерабочую технику быстро, безопасно | Five Service',
  description: 'Продайте нерабочий ноутбук на запчасти в Минске. Честная оценка, быстрая оплата, официальный договор. Принимаем технику в любом состоянии.',
  keywords: 'скупка ноутбуков Минск, продать ноутбук, нерабочий ноутбук, ноутбук на запчасти',
};

export default function BuybackPage() {
  return (
    <main className="min-h-screen">
        <BuybackHero />
        <BuybackContent />
        <BuybackSteps />
        <BuybackPreparation />
        <BuybackPricing />
    </main>
  );
}
