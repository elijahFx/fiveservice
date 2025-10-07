import { Phone, Search, FileCheck, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function BuybackSteps() {
  const steps = [
    {
      icon: Phone,
      number: '1',
      title: 'Свяжитесь с нами',
      description: 'Опишите состояние ноутбука (например, «Не включается после падения» или «Залит водой»).',
      details: 'Мы расскажем, сколько ориентировочно можно получить за устройство, и согласуем удобное время для вас время передачи.'
    },
    {
      icon: Search,
      number: '2',
      title: 'Диагностика и оценка',
      description: 'Мастер проведёт осмотр и определит точную стоимость.',
      details: 'Вы получите честную оценку без скрытых платежей.'
    },
    {
      icon: FileCheck,
      number: '3',
      title: 'Документальное оформление',
      description: 'Заключаем договор, для того, чтобы вы имели официальные гарантии получения средств и их легальное происхождение.',
      details: ''
    },
    {
      icon: CreditCard,
      number: '4',
      title: 'Оплата',
      description: 'После оформления, вы получаете деньги наличными или на карту.',
      details: ''
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Как происходит скупка ноутбуков?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-navy-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {step.number}
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-navy-50 rounded-xl mb-6 mx-auto mt-4">
                <step.icon className="w-8 h-8 text-navy-600" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-3 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {step.description}
              </p>
              {step.details && (
                <p className="text-gray-500 text-sm">
                  {step.details}
                </p>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-lg">
          <p className="text-gray-900 font-medium">
            <span className="font-bold">К тому же: </span>
            Для студентов и пенсионеров действует скидка 20% на последующий ремонт и апгрейд техники, если вы решите обновить новое устройство или решите отремонтировать старое вместо продажи.
          </p>
        </div>
      </div>
    </section>
  );
}
