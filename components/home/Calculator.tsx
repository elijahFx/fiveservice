'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator as CalcIcon, Phone } from 'lucide-react';

const Calculator = () => {
  const [selectedService, setSelectedService] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const services: { value: string; label: string; basePrice: number }[] = [];

  const calculatePrice = () => {
    if (!selectedService) return;

    const service = services.find(s => s.value === selectedService);

    if (service) {
      const price = service.basePrice;
      setEstimatedPrice(price);
    }
  };

  return (
    <section className="py-20 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Онлайн-диагностика
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Узнайте в чём может быть проблема онлайн
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Диагностика неисправности</h3>
            </div>

            <div>
              <Label htmlFor="service" className="text-base font-medium">Шаг 1: Какая основная проблема с вашим ноутбуком?</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Выберите проблему" />
                </SelectTrigger>
                <SelectContent>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={calculatePrice}
              className="w-full bg-navy-600 hover:bg-navy-700 text-lg py-6"
              disabled={!selectedService}
            >
              Далее
            </Button>

            {estimatedPrice && (
              <div className="bg-navy-50 p-6 rounded-lg text-center border-2 border-navy-200">
                <p className="text-lg text-gray-800 mb-2 font-medium">Примерная стоимость:</p>
                <p className="text-3xl font-bold text-navy-600">{estimatedPrice} BYN</p>
                <p className="text-sm text-gray-700 mt-2">
                  * Точная стоимость определяется после диагностики
                </p>
                
                <div className="mt-4 space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Phone className="w-4 h-4 mr-2" />
                    <a href="tel:+375297349077">Заказать ремонт</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Calculator;