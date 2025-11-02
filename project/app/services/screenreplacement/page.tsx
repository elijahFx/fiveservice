'use client';

import { 
  Monitor, 
  Shield, 
  Clock, 
  Palette,
  DollarSign,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CallbackModal from '@/components/modal/CallbackModal';
import { useState } from 'react';

const ScreenReplacementPage = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [modalType, setModalType] = useState('consultation');

  const screenTechnologies = [
    {
      name: 'IPS',
      description: 'Широкие углы обзора и точная цветопередача',
      benefits: ['Яркие цвета', 'Широкие углы обзора', 'Высокая контрастность']
    },
    {
      name: 'OLED',
      description: 'Идеальный черный цвет и высокая контрастность',
      benefits: ['Абсолютный черный', 'Высокая контрастность', 'Энергоэффективность']
    },
    {
      name: 'Mini-LED',
      description: 'Превосходная яркость и локальное затемнение',
      benefits: ['Высокая яркость', 'Точное затемнение', 'Богатая палитра']
    }
  ];

  const replacementOptions = [
    {
      type: 'Новый экран',
      description: 'Оригинальные и совместимые матрицы',
      features: [
        'Полная гарантия 6 месяцев',
        'Новые технологии отображения',
        'Оптимальное качество изображения'
      ]
    },
    {
      type: 'Б/У экран',
      description: 'Экономичное решение для старых ноутбуков',
      features: [
        'Экономия до 50%',
        'Проверенное состояние',
        'Гарантия 3 месяца'
      ]
    }
  ];

  const commonProblems = [
    'Трещины и физические повреждения матрицы',
    'Появление полос и артефактов на экране',
    'Тусклые цвета и плохая цветопередача',
    'Мерцание экрана',
    'Темные пятна и битые пиксели',
    'Повреждение подсветки'
  ];

  const priceFactors = [
    'Размер и разрешение экрана',
    'Технология матрицы (IPS, OLED, Mini-LED)',
    'Редкость модели ноутбука',
    'Наличие сенсорного слоя',
    'Тип поверхности (матовый/глянцевый)'
  ];

  const guarantees = [
    'Гарантия на экран - 6 месяцев',
    'Гарантия на работу - 3 месяца',
    'Бесплатная диагностика',
    'Оригинальные запчасти',
    'Профессиональная установка',
    'Конфиденциальность данных'
  ];

  const benefits = [
    'Яркие и насыщенные цвета',
    'Широкие углы обзора',
    'Высокая контрастность',
    'Энергоэффективность',
    'Современные технологии'
  ];

  const handleReplacementClick = () => {
    setModalType('replacement');
    setIsCallbackModalOpen(true);
  };

  const handleConsultationClick = () => {
    setModalType('consultation');
    setIsCallbackModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCallbackModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white pt-6">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white text-navy-900 hover:bg-gray-100">
              Гарантия 6 месяцев
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Замена экрана ноутбука с гарантией 6 месяцев
            </h1>
            <p className="text-xl md:text-2xl text-navy-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Вернем кристально четкое изображение! Широкий выбор матриц для каждого запроса
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                className="bg-white text-navy-900 hover:bg-gray-100 px-8 py-4 text-lg"
                onClick={handleReplacementClick}
              >
                <Phone className="w-5 h-5 mr-2" />
                Срочная замена
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-navy-900 hover:bg-white hover: px-8 py-4 text-lg"
                onClick={handleConsultationClick}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Подбор матрицы
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Screen Technologies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Широкий выбор матриц для каждого запроса
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              У нас в наличии представлен большой ассортимент экранов с разнообразными характеристиками. 
              Мы поможем вам подобрать идеальную матрицу, исходя из ваших пожеланий и требований.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {screenTechnologies.map((tech, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-navy-100 rounded-2xl group-hover:bg-navy-600 transition-colors">
                      <Monitor className="w-8 h-8 text-navy-600 group-hover:text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{tech.name}</CardTitle>
                  <p className="text-gray-600">{tech.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tech.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-navy-600 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-gray-700 font-semibold">
              Выберите лучшее решение для своего ноутбука, обеспечив оптимальное сочетание качества изображения и стоимости!
            </p>
          </div>
        </div>
      </section>

      {/* Budget Options */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-navy-50 border-navy-200">
            <CardHeader>
              <CardTitle className="flex items-center text-navy-700">
                <DollarSign className="w-6 h-6 mr-2" />
                Хотите сэкономить на ремонте старого ноутбука?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg text-gray-700">
                <p className="text-xl font-semibold mb-4">
                  Не хотите много тратить на новый экран - подберём б/у!
                </p>
                <p>
                  Если ваш ноутбук не новый и вы ищете более экономичный вариант, мы готовы предложить качественные б/у экраны. 
                  Подберём идеальный вариант, который соответствует вашим требованиям и бюджету.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Стоимость замены экрана ноутбука
            </h2>
            <p className="text-xl text-gray-600">
              Ремонт доступнее, чем вы думаете!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {replacementOptions.map((option, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center justify-center">
                    <Monitor className="w-8 h-8 mr-3 text-navy-600" />
                    {option.type}
                  </CardTitle>
                  <p className="text-gray-600">{option.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-left">
                        <CheckCircle className="w-5 h-5 text-navy-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" onClick={handleConsultationClick}>
                    Узнать стоимость
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-navy-50 border border-navy-200 rounded-2xl p-6 text-center">
            <p className="text-gray-700 mb-4">
              Цена замены матрицы варьируется в зависимости от модели ноутбука и типа матрицы. 
              Мы предлагаем как новые, так и б/у экраны. Звоните или пишите нам для консультации и точного расчета стоимости!
            </p>
            <p className="text-navy-600 font-semibold">
              Помните, точную стоимость можно определить только после диагностики вашего ноутбука. 
              Не доверяйте предложениям с фиксированной ценой без учёта особенностей модели.
            </p>
          </div>
        </div>
      </section>

      {/* Upgrade Opportunity */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Замена экрана — это не только ремонт, но и новые возможности
            </h2>
          </div>

          <Card className="bg-gradient-to-r from-navy-50 to-navy-100 border-navy-200">
            <CardHeader>
              <CardTitle className="flex items-center text-navy-700">
                <Sparkles className="w-6 h-6 mr-2" />
                Устали от тусклых красок на экране?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg text-gray-700">
                <p className="text-xl mb-4">
                  Пора обновить матрицу ноутбука! В Five Service мы предлагаем передовые технологии, 
                  такие как IPS, OLED и Mini-LED. Насладитесь поразительной четкостью и яркостью изображения!
                </p>
                <p className="font-semibold">
                  Возможно, если уже приходится делать замену экрана, то можно воспользоваться случаем 
                  и установить матрицу, которая будет радовать глаз, в прямом и переносном смысле слова!
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-navy-50 rounded-lg">
                <Palette className="w-6 h-6 text-navy-600 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section className="py-16 bg-navy-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Матрица ноутбука: самая хрупкая часть устройства
            </h2>
            <p className="text-xl text-gray-700">
              Матрица ноутбука является одной из самых уязвимых компонентов. 
              Большинство обращений в сервисные центры связаны именно с необходимостью замены экрана.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-navy-600">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Основные причины поломок
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {commonProblems.map((problem, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-navy-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{problem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-navy-600">
                  <Shield className="w-6 h-6 mr-2" />
                  Профилактика повреждений
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg text-gray-700">
                  <p className="mb-4">
                    <strong>Основная причина таких поломок — неправильное обращение пользователя.</strong> 
                    Хотя случаи выхода матрицы из строя по другим причинам тоже встречаются, они значительно реже.
                  </p>
                  <p className="mb-4">
                    Кроме того, частой причиной обращений является повреждение корпуса ноутбука и его креплений.
                  </p>
                  <p className="text-navy-600 font-semibold">
                    Если вы заметили, что корпус начинает расходиться, крышка шатается или на корпусе появились трещины, 
                    рекомендуется не откладывать ремонт. Ремонт корпусных элементов обойдется значительно дешевле, 
                    чем замена матрицы.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Price Factors */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Факторы влияющие на стоимость замены
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priceFactors.map((factor, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-navy-200">
                <DollarSign className="w-6 h-6 text-navy-600 flex-shrink-0" />
                <span className="text-gray-700">{factor}</span>
              </div>
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
            <p className="text-xl text-gray-600">
              Мы уверены в качестве наших услуг и предоставляем надежные гарантии
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Shield className="w-6 h-6 text-navy-600 flex-shrink-0" />
                <span className="text-gray-700">{guarantee}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы вернуть кристально четкое изображение?
          </h2>
          <p className="text-xl text-navy-100 mb-8">
            Получите бесплатную диагностику и подбор оптимальной матрицы для вашего ноутбука
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-navy-900 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={handleReplacementClick}
            >
              <Phone className="w-5 h-5 mr-2" />
              Заказать замену
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-navy-900 hover:bg-white hover: px-8 py-4 text-lg"
              onClick={handleConsultationClick}
            >
              Бесплатная консультация
            </Button>
          </div>
        </div>
      </section>

      {/* Callback Modal */}
      <CallbackModal 
        isOpen={isCallbackModalOpen}
        onClose={handleCloseModal}
        initialData={{
          name: "",
          phone: "",
          note: modalType === 'consultation' 
            ? "Запрос на подбор матрицы и консультацию по замене экрана" 
            : "Запрос на срочную замену экрана ноутбука",
          agree: false
        }}
      />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Замена экрана ноутбука с гарантией 6 месяцев",
            "description": "Профессиональная замена экранов ноутбуков. Широкий выбор матриц IPS, OLED, Mini-LED. Гарантия 6 месяцев.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Five Service",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Минск"
              }
            },
            "areaServed": "Минск",
            "serviceType": "Screen Replacement",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги замены экранов",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Замена экрана на новый",
                    "description": "Оригинальные и совместимые матрицы с гарантией 6 месяцев"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Замена экрана на б/у",
                    "description": "Экономичное решение для старых ноутбуков с гарантией 3 месяца"
                  }
                }
              ]
            }
          })
        }}
      />
    </div>
  );
};

export default ScreenReplacementPage;