'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const QuestionsList = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "За сколько времени сделаете ремонт?",
      answer: "Часто — в течение 1–3 дней. Сложные случаи (пайка, BGA, редкие запчасти) — 2–5 дней. Все сроки действительны при наличии комплектующих. Срочный ремонт возможен по согласованию. В таком случае ремонт выполняется в течение 24 часов."
    }
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2"
                aria-expanded={openItems.includes(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-navy-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-navy-600" />
                  )}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems.includes(index) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed pt-4">
                    {item.answer}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestionsList;