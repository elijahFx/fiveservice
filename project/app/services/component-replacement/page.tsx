"use client";

import { Package, Wrench, CheckCircle, AlertTriangle, Cpu, Monitor } from "lucide-react";
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

  const replacementServices = [
    {
      id: "components",
      name: "Замена комплектующих",
      price: "от 20,00 руб.",
      icon: Cpu,
      note: "Цены указаны только за работу без учёта деталей! За исключением выделенных позиций.",
      features: [
        { name: "Матрица ноутбука", price: "130,00 руб." },
        { name: "Матрица с проклейкой", price: "160,00 руб." },
        { name: "Wi-Fi модуль", price: "135,00 руб.", highlight: true },
        { name: "Кулер", price: "75,00 руб." },
        { name: "Клавиатура с перепайкой", price: "80,00 руб." },
        { name: "Накладная клавиатура", price: "45,00 руб." },
        { name: "Динамики", price: "60,00 руб." },
        { name: "Тачпад", price: "60,00 руб." },
        { name: "Петли/восстановление", price: "130,00 руб." },
        { name: "Нижняя часть корпуса", price: "75,00 руб." },
        { name: "Рамка матрицы", price: "90,00 руб." },
        { name: "Шлейф матрицы", price: "145,00 руб.", highlight: true },
        { name: "Процессор", price: "350,00 руб." },
        { name: "Видеокарта", price: "350,00 руб." },
        { name: "ОЗУ", price: "20,00 руб." },
        { name: "HDD→SSD", price: "20,00 руб." }
      ],
      description: "Профессиональная замена всех основных компонентов ноутбука"
    },
    {
      id: "case-repair",
      name: "Восстановление корпуса",
      price: "от 25,00 руб.",
      icon: Package,
      features: [
        { name: "Корпусные элементы (за ед., до 3 шт.)", price: "30,00 руб." },
        { name: "Корпусные элементы (за ед., более 3 шт.)", price: "25,00 руб." },
        { name: "Ремонт крышки экрана с переклейкой матрицы", price: "160,00 руб." },
        { name: "Ремонт крышки без переклейки матрицы", price: "110,00 руб." },
        { name: "Ремонт нижней части корпуса ноутбука", price: "110,00 руб." }
      ],
      description: "Ремонт и восстановление корпусных элементов ноутбука"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Качественные детали",
      description: "Используем только оригинальные и совместимые комплектующие"
    },
    {
      icon: CheckCircle,
      title: "Гарантия на работу",
      description: "Предоставляем гарантию до 6 месяцев на все виды замен"
    },
    {
      icon: CheckCircle,
      title: "Быстрая замена",
      description: "Большинство замен выполняем в течение 1-2 дней"
    },
    {
      icon: CheckCircle,
      title: "Опытные инженеры",
      description: "13+ лет опыта в замене компонентов ноутбуков"
    }
  ];

  const replacementProcess = [
    {
      step: 1,
      title: "Диагностика",
      description: "Определяем неисправный компонент и подбираем замену"
    },
    {
      step: 2,
      title: "Подбор аналога",
      description: "Находим совместимую деталь с учетом модели устройства"
    },
    {
      step: 3,
      title: "Аккуратный демонтаж",
      description: "Бережно снимаем старый компонент"
    },
    {
      step: 4,
      title: "Установка нового",
      description: "Устанавливаем новую деталь с соблюдением технологии"
    },
    {
      step: 5,
      title: "Тестирование",
      description: "Проверяем работоспособность после замены"
    },
    {
      step: 6,
      title: "Гарантия",
      description: "Выдаем гарантийный талон на работы и детали"
    }
  ];

  const commonProblems = [
    {
      problem: "Разбит экран ноутбука",
      solution: "Замена матрицы с полной диагностикой видеосистемы"
    },
    {
      problem: "Не работает Wi-Fi",
      solution: "Замена Wi-Fi модуля, проверка антенн и разъемов"
    },
    {
      problem: "Шумит вентилятор",
      solution: "Замена кулера системы охлаждения"
    },
    {
      problem: "Повреждена клавиатура",
      solution: "Замена клавиатуры с сохранением функциональности"
    },
    {
      problem: "Сломан корпус",
      solution: "Восстановление или замена корпусных элементов"
    },
    {
      problem: "Медленная работа",
      solution: "Замена HDD на SSD, увеличение оперативной памяти"
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
              Замена комплектующих
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Замена компонентов ноутбуков
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Профессиональная замена матриц, процессоров, памяти и других компонентов. 
              Гарантия качества и быстрый ремонт.
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
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-yellow-400/30">
              <div className="flex items-center justify-center space-x-3">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="text-xl font-bold text-yellow-100 mb-2">
                    Внимание: цены указаны только за работу!
                  </h3>
                  <p className="text-yellow-200">
                    Стоимость деталей рассчитывается отдельно. Бесплатная консультация по подбору комплектующих.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Replacement Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Услуги по замене комплектующих
            </h2>
            <p className="text-xl text-gray-600">
              Профессиональная замена всех основных компонентов ноутбука
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {replacementServices.map((service) => (
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

                {service.note && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-xs text-yellow-700 font-medium">{service.note}</p>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Стоимость работ:
                  </h4>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                          feature.highlight 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'border-b border-gray-100 last:border-0'
                        }`}
                      >
                        <span className={`text-sm ${
                          feature.highlight ? 'text-blue-700 font-medium' : 'text-gray-700'
                        }`}>
                          {feature.name}
                        </span>
                        <span className={`font-semibold ${
                          feature.highlight ? 'text-blue-600' : 'text-blue-600'
                        }`}>
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
                    Записаться на замену
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
              Почему выбирают нашу замену?
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

      {/* Replacement Process */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Как проходит замена?
            </h2>
            <p className="text-xl text-gray-600">
              6-этапный процесс качественной замены компонентов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {replacementProcess.map((item) => (
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
              Частые случаи замены компонентов
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
              Гарантия на замену
            </h2>
            <p className="text-xl text-green-100 mb-6">
              Мы предоставляем 
              <strong> гарантию до 6 месяцев на все работы по замене компонентов!</strong>
            </p>
            <p className="text-lg text-green-200">
              Используем только качественные детали, соблюдаем технологию замены 
              и тщательно тестируем каждый замененный компонент.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Нужна замена компонентов?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Запишитесь на профессиональную замену и получите гарантию на работы
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