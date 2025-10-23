'use client';

const DiagnosticPricePage = () => {
  return (
    <div className="min-h-screen bg-white py-8 mt-[11vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Платная ли диагностика?
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Диагностика — 55 BYN. При согласии на ремонт не оплачивается. 
            Диагностика может длиться до 2 дней, при сложных и «плавающих» дефектах требуется больше времени.
            Есть услуга срочной диагностики.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticPricePage;