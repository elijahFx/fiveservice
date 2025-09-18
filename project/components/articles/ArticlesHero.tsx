import { BookOpen } from "lucide-react";

const ArticlesHero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-600 to-navy-800 text-white pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mr-2 sm:mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold">Полезные статьи</h1>
        </div>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Изучайте полезные материалы о ремонте и обслуживании ноутбуков от
          наших экспертов с многолетним опытом
        </p>
      </div>
    </section>
  );
};

export default ArticlesHero;
