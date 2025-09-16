import { HelpCircle } from 'lucide-react';

const QuestionsHero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-600 to-navy-800 text-white pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <HelpCircle className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mr-2 sm:mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold">
            Частые вопросы
          </h1>
        </div>
        
        <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
          На этой странице можно найти ответы на частые вопросы про ремонт ноутбуков 
          или задать свой вопрос нашему мастеру
        </p>
      </div>
    </section>
  );
};

export default QuestionsHero;