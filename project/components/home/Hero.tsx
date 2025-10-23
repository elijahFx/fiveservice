'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CallbackModal from "@/components/modal/CallbackModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const benefits = [
    'Ремонт за 1-3 дня',
    'Средняя оценка по отзывам — 5,0',
    'Гарантия на детали и работы'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/5081929/pexels-photo-5081929.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Ремонт ноутбуков"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
           <span className='text-blue-400'>Ремонт ноутбуков</span>
           <span className='block'>в Минске за 1 день с гарантией</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            13 лет опыта, официальные гарантии, аккуратная работа с платами, бесплатный курьер по городу.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-navy-600 hover:bg-navy-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              <a href="tel:+375297349077">+375 29 734 90 77</a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-navy-600 hover:bg-white hover:text-navy-900 px-8 py-4 text-lg font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Оставить заявку
            </Button>
          </div>

          {/* Additional Phones */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm mb-2">Дополнительные номера:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm mb-2">
              <a href="tel:+375447534796" className="text-blue-400 hover:text-blue-300">+375 44 753 47 96</a>
              <a href="tel:+375257849731" className="text-blue-400 hover:text-blue-300">+375 25 784 97 31</a>
              <a href="tel:+375172424111" className="text-blue-400 hover:text-blue-300">+375 17 24 24 111</a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CallbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;