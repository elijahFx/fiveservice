import { Card } from '@/components/ui/card';

export default function BuybackPricing() {
  const pricingData = [
    {
      condition: 'Рабочий, но устаревший',
      price: '50–150 BYN'
    },
    {
      condition: 'Нерабочий, но с ценными запчастями (например, матрица, процессор)',
      price: '20–100 BYN'
    },
    {
      condition: 'Разбитый или залитый',
      price: '10–50 BYN'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Цена на скупку
        </h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-navy-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Состояние ноутбука
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Примерная цена (BYN)
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-6 py-4 text-gray-900">
                      {item.condition}
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
}
