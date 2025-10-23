'use client';

const OverheatingPage = () => {
  return (
    <div className="min-h-screen bg-white py-8 mt-[11vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Греется и шумит - это опасно?
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Да, перегрев приводит к деградации чипов. Рекомендуем чистку системы охлаждения, замену термопасты и термопрокладок, тест под нагрузкой. Чистка ноутбука по прайсу - 75/125/195 BYN (в зависимости от класса устройства). Каждую субботу действует постоянная акция -30% от прайса.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverheatingPage;