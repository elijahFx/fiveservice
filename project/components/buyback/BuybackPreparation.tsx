import { Trash2, Package, CircleAlert as AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function BuybackPreparation() {
  const preparationSteps = [
    {
      icon: Trash2,
      title: 'Очистите данные',
      items: [
        'Удалите личную информацию через переустановку ОС или специальные программы (например, Darik\'s Boot and Nuke).',
        'Разлогиньтесь из аккаунтов (Google, Apple ID, Microsoft).'
      ]
    },
    {
      icon: Package,
      title: 'Соберите комплектацию',
      items: [
        'Сдайте ноутбук с блоком питания, документами и коробкой.',
        'Укажите, какие детали повреждены (например, треснувший экран или неисправная клавиатура).'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Опишите неисправность',
      items: [
        'Чем точнее вы укажете проблему, тем быстрее мастер оценит устройство.',
        'Например: «Не включается после падения» или «Залит кофе, работает, но греется».'
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Как подготовить ноутбук к продаже?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {preparationSteps.map((step, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-navy-600 rounded-xl mb-6 mx-auto">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4 text-center">
                {step.title}
              </h3>
              <ul className="space-y-3">
                {step.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-navy-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
