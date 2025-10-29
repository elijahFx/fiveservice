'use client';

import { 
  Zap, 
  Shield, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wrench,
  TestTube,
  Battery,
  Thermometer,
  Phone,
  MessageCircle,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PowerConnectorPage = () => {
  const symptoms = [
    {
      icon: Battery,
      title: 'Пропадание зарядки',
      description: 'Зарядка появляется и пропадает при шевелении штекера'
    },
    {
      icon: Zap,
      title: 'Люфт штекера',
      description: 'Штекер "болтается" в гнезде, ощущается люфт'
    },
    {
      icon: Thermometer,
      title: 'Перегрев области',
      description: 'Греется область разъёма, искры/потрескивания, следы копоти'
    },
    {
      icon: XCircle,
      title: 'Не заряжается',
      description: 'Аккумулятор не заряжается, "Подключено, не заряжается"'
    },
    {
      icon: AlertTriangle,
      title: 'Защита БП',
      description: 'Блок питания уходит в защиту: индикатор мигает/гаснет'
    },
    {
      icon: TestTube,
      title: 'USB-C проблемы',
      description: 'USB-C зарядка работает только с одним кабелем/адаптером'
    }
  ];

  const homeChecklist = [
    {
      step: '1',
      title: 'Проверить зарядник на холостом ходу',
      description: 'Измерьте мультиметром выходное напряжение — должно совпадать с номиналом на наклейке'
    },
    {
      step: '2',
      title: 'Осмотреть штекер и кабель',
      description: 'Трещины, перегибы возле ферритового фильтра и у штекера — частая причина обрыва'
    },
    {
      step: '3',
      title: 'Проверить посадку штекера',
      description: 'Осторожно пошевелите штекер — "провалов" питания быть не должно'
    },
    {
      step: '4',
      title: 'Проверить разный угол подключения',
      description: 'Если заряд есть только в одном положении — вероятны трещины пайки или износ пина'
    },
    {
      step: '5',
      title: 'Исключить аксессуары',
      description: 'Уберите хабы/удлинители, используйте родной БП нужной мощности'
    },
    {
      step: '6',
      title: 'Проверить в BIOS/UEFI',
      description: 'В разделе Battery/Adapter Status должен определяться "AC Adapter"'
    }
  ];

  const dontDo = [
    'Не "поджимайте" контакты скрепками/иголками: легко добить гнездо и устроить КЗ',
    'Не сдирайте защитный лак с платы паяльником/отвёрткой: рискуете оторвать дорожки',
    'Не фиксируйте штекер изолентой под углом: контакт хуже, ток выше, горят входные ключи'
  ];

  const serviceProcess = [
    {
      step: '1',
      title: 'Диагностика входной цепи',
      description: 'Тест БП под нагрузкой, измерение токов, проверка предохранителей, TVS, входных MOSFET'
    },
    {
      step: '2',
      title: 'Микроскопия зоны DC-in',
      description: 'Поиск трещин пайки, отслоений дорожек, перегрева контактных площадок'
    },
    {
      step: '3',
      title: 'Демонтаж разъёма',
      description: 'Термопроработка, очистка отверстий/площадок, восстановление металлизации'
    },
    {
      step: '4',
      title: 'Установка нового разъёма',
      description: 'Оригинал/аналог класса A, пропайка, усиление механики при слабом креплении'
    },
    {
      step: '5',
      title: 'Восстановление цепей',
      description: 'Дорожки/виасы, замена TVS/предохранителя/MOSFET, проверка шлейфа/платы'
    },
    {
      step: '6',
      title: 'Контроль и отчёт',
      description: 'Контрольный запуск, проверка зарядки, стресс-тест, фотоотчёт'
    }
  ];

  const pricing = [
    {
      service: 'Замена разъёма на шлейфе/дочерней плате',
      description: 'разбор, замена, тест',
      price: 'от 85 BYN',
      duration: '1-3 дня'
    },
    {
      service: 'Замена распаянного на материнской плате',
      description: 'пайка, очистка, фиксация',
      price: 'от 110 BYN',
      duration: '1-3 дня'
    },
    {
      service: 'USB-C гнездо питания',
      description: 'диагностика PD, пайка/реболл',
      price: '140-260 BYN',
      duration: '1-4 дня'
    },
    {
      service: 'Восстановление дорожек/площадок',
      description: 'доп. работы к базовой операции',
      price: '+20-60 BYN',
      duration: 'По необходимости'
    }
  ];

  const preparation = [
    'Принесите родной блок питания',
    'Сообщите, при каких положениях штекера заряд пропадает',
    'Укажите, были ли удары/падения или попадание жидкости',
    'Снимите накопитель или сделайте резервную копию при возможности'
  ];

  const faq = [
    {
      question: 'Почему зарядка пропадает при малейшем движении штекера?',
      answer: 'Трещины пайки гнезда или износ центрального пина. На шлейфовых разъёмах также изнашиваются посадочные коннекторы.'
    },
    {
      question: 'Можно "поджать" контакты в гнезде и ездить дальше?',
      answer: 'Нет. Вырастает сопротивление и нагрев, горят входные ключи. Ремонт в итоге дороже.'
    },
    {
      question: 'Подходит ли любой USB-C блок для ноутбука?',
      answer: 'Нужен БП с Power Delivery и нужным профилем. Кабель с e-marker обязателен для высоких мощностей.'
    },
    {
      question: 'Почему "Подключено, не заряжается"?',
      answer: 'Просадка напряжения, износ батареи, повреждение линии идентификации БП или контроллера зарядки.'
    },
    {
      question: 'Блок питания гаснет при подключении — это короткое?',
      answer: 'Часто да: защита срабатывает при КЗ по линии +B или пробое входных MOSFET. Нужна диагностика.'
    },
    {
      question: 'Можно паять разъём дома обычным паяльником?',
      answer: 'Высокий риск оторвать дорожки и перегреть текстолит. Без прогрева/флюсов/фиксации результат плачевный.'
    },
    {
      question: 'После залития разъём искрит. Поможет чистка?',
      answer: 'Нужна мойка и сушка платы, удаление коррозии, затем ремонт входа питания. Одна "чистка" не спасёт.'
    },
    {
      question: 'Сколько держится ремонт разъёма?',
      answer: 'Годы при аккуратной эксплуатации. Мы усиливаем механику и используем качественные разъёмы. Гарантия до 12 мес.'
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
              Гарантия до 12 месяцев
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Разъём питания ноутбука
            </h1>
            <p className="text-xl md:text-2xl text-orange-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Диагностика, ремонт и стоимость. DC-jack, USB-C PD и разъёмы на шлейфах
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-2xl font-bold text-amber-300">85–180 BYN</div>
                <div className="text-orange-200">Типовой ремонт</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-2xl font-bold text-amber-300">1–3 дня</div>
                <div className="text-orange-200">Сроки ремонта</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-2xl font-bold text-amber-300">до 12 мес</div>
                <div className="text-orange-200">Гарантия</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Срочная диагностика
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-900 px-8 py-4 text-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Признаки неисправного разъёма
            </h2>
            <p className="text-xl text-gray-600">
              DC-jack, USB-C PD и разъёмы на шлейфах. Быстро, с гарантией и аккуратно.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {symptoms.map((symptom, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-600 transition-colors">
                      <symptom.icon className="w-6 h-6 text-red-600 group-hover:text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{symptom.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{symptom.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-semibold mb-2">
                  Если слышны щелчки, виден нагрев или искрение — прекратите попытки и не включайте ноутбук до диагностики.
                </p>
                <p className="text-red-700">
                  Признаки поломки — люфт штекера, искра при подключении, пропадание зарядки при малейшем движении, 
                  запах гари, перегрев области DC-in. Дома допустимы только безопасные проверки.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Checklist */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Быстрый чек-лист: что можно сделать дома
            </h2>
            <p className="text-xl text-gray-600">
              Безопасные проверки перед обращением в сервис
            </p>
          </div>

          <div className="grid gap-6">
            {homeChecklist.map((item, index) => (
              <Card key={index} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Don't Do Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Чего делать не стоит
            </h2>
            <p className="text-xl text-gray-700">
              Эти действия могут усугубить проблему и привести к дорогостоящему ремонту
            </p>
          </div>

          <div className="space-y-4">
            {dontDo.map((warning, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{warning}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что мы делаем в сервисе Five Service
            </h2>
            <p className="text-xl text-gray-600">
              Профессиональный подход к ремонту разъёмов питания
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceProcess.map((step, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-amber-600 text-white rounded-full text-sm font-bold">
                      {step.step}
                    </div>
                    <Wrench className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-6 h-6 text-amber-600 mr-2" />
              <span className="text-amber-800 font-semibold text-lg">
                Гарантия: от 120 дней (от 4 месяцев) на все работы и заменённые компоненты
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Стоимость и сроки
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            {pricing.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.service}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-amber-600 font-bold text-lg">{item.price}</div>
                        <div className="text-gray-500 text-sm">{item.duration}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-blue-800 font-semibold mb-2">Сроки: типовой цикл ремонта — 1–3 дня</p>
                <p className="text-blue-700">
                  Итоговая цена зависит от конструкции (шлейф/плата), состояния площадок и наличия запчастей. 
                  Стоимость подтверждаем после диагностики.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Подготовка к сдаче ноутбука
            </h2>
          </div>

          <div className="grid gap-4">
            {preparation.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
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
                    <Search className="w-5 h-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <div className="bg-amber-100 text-amber-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                      A
                    </div>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Нужна профессиональная диагностика разъёма питания?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Получите точную стоимость ремонта и гарантию до 12 месяцев
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Записаться на ремонт
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
            "name": "Ремонт разъёма питания ноутбука",
            "description": "Диагностика и ремонт разъёмов питания ноутбуков: DC-jack, USB-C PD. Гарантия до 12 месяцев.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Five Service",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Минск"
              }
            },
            "areaServed": "Минск",
            "serviceType": "Power Connector Repair",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги ремонта разъёмов",
              "itemListElement": pricing.map((item, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": item.service,
                  "description": item.description
                },
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": item.price.includes('от') ? item.price.replace('от ', '').replace(' BYN', '') : item.price.split('-')[0].replace(' BYN', ''),
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

export default PowerConnectorPage;