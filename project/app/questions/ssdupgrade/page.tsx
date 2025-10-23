'use client';

const SsdUpgradePage = () => {
  return (
    <div className="min-h-screen bg-white py-8 mt-[11vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Ноутбук тормозит - поможет ли SSD?
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Да, переход на SSD ускоряет загрузку и работу в 3–5 раз. Установим SSD, перенесём систему и данные. Установка ОС - 60 BYN; перенос данных рассчитываем по объёму (минимум 35 BYN).
          </p>
        </div>
      </div>
    </div>
  );
};

export default SsdUpgradePage;