'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Truck, Users, FileText, Headphones, Calendar, Phone, MessageCircle } from 'lucide-react';

const CorporateServices = () => {
  const services = [
    {
      icon: Building,
      title: 'Абонентское обслуживание',
      description: 'Комплексное техническое обслуживание IT-парка по договору',
      features: ['Плановые профилактики', 'Приоритетная поддержка', 'Скидки на запчасти'],
      price: 'Индивидуально'
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Если мы не на главной странице, переходим на главную с якорем
      window.location.href = '/#contact-section';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Корпоративные услуги
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Индивидуальный подход к каждому клиенту и гибкие условия сотрудничества
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 group h-full">
              <div className="flex items-center justify-center w-16 h-16 bg-navy-100 rounded-xl mb-4 group-hover:bg-navy-600 group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-8 h-8 text-navy-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-navy-600 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                <div>
                  <p className="text-sm text-gray-500">Стоимость</p>
                  <p className="font-bold text-navy-600">{service.price}</p>
                </div>
                <Button size="sm" className="bg-navy-600 hover:bg-navy-700">
                  Узнать больше
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bonus Program Section */}
        <div className="mt-20">
          <div className="bg-navy-50 rounded-2xl p-8 text-center border border-navy-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Бонусная программа для работников организаций
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-8">
              Даём вашим сотрудникам скидку 
              <span className="text-navy-600 font-bold"> 30% </span>
              на ремонт ноутбуков
            </p>
            
            <Button className="bg-navy-600 hover:bg-navy-700 text-white px-8 py-3">
              Узнать подробнее
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="bg-navy-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Готовы обсудить сотрудничество?</h3>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Свяжитесь с нами для получения индивидуального предложения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+375297349077"
                className="inline-flex items-center px-8 py-4 bg-white text-navy-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                +375 29 734 90 77
              </a>
              <a 
                href="https://t.me/fiveservice_by"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Telegram
              </a>
              <a 
                href="viber://add?number=375447534796"
                className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Viber
              </a>
              <button 
                onClick={scrollToContact}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-navy-600 transition-colors"
              >
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateServices;