'use client';

import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, CircleCheck as CheckCircle } from 'lucide-react';
import Link from 'next/link';

const CorporateServices = () => {
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Корпоративные услуги
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Индивидуальный подход к каждому клиенту и гибкие условия сотрудничества
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-navy-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800 leading-relaxed">
                  Бесплатная диагностика оборудования <span className="text-sm text-gray-600">(только для организаций и ИП)</span>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-navy-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800 leading-relaxed">
                  Срочный ремонт электронной техники
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-navy-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800 leading-relaxed">
                  Комплексная чистка компьютера и ноутбука (чистка от пыли, замена термопасты, замена термопрокладок, чистка и смазка кулера)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-navy-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800 leading-relaxed">
                  Ремонт отдельных деталей устройства на компонентном уровне
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-navy-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800 leading-relaxed">
                  Замена деталей устройства на оригинальные (от производителя)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-navy-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800 leading-relaxed">
                  Тестирование работоспособности оборудования посредством спец. техники
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-navy-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800 leading-relaxed">
                  Предоставление расширенных гарантий на выполненные работы
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-navy-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800 leading-relaxed">
                  Бесплатная доставка техники в сервисный центр и обратно
                </p>
              </div>
            </div>
          </div>
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

            <Link href="/bonus-program">
              <Button className="bg-navy-600 hover:bg-navy-700 text-white px-8 py-3">
                Узнать подробнее
              </Button>
            </Link>
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