import { Users, Award, Heart } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-600 to-navy-800 text-white pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-400 rounded-2xl mr-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              О нас
            </h1>
          </div>
          
          <p className="text-xl text-gray-200 leading-relaxed mb-8">
            Оправдать доверие людей, которые обращаются к тебе за помощью, это, наверное, одно из самых достойных чувств, которые может испытывать уважающая себя личность.
— Директор сервисного центра «Five Service»
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold mb-2">13 лет</div>
              <div className="text-gray-300">опыта работы</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold mb-2">25.000+</div>
              <div className="text-gray-300">довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold mb-2">5.0</div>
              <div className="text-gray-300">средняя оценка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;