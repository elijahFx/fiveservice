"use client";

import {
  CheckCircle,
  Shield,
  Download,
  Zap,
  Settings,
  Users,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, lazy, Suspense } from "react";


// Ленивая загрузка CallbackModal
const CallbackModal = lazy(
  () => import("../../../components/modal/CallbackModal")
);

// Fallback компонент для загрузки модального окна
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

const SoftwareAndVirusesPage = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  const handlePhoneClick = () => {
    window.location.href = "tel:+375297349077";
  };

  const handleOpenCallbackModal = () => {
    setIsCallbackModalOpen(true);
  };

  const handleCloseCallbackModal = () => {
    setIsCallbackModalOpen(false);
  };

  const benefits = [
    {
      icon: Shield,
      title: "Защита от вирусов",
      description: "Комплексное удаление вредоносных программ и защита данных",
    },
    {
      icon: Download,
      title: "Установка ПО",
      description: "Профессиональная установка любых программ и приложений",
    },
    {
      icon: Zap,
      title: "Восстановление скорости",
      description: "Вернем вашему устройству прежнюю производительность",
    },
    {
      icon: Users,
      title: "Консультации",
      description: "Подробные объяснения и обучение для самостоятельной работы",
    },
  ];

  const services = [
    {
      icon: Download,
      title: "Установка программ",
      description: "Офисные приложения, антивирусы, специализированное ПО",
      details: [
        "Microsoft Office и аналоги",
        "Антивирусные программы",
        "Графические редакторы",
        "Специализированное ПО",
        "Игры и мультимедиа",
      ],
    },
    {
      icon: Shield,
      title: "Удаление вирусов",
      description: "Комплексная очистка от всех видов вредоносного ПО",
      details: [
        "Диагностика системы",
        "Удаление вирусов и троянов",
        "Очистка от шпионских программ",
        "Восстановление системы",
        "Установка защиты",
      ],
    },
    {
      icon: Settings,
      title: "Консультации",
      description: "Обучение и поддержка для уверенной работы",
      details: [
        "Объяснение процессов",
        "Рекомендации по безопасности",
        "Обучение работе с ПО",
        "Учебные материалы",
        "Последующая поддержка",
      ],
    },
  ];

  const whyChooseUs = [
    "Полная конфиденциальность информации",
    "Богатый опыт работы с различным ПО",
    "Успешно решим проблемы с вирусами",
    "Индивидуальный подход к каждому клиенту",
    "Разумные цены и гибкие условия оплаты",
    "Быстрое реагирование и соблюдение оговоренных сроков",
    "Дружелюбные и квалифицированные специалисты",
  ];

  const installationOptions = [
    {
      title: "Онлайн-заявка",
      description: "Заполните форму на сайте с описанием необходимого ПО",
    },
    {
      title: "Мессенджеры",
      description: "Напишите в Telegram, Viber или по email",
    },
    {
      title: "Телефонный звонок",
      description: "Позвоните по номеру +375 29 734 90 77",
    },
    {
      title: "Курьерская доставка",
      description: "Бесплатный забор и доставка вашего устройства",
    },
    {
      title: "Удаленная помощь",
      description: "Решение проблем без вашего присутствия",
    },
  ];

  const virusRemovalProcess = [
    "Комплексная диагностика системы",
    "Выявление всех видов вредоносного ПО",
    "Безопасное удаление вирусов без потери данных",
    "Очистка системы от остаточных следов",
    "Восстановление быстродействия устройства",
    "Установка надежного антивируса",
    "Обновление ПО и системы безопасности",
    "Консультация по безопасной работе",
  ];

  const consultationBenefits = [
    "Подробные объяснения каждого шага",
    "Рекомендации по защите от вирусов",
    "Советы по эффективному использованию ПО",
    "Учебные материалы и инструкции",
    "Бесплатная последующая поддержка",
  ];

  const pricing = [
    {
      name: "Базовая",
      price: "от 40 руб.",
      description: "Установка простых программ, базовая чистка",
    },
    {
      name: "Стандарт",
      price: "от 70 руб.",
      description: "Комплексное удаление вирусов, установка офисного ПО",
    },
    {
      name: "Профессиональная",
      price: "от 120 руб.",
      description: "Сложные случаи, специализированное ПО, полная настройка",
    },
  ];

  const guarantees = [
    "Гарантия на установленное ПО - 1 месяц",
    "Бесплатные консультации",
    "Конфиденциальность данных",
    "Соблюдение сроков",
    "Качественные решения",
  ];

  const faq = [
    {
      question: "Сколько времени занимает установка программ?",
      answer:
        "В зависимости от сложности - от 30 минут до 2 часов. Большинство стандартных программ устанавливается в течение часа.",
    },
    {
      question: "Можете ли вы помочь с установкой специализированного ПО?",
      answer:
        "Да, мы работаем с любым программным обеспечением - от офисных приложений до профессиональных CAD-систем и медиа-редакторов.",
    },
    {
      question: "Как происходит удаление вирусов?",
      answer:
        "Мы проводим комплексную диагностику, используем несколько антивирусных сканеров, удаляем вредоносное ПО и восстанавливаем систему.",
    },
    {
      question: "Предоставляете ли вы удаленную помощь?",
      answer:
        "Да, для многих задач мы можем помочь удаленно через интернет. Это удобно и экономит ваше время.",
    },
    {
      question: "Что входит в бесплатные консультации?",
      answer:
        "Мы подробно объясняем все выполненные работы, даем рекомендации по безопасности и эффективному использованию ПО, предоставляем учебные материалы.",
    },
    {
      question: "Работаете ли вы с macOS/Linux?",
      answer:
        "Да, мы оказываем услуги по установке программ и удалению вирусов для всех операционных систем.",
    },
  ];

  return (
    <div className="min-h-screen bg-white mt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500 hover:bg-blue-600">
              Программное обеспечение и безопасность
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Установка программ и удаление вирусов
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Профессиональная помощь с программным обеспечением. Вылечим ваш
              ноутбук или компьютер от вирусов!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-blue-900 hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
              >
                <a href="tel:+375297349077">Позвонить</a>
              </Button>
              <Button
                onClick={handleOpenCallbackModal}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
              >
                🖍 Оставить заявку
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <benefit.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-sm text-blue-200">{benefit.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed">
              Вы столкнулись с проблемами при установке программного
              обеспечения? Ваш компьютер или ноутбук стал работать медленнее
              из-за вирусов? Обращайтесь - мы сможем помочь! В нашем понимании,
              по-настоящему качественный сервис - это не только решение текущих
              проблем, но и инвестиция в ваше будущее. Обращаясь к нам, вы не
              просто избавляетесь от вирусов или получаете необходимое ПО - вы
              приобретаете знания и уверенность в своих силах.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-600">
              Комплексный подход к решению ваших задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center group hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-2xl group-hover:bg-blue-600 transition-colors">
                      <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-left">
                    {service.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему стоит выбрать нас?
            </h2>
            <p className="text-xl text-gray-600">
              Мы ценим ваше доверие и оправдываем его каждый день!
            </p>
          </div>

          <div className="grid gap-4">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Options */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Установка программного обеспечения
            </h2>
            <p className="text-xl text-gray-600">
              Удобные способы получить помощь
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {installationOptions.map((option, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <p className="text-gray-700 text-lg">
              <strong>Удаленная помощь доступна!</strong> Для задач, не
              требующих переустановки системы, наши специалисты могут
              подключиться к вашему устройству через интернет. Вам даже не
              придется выходить из дома или офиса!
            </p>
          </div>
        </div>
      </section>

      {/* Virus Removal */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Удаление вирусов
            </h2>
            <p className="text-xl text-gray-700">
              Комплексный подход к безопасности вашего устройства
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {virusRemovalProcess.map((step, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700 font-semibold">
              Не позволяйте вирусам испортить вашу работу или поставить под
              угрозу ваши данные. Обратитесь к нам - и мы быстро вернем вашему
              компьютеру стабильность и безопасность.
            </p>
          </div>
        </div>
      </section>

      {/* Consultations */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Бесплатные консультации
            </h2>
            <p className="text-xl text-gray-600">
              Инвестируем в ваши знания и уверенность
            </p>
          </div>

          <div className="grid gap-4 mb-8">
            {consultationBenefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700">
              Мы убеждены, что недостаточно просто решить проблему - важно также
              дать вам знания и инструменты, чтобы вы могли в дальнейшем
              самостоятельно справляться с подобными вопросами.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Стоимость услуг
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">
                    {item.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Button className="w-full" onClick={handleOpenCallbackModal}>
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши гарантии
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{guarantee}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Частые вопросы
            </h2>
          </div>

          <div className="space-y-6">
            {faq.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                      ?
                    </span>
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы решить ваши проблемы с ПО?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Оставьте заявку и получите профессиональную помощь уже сегодня!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+375297349077"
              className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-medium rounded-lg transition-colors min-h-[60px]"
            >
              Позвонить
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

      {/* Модальное окно с ленивой загрузкой */}
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

export default SoftwareAndVirusesPage;
