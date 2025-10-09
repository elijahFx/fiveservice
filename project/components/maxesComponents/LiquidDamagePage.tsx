'use client';

import { 
  AlertTriangle, 
  Clock, 
  Shield, 
  Battery,
  Power,
  RotateCcw,
  Coffee,
  Beer,
  Droplets,
  Thermometer,
  Phone,
  MessageCircle,
  XCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LiquidDamagePage = () => {
  const emergencySteps = [
    {
      step: '1',
      icon: Power,
      title: 'Отключите питание',
      description: 'Обесточьте ноутбук. Отсоедините от зарядного устройства и извлеките аккумулятор'
    },
    {
      step: '2',
      icon: RotateCcw,
      title: 'Отсоедините устройства',
      description: 'Все внешние устройства: принтеры, жесткие диски, USB-флешки и мыши'
    },
    {
      step: '3',
      icon: Droplets,
      title: 'Промокните жидкость',
      description: 'Аккуратно промокните корпус сухой тканью или бумажным полотенцем'
    },
    {
      step: '4',
      icon: Thermometer,
      title: 'Переверните ноутбук',
      description: 'Переверните чтобы жидкость стекала и не проникала глубже в корпус'
    },
    {
      step: '5',
      icon: Phone,
      title: 'Обратитесь за помощью',
      description: 'Как можно скорее отнесите ноутбук в сервисный центр'
    }
  ];

  const liquids = [
    {
      type: 'Вода',
      icon: Droplets,
      danger: 'Средняя',
      description: 'Хотя вода считается относительно безвредной, даже небольшое количество (20-30 мл) может привести к серьёзным поломкам внутренних компонентов, включая материнскую плату.',
      consequences: 'Короткое замыкание, окисление контактов'
    },
    {
      type: 'Чай, кофе, сладкие напитки',
      icon: Coffee,
      danger: 'Высокая',
      description: 'Эти жидкости особенно опасны из-за содержания кислот и сахаров, которые могут привести к коррозии и липкости клавиш.',
      consequences: 'Коррозия плат, липкие клавиши, сахарный налёт'
    },
    {
      type: 'Пиво и алкоголь',
      icon: Beer,
      danger: 'Очень высокая',
      description: 'Несмотря на кажущуюся безвредность, пиво содержит кислоты, которые со временем могут разрушать электронные компоненты.',
      consequences: 'Разрушение компонентов, необходимость капитального ремонта'
    },
    {
      type: 'Кола и газировка',
      icon: AlertTriangle,
      danger: 'Критическая',
      description: 'Содержание ортофосфорной кислоты делает их чрезвычайно агрессивными в отношении электроники.',
      consequences: 'Мгновенная коррозия, необратимые повреждения'
    }
  ];

  const warnings = [
    'Самая большая ошибка многих пользователей — это попытка включить не просушенный ноутбук!',
    'Нельзя включать устройство, залитое агрессивной жидкостью, которая добралась до материнской платы',
    'Не сушите технику феном - только "поплавите" кнопки',
    'Если клавиатура залита - ее в 90% случаях нужно менять на новую!',
    'Дорожки кнопок клавиатуры не восстанавливаются'
  ];

  const consequences = [
    'Жидкостью разъедает все элементы на материнской плате',
    'Коррозия плат, восстановить которые будет невозможно',
    'Одна капля, попавшая на плату, может привести к короткому замыканию цепей',
    'Потеря данных с жесткого диска',
    'Необходимость замены клавиатуры и других компонентов'
  ];

  const services = [
    {
      service: 'Экстренная диагностика',
      description: 'Бесплатная диагностика в течение 30 минут',
      time: '30 мин'
    },
    {
      service: 'Чистка от коррозии',
      description: 'Профессиональная ультразвуковая чистка плат',
      time: '2-4 часа'
    },
    {
      service: 'Замена клавиатуры',
      description: 'Установка новой клавиатуры при необходимости',
      time: '1-2 часа'
    },
    {
      service: 'Ремонт материнской платы',
      description: 'Восстановление поврежденных компонентов',
      time: '1-3 дня'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Emergency Style */}
      <section className="relative bg-gradient-to-br from-red-900 to-orange-900 text-white py-20">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-red-500 hover:bg-red-600 text-white">
              ⚠️ СРОЧНЫЙ РЕМОНТ
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ремонт ноутбука залитого жидкостью
            </h1>
            <p className="text-xl md:text-2xl text-orange-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Оперативная помощь! Гарантии на выполненные работы
            </p>
            
            <div className="bg-red-600/50 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-white mr-3" />
                <span className="text-2xl font-bold">ГЛАВНОЕ — НЕ ВКЛЮЧАЙТЕ ЗАЛИТЫЙ НОУТБУК</span>
              </div>
              <p className="text-orange-200">
                Время работает против Вас! Немедленно принимайте меры.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                СРОЧНЫЙ ВЫЗОВ
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-900 px-8 py-4 text-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                КОНСУЛЬТАЦИЯ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="py-8 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" />
            <p className="text-xl font-semibold">
              В НОУТБУК ПОПАЛА ЖИДКОСТЬ? ПРОЛИЛИ ВОДУ, ЧАЙ, КОФЕ, НА КЛАВИАТУРУ НОУТБУКА?
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Внимательно прочтите наши рекомендации!
            </h2>
            <p className="text-xl text-gray-600">
              НОУТБУКИ С ЗАЛИТИЕМ ПРИНИМАЕМ СРОЧНО
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {emergencySteps.map((step, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow border-2 border-red-200">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                        {step.step}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg flex items-center justify-center">
                    <step.icon className="w-5 h-5 mr-2 text-red-600" />
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Critical Warnings */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Критически важные предупреждения
            </h2>
          </div>

          <div className="space-y-4">
            {warnings.map((warning, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-red-200">
                <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700 font-semibold">{warning}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-red-600 text-white rounded-2xl p-6 text-center">
            <p className="text-xl font-bold mb-2">ПОМНИТЕ: Время работает против Вас!</p>
            <p>Каждая минута промедления увеличивает стоимость ремонта</p>
          </div>
        </div>
      </section>

      {/* Liquids Damage */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Последствия залития ноутбука различными жидкостями
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {liquids.map((liquid, index) => (
              <Card key={index} className={`border-l-4 ${
                liquid.danger === 'Критическая' ? 'border-l-red-600' :
                liquid.danger === 'Очень высокая' ? 'border-l-orange-600' :
                liquid.danger === 'Высокая' ? 'border-l-amber-600' : 'border-l-blue-600'
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="flex items-center">
                      <liquid.icon className="w-6 h-6 mr-3" />
                      {liquid.type}
                    </CardTitle>
                    <Badge variant={
                      liquid.danger === 'Критическая' ? 'destructive' :
                      liquid.danger === 'Очень высокая' ? 'default' :
                      liquid.danger === 'Высокая' ? 'default' : 'secondary'
                    }>
                      {liquid.danger}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{liquid.description}</p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900">Последствия:</p>
                    <p className="text-sm text-gray-600">{liquid.consequences}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Not Wait */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему нельзя ждать и откладывать "на потом"?
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            {consequences.map((consequence, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <AlertTriangle className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{consequence}</span>
              </div>
            ))}
          </div>

          <div className="bg-white border border-orange-200 rounded-2xl p-6">
            <p className="text-orange-800 font-semibold text-center">
              Отключайте ноутбук от сети, снимайте батарею, звоните и привозите сразу в ремонт.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши услуги по восстановлению
            </h2>
            <p className="text-xl text-gray-600">
              В Five Service мы предлагаем экстренные услуги по восстановлению
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 rounded-2xl group-hover:bg-green-600 transition-colors">
                      <Clock className="w-8 h-8 text-green-600 group-hover:text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{service.service}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {service.time}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-blue-800 mb-4">
              <strong>Совет:</strong> Если ваш ноутбук подвергся воздействию любой из этих жидкостей, 
              необходимо как можно быстрее доставить его в сервисный центр.
            </p>
            <p className="text-blue-700">
              Помните, что стоимость ремонта значительно ниже стоимости нового устройства.
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

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <Shield className="w-6 h-6 mr-2" />
                  Гарантии качества
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Гарантия на все выполненные работы</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Использование качественных материалов</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Профессиональное оборудование</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Clock className="w-6 h-6 mr-2" />
                  Преимущества
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Оперативный ремонт</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Бесплатная диагностика</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Конфиденциальность данных</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Обратите внимание: Не каждый сервисный центр может оперативно предложить решение вашей проблемы. 
              В Five Service мы гарантируем быстрый и качественный ремонт, чтобы вы могли вернуться к полноценной 
              работе с вашим ноутбуком как можно скорее.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-700/50 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              НОУТБУК ЗАЛИТ ЖИДКОСТЬЮ?
            </h2>
            <p className="text-xl text-red-100 mb-6">
              Не теряйте время! Действуйте немедленно!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                <Phone className="w-5 h-5 mr-2" />
                ВЫЗВАТЬ КУРЬЕРА
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                СРОЧНАЯ КОНСУЛЬТАЦИЯ
              </Button>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-2xl font-bold mb-2">⏰ ВРЕМЯ РАБОТЫ ПРОТИВ ВАС</p>
            <p className="text-red-100">
              Каждая минута увеличивает риск необратимых повреждений. Действуйте сейчас!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiquidDamagePage;