'use client';

const ScreenRepairPage = () => {
  return (
    <div className="min-h-screen bg-white py-8 mt-[11vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Экран треснул или мерцает - что делать?
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Трещины - только замена матрицы. Мерцание или полосы - проверим шлейф, подсветку, видеочип. Дадим точный вердикт после диагностики. Работа по замене - от 130 BYN + стоимость матрицы.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreenRepairPage;