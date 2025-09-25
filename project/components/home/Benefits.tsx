import { Award, Clock, Shield, Users, Heart } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Чиним ноутбуки 13 лет',
      description: 'Обслужили 25.000 клиентов. Средняя оценка по отзывам — 5,0'
    },
    {
      icon: Clock,
      title: 'Быстрый ремонт',
      description: 'Большинство ремонтов выполняем за 1-3 дня. Делаем срочный ремонт за 24 часа'
    },
    {
      icon: Shield,
      title: 'Гарантия',
      description: 'Даём акт и официальную гарантию до 12 месяцев'
    },
    {
      icon: Heart,
      title: 'Социальный сервис',
      description: 'Скидки для пенсионеров и студентов — 20%; для новых клиентов — 10%'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы гордимся качеством наших услуг и стремимся превзойти ожидания каждого клиента
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="flex items-center justify-center w-20 h-20 bg-navy-100 rounded-2xl mx-auto mb-6 group-hover:bg-navy-600 group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="w-10 h-10 text-navy-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;