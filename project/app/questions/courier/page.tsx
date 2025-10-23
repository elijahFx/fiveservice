'use client';

const CourierPage = () => {
  return (
    <div className="min-h-screen bg-white py-8 mt-[11vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Есть ли бесплатный курьер по Минску?
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Да. Заберём устройство и привезём обратно после ремонта. Удобно и быстро.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourierPage;