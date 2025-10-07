'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Masters = () => {
  const masters = [
    {
      name: 'Антон',
      position: 'Инженер по ноутбукам',
      experience: '10 лет опыта. Материнские платы и разъёмы',
      initials: 'А',
      src: "/fgs1_1_1.webp"
    },
    {
      name: 'Павел',
      position: 'Главный инженер',
      experience: '13 лет опыта. Сложная пайка, BGA',
      initials: 'П',
      src: "/fgs1_1_1_1.webp"
    },
    {
      name: 'Александр',
      position: 'Техник',
      experience: 'Приём, тестирование и выдача техники',
      initials: 'А',
      src: "/site_sasha_l2.webp"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши мастера
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Команда опытных специалистов, которые профессионально решают любые проблемы с вашей техникой
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {masters.map((master, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300 bg-white">
              {/* Avatar with Image */}
              <div className="flex justify-center mb-6">
                <Avatar className="w-24 h-24 border-4 border-navy-100">
                  <AvatarImage 
                    src={master.src} 
                    alt={master.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-navy-600 text-white text-xl font-bold">
                    {master.initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {master.name}
              </h3>
              
              <p className="text-navy-600 font-medium mb-4">
                {master.position}
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                {master.experience}
              </p>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Masters;