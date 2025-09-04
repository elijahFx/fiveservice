'use client';

import { Monitor, HardDrive, Keyboard, Zap, Shield, Wrench, Cpu, Battery, Speaker, Wifi, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ServicesList = () => {
  const serviceCategories = [
    {
      title: 'Замена экранов и матриц',
      icon: Monitor,
      services: [
        { name: 'Замена матрицы 15.6"', price: 'от 80 BYN', time: '1-2 дня' },
      ]
    },
    {
      title: 'Чистка и профилактика',
      icon: HardDrive,
      services: [
        { name: 'Полная чистка от пыли', price: 'от 35 BYN', time: '2-4 часа' },
      ]
    },
    {
      title: 'Замена клавиатур и тачпадов',
      icon: Keyboard,
      services: [
        { name: 'Замена клавиатуры', price: 'от 45 BYN', time: '1 день' },
      ]
    },
    {
      title: 'Ремонт систем питания',
      icon: Zap,
      services: [
        { name: 'Замена разъема питания', price: 'от 25 BYN', time: '1-2 дня' },
      ]
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact-section';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Call to Action Block */}
        <div className="mb-16">
          <div className="bg-navy-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Не знаете, что вам нужно?</h2>
            <p className="text-xl mb-6 text-gray-200 max-w-2xl mx-auto">
              Получите консультацию по телефону.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+375297349077"
                className="inline-flex items-center px-8 py-4 bg-white text-navy-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                +375 29 734 90 77
              </a>
              <button 
                onClick={scrollToContact}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-navy-600 transition-colors"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {serviceCategories.map((category, index) => (
            <div key={index}>
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-16 h-16 bg-navy-600 rounded-xl mr-4">
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="p-6 hover:shadow-lg transition-all duration-300 group">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-navy-600 transition-colors">
                      {service.name}
                    </h3>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Цена</p>
                        <p className="font-bold text-navy-600 text-lg">{service.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Срок</p>
                        <p className="font-bold text-gray-900">{service.time}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-navy-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Нашли нужную услугу?</h3>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Свяжитесь с нами!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+375297349077"
                className="inline-flex items-center px-8 py-4 bg-white text-navy-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                +375 29 734 90 77
              </a>
              <button 
                onClick={scrollToContact}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-navy-600 transition-colors"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;