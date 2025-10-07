import { Metadata } from 'next';
import { Phone, MessageCircle, CircleCheck as CheckCircle, QrCode, FileText, Headphones } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Бонусная программа для организаций | FiveService',
  description: 'Скидка от 25 до 30% на ремонт ноутбуков для сотрудников вашей организации',
};

export default function BonusProgramPage() {
  return (
    <div className="min-h-screen bg-gray-50 mt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-navy-50 rounded-2xl p-8 md:p-12 text-center border border-navy-200 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Бонусная программа для работников организаций
          </h1>

          <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed">
            Даём вашим сотрудникам скидку
            <span className="text-navy-600 font-bold"> от 25 до 30% </span>
            на все выполненные работы по ремонту ноутбуков и компьютеров
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Как это работает
          </h2>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-navy-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Шаг 1: Заключение договора
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  После заключения договора, для Вашей организации создаётся на нашем портале интернет страничка с интерактивной функцией оформления заказа.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-navy-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Шаг 2: Размещение QR-кода
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  У Вас в организации размещается, согласованный с Вами, небольшой постер с QR-кодом. При сканировании которого, работник переходит на созданную для Вас страницу, где оставляет заказ на ремонт личного ноутбука или компьютера, с выбором формы доставки, и своей контактной информации.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-navy-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Шаг 3: Консультация специалиста
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Далее, с Вашим сотрудником пообщается наш специалист, который уточнит проблему, для подготовки возможных запасных частей, что бы сделать ремонт максимально быстро.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-navy-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Результат: Реальная экономия
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Работник получает действительную скидку <span className="font-semibold text-navy-600">от 25 до 30%</span> на все выполненные работы.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-navy-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Заинтересованы в подключении бонусной программы?
          </h3>
          <p className="text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
            Свяжитесь с нами для получения индивидуального предложения и заключения договора
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+375297349077"
              className="inline-flex items-center px-8 py-4 bg-white text-navy-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              +375 29 734 90 77
            </a>
            <a
              href="https://t.me/fiveservice_by"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Telegram
            </a>
            <a
              href="viber://add?number=375447534796"
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Viber
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
