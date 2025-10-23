'use client';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';

const QuestionsList = () => {
  const workProcessQuestions = [
    {
      question: "Сколько времени занимает диагностика?",
      answer: "Диагностика занимает от 1 до 2 дней в зависимости от сложности случая...",
      href: "/questions/repairtime"
    },
    {
      question: "Как происходит согласование стоимости?",
      answer: "После диагностики мы предоставляем детальную смету работ и запчастей...",
      href: "/questions/pricerepair"
    },
    {
      question: "Какие документы вы предоставляете?",
      answer: "Мы оформляем заказ-наряд при приеме техники и даем гарантию на работы...",
      href: "/questions/warranty"
    },
    {
      question: "С какими брендами работаете?",
      answer: "Lenovo, ASUS, Acer, HP, Dell, MSI, Apple, Xiaomi и другие. Игровые и ультрабуки...",
      href: "/questions/brands"
    },
    {
      question: "Есть ли бесплатный курьер по Минску?",
      answer: "Да. Заберём устройство и привезём обратно после ремонта. Удобно и быстро...",
      href: "/questions/courier"
    },
    {
      question: "Сохранятся ли мои данные на диске?",
      answer: "Да, в 99% случаев. Работы с платой или системой охлаждения не затрагивают SSD/HDD...",
      href: "/questions/datasafety"
    },
    {
      question: "Залили ноутбук - что делать прямо сейчас?",
      answer: "Срочно: отключите питание, не сушите феном, не пытайтесь включать. Несите на профессиональную мойку...",
      href: "/questions/liquiddamage"
    },
    {
      question: "Выезжаете ли на дом или офис?",
      answer: "Нет. На дому невозможно выполнить профессиональный ремонт техники. Для сложных работ нужна лаборатория...",
      href: "/questions/onsiterepair"
    },
    {
      question: "Греется и шумит - это опасно?",
      answer: "Да, перегрев приводит к деградации чипов. Рекомендуем чистку системы охлаждения...",
      href: "/questions/overheating"
    },
    {
      question: "Оригинальные запчасти или аналоги?",
      answer: "Ставим оригинал либо качественный аналог по согласованию. Всегда тестируем совместимость...",
      href: "/questions/partsquality"
    },
    {
      question: "Какие способы оплаты? Работаете с юрлицами?",
      answer: "Наличные и карта. Для юрлиц - УПД/акт, безналичный расчёт, гарантийные обязательства...",
      href: "/questions/paymentmethods"
    },
    {
      question: "Не заряжается / шатается разъем питания?",
      answer: "Часто требуется замена DC-разъёма или ремонт узла зарядки. Сделаем аккуратно, без «скруток»...",
      href: "/questions/powerconnector"
    },
    {
      question: "Экран треснул или мерцает - что делать?",
      answer: "Трещины - только замена матрицы. Мерцание или полосы - проверим шлейф, подсветку, видеочип...",
      href: "/questions/screenrepair"
    },
    {
      question: "Ноутбук тормозит - поможет ли SSD?",
      answer: "Да, переход на SSD ускоряет загрузку и работу в 3–5 раз. Установим SSD, перенесём систему и данные...",
      href: "/questions/ssdupgrade"
    },
    {
      question: "Можно срочно сегодня/завтра?",
      answer: "Да, делаем экспресс-работы по предварительному согласованию и наличию мастера и деталей...",
      href: "/questions/urgentrepair"
    },
    {
      question: "Платная ли диагностика?",
      answer: "Диагностика — 55 BYN. При согласии на ремонт не оплачивается. Диагностика может длиться до...",
      href: "/questions/diagnosticprice"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
          <p className="text-lg text-gray-600">Найдите ответы на самые популярные вопросы о ремонте ноутбуков</p>
        </div>

        {/* Carousel */}
        <div className="mb-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {workProcessQuestions.map((item, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 group bg-white border border-gray-200 h-full flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-navy-600 transition-colors line-clamp-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3">
                      {item.answer}
                    </p>
                    <Link 
                      href={item.href}
                      className="text-navy-600 hover:text-navy-700 font-semibold text-sm transition-colors inline-flex items-center mt-auto"
                    >
                      Узнать больше
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default QuestionsList;