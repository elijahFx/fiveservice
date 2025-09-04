'use client';

import { Star, MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const ReviewsList = () => {
  const reviews = [
    {
      name: 'Александр Ковалев',
      rating: 5,
      text: 'Отличный сервис! Быстро заменили экран на моем HP Pavilion. Работает отлично, никаких нареканий. Цена адекватная, сроки соблюдены. Обязательно обращусь еще при необходимости.',
      service: 'Замена экрана',
      date: '2 недели назад',
      platform: 'Google Maps',
      verified: true
    },
    {
      name: 'Мария Петрова',
      rating: 5,
      text: 'Профессиональная чистка ноутбука Dell. Ноутбук перестал шуметь и греться. Мастера объяснили что и как делали, дали рекомендации по эксплуатации. Очень довольна!',
      service: 'Чистка от пыли',
      date: '1 месяц назад',
      platform: 'Яндекс Карты',
      verified: true
    },
    {
      name: 'Дмитрий Волков',
      rating: 5,
      text: 'Восстановили важные данные с поврежденного диска. Думал все потеряно навсегда, но специалисты смогли восстановить 95% файлов. Профессионализм на высшем уровне!',
      service: 'Восстановление данных',
      date: '3 недели назад',
      platform: 'Google Maps',
      verified: true
    },
    {
      name: 'Елена Соколова',
      rating: 5,
      text: 'Быстро и качественно заменили клавиатуру на Lenovo ThinkPad. Вежливые сотрудники, все объяснили, показали. Цены разумные, гарантию дали на 6 месяцев.',
      service: 'Замена клавиатуры',
      date: '1 неделя назад',
      platform: 'Яндекс Карты',
      verified: true
    },
    {
      name: 'Игорь Михайлов',
      rating: 5,
      text: 'Сложный ремонт материнской платы MacBook Pro. Сначала сомневался, стоит ли тратиться, но ребята справились отлично. Ноутбук работает как новый уже полгода.',
      service: 'Ремонт материнской платы',
      date: '2 месяца назад',
      platform: 'Google Maps',
      verified: true
    },
    {
      name: 'Анна Титова',
      rating: 5,
      text: 'Корпоративный клиент. Обслуживаем у них весь парк техники офиса (более 30 ноутбуков). Всегда качественно, в срок, с гарантией. Рекомендую для бизнеса.',
      service: 'Корпоративное обслуживание',
      date: '1 месяц назад',
      platform: 'Google Maps',
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Avatar className="mr-3">
                    <AvatarFallback className="bg-navy-100 text-navy-600 font-semibold">
                      {review.name.split(' ').map(n => n.charAt(0)).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      {review.verified && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Проверено
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {review.text}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Badge className="bg-navy-100 text-navy-600 hover:bg-navy-100">
                    {review.service}
                  </Badge>
                  <span className="text-sm text-gray-700">{review.date}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-700">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{review.platform}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Review Sources */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Больше отзывов на картах</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://share.google/qg2GPpyHErLRiHpyv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Star className="w-5 h-5 mr-2" />
              Отзывы на Google Maps
            </a>
            <a 
              href="https://yandex.by/maps/-/CLEXYT9c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Star className="w-5 h-5 mr-2" />
              Отзывы на Яндекс Картах
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20">
          <div className="bg-navy-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Готовы доверить нам свой ноутбук?</h3>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Присоединяйтесь к сотням довольных клиентов. Позвоните прямо сейчас 
              и получите бесплатную диагностику!
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
                onClick={() => {
                  const contactSection = document.getElementById('contact-section');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#contact-section';
                  }
                }}
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

export default ReviewsList;