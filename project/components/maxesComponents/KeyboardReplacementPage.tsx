'use client';

import { 
  Keyboard, 
  Wrench, 
  Shield, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const KeyboardReplacementPage = () => {
  const problems = [
    'Клавиатура внезапно перестала работать',
    'Не работают несколько отдельных кнопок',
    'Пролита жидкость на клавиатуру',
    'Ноутбук упал, после чего клавиатура вышла из строя',
    'Клавиши залипают или не реагируют на нажатия'
  ];

  const temporarySolutions = [
    'Использование внешней USB-клавиатуры',
    'Экранная клавиатура в операционной системе',
    'Подключение по Bluetooth'
  ];

  const replacementTypes = [
    {
      type: 'Накладная клавиатура',
      description: 'Быстрая замена без полной разборки ноутбука',
      price: '35-180 руб.',
      features: [
        'Не требует полной разборки',
        'Время замены: 30-60 минут',
        'Подходит для большинства моделей'
      ]
    },
    {
      type: 'Припаянная клавиатура',
      description: 'Сложная замена с полной разборкой ноутбука',
      price: 'Уточняйте стоимость',
      features: [
        'Требует полной разборки ноутбука',
        'Демонтаж материнской платы и системы охлаждения',
        'Специальное оборудование для пайки',
        'Время замены: 2-4 часа'
      ]
    }
  ];

  const priceFactors = [
    'Наличие подсветки клавиш',
    'Цветовые решения и дизайн',
    'Редкость модели ноутбука в регионе',
    'Качество используемого пластика',
    'Сложность конструкции'
  ];

  const guarantees = [
    'Гарантия на клавиатуру - до 12 месяцев',
    'Гарантия на работу - 3 месяца',
    'Оригинальные и совместимые запчасти',
    'Бесплатная диагностика',
    'Конфиденциальность данных'
  ];

  const faq = [
    {
      question: 'У меня не работают несколько кнопок. Необходимо ли менять всю клавиатуру?',
      answer: 'Как правило, если перестают работать отдельные кнопки клавиатуры, требуется её полная замена. В большинстве случаев проблему не удаётся решить заменой отдельной кнопки или её механизма, так как клавиатура состоит из двух слоёв плёнки с нанесёнными токопроводящими дорожками. Эти элементы формируют электрическую схему, которая не подлежит восстановлению в случае повреждения.'
    },
    {
      question: 'Можно ли починить клавиатуру после пролития жидкости?',
      answer: 'В большинстве случаев после попадания жидкости клавиатура не подлежит ремонту и требует замены. Жидкость вызывает коррозию контактов и замыкание токопроводящих дорожек.'
    },
    {
      question: 'Сколько времени занимает замена клавиатуры?',
      answer: 'Замена накладной клавиатуры занимает 30-60 минут, припаянной клавиатуры - 2-4 часа. Время может варьироваться в зависимости от модели ноутбука.'
    },
    {
      question: 'Как определить тип клавиатуры в моём ноутбуке?',
      answer: 'Наши специалисты проведут бесплатную диагностику и определят тип клавиатуры. Большинство современных ноутбуков используют накладные клавиатуры.'
    },
    {
      question: 'Даёте ли вы гарантию на заменённую клавиатуру?',
      answer: 'Да, мы предоставляем гарантию до 12 месяцев на клавиатуру и 3 месяца на выполненные работы.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500 hover:bg-blue-600">
              Срочный ремонт
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Замена клавиатуры в ноутбуке с гарантией в Минске
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Вернем удобство работы с ноутбуком! Профессиональная замена клавиатуры любой сложности
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Срочный ремонт
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 text-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Бесплатная диагностика
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Клавиатура ноутбука перестала работать?
            </h2>
            <p className="text-xl text-gray-600">
              Часто бывает, что клавиатура ноутбука внезапно перестаёт работать, что доставляет много неудобств.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Распространенные проблемы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {problems.map((problem, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{problem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Clock className="w-6 h-6 mr-2" />
                  Временные решения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Конечно, можно временно использовать внешнюю клавиатуру от стационарного компьютера, 
                  но это неудобно, если нужно взять ноутбук с собой.
                </p>
                <ul className="space-y-2">
                  {temporarySolutions.map((solution, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{solution}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Wrench className="w-8 h-8 text-orange-600 mr-3" />
              Первые действия при неисправности
            </h3>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-4">
                <strong>Проблемы часто возникают из-за физического воздействия</strong> — например, если ноутбук упал или на него пролилась жидкость. 
                В первую очередь важно убедиться, что повреждений нет.
              </p>
              <p>
                Если внешние повреждения отсутствуют и перезагрузка ноутбука не помогла, попробуйте следующее: 
                удалите драйвер клавиатуры через диспетчер устройств и затем обновите устройства, чтобы система 
                автоматически переустановила драйвер.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Частые вопросы
            </h2>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                  Q
                </span>
                У меня не работают несколько кнопок. Необходимо ли менять всю клавиатуру?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                  A
                </span>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    В сервисные центры часто поступают обращения с тем, что не работает одна-две кнопки на клавиатуре.
                  </p>
                  <p className="mt-2">
                    Как правило, если перестают работать отдельные кнопки клавиатуры, требуется её полная замена. 
                    В большинстве случаев проблему не удаётся решить заменой отдельной кнопки или её механизма, 
                    так как клавиатура состоит из двух слоёв плёнки с нанесёнными токопроводящими дорожками. 
                    Эти элементы формируют электрическую схему, которая не подлежит восстановлению в случае повреждения.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {faq.slice(1).map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                      Q
                    </span>
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                      A
                    </span>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Replacement Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Типы замены клавиатуры
            </h2>
            <p className="text-xl text-gray-600">
              Стоимость работ по замене клавиатуры можно разделить на две основные ценовые категории
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {replacementTypes.map((type, index) => (
              <Card key={index} className={`text-center ${
                index === 0 ? 'ring-2 ring-green-500' : 'ring-2 ring-blue-500'
              }`}>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center justify-center">
                    <Keyboard className="w-8 h-8 mr-3" />
                    {type.type}
                  </CardTitle>
                  <div className={`text-3xl font-bold ${
                    index === 0 ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {type.price}
                  </div>
                  <p className="text-gray-600">{type.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-left">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Узнать точную стоимость</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Price Factors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Факторы влияющие на стоимость
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priceFactors.map((factor, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-gray-700">{factor}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Кроме того, цена замены клавиатуры может увеличиваться в зависимости от наличия подсветки, 
              цветовых решений, редкости модели ноутбука в данном регионе, а также качества используемого пластика. 
              Эти факторы добавляют дополнительные сложности в процесс замены и влияют на стоимость услуги.
            </p>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши гарантии
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Верните удобство работы с ноутбуком!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Получите бесплатную диагностику и точную стоимость замены клавиатуры
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Заказать замену
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
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
            "name": "Замена клавиатуры в ноутбуке с гарантией в Минске",
            "description": "Профессиональная замена клавиатуры любой сложности. Гарантия до 12 месяцев.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Five Service",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Минск"
              }
            },
            "areaServed": "Минск",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги замены клавиатур",
              "itemListElement": replacementTypes.map((item, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": item.type,
                  "description": item.description
                },
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": item.price === 'Уточняйте стоимость' ? '0' : item.price.replace(' руб.', '').split('-')[0],
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

export default KeyboardReplacementPage;