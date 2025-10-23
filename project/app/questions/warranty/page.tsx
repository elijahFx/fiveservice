'use client';

const WarrantyPage = () => {
  return (
    <div className="min-h-screen bg-white py-8 mt-[11vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Какая гарантия на ремонт?
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Официальная гарантия от 4 до 12 месяцев на выполненные работы и установленные детали. Условия фиксируются в гарантийном талоне/акте.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarrantyPage;