import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const pages = [
  {
    href: "/",
    title: "Главная",
  },
  {
    href: "/about",
    title: "О нас",
  },
  {
    href: "/services",
    title: "Все услуги",
  },
  {
    href: "/diagnostics",
    title: "Диагностика",
  },
  {
    href: "/services#cleaning",
    title: "Чистка",
  },
  {
    href: "/articles",
    title: "Полезные статьи",
  },
  {
    href: "/corporate",
    title: "Для юр. лиц",
  },
  {
    href: "/questions",
    title: "Вопросы",
  },
  {
    href: "/reviews",
    title: "Отзывы клиентов",
  },
  {
    href: "/service-rules",
    title: "Правила оказания услуг",
  },
  {
    href: "/privacy-policy",
    title: "Политика обработки персональных данных",
  },
  {
    href: "/calculator",
    title: "Калькулятор стоимости услуг",
  },
  {
    href: "/services/cleaning",
    title: "Чистка ноутбуков",
  },
    {
    href: "/services/caserepair",
    title: "Ремонт корпуса",
  },
    {
    href: "/services/batteryreplacement",
    title: "Замена батареи",
  },
    {
    href: "/services/diagnostics",
    title: "Услуга диагностики",
  },
    {
    href: "/services/liquiddamage",
    title: "Заливание ноутбука",
  },
  {
    href: "/services/powerconnection",
    title: "Разъём питания ноутбука",
  },
{
    href: "/services/keyboardreplacement",
    title: "Замена клавиатуры",
  },
  {
    href: "/services/motherboardrepair",
    title: "Ремонт материнской платы",
  },
  {
    href: "/services/software",
    title: "Программные услуги",
  },
  {
    href: "/services/screenreplacement",
    title: "Замена экрана",
  },
  {
    href: "/bonus-program",
    title: "Бонусная программа",
  },
  {
    href: "/buyback",
    title: "Скупка ноутбуков",
  },
];

const SiteMap = () => {
  return (
    <div className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sitemap-container">
          <input type="checkbox" id="sitemap-toggle" className="hidden peer" />
          <label
            htmlFor="sitemap-toggle"
            className="cursor-pointer py-4 flex items-center justify-between text-gray-400 hover:text-white transition-colors peer-checked:text-white"
          >
            <span className="font-semibold text-lg">Карта сайта</span>
            <div className="flex items-center">
              <ChevronDown className="w-5 h-5 peer-checked:hidden" />
              <ChevronUp className="w-5 h-5 hidden peer-checked:block" />
            </div>
          </label>

          <div className="hidden peer-checked:block pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                >
                  <h4 className="font-semibold text-white group-hover:text-navy-400 transition-colors mb-2">
                    {page.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;
