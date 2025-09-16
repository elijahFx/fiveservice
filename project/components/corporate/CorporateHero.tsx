import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CorporateHero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-navy-900 to-gray-900 text-white overflow-hidden pt-24 sm:pt-28">
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Корпоративное обслуживание"
          fill
          className="object-cover opacity-20"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Корпоративное
            <span className="block text-blue-400">обслуживание</span>
            техники
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Профессиональное техническое обслуживание компьютерного парка 
            вашей организации с заключением договора и гарантийными обязательствами
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-navy-600 hover:bg-navy-700">
              <Phone className="w-5 h-5 mr-2" />
              <a href="tel:+375297349077">Получить консультацию</a>
            </Button>
            
            <Button 
              size="lg" 
             className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy-900 transition-colors duration-300"
              aria-label="Скачать образец договора на корпоративное обслуживание"
            >
              Скачать образец договора
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateHero;