'use client';

const OnSiteRepairPage = () => {
  return (
    <div className="min-h-screen bg-white py-8 mt-[11vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Выезжаете ли на дом или офис?
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Нет. На дому невозможно выполнить профессиональный ремонт техники. Для сложных работ нужна лаборатория. На выезде - первичная оценка или забор курьером.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnSiteRepairPage;