'use client';

const RepairTimePage = () => {
  return (
    <div className="min-h-screen bg-white py-8 mt-[11vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          За сколько времени сделает ремонт?
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Часто — в течение 1–3 дней. Сложные случаи (пайка, BGA, редкие запчасти) - 2–5 дней. Все сроки действительны при наличии комплектующих. Срочный ремонт возможен по согласованию. В таком случае ремонт выполняется в течение 24 часов.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepairTimePage;