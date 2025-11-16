"use client";

import { Award, Clock, Shield, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, lazy, Suspense } from "react";

// Ленивая загрузка CallbackModal
const CallbackModal = lazy(() => import("@/components/modal/CallbackModal"));

// Fallback для модального окна
const ModalFallback = () => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-md mx-4">
      <div className="flex justify-center mb-4">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-center text-gray-600">Загрузка формы...</p>
    </div>
  </div>
);

const Benefits = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  const handleOpenCallbackModal = () => {
    setIsCallbackModalOpen(true);
  };

  const handleCloseCallbackModal = () => {
    setIsCallbackModalOpen(false);
  };

  const benefits = [
    {
      icon: Award,
      title: "Чиним ноутбуки 13 лет",
      description: "Обслужили 25.000 клиентов. Средняя оценка по отзывам — 5,0",
    },
    {
      icon: Clock,
      title: "Быстрый ремонт",
      description:
        "Большинство ремонтов выполняем за 1-3 дня. Делаем срочный ремонт за 24 часа",
    },
    {
      icon: Shield,
      title: "Гарантия",
      description: "Даём акт и официальную гарантию до 12 месяцев",
    },
    {
      icon: Heart,
      title: "Социальный сервис",
      description:
        "Скидки для пенсионеров и студентов — 20%; для новых клиентов — 10%",
    },
  ];

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Мы гордимся качеством наших услуг и стремимся превзойти ожидания
              каждого клиента
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center w-20 h-20 bg-navy-100 rounded-2xl mx-auto mb-6 group-hover:bg-navy-600 group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="w-10 h-10 text-navy-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Готовы доверить ремонт профессионалам?
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-lg mx-auto">
                Оставьте заявку и получите бесплатную консультацию по ремонту
                вашего устройства
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleOpenCallbackModal}
                  size="lg"
                  className="bg-navy-600 hover:bg-navy-700 px-8 py-4 text-lg min-h-[60px]"
                >
                  🖍 Оставить заявку
                </Button>
                <a
                  href="tel:+375297349077"
                  className="inline-flex items-center justify-center border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors min-h-[60px]"
                >
                  📞 Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно */}
      {isCallbackModalOpen && (
        <Suspense fallback={<ModalFallback />}>
          <CallbackModal
            isOpen={isCallbackModalOpen}
            onClose={handleCloseCallbackModal}
          />
        </Suspense>
      )}
    </>
  );
};

export default Benefits;
