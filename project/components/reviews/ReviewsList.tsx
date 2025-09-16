'use client';

import { Star, MapPin } from 'lucide-react';
import { Phone, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const ReviewsList = () => {
 const reviews = [
    {
        name: 'Елена Шорина',
        rating: 5,
        text: 'Я уже два раза обращалась к ребятам за помощью по ремонту своего ноута. Наверняка возраст начинает брать свое. В первый раз была замена матрицы, а второй меняли плату расширения и кнопку вкл. Причем второй раз времени не было совсем, чтобы отвезти в мастерскую самой. Тогда ко мне приехал курьер в обозначенное время. В общем отношением и качеством работы довольна. Всем рекомендую!',
        service: 'Замена матрицы',
        date: '4 июля 2025 г.',
        platform: 'Яндекс Карты',
        verified: true
    },
    {
        name: 'Anastasia Cheremnykh',
        rating: 5,
        text: 'Рекомендую! Если что, то я к вам. Мне нравится, без спама и суеты, всё по работе. Запчасти после замены вернули - тоже +. Бумаги оформляют. гарантию дают. Всё ок.',
        service: 'Замена комплектующих',
        date: 'июль 2025 г.',
        platform: 'Google Maps',
        verified: true
    },
    {
        name: 'tsobako',
        rating: 5,
        text: 'Самый лучший сервис, который можно пройти. Всё делают отлично — от самой простой чистки до ремонта материнской платы. Один раз пришлось менять разъем для оперативной памяти в ноутбуке — мастера выполнили работу без нареканий и очень быстро, а ноутбук ещё работает до сих пор уже несколько лет',
        service: 'Ремонт материнской платы',
        date: '3 августа 2025 г.',
        platform: 'Яндекс Карты',
        verified: true
    },
    {
        name: 'olga popowa',
        rating: 5,
        text: 'Хочу сказать большое спасибо за квалифицированную помощь в ремонте ноутбука. Точно определили проблему, помогли в сопутствующих вопросах. Действительно хороший сервис и специалисты.',
        service: 'Ремонт ноутбука',
        date: 'июнь 2025 г.',
        platform: 'Google Maps',
        verified: true
    },
    {
        name: 'Сергей Ермин',
        rating: 5,
        text: `Что сказать?! Кроме восторга, слов нет!
Ладно то, что быстро сделали диагностику…ладно, что согласился на ремонт и ремонт был быстрый и качественный. Самое главное, мои ожидания по цене были в разы больше, чем ребята из сервиса озвучили. Моё почтение! Если что-то поломается-я у вас!`,
        service: 'Ремонт ноутбука',
        date: '1 апреля 2025 г.',
        platform: 'Яндекс Карты',
        verified: true
    },
    {
        name: 'Anya Belkevich',
        rating: 5,
        text: 'Обращалась за переустановкой виндоус. Невероятно приятный сервис, на все вопросы ответят, везде подскажут, даже советы дадут. Все работает четко, без нареканий. Буду уверенно обращаться сюда еще при необходимости)',
        service: 'Переустановка Windows',
        date: 'август 2025 г.',
        platform: 'Google Maps',
        verified: true
    },
    {
        name: 'Елизавета Далбаева',
        rating: 5,
        text: 'Отличный сервис, лучшая работа! Отдала мой ноут на замену дисплея, чистку и замену памяти, оперативно выполнили и на следующий день написали, что ноутбук готов, я была удивлена, зная сложность выполнения (ожидала ремонт в несколько дней). Все качественно выполнено, буду рекомендовать всем друзьям!',
        service: 'Замена дисплея, чистка, апгрейд',
        date: '1 июля 2025 г.',
        platform: 'Яндекс Карты',
        verified: true
    },
    {
        name: 'Mo1se7',
        rating: 5,
        text: 'Ремонт выполнен профессионально. При приёмке внимательно осмотрели технику, сделали при мне фото моего ноутбука. Делали ремонт корпуса. При выдаче, так же всё показали, объяснив, как нужно получать технику из ремонта и на что следует обратить внимание. Предоставили гарантии. Весь ремонт обошелся в 85 рублей. Ничего сверхъестественного, просто хороший сервис.',
        service: 'Ремонт корпуса ноутбука',
        date: '21 апреля 2025 г.',
        platform: 'Яндекс Карты',
        verified: true
    },
    {
        name: 'Сабрина Ложкина',
        rating: 5,
        text: 'Приносила сюда свой компьютер на чистку. Всё сделали на высшем уровне! Ещё проконсультировали по поводу ноутбука, по его модернизации. Полностью довольна, всегда только к вам! Спасибо огромное!',
        service: 'Чистка компьютера, консультация',
        date: 'июль 2025 г.',
        platform: 'Google Maps',
        verified: true
    },
    {
        name: 'Александра Гладкая',
        rating: 5,
        text: `Отличный сервис! Быстро и качественно отремонтировали после того, как мы залили ноутбук чаем, при этом всё сделали супер. Порадовало отношение: общаются очень вежливо, а после ремонта проверили все функции ноутбука. Ноут стал как новый! Однозначно рекомендую этот сервис всем!!!! Спасибо за ваш труд, будем обращаться и советовать другим!😊`,
        service: 'Устранение неисправностей после залития',
        date: '8 июля 2025 г.',
        platform: 'Яндекс Карты',
        verified: true
    },
    {
        name: 'Никита Саусь',
        rating: 5,
        text: 'Отличная мастерская. Сдал свой ноутбук около 10:00, в обед мне позвонили и сказали, что и сколько стоит. Спасибо что согласовали. К вечеру сообщили о том что он готов и его можно забрать. Очень понравилось, что отправляют фото/видео отчёт о проделанной работе. Так же очень хорошее отношение персонала к клиенту.',
        service: 'Ремонт ноутбука',
        date: '8 июля 2025 г.',
        platform: 'Яндекс Карты',
        verified: true
    },
    {
        name: 'Эдвард Пислегин',
        rating: 5,
        text: 'Обращаюсь который раз. Нареканий нет. Делают хорошо, дело своё знают. Цены не задирают. Можно обращаться. Нормальные люди!',
        service: 'Многократное обслуживание',
        date: 'июль 2025 г.',
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
            <h3 className="text-3xl font-bold mb-4">Позвоните или напишите сейчас!</h3>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Присоединяйтесь к сотням довольных клиентов.
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