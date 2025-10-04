import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Страница не найдена (404) | Five Service - Ремонт ноутбуков в Минске',
  description: 'Запрашиваемая страница не найдена. Вернитесь на главную или свяжитесь с нами для ремонта ноутбука, чистки, замены экрана и других услуг в Минске.',
  keywords: '404, страница не найдена, ремонт ноутбуков Минск, чистка ноутбука, замена экрана, ремонт материнской платы',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Страница не найдена (404) | Five Service',
    description: 'Запрашиваемая страница не найдена. Ремонт ноутбуков в Минске с гарантией.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function NotFound() {

  const popularSections = [
    { name: 'Ремонт ноутбуков', href: '/services/laptop-repair' },
    { name: 'Чистка ноутбука', href: '/services/cleaning' },
    { name: 'Ремонт материнской платы', href: '/services/motherboard-repair' },
    { name: 'Рубрика Вопрос-Ответ', href: '/faq' },
    { name: 'Срочный ремонт', href: '/services/urgent-repair' },
    { name: 'Контакты и схема проезда', href: '/contacts' },
  ];

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('+375 (29) 734-90-77');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-20">
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Section - 404 Message */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
          <div className="max-w-md w-full">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-12 bg-navy-600 rounded-full mr-4"></div>
                <h1 className="text-6xl lg:text-7xl font-bold text-navy-900">
                  404
                </h1>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-4">
                Страница не найдена
              </h2>
              
              <p className="text-lg text-navy-600 mb-8 leading-relaxed">
                Такой страницы нет или она была перемещена. Можете вернуться на главную 
                или написать нам в Viber — ответим на ваши вопросы.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/"
                className="bg-navy-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-navy-800 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                На главную
              </Link>
              
              <div className="flex gap-2">
                <a
                  href="viber://chat?number=%2B375297349077"
                  className="flex-1 bg-white border border-navy-200 text-navy-700 px-6 py-4 rounded-xl font-semibold hover:bg-navy-50 transition-all duration-200 text-center"
                >
                  Viber
                </a>
                <a
                  href="https://t.me/fiveservice"
                  className="flex-1 bg-white border border-navy-200 text-navy-700 px-6 py-4 rounded-xl font-semibold hover:bg-navy-50 transition-all duration-200 text-center"
                >
                  Telegram
                </a>
              </div>
            </div>

            {/* Phone Number */}
            <div className="bg-navy-50 rounded-2xl p-6 border border-navy-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-navy-600 text-sm mb-1">Позвонить:</p>
                  <p className="text-xl font-bold text-navy-800">+375 (29) 734-90-77</p>
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-blue-700 text-sm">
                <span className="font-semibold">Проверьте адрес:</span> опечатки в URL случаются 
                чаще, чем кофе проливается на клавиатуру.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Popular Sections */}
        <div className="flex-1 bg-gradient-to-br from-navy-50 to-blue-50 flex items-center justify-center px-6 py-12 lg:py-0">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-100 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy-800 mb-2">
                Популярные разделы
              </h3>
              <p className="text-navy-600">
                Разделы справа обычно приводят к цели без приключений
              </p>
            </div>

            <div className="grid gap-3">
              {popularSections.map((section, index) => (
                <Link
                  key={section.name}
                  href={section.href}
                  className="group bg-white rounded-xl p-4 border border-navy-200 hover:border-navy-400 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-navy-800 group-hover:text-navy-900">
                      {section.name}
                    </span>
                    <svg 
                      className="w-5 h-5 text-navy-400 group-hover:text-navy-600 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}