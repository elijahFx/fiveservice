import { Star, MessageSquare } from 'lucide-react';

const ReviewsHero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-600 to-navy-800 text-white pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mr-2 sm:mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold">
            Отзывы клиентов
          </h1>
        </div>
        
        <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
          Мы гордимся доверием наших клиентов и стремимся поддерживать 
          высокие стандарты качества обслуживания
        </p>

        <div className="flex items-center justify-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="ml-4 text-3xl font-bold">5.0</span>
          <span className="ml-2 text-lg text-gray-300">из 5.0</span>
        </div>
      </div>
    </section>
  );
};

export default ReviewsHero;