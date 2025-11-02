import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutDescription from '@/components/about/AboutDescription';
import AboutValues from '@/components/about/AboutValues';
import Contact from '@/components/home/Contact';
import FAQ from '@/components/common/FAQ';

export const metadata: Metadata = {
  title: 'О нас - FiveService | Профессиональный ремонт техники в Минске',
  description: 'Узнайте больше о нашем сервисном центре. 13 лет опыта, высокие стандарты качества, команда профессионалов. Лидеры по сложным ремонтам в Минске.',
  keywords: 'о компании, сервисный центр, ремонт техники Минск, профессионалы, качество обслуживания',
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutHero />
      <AboutDescription />
      <AboutValues />
      <Contact />
      <FAQ />
    </div>
  );
}