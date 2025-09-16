import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Reviews = () => {
  const reviews = [
    {
      name: 'Александр К.',
      rating: 5,
      text: 'Отличный сервис! Быстро заменили экран на моем HP. Работает как новый. Рекомендую!',
      service: 'Замена экрана',
      date: '2 недели назад'
    },
    {
      name: 'Мария С.',
      rating: 5,
      text: 'Профессиональная чистка ноутбука. Перестал шуметь и греться. Спасибо за качественную работу!',
      service: 'Чистка от пыли',
      date: '1 месяц назад'
    },
    {
      name: 'Дмитрий В.',
      rating: 5,
      text: 'Восстановили данные с поврежденного диска. Думал все потеряно, но ребята справились. Супер!',
      service: 'Восстановление данных',
      date: '3 недели назад'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы ценим каждого клиента и стремимся к максимальному качеству обслуживания
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 relative">
              <Quote className="w-8 h-8 text-navy-200 absolute top-4 right-6" />
              
              <div className="flex items-center mb-4">
                <Avatar className="mr-3">
                  <AvatarFallback className="bg-navy-100 text-navy-600 font-semibold">
                    {review.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                "{review.text}"
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-sm text-navy-600 font-medium">
                  {review.service}
                </span>
                <span className="text-sm text-gray-500">
                  {review.date}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-navy-50 rounded-xl p-8 inline-block">
            <div className="flex items-center justify-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-3 text-2xl font-bold text-navy-600">4.9</span>
            </div>
            <p className="text-gray-700 font-medium">Средняя оценка на основе 312 отзывов</p>
            <div className="mt-6">
              <Link href="/reviews">
                <Button className="bg-navy-600 hover:bg-navy-700">
                  Все отзывы
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;