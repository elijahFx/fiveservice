"use client";

import { Package, Wrench, CheckCircle, AlertTriangle, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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

const ComponentReplacementPage = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  const handleOpenCallbackModal = () => {
    setIsCallbackModalOpen(true);
  };

  const handleCloseCallbackModal = () => {
    setIsCallbackModalOpen(false);
  };

  const repairServices = [
    {
      id: "connectors",
      name: "Ремонт разъемов",
      price: "от 60,00 руб.",
      icon: Settings,
      features: [
        { name: "USB", price: "110,00 руб." },
        { name: "HDMI", price: "110,00 руб." },
        { name: "Аудио", price: "95,00 руб." },
        { name: "DC разъём", price: "110,00 руб." },
        { name: "Восстановление DC", price: "60,00 руб." },
        { name: "Клавиатура", price: "110,00 руб." },
        { name: "Тачпад", price: "110,00 руб." },
        { name: "Оперативная память", price: "215,00 руб." },
        { name: "SATA", price: "110,00 руб." }
      ],
      description: "Профессиональный ремонт и замена всех типов разъемов ноутбука"
    },
    {
      id: "other-components",
      name: "Другие компоненты",
      price: "от 45,00 руб.",
      icon: Wrench,
      features: [
        { name: "Кнопка включения", price: "85,00 руб." },
        { name: "Зарядное устройство", price: "65,00 руб." },
        { name: "DC шнур", price: "45,00 руб." }
      ],
      description: "Ремонт и замена вспомогательных компонентов системы"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Оригинальные запчасти",
      description: "Используем только качественные комплектующие от проверенных поставщиков"
    },
    {
      icon: CheckCircle,
      title: "Гарантия на работу",
      description: "Предоставляем гарантию до 6 месяцев на все виды ремонтов"
    },
    {
      icon: CheckCircle,
      title: "Быстрый ремонт",
      description: "Большинство ремонтов выполняем в течение 1-2 рабочих дней"
    },
    {
      icon: CheckCircle,
      title: "Опытные мастера",
      description: "13+ лет опыта в ремонте компьютерной техники"
    }
  ];

  const repairProcess = [
    {
      step: 1,
      title: "Диагностика",
      description: "Точное определение неисправного компонента"
    },
    {
      step: 2,
      title: "Подбор запчастей",
      description: "Находим подходящую замену с учетом модели устройства"
    },
    {
      step: 3,
      title: "Аккуратный демонтаж",
      description: "Бережно снимаем старый компонент без повреждений"
    },
    {
      step: 4,
      title: "Установка нового",
      description: "Монтируем новый компонент с соблюдением технологии"
    },
    {
      step: 5,
      title: "Тестирование",
      description: "Проверяем работоспособность после замены"
    },
    {
      step: 6,
      title: "Гарантия",
      description: "Выдаем гарантийный талон на выполненные работы"
    }
  ];

  const commonProblems = [
    {
      problem: "Разболтался USB-порт",
      solution: "Замена или восстановление разъема, пайка контактов"
    },
    {
      problem: "Не работает зарядка",
      solution: "Ремонт DC-разъема, замена гнезда питания"
    },
    {
      problem: "Пропал звук",
      solution: "Замена аудиоразъема, ремонт звуковой карты"
    },
    {
      problem: "Не работает кнопка включения",
      solution: "Замена кнопки, ремонт шлейфа питания"
    },
    {
      problem: "Поврежден HDMI-выход",
      solution: "Замена разъема, восстановление видеовыхода"
    },
    {
      problem: "Проблемы с тачпадом",
      solution: "Замена тачпада, ремонт шлейфа управления"
    }
  ];

  return (
    <div className="min-h-screen bg-white mt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500 hover:bg-blue-600 text-white">
              Замена компонентов
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ремонт и замена компонентов ноутбуков
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Профессиональная замена разъемов, кнопок и других компонентов. 
              Используем качественные запчасти и даем гарантию на работу.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="tel:+375297349077"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-medium rounded-lg transition-colors min-h-[60px]"
              >
                📞 Позвонить
              </a>
              <Button
                onClick={handleOpenCallbackModal}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg min-h-[60px]"
              >
                🖍 Оставить заявку
              </Button>
            </div>

            {/* Важное уведомление */}
            <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-green-400/30">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-xl font-bold text-green-100 mb-2">
                    Гарантия до 6 месяцев на все виды ремонтов!
                  </h3>
                  <p className="text-green-200">
                    Используем только качественные комплектующие от проверенных поставщиков
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Услуги по замене компонентов
            </h2>
            <p className="text-xl text-gray-600">
              Профессиональный ремонт разъемов и других компонентов ноутбука
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {repairServices.map((service) => (
              <Card
                key={service.id}
                className="p-8 hover:shadow-xl transition-all duration-300 group relative"
              >
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-2xl group-hover:bg-blue-600 transition-colors">
                      <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-500 mb-1">Цена от</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {service.price}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Стоимость работ:
                  </h4>
                  <div className="space-y-3">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="text-sm text-gray-700">
                          {feature.name}
                        </span>
                        <span className="font-semibold text-blue-600">
                          {feature.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleOpenCallbackModal}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
                  >
                    Записаться на ремонт
                  </Button>
                  <a
                    href="tel:+375297349077"
                    className="block w-full text-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    📞 Позвонить для консультации
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают наш сервис?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center p-6 group hover:shadow-lg transition-shadow"
              >
                <Card className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </Card>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Process */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Как проходит ремонт?
            </h2>
            <p className="text-xl text-gray-600">
              6-этапный процесс качественного ремонта компонентов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairProcess.map((item) => (
              <Card
                key={item.step}
                className="p-6 text-center group hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Частые проблемы с компонентами
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonProblems.map((item, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {item.problem}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.solution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Гарантия качества
            </h2>
            <p className="text-xl text-green-100 mb-6">
              Мы уверены в качестве наших работ и предоставляем 
              <strong> гарантию до 6 месяцев на все виды ремонтов!</strong>
            </p>
            <p className="text-lg text-green-200">
              Используем только оригинальные и качественные запчасти, 
              соблюдаем технологию ремонта и тестируем каждый отремонтированный компонент.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Нужен ремонт компонентов?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Запишитесь на профессиональный ремонт и получите гарантию на работы
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="tel:+375297349077"
              className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-medium rounded-lg transition-colors min-h-[60px]"
            >
              📞 Позвонить
            </a>
            <Button
              onClick={handleOpenCallbackModal}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg min-h-[60px]"
            >
              🖍 Оставить заявку
            </Button>
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
    </div>
  );
};

export default ComponentReplacementPage;