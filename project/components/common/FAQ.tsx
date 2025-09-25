'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

const FAQ = () => {
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
      answer: "Часто — в течение 1–3 дней. Сложные случаи (пайка, BGA, редкие запчасти) — 2–5 дней. Все сроки действительны при наличии комплектующих. Срочный ремонт возможен по согласованию."
    },
    {
      question: "Какая гарантия на ремонт?",
      answer: "Мы предоставляем гарантию от 4 месяцев на выполненные работы и до 12 месяцев на установленные запчасти в соответствии с СТБ. Гарантийные условия прописываются в договоре."
    },
    {
      question: "Сколько стоит диагностика?",
      answer: "Диагностика платная и составляет от 15 до 25 BYN в зависимости от сложности. При согласии на ремонт стоимость диагностики засчитывается в общую сумму ремонта."
    },
    {
      question: "Используете ли вы оригинальные запчасти?",
      answer: "Мы предлагаем как оригинальные запчасти, так и качественные сертифицированные аналоги. Для критически важных компонентов рекомендуем оригинальные детали."
    },
    {
      question: "Можно ли отремонтировать залитый ноутбук?",
      answer: "Да, мы специализируемся на ремонте залитой техники. Важно как можно быстрее обратиться к нам и не пытаться включать устройство. Чем быстрее начнется профессиональная чистка, тем больше шансов на успешное восстановление."
    },
    {
      question: "Выезжаете ли на дом или в офис?",
      answer: "Да, мы предоставляем услугу курьерской доставки. Курьер может забрать ваш ноутбук и доставить его обратно после ремонта. Стоимость услуги зависит от района и обговаривается отдельно."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о ремонте ноутбуков
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2 rounded-lg"
                aria-expanded={openItems.includes(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4 leading-relaxed">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-navy-600 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-navy-600 transition-transform duration-200" />
                  )}
                </div>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems.includes(index) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
                aria-hidden={!openItems.includes(index)}
              >
                <div className="px-6 pb-5 border-t border-gray-100">
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

export default FAQ;