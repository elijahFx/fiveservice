'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const FAQ = ({ special_questions = [] }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const defaultFaqItems = [
    {
      question: "Сколько стоит ремонт ноутбука?",
      answer: (
        <>
          Ориентиры по прайсу: чистка ноутбука — 75 / 125 / 195 BYN (Standard / Gaming / Extreme Pro); установка ОС — 60 BYN; чистка от вирусов — 60 BYN; копирование данных — 35 BYN; замена матрицы — 130 BYN без стоимости детали. Точную сумму озвучиваем после диагностики модели и дефекта.
          <br /><br />
          Полный перечень работ смотрите на странице <Link href="/services" scroll={true} className="text-navy-600 hover:text-navy-700 underline font-medium">Услуги</Link>.
        </>
      )
    },
    {
      question: "Ноутбук греется и шумит - это опасно?",
      answer: "Да, перегрев приводит к деградации чипов. Рекомендуем чистку системы охлаждения, замену термопасты и термопрокладок, тест под нагрузкой. Чистка ноутбука по прайсу — 75/125/195 BYN (в зависимости от класса устройства). Каждую субботу действует постоянная акция −30% от прайса."
    },
    {
      question: "Что делать, если ноутбук не включается?",
      answer: "Проверяем питание, АКБ, зарядник, затем линию дежурных напряжений и плату. Возможен ремонт на компонентном уровне или замена узла. Итоговая смета — после диагностики."
    },
    {
      question: "Экран треснул или мерцает - что делать?",
      answer: "Трещины — только замена матрицы. Мерцание или полосы — проверим шлейф, подсветку, видеочип. Дадим точный вердикт после диагностики. Работа по замене — от 130 BYN + стоимость матрицы."
    },
    {
      question: "Залили ноутбук. Что делать прямо сейчас?",
      answer: "Срочно: отключите питание, не сушите феном, не пытайтесь включать. Несите на профессиональную мойку и восстановление — так повышаются шансы и снижается стоимость.",
      href: "/services/liquiddamage"
    },
    {
      question: "Как быстро почините клавиатуру?",
      answer: "В большинстве случаев заменим день в день."
    }
  ];

  // Используем special_questions если они есть, иначе defaultFaqItems
  const faqItems = special_questions && special_questions.length > 0 
    ? special_questions 
    : defaultFaqItems;

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
                  <div className="text-gray-700 leading-relaxed pt-4">
                    {item.answer}
                  </div>
                  {item.href && (
                    <Link href={item.href} scroll={true} className="text-blue-400 mt-2 hover:text-blue-500 block">
                      Узнать больше
                    </Link>
                  )}
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