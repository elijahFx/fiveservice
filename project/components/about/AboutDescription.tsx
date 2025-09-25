import { CheckCircle, Target, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AboutDescription = () => {
  const principles = [
    {
      icon: Target,
      title: 'Высокие стандарты качества',
      description: 'Мы устанавливаем планку качества выше рыночных стандартов'
    },
    {
      icon: Shield,
      title: 'Порядочность и добросовестность',
      description: 'Основа нашей политики — честность во всех аспектах работы'
    },
    {
      icon: CheckCircle,
      title: 'Постоянное развитие',
      description: 'Мы непрерывно совершенствуем наши методы и подходы'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              FiveService — уникальный сервис с высокой планкой качества
            </h2>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <div className="text-xl text-gray-700 leading-relaxed space-y-6">
              <p>
                <strong>FiveService</strong> — это постоянно развивающийся сервисный центр со своей философией 
                и принципами порядочности. Мы не просто ремонтируем технику, мы создаем долгосрочные 
                отношения с нашими клиентами, основанные на доверии и профессионализме.
              </p>
              
              <p>
                К подбору специалистов мы предъявляем особые требования: помимо высоких технических 
                навыков, каждый сотрудник должен обладать безупречными морально-нравственными устоями. 
                Это позволяет нам гарантировать не только качественный ремонт, но и честное, 
                порядочное отношение к каждому клиенту.
              </p>
              
              <p>
                Сегодня мы занимаем <strong>лидирующие позиции в Минске по сложным ремонтам</strong>, 
                включая восстановление после залития, пайку материнских плат, BGA-ремонт и другие 
                высокотехнологичные услуги. Наша репутация строится на результатах — более 25.000 
                успешно отремонтированных устройств за 13 лет работы.
              </p>
              
              <p>
                <strong>Основа нашей политики — порядочность и добросовестность.</strong> Мы никогда 
                не навязываем ненужные услуги, всегда предоставляем честную диагностику и справедливые 
                цены. Каждый ремонт выполняется с гарантией качества и полной ответственностью за результат.
              </p>
            </div>
          </div>

          {/* Principles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center justify-center w-16 h-16 bg-navy-100 rounded-2xl mx-auto mb-4 group-hover:bg-navy-600 group-hover:scale-110 transition-all duration-300">
                  <principle.icon className="w-8 h-8 text-navy-600 group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {principle.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDescription;