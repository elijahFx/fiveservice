import { CheckCircle } from 'lucide-react';

const HowWeWork = () => {
  const steps = [
    {
      number: 1,
      title: 'Заявка и приём',
      description: 'Оставляете заявку на сайте или по телефону. Курьер забирает устройство или привозите сами.'
    },
    {
      number: 2,
      title: 'Диагностика и смета',
      description: 'Проверяем железо и ПО. Объясняем проблему и согласуем стоимость до начала ремонта.'
    },
    {
      number: 3,
      title: 'Ремонт и тестирование',
      description: 'Меняем детали, чистим и настраиваем. Тестируем под нагрузкой, чтобы проверить стабильность работы.'
    },
    {
      number: 4,
      title: 'Выдача и гарантия',
      description: 'Отдаём устройство с актом и гарантийным талоном. Можем доставить курьером по Минску.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Как мы работаем
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Простой и прозрачный процесс ремонта от заявки до выдачи готового устройства
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="flex items-center justify-center w-20 h-20 bg-navy-600 rounded-full mx-auto mb-4 group-hover:bg-navy-700 transition-colors duration-300">
                  <span className="text-white font-bold text-2xl">{step.number}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;