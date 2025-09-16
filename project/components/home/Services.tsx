import { Monitor, HardDrive, Keyboard, Zap, Shield, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: 'Замена экранов',
      description: 'Замена разбитых и неисправных матриц любых размеров и разрешений',
      price: 'от 80 BYN',
      time: '1-2 дня'
    },
    {
      icon: HardDrive,
      title: 'Чистка от пыли',
      description: 'Профессиональная чистка системы охлаждения и замена термопасты',
      price: 'от 75 BYN',
      time: '2-3 часа'
    },
    {
      icon: Keyboard,
      title: 'Замена клавиатур',
      description: 'Замена неисправных клавиатур с подбором точных аналогов',
      price: 'от 45 BYN',
      time: '1 день'
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши услуги
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Профессиональный ремонт ноутбуков любой сложности с использованием 
            качественных комплектующих и современного оборудования
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-center w-16 h-16 bg-navy-100 rounded-xl mb-4 group-hover:bg-navy-600 group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-8 h-8 text-navy-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Цена</p>
                  <p className="font-bold text-navy-600">{service.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Срок</p>
                  <p className="font-bold text-gray-900">{service.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-navy-600 text-white font-semibold rounded-lg hover:bg-navy-700 transition-colors duration-300 shadow-lg"
          >
            Все услуги и цены
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;