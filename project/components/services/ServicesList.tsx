'use client';

import { Search, Sparkles, Wrench, Package, Code } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from "next/link"

const ServicesList = () => {
  const serviceCategories = [
    {
      id: 'diagnostics',
      title: 'Диагностика',
      shortTitle: 'Диагностика',
      icon: Search,
      services: [
        { name: 'Комплексная диагностика оборудования', price: '55,00 руб.' },
        { name: 'Срочная диагностика оборудования', price: '110,00 руб.' }
      ]
    },
    {
      id: 'cleaning',
      title: 'Чистка',
      shortTitle: 'Чистка',
      icon: Sparkles,
      services: [
        {
          name: 'Чистка ноутбуков',
          price: 'Стандарт: 75,00 руб. | Gaming: 125,00 руб. | Extreme Pro: 195,00 руб.',
          variants: [
            { name: 'Стандарт', price: '75,00 руб.' },
            { name: 'Gaming', price: '125,00 руб.' },
            { name: 'Extreme Pro', price: '195,00 руб.' }
          ]
        },
        {
          name: 'Чистка другой техники',
          price: 'от 125,00 руб.',
          variants: [
            { name: 'Компьютер "Стандарт"', price: '125,00 руб.' },
            { name: 'Компьютер "Gaming"', price: '165,00 руб.' },
            { name: 'Игровая консоль', price: '125,00 руб.' }
          ]
        }
      ]
    },
    {
      id: 'component-repair',
      title: 'Ремонт компонентов',
      shortTitle: 'Ремонт компонентов',
      icon: Wrench,
      services: [
        {
          name: 'Ремонт разъемов',
          price: 'от 60,00 руб.',
          variants: [
            { name: 'USB', price: '110,00 руб.' },
            { name: 'HDMI', price: '110,00 руб.' },
            { name: 'Аудио', price: '95,00 руб.' },
            { name: 'DC разъём', price: '110,00 руб.' },
            { name: 'Восстановление DC', price: '60,00 руб.' },
            { name: 'Клавиатура', price: '110,00 руб.' },
            { name: 'Тачпад', price: '110,00 руб.' },
            { name: 'Оперативная память', price: '215,00 руб.' },
            { name: 'SATA', price: '110,00 руб.' }
          ]
        },
        {
          name: 'Ремонт материнских плат',
          price: 'от 110,00 руб.',
          variants: [
            { name: 'Система питания', price: '250,00 руб.' },
            { name: 'Мультиконтроллер', price: '130,00 руб.' },
            { name: 'Аудиокодек', price: '110,00 руб.' },
            { name: 'Восстановление после залития', price: '250,00 руб.' },
            { name: 'Перепрошивка BIOS', price: '110,00 руб.' }
          ]
        },
        {
          name: 'Другие компоненты',
          price: 'от 45,00 руб.',
          variants: [
            { name: 'Кнопка включения', price: '85,00 руб.' },
            { name: 'Зарядное устройство', price: '65,00 руб.' },
            { name: 'DC шнур', price: '45,00 руб.' }
          ]
        }
      ]
    },
    {
      id: 'component-replacement',
      title: 'Замена компонентов',
      shortTitle: 'Замена компонентов',
      icon: Package,
      services: [
        {
          name: 'Замена комплектующих',
          price: 'от 20,00 руб.',
          note: 'Цены указаны только за работу без учёта деталей! За исключением выделенных позиций.',
          variants: [
            { name: 'Матрица ноутбука', price: '130,00 руб.' },
            { name: 'Матрица с проклейкой', price: '160,00 руб.' },
            { name: 'Wi-Fi модуль', price: '135,00 руб.', highlight: true },
            { name: 'Кулер', price: '75,00 руб.' },
            { name: 'Клавиатура с перепайкой', price: '80,00 руб.' },
            { name: 'Накладная клавиатура', price: '45,00 руб.' },
            { name: 'Динамики', price: '60,00 руб.' },
            { name: 'Тачпад', price: '60,00 руб.' },
            { name: 'Петли/восстановление', price: '130,00 руб.' },
            { name: 'Нижняя часть корпуса', price: '75,00 руб.' },
            { name: 'Рамка матрицы', price: '90,00 руб.' },
            { name: 'Шлейф матрицы', price: '145,00 руб.', highlight: true },
            { name: 'Процессор', price: '350,00 руб.' },
            { name: 'Видеокарта', price: '350,00 руб.' },
            { name: 'ОЗУ', price: '20,00 руб.' },
            { name: 'HDD→SSD', price: '20,00 руб.' }
          ]
        },
        {
          name: 'Восстановление корпуса',
          price: 'от 25,00 руб.',
          variants: [
            { name: 'Корпусные элементы (за ед., до 3 шт.)', price: '30,00 руб.' },
            { name: 'Корпусные элементы (за ед., более 3 шт.)', price: '25,00 руб.' },
            { name: 'Ремонт крышки экрана с переклейкой матрицы', price: '160,00 руб.' },
            { name: 'Ремонт крышки без переклейки матрицы', price: '110,00 руб.' },
            { name: 'Ремонт нижней части корпуса ноутбука', price: '110,00 руб.' }
          ]
        }
      ]
    },
    {
      id: 'software-services',
      title: 'Программные услуги',
      shortTitle: 'Программные услуги',
      icon: Code,
      services: [
        {
          name: 'Программное обеспечение',
          price: 'от 35,00 руб.',
          variants: [
            { name: 'Установка ОС', price: '60,00 руб.' },
            { name: 'Чистка от вирусов', price: '60,00 руб.' },
            { name: 'Копирование информации', price: '35,00 руб.' },
            { name: 'Клонирование ОС', price: '75,00 руб.' }
          ]
        }
      ]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Отступ от верха для учета фиксированной навигации
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

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
            <h2 className="text-3xl font-bold mb-4">Нужен точный ориентир по цене ремонта?</h2>
            <p className="text-xl mb-6 text-gray-200 max-w-2xl mx-auto">
              Воспользуйтесь калькулятором — получите предварительную стоимость, сроки и варианты по запчастям. Без звонков и ожидания.
            </p>
            <Link href="/calculator">
            
            <button
             
              className="inline-flex items-center px-8 py-4 bg-white text-navy-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Рассчитать стоимость
            </button>
            </Link>
          </div>
        </div>

        {/* Navigation Tags */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Быстрый поиск</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceCategories.map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="px-6 py-3 text-base font-medium cursor-pointer border-navy-200 text-navy-700 hover:bg-navy-600 hover:text-white hover:border-navy-600 transition-all duration-300 rounded-full"
                  onClick={() => scrollToSection(category.id)}
                >
                  {category.shortTitle}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-16">
          {serviceCategories.map((category, index) => (
            <div key={index} id={category.id}>
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-16 h-16 bg-navy-600 rounded-xl mr-4">
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
              </div>

              {category.id === 'diagnostics' && (
                <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <p className="text-blue-900 font-medium">
                    При выполнении ремонта стоимость диагностики не взимается
                  </p>
                </div>
              )}

              {category.services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <Card key={serviceIndex} className="p-6 hover:shadow-lg transition-all duration-300 group">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-navy-600 transition-colors">
                        {service.name}
                      </h3>

                      {service?.note && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-600 italic">{service?.note}</p>
                        </div>
                      )}

                      {service?.variants && service?.variants.length > 0 ? (
                        <div className="space-y-3">
                          {service?.variants.map((variant, variantIndex) => (
                            <div
                              key={variantIndex}
                              className={`flex justify-between items-center py-2 border-b border-gray-100 last:border-0 ${
                                variant.highlight ? 'bg-navy-50 -mx-3 px-3 rounded' : ''
                              }`}
                            >
                              <span className={`text-sm ${variant.highlight ? 'text-navy-700 font-medium' : 'text-gray-700'}`}>
                                {variant.name}
                              </span>
                              <span className={`font-semibold ${variant.highlight ? 'text-navy-600' : 'text-navy-600'}`}>
                                {variant.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Цена</p>
                            <p className="font-bold text-navy-600 text-lg">{service.price}</p>
                          </div>
                          {service?.time && (
                            <div>
                              <p className="text-sm text-gray-500">Срок</p>
                              <p className="font-bold text-gray-900">{service?.time}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Услуги в этой категории скоро появятся</p>
              )}
            </div>
          ))}
        </div>

        {/* Laptop Buying Section */}
        <div className="mt-20">
          <div className="bg-navy-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Мы покупаем ноутбуки</h2>
            <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
              Продайте нерабочую или устаревшую технику быстро, безопасно, официально
            </p>
            <Button
              asChild
              className="bg-white text-navy-600 hover:bg-gray-100 px-8 py-3 font-semibold shadow-lg"
            >
              <a href="/buyback">Узнать подробнее</a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesList;