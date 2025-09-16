import { Metadata } from 'next';
import CorporateHero from '@/components/corporate/CorporateHero';
import CorporateServices from '@/components/corporate/CorporateServices';
import CorporateBenefits from '@/components/corporate/CorporateBenefits';

export const metadata: Metadata = {
  title: 'Корпоративное обслуживание ноутбуков | FiveService',
  description: 'Профессиональное техническое обслуживание IT-парка для юридических лиц. Договоры, скидки, выездной сервис.',
};

export default function CorporatePage() {
  return (
    <div className="pt-16">
      <CorporateHero />
      <CorporateBenefits />
      <CorporateServices />
    </div>
  );
}