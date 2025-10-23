'use client';

const DataSafetyPage = () => {
  return (
    <div className="min-h-screen bg-white py-8 mt-[11vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Сохранятся ли мои данные на диске?
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Да, в 99% случаев. Работы с платой или системой охлаждения не затрагивают SSD/HDD. 
            По запросу сделаем резервную копию перед началом работ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataSafetyPage;