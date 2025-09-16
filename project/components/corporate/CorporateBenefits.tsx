import { CheckCircle, TrendingUp, DollarSign, Clock } from 'lucide-react';

const CorporateBenefits = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Надежность',
      description: 'Минимизация простоев техники благодаря качественному ремонту и профилактике'
    },
    {
      icon: TrendingUp,
      title: 'Эффективность',
      description: 'Увеличение производительности сотрудников за счет исправно работающей техники'
    },
    {
      icon: DollarSign,
      title: 'Экономия',
      description: 'Снижение затрат на IT-обслуживание благодаря корпоративным скидкам'
    },
    {
      icon: Clock,
      title: 'Оперативность',
      description: 'Быстрое реагирование на заявки и приоритетное обслуживание'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Преимущества корпоративного обслуживания
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-navy-100 rounded-2xl mx-auto mb-6 hover:bg-navy-600 hover:scale-110 transition-all duration-300 group">
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

export default CorporateBenefits;