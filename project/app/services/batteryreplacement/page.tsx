'use client';

import { 
  Battery, 
  BatteryWarning, 
  RefreshCw, 
  Clock, 
  Shield, 
  Zap,
  Thermometer,
  Settings,
  CheckCircle,
  AlertTriangle,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CallbackModal from '@/components/modal/CallbackModal';
import { useState } from 'react';

const BatteryReplacementPage = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [modalType, setModalType] = useState('diagnostics');

  const solutions = [
    {
      type: 'Замена батареи',
      description: 'Самый быстрый способ. Замена в течении дня.',
      price: 'от 70 р.',
      features: [
        'Замена в течение дня',
        'Оригинальные и совместимые батареи',
        'Гарантия как на оригинал',
        'Тестирование при выдаче'
      ],
      note: 'При отсутствии необходимой батареи в Беларуси производим доставку под заказ.'
    },
    {
      type: 'Восстановление батареи',
      description: 'Более длительный вариант, но с большим плюсом!',
      price: 'от 110 р.',
      features: [
        'Замена элементов питания на новые',
        'Выбор производителя элементов',
        'Выбор емкости элементов',
        'Для редких и старых моделей'
      ],
      note: 'При отсутствии возможности заменить батарею в связи с тем, что они просто больше не производятся.'
    }
  ];

  const symptoms = [
    {
      icon: Clock,
      title: 'Сокращение времени работы',
      description: 'Ноутбук стал работать без подзарядки заметно меньше, чем раньше. Если раньше его хватало на 3-4 часа, а теперь только на 1-2 – батарея теряет емкость.'
    },
    {
      icon: Zap,
      title: 'Быстрая разрядка',
      description: 'Аккумулятор очень быстро разряжается, даже если ноутбук не выполняет никаких ресурсоемких задач.'
    },
    {
      icon: BatteryWarning,
      title: 'Некорректный индикатор',
      description: 'Индикатор заряда ведет себя странно: показывает 100% после 10-15 минут зарядки или быстро "скачет" при отключении от розетки.'
    },
    {
      icon: AlertTriangle,
      title: 'Вздутие батареи',
      description: 'Батарея деформировалась и вздулась. Это признак опасной неисправности, при которой нужно сразу прекратить использование АКБ.',
      danger: true
    },
    {
      icon: Settings,
      title: 'Система не видит батарею',
      description: 'Ноутбук вообще перестал видеть батарею, хотя визуально с ней все в порядке.'
    }
  ];

  const advantages = [
    'Только качественные и сертифицированные компоненты',
    'Работаем со всеми марками и моделями ноутбуков',
    'Быстрое и качественное обслуживание',
    'Гарантия на все работы и комплектующие',
    'Оптимальные цены',
    'Бесплатная диагностика'
  ];

  const tips = [
    {
      category: 'Зарядка',
      items: [
        'Не оставляйте ноутбук подключенным к зарядке постоянно',
        'Периодически разряжайте до 20-25%, затем заряжайте до 100%',
        'Избегайте полного разряда батареи до 0%',
        'Идеальный диапазон заряда — от 20% до 80%'
      ]
    },
    {
      category: 'Эксплуатация',
      items: [
        'Не оставляйте ноутбук на зарядке круглосуточно',
        'При стационарном использовании рассмотрите извлечение батареи',
        'Регулируйте настройки энергопотребления',
        'Используйте режимы энергосбережения'
      ]
    },
    {
      category: 'Обслуживание',
      items: [
        'Избегайте экстремальных температур',
        'Чистите вентиляционные отверстия от пыли',
        'Обновляйте ПО и драйверы',
        'Проводите калибровку батареи раз в несколько месяцев'
      ]
    }
  ];

  const handleReplacementClick = () => {
    setModalType('replacement');
    setIsCallbackModalOpen(true);
  };

  const handleDiagnosticsClick = () => {
    setModalType('diagnostics');
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
              Профессиональный ремонт
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Замена и ремонт батареи ноутбука
            </h1>
            <p className="text-xl md:text-2xl text-navy-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Когда это необходимо и как продлить срок службы АКБ
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                onClick={handleDiagnosticsClick}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Бесплатная диагностика
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ремонт и замена батарей для ноутбуков
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Предлагаем профессиональные услуги по ремонту и замене батарей для всех типов ноутбуков.
          </p>
          <p className="text-lg text-gray-700">
            Батарея изношена или не работает? Восстановим батарею ноутбука с использованием оригинальных запасных частей.
          </p>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Два варианта решения проблемы с батареей
            </h2>
            <p className="text-xl text-gray-600">
              Найдем предложение, которое устроит вас и по цене, и по качеству!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {solutions.map((solution, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow ring-2 ring-navy-500">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center justify-center">
                    <Battery className="w-8 h-8 mr-3 text-navy-600" />
                    {solution.type}
                  </CardTitle>
                  <p className="text-gray-600">{solution.description}</p>
                  <div className="text-3xl font-bold text-navy-600">
                    {solution.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-left">
                        <CheckCircle className="w-5 h-5 text-navy-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {solution.note && (
                    <p className="text-sm text-gray-600 mb-4 text-left bg-navy-50 p-3 rounded-lg">
                      {solution.note}
                    </p>
                  )}
                  <Button className="w-full" onClick={handleDiagnosticsClick}>
                    Выбрать этот вариант
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Как определить необходимость замены батареи?
            </h2>
            <p className="text-xl text-gray-600">
              Со временем батареи ноутбуков теряют свою емкость. Если ваш ноутбук быстро разряжается или вовсе перестаёт работать от аккумулятора, возможно, пришло время обратиться за заменой.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {symptoms.map((symptom, index) => (
              <Card key={index} className={`group hover:shadow-lg transition-shadow ${
                symptom.danger ? 'border-navy-200 bg-navy-50' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${
                      symptom.danger ? 'bg-navy-100 group-hover:bg-navy-600' : 'bg-navy-100 group-hover:bg-navy-600'
                    } transition-colors`}>
                      <symptom.icon className={`w-6 h-6 ${
                        symptom.danger ? 'text-navy-600 group-hover:text-white' : 'text-navy-600 group-hover:text-white'
                      }`} />
                    </div>
                  </div>
                  <CardTitle className={`text-lg ${symptom.danger ? 'text-navy-700' : ''}`}>
                    {symptom.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${symptom.danger ? 'text-navy-600' : 'text-gray-600'}`}>
                    {symptom.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему стоит выбрать нас?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-navy-50 rounded-lg">
                <Shield className="w-6 h-6 text-navy-600 flex-shrink-0" />
                <span className="text-gray-700">{advantage}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-gray-700">
              Обращайтесь в наш сервисный центр, чтобы ваш ноутбук всегда оставался в рабочем состоянии.
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Мы предлагаем быстрые и эффективные решения по оптимальной цене для всех.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Советы по эксплуатации батареи
            </h2>
            <p className="text-xl text-gray-600">
              Простые рекомендации для продления срока службы аккумулятора
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-navy-600">
                    <Zap className="w-6 h-6 mr-2" />
                    {tip.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tip.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-navy-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-navy-50 border border-navy-200 rounded-2xl p-6">
            <div className="flex items-start">
              <RefreshCw className="w-6 h-6 text-navy-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-2">Поддержание здоровья батареи:</h3>
                <ul className="text-navy-700 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Чистите вентиляционные отверстия. Регулярно удаляйте пыль из вентиляционных отверстий ноутбука, чтобы предотвратить перегрев.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Обновляйте программное обеспечение. Убедитесь, что операционная система и все драйверы обновлены, что может помочь улучшить управление энергопотреблением.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Проводите калибровку батареи. Раз в несколько месяцев полностью разрядите и затем полностью зарядите батарею, чтобы калибровать индикатор заряда.</span>
                  </li>
                </ul>
                <p className="text-navy-600 font-semibold mt-4">
                  Эти простые советы помогут вам значительно продлить срок службы батареи ноутбука.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы вернуть мобильность вашему ноутбуку?
          </h2>
          <p className="text-xl text-navy-100 mb-8">
            Получите бесплатную диагностику батареи и подберем оптимальное решение
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
              onClick={handleDiagnosticsClick}
            >
              Бесплатная диагностика
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
          note: modalType === 'diagnostics' 
            ? "Запрос на бесплатную диагностику батареи ноутбука" 
            : "Запрос на замену батареи ноутбука",
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
            "name": "Замена и ремонт батареи ноутбука",
            "description": "Профессиональная замена и восстановление батарей ноутбуков. Гарантия качества, все марки и модели.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Five Service",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Минск"
              }
            },
            "areaServed": "Минск",
            "serviceType": "Battery Replacement",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги по замене батарей",
              "itemListElement": solutions.map((solution, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": solution.type,
                  "description": solution.description
                },
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": solution.price.replace('от ', '').replace(' р.', ''),
                  "priceCurrency": "BYN"
                }
              }))
            }
          })
        }}
      />
    </div>
  );
};

export default BatteryReplacementPage;