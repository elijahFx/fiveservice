'use client';

import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Shield, 
  Thermometer,
  Volume2,
  Cpu,
  Zap,
  Star,
  Users,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CleaningPage = () => {
  const benefits = [
    {
      icon: Thermometer,
      title: 'Предотвращает перегрев',
      description: 'Процессора и видеочипа, продлевая их срок службы'
    },
    {
      icon: Zap,
      title: 'Поддерживает производительность',
      description: 'Системы, избавляя от "тормозов" и зависаний'
    },
    {
      icon: Volume2,
      title: 'Снижает уровень шума',
      description: 'Делает работу за ноутбуком комфортнее'
    },
    {
      icon: Shield,
      title: 'Выявляет проблемы',
      description: 'Позволяет своевременно устранить потенциальные неисправности'
    }
  ];

  const cleaningSigns = [
    'Корпус сильно нагревается, особенно при высокой нагрузке',
    'Кулер постоянно шумит, ноутбук стал заметно громче',
    'Производительность упала, появились "тормоза", зависания, самопроизвольные выключения',
    'Из вентиляционных отверстий идет слабый поток горячего воздуха'
  ];

  const cleaningProcess = [
    'Бережная разборка ноутбука и демонтаж системы охлаждения',
    'Тщательная очистка радиатора, вентилятора и воздуховодов от пыли с помощью профессионального оборудования',
    'Замена термоинтерфейсов (термопасты и термопрокладок) на новые для лучшего отвода тепла',
    'При необходимости - смазка и замена вентилятора',
    'Сборка ноутбука, проверка температур и общей работоспособности'
  ];

  const pricing = [
    {
      name: 'Стандарт',
      price: '75 руб.',
      description: 'Базовая чистка с качественными материалами'
    },
    {
      name: 'Gaming',
      price: '125 руб.',
      description: 'Расходные материалы с фазовым переходом',
      link: '#'
    },
    {
      name: 'Extreme Pro',
      price: '195 руб.',
      description: 'С применением жидкого металла',
      link: '#'
    }
  ];

  const risks = [
    'Повреждение пластиковых защелок и креплений при неаккуратной разборке',
    'Риск повредить процессор или видеочип неумелым демонтажем системы охлаждения',
    'Некачественная термопаста или ее неправильное нанесение сводят эффект от чистки к нулю',
    'Статическое электричество может вывести из строя электронные компоненты',
    'Потеря мелких деталей и винтов превращает сборку в головоломку'
  ];

  const discounts = [
    {
      title: 'Первое обращение',
      discount: '10%',
      description: 'Скидка на первое обращение'
    },
    {
      title: 'Студентам и пенсионерам',
      discount: '20%',
      description: 'По предъявлению документа'
    }
  ];

  const faq = [
    {
      question: 'Как часто нужно чистить ноутбук?',
      answer: 'Мы рекомендуем проводить чистку не реже раза в год. При интенсивном использовании в пыльном помещении - раз в полгода.'
    },
    {
      question: 'Сколько времени занимает чистка?',
      answer: 'Обычно чистка занимает 2-3 часа. Для срочных заказов возможно expedited обслуживание за дополнительную плату.'
    },
    {
      question: 'Даете ли вы гарантию на чистку?',
      answer: 'Да, мы даем гарантию на все виды работ. Если проблема возникнет снова в течение этого срока - исправим бесплатно.'
    },
    {
      question: 'Как часто нужно чистить систему охлаждения ноутбука?',
      answer: 'Частота чистки зависит от условий эксплуатации, но в среднем рекомендуется производить чистку хотя бы раз в год.'
    },
    {
      question: 'Какие основные признаки того, что пора чистить ноутбук?',
      answer: 'Необходимость в чистке указывают такие симптомы, как перегрев, увеличение шума вентилятора, снижение производительности и самопроизвольные отключения.'
    },
    {
      question: 'Могу ли я самостоятельно почистить ноутбук?',
      answer: 'Хотя теоретически это возможно, самостоятельная чистка может привести к повреждению компонентов и аннулированию гарантии. Рекомендуется обращаться к профессионалам, особенно если у вас нет соответствующего опыта и инструментов.'
    },
    {
      question: 'Что включает в себя профессиональная чистка?',
      answer: 'Профессиональная чистка включает диагностику, разборку устройства, удаление пыли и грязи, замену термопасты, проверку и сборку обратно с последующим тестированием работоспособности системы.'
    },
    {
      question: 'Сколько стоит профессиональная чистка ноутбука?',
      answer: 'Цены могут варьироваться в зависимости от сложности и модели ноутбука, начиная от 50 рублей за стандартную чистку.'
    },
    {
      question: 'Есть ли у вас специальные предложения или скидки на чистку?',
      answer: 'Да, мы регулярно предлагаем скидки для новых и постоянных клиентов, а также проводим акции в честь праздников и специальных дней.'
    }
  ];

  const guarantees = [
    'Гарантия на чистку - от 1 месяца',
    'Консультация перед ремонтом',
    'Оригинальные комплектующие от проверенных поставщиков',
    'Конфиденциальность данных клиентов',
    'Строгое соблюдение заявленных сроков',
    'Качественные расходные материалы'
  ];

  return (
    <div className="min-h-screen bg-white mt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500 hover:bg-blue-600">
              Профилактическое обслуживание
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              ПРОФЕССИОНАЛЬНАЯ ЧИСТКА НОУТБУКОВ В МИНСКЕ
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Продлите жизнь своей технике! Регулярное обслуживание предотвращает перегрев и сохраняет производительность
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
                Записаться на чистку
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 text-lg">
                Бесплатная консультация
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
              В современном мире ноутбук - незаменимый инструмент для работы, учебы и развлечений. 
              Но чтобы он служил вам долго и без проблем, необходимо регулярно проводить техническое обслуживание. 
              Одна из ключевых процедур - чистка системы охлаждения. Пренебрегая ей, вы рискуете столкнуться 
              с перегревом, снижением производительности и преждевременным износом компонентов.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Зачем нужна чистка?
            </h2>
            <p className="text-xl text-gray-600">
              Регулярная чистка системы охлаждения ноутбука дает следующие преимущества:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-2xl group-hover:bg-blue-600 transition-colors">
                      <benefit.icon className="w-8 h-8 text-blue-600 group-hover:text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Examples */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Немного фото примеров как нужно и как нет
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Правильная чистка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Фото примера правильной чистки</span>
                </div>
                <p className="mt-4 text-gray-600">
                  Регулярная чистка системы охлаждения и замена термопасты предотвращают перегрев и продлевают срок службы ноутбука!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Неправильная чистка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Фото примера неправильной чистки</span>
                </div>
                <p className="mt-4 text-gray-600">
                  Примеры повреждений при самостоятельной чистке
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cleaning Signs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Признаки необходимости чистки
          </h2>
          
          <div className="grid gap-4">
            {cleaningSigns.map((sign, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Как происходит профессиональная чистка?
            </h2>
            <p className="text-xl text-gray-600">
              В нашем сервисном центре чистка ноутбуков от пыли происходит в несколько этапов:
            </p>
          </div>

          <div className="space-y-6">
            {cleaningProcess.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-lg">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <p className="text-gray-700">
              <strong>Мы используем только качественные термоинтерфейсы</strong> от проверенных брендов - 
              Arctic, Honeywell, Thermal Grizzly. Это гарантирует эффективный теплоотвод и долгий срок службы.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Стоимость чистки
            </h2>
            <p className="text-xl text-gray-600">
              Предлагаем по стоимости следующие виды чистки ноутбуков:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((item, index) => (
              <Card key={index} className={`text-center ${
                index === 1 ? 'ring-2 ring-blue-500 relative' : ''
              }`}>
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500">Популярный</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{item.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  {item.link && (
                    <a href={item.link} className="text-blue-600 hover:text-blue-700 text-sm inline-block mb-4">
                      Подробнее →
                    </a>
                  )}
                  <Button className="w-full">Выбрать</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              💳 Оплата наличными или картой
            </p>
            <p className="text-green-600 font-semibold mt-2">
              Прозрачные цены, никаких скрытых доплат
            </p>
          </div>
        </div>
      </section>

      {/* Risks */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Риски самостоятельной чистки
            </h2>
            <p className="text-xl text-gray-700">
              Многие пользователи пытаются почистить ноутбук самостоятельно, но это часто приводит к плачевным последствиям:
            </p>
          </div>

          <div className="grid gap-4">
            {risks.map((risk, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{risk}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700 font-semibold">
              Доверяя чистку профессионалам, вы избавляете себя от этих рисков и получаете гарантированный результат.
            </p>
          </div>
        </div>
      </section>

      {/* Discounts */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Специальные предложения и скидки
            </h2>
            <p className="text-xl text-gray-600">
              Действующие на постоянной основе:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {discounts.map((discount, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-500 mr-2" />
                    {discount.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {discount.discount}
                  </div>
                  <p className="text-gray-600">{discount.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Вопросы и ответы (FAQ)
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

      {/* Guarantees */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Гарантии и обязательства
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{guarantee}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-gray-700">
              Мы работаем на репутацию и делаем все, чтобы вы остались довольны сотрудничеством. 
              Доверьте чистку своего ноутбука профессионалам и наслаждайтесь его безотказной работой!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы продлить жизнь вашему ноутбуку?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Запишитесь на профессиональную чистку прямо сейчас!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Записаться на чистку
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              Получить консультацию
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
            "name": "Профессиональная чистка ноутбуков в Минске",
            "description": "Продлите жизнь своей технике! Регулярное обслуживание предотвращает перегрев и сохраняет производительность",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Сервисный центр",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Минск"
              }
            },
            "areaServed": "Минск",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги чистки ноутбуков",
              "itemListElement": pricing.map((item, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": `Чистка ноутбука "${item.name}"`,
                  "description": item.description
                },
                "price": item.price.replace(' руб.', ''),
                "priceCurrency": "BYN"
              }))
            }
          })
        }}
      />
    </div>
  );
};

export default CleaningPage;