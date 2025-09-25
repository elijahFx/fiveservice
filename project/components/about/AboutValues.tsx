import { Users, Wrench, Lightbulb, Truck, CreditCard, Phone, Calendar, Laptop, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AboutValues = () => {
  const values = [
    {
      icon: Users,
      title: 'Сервис для клиентов',
      description: 'Курьер по Минску, удобные способы оплаты, бесплатные консультации, предварительная запись на ремонт. Помогаем с выбором новой техники, собираем ПК под задачи и выполняем срочные ремонты — всегда оперативно и прозрачно.',
      bgColor: 'bg-navy-50',
      iconColor: 'bg-navy-600',
      borderColor: 'border-navy-200'
    },
    {
      icon: Wrench,
      title: 'Профессиональные сотрудники',
      description: 'Люди — основа сервиса. У нас работают специалисты, увлечённые своим делом и делающие всё на совесть: высокий профессионализм подкреплён моральными принципами и ответственностью за результат.',
      bgColor: 'bg-navy-50',
      iconColor: 'bg-navy-600',
      borderColor: 'border-navy-200'
    },
    {
      icon: Lightbulb,
      title: 'Инновации и развитие',
      description: 'Постоянно обновляем техническую базу и инструменты, внедряем эффективные методики ремонта и тестирования. Держим руку на пульсе технологий, чтобы решать сложные задачи быстрее и качественнее.',
      bgColor: 'bg-navy-50',
      iconColor: 'bg-navy-600',
      borderColor: 'border-navy-200'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши ценности
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Три основных принципа, которые определяют нашу работу и отношение к клиентам
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className={`p-8 ${value.bgColor} ${value.borderColor} border-2 hover:shadow-xl transition-all duration-300 group h-full`}>
              <div className="text-center mb-6">
                <div className={`flex items-center justify-center w-16 h-16 ${value.iconColor} rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                
                <p className="text-gray-700 font-medium">
                  {value.description}
                </p>
              </div>

              {value.features && (
                <div className="space-y-3">
                  {value.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full mr-3 shadow-sm">
                        <feature.icon className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-gray-700 font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-navy-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Почему клиенты выбирают именно нас?
            </h3>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Мы объединяем профессионализм, честность и инновации, чтобы предоставить 
              вам лучший сервис по ремонту техники в Минске. Каждый день мы работаем 
              над тем, чтобы превзойти ваши ожидания.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutValues;