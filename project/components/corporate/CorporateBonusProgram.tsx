import { Gift } from 'lucide-react';
import { Card } from '@/components/ui/card';

const CorporateBonusProgram = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Бонусная программа для работников организаций
          </h2>
          
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed">
              Даем вашим сотрудникам скидку 
              <span className="text-navy-600 font-bold"> 30% </span>
              на ремонт личных ноутбуков
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CorporateBonusProgram;