'use client';

import { 
  Cpu, 
  CircuitBoard, 
  Thermometer, 
  Zap, 
  Wrench, 
  Microscope,
  TestTube,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageCircle,
  Search,
  Battery,
  Droplets,
  Settings,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CallbackModal from '@/components/modal/CallbackModal';
import { useState } from 'react';

const MotherboardRepairPage = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [modalType, setModalType] = useState('diagnostics');

  const symptoms = [
    {
      icon: Zap,
      title: 'No power / No POST',
      description: 'Ноутбук не подаёт признаков жизни, не проходит POST, крутит вентилятор и гаснет, есть мигание индикаторов/звук «писков»'
    },
    {
      icon: CircuitBoard,
      title: 'Чёрный экран',
      description: 'ОС не загружается, хотя питание есть: возможны проблемы с прошивкой, памятью, графикой или линиями питания'
    },
    {
      icon: AlertTriangle,
      title: 'Синий экран, зависания',
      description: 'Самопроизвольные выключения, не работают USB/HDMI/аудио, «не видит» зарядку или батарею'
    }
  ];

  const repairServices = [
    {
      title: 'Цепи питания',
      items: [
        'Поиск короткого замыкания',
        'Восстановление цепей DC-IN, +3/5V, VCORE, VGPU',
        'Замена контроллеров питания/заряда',
        'Замена DC-джеков, MOSFET/дросселей'
      ]
    },
    {
      title: 'Механический ремонт',
      items: [
        'Восстановление дорожек/площадок',
        'Замена разъёмов (USB-C/USB-A, HDMI, аудио)',
        'Юстировка шлейфовых коннекторов'
      ]
    },
    {
      title: 'BGA-работы',
      items: [
        'Снятие чипа, очистка площадки',
        'Реболл (reballing) со стентселем',
        'Правильный термопрофиль',
        'Промышленный подход к ремонту'
      ]
    },
    {
      title: 'Прошивка',
      items: [
        'Прошивка/восстановление BIOS/EC',
        'Восстановление после повреждения прошивки',
        'Embedded Controller ремонт'
      ]
    }
  ];

  const emergencySteps = [
    {
      step: '1',
      title: 'Немедленно обесточьте',
      description: 'Нажмите и удерживайте кнопку питания 10 секунд, отключите зарядник. Если аккумулятор съёмный — снимите.'
    },
    {
      step: '2',
      title: 'Уберите жидкость',
      description: 'Аккуратно промокните салфеткой. Не встряхивайте и не наклоняйте сильно.'
    },
    {
      step: '3',
      title: 'Зафиксируйте детали',
      description: 'Что пролилось, когда это произошло, включался ли после инцидента.'
    },
    {
      step: '4',
      title: 'Подготовьте к перевозке',
      description: 'Сложите ноутбук в «книжку», экраном вверх. Переносите горизонтально.'
    },
    {
      step: '5',
      title: 'Передайте в сервис',
      description: 'Как можно скорее. В промышленных условиях плата моется, устраняются очаги коррозии.'
    }
  ];

  const advantages = [
    'Компонентный ремонт и правильный реболл BGA вместо «прогрева»',
    'Оборудование для диагностики и микропайки, стенды под нагрузку',
    'Гарантия до 12 месяцев, официальный акт выполненных работ',
    'Честная смета до начала работ и фото/видеоотчёт по желанию'
  ];

  const pricing = [
    {
      type: 'Простые работы',
      description: 'Разъём питания, чарджер, мелкая пайка',
      price: 'от 60 BYN'
    },
    {
      type: 'Средняя сложность',
      description: 'VRM, мультиконтроллер, прошивка BIOS/EC',
      price: 'от 120 BYN'
    },
    {
      type: 'Сложные случаи',
      description: 'BGA/реболл, сложные короткие замыкания',
      price: 'от 200 BYN'
    }
  ];

  const comprehensiveFaq = [
    {
      question: 'Сколько стоит ремонт материнской платы ноутбука в Минске?',
      answer: 'Ориентиры: простые работы (разъём питания, чарджер, мелкая пайка) — от 60 BYN; средняя сложность (VRM, мультиконтроллер, прошивка BIOS/EC) — от 120 BYN; сложные случаи с BGA/реболлом — от 200 BYN и выше. Точную цену даём после диагностики модели и дефекта.'
    },
    {
      question: 'Какие симптомы указывают на неисправность материнской платы?',
      answer: 'Нет реакции на кнопку, циклические перезапуски, чёрный экран при наличии питания, «синие экраны», зависания под нагрузкой, неработающие USB/HDMI/аудио, нет заряда или батарея «не видна». Это сценарии No Power / No POST / No Video.'
    },
    {
      question: 'Что входит в диагностику?',
      answer: 'Замер дежурных линий (+3/+5/VCORE/VGPU), поиск коротких, проверка DC-IN и узла зарядки, тест мультиконтроллера/клавиатуры, чтение POST-логов, проверка и прошивка BIOS/EC, осмотр под микроскопом, стендовые тесты под нагрузкой.'
    },
    {
      question: 'Чем «реболл» отличается от «прогрева»?',
      answer: 'Прогрев — временная мера: шарики под BGA не меняются, дефект вернётся. Реболл — снятие чипа, очистка площадки, перекатка шаров и посадка по термопрофилю. Это промышленный способ восстановления BGA-узлов.'
    },
    {
      question: 'После залития ноутбук включается. Нести на ремонт?',
      answer: 'Да. Коррозия развивается под микросхемами даже при видимой работоспособности. Нужны разборка, мойка платы, локальная пайка. Чем раньше — тем дешевле и надёжнее.'
    },
    {
      question: 'Когда выгоднее заменить плату вместо ремонта?',
      answer: 'При сильной межслойной коррозии, множественных отрывах площадок, редких/дефицитных чипах. Подбираем совместимую плату по P/N и ревизии, переносим прошивки, тестируем под нагрузкой.'
    },
    {
      question: 'Данные на SSD/HDD сохранятся?',
      answer: 'В 99% случаев ремонт системной платы не затрагивает накопители. По запросу сделаем резервную копию.'
    },
    {
      question: 'Сколько по времени занимает ремонт?',
      answer: 'От 1 рабочего дня — простые случаи; 2–5 дней — BGA и сложные короткие. Возможен экспресс по согласованию.'
    },
    {
      question: 'Какие бренды вы обслуживаете?',
      answer: 'Lenovo, ASUS, Acer, HP, Dell, MSI, Apple, Xiaomi и другие. Для ультрабуков и игровых моделей учитываем конструктив и термопрофиль.'
    },
    {
      question: 'Делаете прошивку BIOS/EC?',
      answer: 'Да. Читаем дамп, корректируем ME-регион/серийники при необходимости, прошиваем BIOS/EC с верификацией. Часто это устраняет No POST/No Boot.'
    },
    {
      question: 'Можно вызвать курьера по Минску?',
      answer: 'Да. Курьер заберёт ноутбук, оформит приём и привезёт обратно после тестов. Для юрлиц — полный пакет документов.'
    },
    {
      question: 'Какая гарантия на работы?',
      answer: 'До 12 месяцев на выполненные работы и заменённые узлы. Условия фиксируются в акте.'
    },
    {
      question: 'Можно ли ремонтировать «на дому»?',
      answer: 'Микропайка, реболл и диагностика питания требуют лаборатории и стендов. На дому — только первичная оценка и вывоз.'
    },
    {
      question: 'Как подготовить ноутбук к сдаче в ремонт?',
      answer: 'Отключите пароли входа (если возможно), опишите симптомы и дату последнего включения, приложите зарядник. После залития не включайте и не заряжайте устройство.'
    }
  ];

  const handleDiagnosticsClick = () => {
    setModalType('diagnostics');
    setIsCallbackModalOpen(true);
  };

  const handleConsultationClick = () => {
    setModalType('consultation');
    setIsCallbackModalOpen(true);
  };

  const handleCourierClick = () => {
    setModalType('courier');
    setIsCallbackModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCallbackModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white text-navy-900 hover:bg-gray-100">
              Профессиональный ремонт
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ремонт и замена материнской платы ноутбука в Минске
            </h1>
            <p className="text-xl md:text-2xl text-navy-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Диагностика, компонентный ремонт, реболл BGA, прошивка BIOS/EC
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-navy-900 hover:bg-gray-100 px-8 py-4 text-lg"
                onClick={handleDiagnosticsClick}
              >
                <Phone className="w-5 h-5 mr-2" />
                Срочная диагностика
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-navy-900 hover:bg-white hover: px-8 py-4 text-lg"
                onClick={handleConsultationClick}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Бесплатная консультация
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-8 bg-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" />
            <p className="text-xl font-semibold">
              Даже небольшая неисправность системной платы быстро превращается в «тормоза», спонтанные перезапуски и в итоге в отказ ноутбука
            </p>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Когда нужна срочная диагностика материнской платы
            </h2>
            <p className="text-xl text-gray-600">
              Чаще всего владельцы приходят с такими симптомами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {symptoms.map((symptom, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-navy-100 rounded-lg group-hover:bg-navy-600 transition-colors">
                      <symptom.icon className="w-6 h-6 text-navy-600 group-hover:text-white" />
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

          <div className="mt-8 bg-navy-50 border border-navy-200 rounded-2xl p-6 text-center">
            <p className="text-navy-800 font-semibold">
              Если что-то из этого похоже на ваш случай, не гоняйте ноутбук «до последнего» — так проще и дешевле починить.
            </p>
          </div>
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что мы ремонтируем на материнских платах
            </h2>
            <p className="text-xl text-gray-600">
              Мы выполняем компонентный (а не только модульный) ремонт
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Wrench className="w-5 h-5 text-navy-600 mr-2" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-navy-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-navy-50 border border-navy-200 rounded-2xl p-6">
            <div className="flex items-start">
              <TestTube className="w-6 h-6 text-navy-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-navy-800 font-semibold">
                  После работ прогоняем стресс-тесты, проверяем все интерфейсы и выдаём акт с рекомендациями.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Стоимость ремонта материнской платы
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{item.type}</CardTitle>
                  <div className="text-2xl font-bold text-navy-600">{item.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Точную цену даём после диагностики модели и дефекта.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-16 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что делать, если ноутбук залили и он не включается
            </h2>
            <p className="text-xl text-gray-700">
              Быстрые действия до сервиса. Эти шаги уменьшают риск коррозии и повышают шанс на недорогой ремонт.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {emergencySteps.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-navy-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                      {step.step}
                    </div>
                  </div>
                  <CardTitle className="text-sm">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-xs">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white border border-navy-200 rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-navy-700 font-bold mb-3 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  НЕЛЬЗЯ:
                </h3>
                <ul className="text-navy-600 space-y-2 text-sm">
                  <li>• Включать/заряжать</li>
                  <li>• Сушить феном или в духовке</li>
                  <li>• Трясти, класть в рис</li>
                  <li>• Продолжать работу «пока держится»</li>
                </ul>
              </div>
              <div>
                <h3 className="text-navy-700 font-bold mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Можно и нужно:
                </h3>
                <ul className="text-navy-600 space-y-2 text-sm">
                  <li>• Обесточить</li>
                  <li>• Зафиксировать обстоятельства</li>
                  <li>• Как можно быстрее передать в сервис</li>
                  <li>• На промывку и диагностику</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Частые вопросы о ремонте материнской платы ноутбука
            </h2>
            <p className="text-xl text-gray-600">
              Коротко и по делу. Нажмите на интересующий вопрос или введите ключевое слово.
            </p>
          </div>

          <div className="space-y-4">
            {comprehensiveFaq.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-start cursor-pointer">
                    <Search className="w-5 h-5 text-navy-600 mr-3 mt-1 flex-shrink-0" />
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <div className="bg-navy-100 text-navy-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
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

      {/* Final CTA */}
      <section className="py-16 bg-navy-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Что дальше
          </h2>
          <p className="text-xl text-navy-100 mb-8">
            Приезжайте в сервис или вызовите курьера. Для предварительной оценки можете отметить симптомы в калькуляторе стоимости на сайте — получите ориентир по цене и срокам.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-navy-900 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={handleDiagnosticsClick}
            >
              <Phone className="w-5 h-5 mr-2" />
              Записаться на диагностику
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-navy-900 hover:bg-white hover: px-8 py-4 text-lg"
              onClick={handleCourierClick}
            >
              Вызвать курьера
            </Button>
          </div>
          <p className="text-navy-200 mt-6 text-sm">
            Диагностика при согласии на ремонт — бесплатно. Срок: от 1 дня.
          </p>
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
            ? "Запрос на диагностику материнской платы ноутбука" 
            : modalType === 'consultation'
            ? "Запрос на консультацию по ремонту материнской платы"
            : "Запрос на вызов курьера для диагностики материнской платы",
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
            "name": "Ремонт и замена материнской платы ноутбука в Минске",
            "description": "Профессиональный ремонт материнских плат ноутбуков: диагностика, компонентный ремонт, реболл BGA, прошивка BIOS/EC",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Five Service",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Минск"
              }
            },
            "areaServed": "Минск",
            "serviceType": "Motherboard Repair",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги ремонта материнских плат",
              "itemListElement": repairServices.map((service, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.title,
                  "description": service.items.join(", ")
                }
              }))
            }
          })
        }}
      />
    </div>
  );
};

export default MotherboardRepairPage;