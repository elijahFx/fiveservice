"use client";

import { Search, Clock, CheckCircle, AlertTriangle } from "lucide-react";
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

const DiagnosticsPage = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  const handleOpenCallbackModal = () => {
    setIsCallbackModalOpen(true);
  };

  const handleCloseCallbackModal = () => {
    setIsCallbackModalOpen(false);
  };

  const diagnosticServices = [
    {
      id: "comprehensive",
      name: "Комплексная диагностика оборудования",
      price: "55,00 руб.",
      time: "1-2 часа",
      icon: Search,
      features: [
        "Полная проверка всех компонентов системы",
        "Тестирование процессора, памяти, видеокарты",
        "Диагностика системы охлаждения",
        "Проверка жесткого диска/SSD на ошибки",
        "Анализ операционной системы и драйверов",
        "Определение всех неисправностей",
        "Подробный отчет о состоянии устройства",
      ],
      recommended: true,
    },
    {
      id: "express",
      name: "Срочная диагностика оборудования",
      price: "110,00 руб.",
      time: "30-60 минут",
      icon: Clock,
      features: [
        "Экспресс-проверка основных компонентов",
        "Быстрое выявление критических неисправностей",
        "Приоритет в очереди на диагностику",
        "Основные тесты производительности",
        "Определение главной причины проблемы",
        "Сокращенный отчет о неисправностях",
      ],
      express: true,
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Профессиональное оборудование",
      description: "Используем современные диагностические приборы и ПО",
    },
    {
      icon: CheckCircle,
      title: "Опытные специалисты",
      description: "Более 13 лет опыта в диагностике компьютерной техники",
    },
    {
      icon: CheckCircle,
      title: "Точный диагноз",
      description: "Определяем проблему с точностью до 99%",
    },
    {
      icon: CheckCircle,
      title: "Честная оценка",
      description: "Не навязываем ненужные услуги и запчасти",
    },
  ];

  const diagnosticProcess = [
    {
      step: 1,
      title: "Внешний осмотр",
      description: "Проверяем корпус, разъемы, экран на видимые повреждения",
    },
    {
      step: 2,
      title: "Аппаратная диагностика",
      description: "Тестируем компоненты на специальном оборудовании",
    },
    {
      step: 3,
      title: "Программная проверка",
      description: "Анализируем ОС, драйверы, проверяем на вирусы",
    },
    {
      step: 4,
      title: "Тепловизионный анализ",
      description: "Определяем проблемы перегрева компонентов",
    },
    {
      step: 5,
      title: "Формирование отчета",
      description: "Составляем подробный отчет с рекомендациями",
    },
    {
      step: 6,
      title: "Консультация",
      description: "Объясняем результаты и варианты решения",
    },
  ];

  const commonProblems = [
    {
      problem: "Ноутбук не включается",
      solution:
        "Диагностика блока питания, материнской платы, кнопки включения",
    },
    {
      problem: "Перегрев и шум",
      solution: "Проверка системы охлаждения, термопасты, вентиляторов",
    },
    {
      problem: "Медленная работа",
      solution: "Тестирование диска, оперативной памяти, проверка на вирусы",
    },
    {
      problem: "Синий экран",
      solution: "Анализ дампов памяти, проверка драйверов и компонентов",
    },
    {
      problem: "Не работает клавиатура/тачпад",
      solution: "Диагностика шлейфов, контроллеров, разъемов",
    },
    {
      problem: "Проблемы с дисплеем",
      solution: "Тестирование матрицы, видеокарты, инвертора",
    },
  ];

  return (
    <div className="min-h-screen bg-white mt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500 hover:bg-blue-600 text-white">
              Профессиональная диагностика
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Диагностика ноутбуков и компьютеров
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Точно определим причину неисправности вашего устройства.
              Используем профессиональное оборудование и 13-летний опыт.
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
                    При выполнении ремонта стоимость диагностики не взимается!
                  </h3>
                  <p className="text-green-200">
                    Заплатите за диагностику только если откажетесь от ремонта
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Услуги диагностики
            </h2>
            <p className="text-xl text-gray-600">
              Выберите подходящий вариант диагностики для вашего устройства
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {diagnosticServices.map((service) => (
              <Card
                key={service.id}
                className="p-8 hover:shadow-xl transition-all duration-300 group relative"
              >
                {service.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white">
                      Рекомендуем
                    </Badge>
                  </div>
                )}
                {service.express && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white">Срочно</Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-2xl group-hover:bg-blue-600 transition-colors">
                      <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.name}
                  </h3>
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 mb-2">Цена</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {service.price}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Время: {service.time}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Что входит:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleOpenCallbackModal}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
                  >
                    Записаться на диагностику
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
              Почему выбирают нашу диагностику?
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

      {/* Diagnostic Process */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Как проходит диагностика?
            </h2>
            <p className="text-xl text-gray-600">
              Подробный 6-этапный процесс для точного определения проблемы
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diagnosticProcess.map((item) => (
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
              Частые проблемы которые мы диагностируем
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
              Важная гарантия для вас
            </h2>
            <p className="text-xl text-green-100 mb-6">
              Если после нашей диагностики вы решите выполнить ремонт в нашем
              сервисе -
              <strong> стоимость диагностики мы полностью вернем!</strong>
            </p>
            <p className="text-lg text-green-200">
              Вы платите только за диагностику если отказываетесь от ремонта.
              Это наша гарантия честного подхода к каждому клиенту.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы узнать причину неисправности?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Запишитесь на профессиональную диагностику и получите точный диагноз
            вашего устройства
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

export default DiagnosticsPage;