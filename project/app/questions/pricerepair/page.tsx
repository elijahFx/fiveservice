'use client';

const PriceRepairPage = () => {
  return (
    <div className="min-h-screen bg-white py-8 mt-[11vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Сколько стоит ремонт ноутбука?
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Ориентиры по прайсу: чистка ноутбука — 75 / 125 / 195 BYN (Standard / Gaming / Extreme Pro); 
            установка ОС — 60 BYN; чистка от вирусов — 60 BYN; копирование данных — 35 BYN; 
            замена матрицы — 130 BYN без стоимости детали. Точную сумму озвучиваем после диагностики модели и дефекта.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceRepairPage;