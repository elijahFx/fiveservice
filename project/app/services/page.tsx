import { Metadata } from 'next';
import ServicesList from '@/components/services/ServicesList';
import ServiceHero from '@/components/services/ServiceHero';
import FAQ from '@/components/common/FAQ';

export const metadata: Metadata = {
  title: 'Все услуги по ремонту ноутбуков | FiveService',
  description: 'Полный спектр услуг по ремонту ноутбуков в Минске. Замена экранов, чистка, ремонт материнских плат, восстановление данных.',
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <ServiceHero />
      <ServicesList />
      <FAQ />
    </div>
  );
}