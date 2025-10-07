import Link from 'next/link';
import { ClickableAddress } from '@/components/ui/clickable-address';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <span className="font-bold text-xl">FiveService</span>
            </div>
            <p className="text-gray-400 mb-4">
              Профессиональный ремонт ноутбуков в Минске с гарантией качества.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>УНП 193013342</p>
              <p>ООО {`"Наши инновации"`}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-navy-400" />
                <ClickableAddress 
                  address="г. Минск, ул. Восточная, 129"
                  className="text-sm"
                  showIcon={false}
                />
              </div>
              <a href="" className="text-sm text-gray-400 hover:text-blue-200 transition-colors ml-6">
                Как к нам пройти
              </a>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-navy-400" />
                <a href="tel:+375297349077" className="text-sm hover:text-navy-400">
                  +375 29 734 90 77
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-navy-400" />
                <a href="tel:+375447534796" className="text-sm hover:text-navy-400">
                  +375 44 753 47 96
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-navy-400" />
                <a href="tel:+375257849731" className="text-sm hover:text-navy-400">
                  +375 25 784 97 31
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-navy-400" />
                <a href="tel:+375172424111" className="text-sm hover:text-navy-400">
                  +375 17 24 24 111
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-navy-400" />
                <a href="mailto:friends.service129@gmail.com" className="text-sm hover:text-navy-400">
                  friends.service129@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-navy-400" />
                <span className="text-sm">пн.-пт. 9:00-19:00</span>
                <span className="text-sm">сб.-вс. 10:00-16:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Быстрые ссылки</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                О нас
              </Link>
              <Link href="/services" className="block text-sm text-gray-400 hover:text-white">
                Все услуги
              </Link>
              <Link href="/articles" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Полезные статьи
              </Link>
              <Link href="/corporate" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Для юр. лиц
              </Link>
              <Link href="/questions" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Вопросы
              </Link>
              <Link href="/reviews" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Отзывы клиентов
              </Link>
                <Link href="/privacy-policy" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Политика обработки персональных данных
              </Link>
               <Link href="/service-rules" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Правила оказания услуг и ремонта <br /> ООО «Наши инновации»
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Услуги</h3>
            <div className="space-y-2">
              <Link href="/services#diagnostics" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Диагностика
              </Link>
              <Link href="/services#cleaning" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Чистка
              </Link>
              <Link href="/services#component-repair" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Ремонт компонентов
              </Link>
              <Link href="/services#component-replacement" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Замена компонентов
              </Link>
              <Link href="/services#software-services" className="block text-sm text-gray-400 hover:text-blue-200 transition-colors">
                Программные услуги
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 FiveService. Все права защищены.
          </p>

           <div className="pt-4">
            <p className="text-xs text-gray-500">
             Сайт разработан командой{' '}
              <a 
                href="https://флоу.бел" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-navy-400 transition-colors underline"
              >
                флоу.бел
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





{/* Добавленная надпись о разработчике 
         



*/}