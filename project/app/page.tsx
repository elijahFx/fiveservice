import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Benefits from '@/components/home/Benefits';
import Reviews from '@/components/home/Reviews';
import Masters from '@/components/home/Masters';
import HowWeWork from '@/components/home/HowWeWork';
import Contact from '@/components/home/Contact';
import Calculator from '@/components/home/Calculator';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Benefits />
      <Reviews />
      <Masters />
      <HowWeWork />
      <Calculator />
      <Contact />
    </>
  );
}