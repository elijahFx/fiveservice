'use client';

import { 
  Wrench, 
  Shield, 
  Clock, 
  DollarSign,
  RotateCcw,
  Zap,
  CheckCircle,
  AlertTriangle,
  Phone,
  MessageCircle,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CaseRepairPage = () => {
  const failureCauses = [
    {
      icon: Settings,
      title: 'Особенности конструкции',
      description: 'Движущиеся механизмы петель крышки матрицы со временем загрязняются, начинают открываться туго, увеличивая нагрузку на крепления, расположенные на поддоне (нижней части корпуса).'
    },
    {
      icon: AlertTriangle,
      title: 'Неправильное открытие крышки',
      description: 'Открытие крышки ноутбука за левый или правый угол вместо центра перераспределяет нагрузку на одну из сторон, что может привести к поломке креплений.'
    },
    {
      icon: Zap,
      title: 'Небрежное обращение',
      description: 'Падения, сильные удары и другие механические воздействия могут привести к повреждению корпуса и внутренних компонентов.'
    }
  ];

  const pricing = [
    {
      service: 'Восстановление крепления',
      description: 'Одно крепление (обычно на сторону петли 2-3 крепления)',
      price: '30 рублей',
      note: 'При более трёх креплений — 25 рублей за штуку'
    },
    {
      service: 'Ремонт расходящегося корпуса',
      description: 'Типовой ремонт по статистике',
      price: '60-90 рублей',
      note: 'Гарантия на ремонт — от 4 месяцев'
    },
    {
      service: 'Сварка металлической направляющей',
      description: 'Сломанной металлической направляющей экрана',
      price: '85 рублей',
      note: 'Профессиональная сварка'
    }
  ];

  const repairProcess = [
    {
      step: '1',
      title: 'Разборка ноутбука',
      description: 'Для ремонта корпуса ноутбук полностью разбирается, чтобы получить доступ ко всем поврежденным элементам.'
    },
    {
      step: '2',
      title: 'Склеивание и восстановление',
      description: 'Сломанные элементы склеиваются специальным клеем, а крепления полностью восстанавливаются. Процесс может занять несколько дней.'
    },
    {
      step: '3',
      title: 'Эстетическое восстановление',
      description: 'Поврежденный элемент обтягивается специальной износостойкой пленкой из углеволокна (3D-карбон-пленка), скрывающей следы ремонта.'
    }
  ];

  const commonProblems = [
    {
      problem: 'Сломанные крепления петель',
      solution: 'Восстановление креплений специальным клеем, гарантия прочности'
    },
    {
      problem: 'Расходящийся корпус',
      solution: 'Склеивание и усиление конструкции, восстановление целостности'
    },
    {
      problem: 'Трещины на корпусе',
      solution: 'Эстетическое восстановление с применением 3D-карбон-пленки'
    },
    {
      problem: 'Сломанные металлические направляющие',
      solution: 'Профессиональная сварка и восстановление металлоконструкций'
    },
    {
      problem: 'Износ петель крышки',
      solution: 'Чистка, смазка или замена петель, регулировка натяжения'
    }
  ];

  const advantages = [
    'Восстановление прочности и целостности корпуса',
    'Продление срока службы устройства',
    'Защита внутренних компонентов от дальнейших повреждений',
    'Улучшение внешнего вида ноутбука после эстетического восстановления',
    'Использование качественных материалов и современных технологий',
    'Гарантия на выполненные работы от 4 месяцев'
  ];

  const replacementOptions = [
    {
      type: 'Новая крышка/корпус',
      description: 'Оригинальные запчасти от производителя',
      benefits: ['Идеальное состояние', 'Полное соответствие', 'Долговечность']
    },
    {
      type: 'Б/У крышка/корпус',
      description: 'Качественные запчасти с проверкой',
      benefits: ['Экономия средств', 'Быстрая замена', 'Наличие на складе']
    },
    {
      type: 'Восстановление',
      description: 'Профессиональный ремонт существующего корпуса',
      benefits: ['Сохранение родного корпуса', 'Экономия', 'Экологичность']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 to-orange-900 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-amber-500 hover:bg-amber-600">
              Срочный ремонт
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Профессиональный ремонт корпуса ноутбука
            </h1>
            <p className="text-xl md:text-2xl text-orange-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Срочная замена на новые и б/у. Качественное восстановление корпуса. Сварка петель
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Срочный ремонт
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-900 px-8 py-4 text-lg">
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
            Ремонт корпуса ноутбука, замена петель, замена крышки
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <p className="text-2xl font-bold text-amber-800 mb-4">
              Восстановим! Будет лучше нового!
            </p>
            <p className="text-gray-700 text-lg">
              Корпус ноутбука - это важная часть устройства, защищающая его внутренние компоненты от повреждений. 
              Он изготавливается из ударопрочного пластика и состоит из нескольких элементов. 
              Несмотря на прочность, поломки корпуса случаются по разным причинам.
            </p>
          </div>
        </div>
      </section>

      {/* Failure Causes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Основные причины поломки корпуса ноутбука
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {failureCauses.map((cause, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-600 transition-colors">
                      <cause.icon className="w-6 h-6 text-amber-600 group-hover:text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{cause.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{cause.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Самые частые поломки
            </h2>
            <p className="text-xl text-gray-600">
              Как ломается корпус и как мы его восстанавливаем
            </p>
          </div>

          <div className="space-y-4">
            {commonProblems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.problem}
                      </h3>
                      <p className="text-gray-600">{item.solution}</p>
                    </div>
                    <div className="flex items-center">
                      <Wrench className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Стоимость ремонта корпуса
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-blue-800 font-semibold">
                Какова бы ни была стоимость ремонта, вы можете быть уверены — мы вас не поставим перед фактом. 
                Наш принцип — оплата только за выполненную работу!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {pricing.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{item.service}</CardTitle>
                  <div className="text-2xl font-bold text-amber-600">{item.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <p className="text-gray-500 text-xs">{item.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-amber-800 text-center">
              Определение стоимости ремонта корпуса производится индивидуально для каждого случая. 
              Каждая поломка имеет свои нюансы и сложности, а также варианты решения.
            </p>
          </div>
        </div>
      </section>

      {/* Replacement Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Варианты решения проблемы
            </h2>
            <p className="text-xl text-gray-600">
              Иногда экономически целесообразнее заменить крышку ноутбука или его верхнюю или нижнюю часть
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {replacementOptions.map((option, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{option.type}</CardTitle>
                  <p className="text-gray-600">{option.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {option.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    Узнать стоимость
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              После диагностики наши мастера предложат вам решение, обсудят все плюсы и минусы, чтобы вы могли сделать осознанный выбор.
            </p>
          </div>
        </div>
      </section>

      {/* Repair Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Процесс ремонта корпуса ноутбука
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {repairProcess.map((step, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                      {step.step}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Преимущества профессионального ремонта корпуса ноутбука
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Shield className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <span className="text-gray-700">{advantage}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 mb-4">
              Если ваш ноутбук пострадал от механических повреждений или износа, не стоит откладывать ремонт. 
              Своевременное обращение к профессионалам поможет восстановить корпус и продлить жизнь вашего устройства.
            </p>
            <p className="text-amber-700 font-semibold">
              Доверьте ремонт опытным мастерам, использующим качественные материалы и современные технологии восстановления.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы восстановить корпус вашего ноутбука?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Получите бесплатную диагностику и точную стоимость ремонта
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Заказать ремонт
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 text-lg">
              Бесплатная диагностика
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Профессиональный ремонт корпуса ноутбука",
            "description": "Срочная замена корпусов ноутбуков на новые и б/у. Качественное восстановление корпуса, сварка петель, замена крышек.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Five Service",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Минск"
              }
            },
            "areaServed": "Минск",
            "serviceType": "Laptop Case Repair",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги ремонта корпусов",
              "itemListElement": pricing.map((item, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": item.service,
                  "description": item.description
                },
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": item.price.replace(' рублей', ''),
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

export default CaseRepairPage;