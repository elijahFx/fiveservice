const ReviewsStats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-navy-600 mb-2">847</div>
              <div className="text-lg font-semibold text-gray-900">Всего отзывов</div>
              <div className="text-sm text-gray-600">за последний год</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-lg font-semibold text-gray-900">Положительных</div>
              <div className="text-sm text-gray-600">рекомендуют нас</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24ч</div>
              <div className="text-lg font-semibold text-gray-900">Среднее время</div>
              <div className="text-sm text-gray-600">ответа на отзыв</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsStats;