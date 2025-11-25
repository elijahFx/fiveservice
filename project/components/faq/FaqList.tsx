"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import CallbackModal from "../modal/CallbackModal";

const FaqList = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "За сколько времени сделаете ремонт?",
      answer:
        "Часто — в течение 1–3 дней. Сложные случаи (пайка, BGA, редкие запчасти) — 2–5 дней. Все сроки действительны при наличии комплектующих. Срочный ремонт возможен по согласованию. В таком случае ремонт выполняется в течение 24 часов.",
    },
    {
      question: "Какая гарантия на ремонт?",
      answer:
        "Мы предоставляем гарантию от 4 месяцев на выполненные работы и до 12 месяцев на установленные запчасти в соответствии с СТБ. Гарантийные условия прописываются в договоре.",
    },
    {
      question: "Сколько стоит диагностика?",
      answer:
        "Диагностика платная и составляет от 15 до 25 BYN в зависимости от сложности. При согласии на ремонт стоимость диагностики засчитывается в общую сумму ремонта.",
    },
    {
      question: "Используете ли вы оригинальные запчасти?",
      answer:
        "Мы предлагаем как оригинальные запчасти, так и качественные сертифицированные аналоги. Для критически важных компонентов рекомендуем оригинальные детали, для остальных случаев — качественные аналоги по более доступной цене.",
    },
    {
      question: "Можно ли отремонтировать залитый ноутбук?",
      answer:
        "Да, мы специализируемся на ремонте залитой техники. Важно как можно быстрее обратиться к нам и не пытаться включать устройство. Чем быстрее начнется профессиональная чистка, тем больше шансов на успешное восстановление.",
    },
    {
      question: "Выезжаете ли на дом или в офис?",
      answer:
        "Да, мы предоставляем услугу курьерской доставки. Курьер может забрать ваш ноутбук и доставить его обратно после ремонта. Стоимость услуги зависит от района и обговаривается отдельно.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
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
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
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

        {/* Contact Section */}
        <div className="mt-16">
          <div className="bg-navy-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом, и наши мастера ответят на
              все ваши вопросы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+375297349077"
                className="inline-flex items-center px-8 py-4 bg-white text-navy-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                +375 29 734 90 77
              </a>
              <a
                href="https://t.me/fiveservice_by"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Telegram
              </a>
              <a
                href="viber://add?number=375447534796"
                className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Viber
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-navy-600 transition-colors"
              >
                Оставить заявку
              </button>
              {isModalOpen && (
                <CallbackModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqList;
