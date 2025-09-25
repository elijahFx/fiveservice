import { 
  Laptop, 
  Keyboard, 
  Monitor, 
  Zap, 
  Droplets, 
  Battery, 
  Brush, 
  Cpu, 
  Hammer 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const Services = () => {
  const discountOffers = [
    {
      title: 'Скидка -10% при первом обращении к нам',
      description: 'Скидка на работы сервиса. Фиксируем в заказ-подряде.',
      discount: '-10%'
    },
    {
      title: 'Скидка -20% студентам и пенсионерам',
      description: 'Укажите основание при оформлении заявки.',
      discount: '-20%'
    },
    {
      title: 'Скидка -30% на чистку ноутбука или ПК по субботам',
      description: 'Профилактика, термопаста/прокладки, тест под нагрузкой.',
      discount: '-30%'
    }
  ];

  const services = [
    {
      name: 'Ремонт ноутбука',
      icon: Laptop,
      description: 'Ремонт любых неисправностей ноутбука'
    },
    {
      name: 'Замена клавиатуры',
      icon: Keyboard,
      description: 'Залипают или не работают клавиши — заменим клавиатуру или шлейф'
    },
    {
      name: 'Замена экрана',
      icon: Monitor,
      description: 'Трещины, полосы или нет подсветки — подберём и заменим матрицу'
    },
    {
      name: 'Разъём питания',
      icon: Zap,
      description: 'Плохой контакт и не заряжает — заменим DC-jack и усилим крепление'
    },
    {
      name: 'После залития',
      icon: Droplets,
      description: 'Мойка платы, удаление окислов, восстановление дорожек'
    },
    {
      name: 'Замена аккумулятора',
      icon: Battery,
      description: 'Быстро садится или не заряжается — подберём и установим АКБ'
    },
    {
      name: 'Чистка системы',
      icon: Brush,
      description: 'Чистка, термопаста/прокладки, проверка температур'
    },
    {
      name: 'Ремонт платы / пайка',
      icon: Cpu,
      description: 'Диагностика питания, реболл, восстановление цепей и BGA'
    },
    {
      name: 'Ремонт корпуса',
      icon: Hammer,
      description: 'Сломаны петли/крепления, трещины — восстановим или заменим элемент'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши услуги
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ремонтируем ноутбуки любых производителей — ASUS, Acer, Lenovo, HP, Dell, MSI, Apple, Huawei, Samsung
          </p>
        </div>

        {/* Discount Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {discountOffers.map((offer, index) => (
            <Card key={index} className="p-6 bg-navy-600 text-white border-navy-700 hover:bg-navy-700 transition-all duration-300 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 leading-tight">
                    {offer.title}
                  </h3>
                </div>
                <div className="ml-4">
                  <Badge className="bg-white text-navy-600 font-bold text-lg px-3 py-1 hover:bg-gray-100">
                    {offer.discount}
                  </Badge>
                </div>
              </div>
              <p className="text-navy-100 leading-relaxed">
                {offer.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Service Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex items-center p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-navy-50 hover:border-navy-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Узнать больше о услуге: ${service.name}`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl mr-4 group-hover:bg-navy-600 group-hover:scale-110 transition-all duration-300 shadow-sm">
                <service.icon 
                  className="w-6 h-6 text-navy-600 group-hover:text-white transition-colors duration-300" 
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-navy-700 transition-colors duration-300 mb-1">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-navy-600 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
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