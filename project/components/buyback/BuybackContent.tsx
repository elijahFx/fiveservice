import { Laptop, DollarSign, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function BuybackContent() {
  const reasons = [
    {
      icon: Laptop,
      title: 'Мы принимаем ноутбуки в любом состоянии',
      description: 'Рабочие, нерабочие, разбитые, залитые или сломанные устройства — всё пойдет на запчасти или вторсырьё.',
      example: 'Даже если ваш ноутбук не включается или имеет треснувший корпус, мы оценим его стоимость и предложим выгодные условия.'
    },
    {
      icon: DollarSign,
      title: 'Честная и прозрачная оценка',
      description: 'Перед сделкой вы получите примерную цену по телефону, чтобы избежать неожиданностей.',
      example: 'Цена зависит от модели, состояния и наличия повреждений (например, залитие жидкостью или неисправность материнской платы).'
    },
    {
      icon: FileText,
      title: 'Гарантии и документы',
      description: 'Мы заключаем с вами Договор, даже если вы просто отдаёте технику за бесплатно - хотите от неё избавиться.',
      example: ''
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Почему стоит выбрать Five Service:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-navy-600 rounded-xl mb-6 mx-auto">
                <reason.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {reason.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {reason.description}
              </p>
              {reason.example && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Пример: </span>
                    {reason.example}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
