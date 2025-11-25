"use client";

import { useState, useMemo, lazy, Suspense } from "react";
import Image from "next/image";
import { Phone, MessageCircle, CheckCircle, Star, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

// Динамический импорт модального окна
const CallbackModal = lazy(() => import("@/components/modal/CallbackModal"));

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Мемоизация benefits для предотвращения ненужных пересозданий
  const benefits = useMemo(
    () => [
      { 
        text: "Ремонт за 1-3 дня", 
        icon: Clock,
        color: "text-blue-400"
      },
      { 
        text: "Средняя оценка 5,0", 
        icon: Star,
        color: "text-yellow-400"
      },
      { 
        text: "Гарантия до 12 месяцев", 
        icon: Shield,
        color: "text-green-400"
      },
    ],
    []
  );

  // Мемоизация обработчиков
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Компонент для Benefit item
  const BenefitItem = ({ benefit }: { benefit: typeof benefits[0] }) => {
    const IconComponent = benefit.icon;
    return (
      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
        <IconComponent className={`w-5 h-5 ${benefit.color} flex-shrink-0`} />
        <span className="text-white text-sm font-medium">{benefit.text}</span>
      </div>
    );
  };

  // Компонент для телефонных ссылок
  const PhoneLink = ({ number }: { number: string }) => (
    <a
      href={`tel:${number}`}
      className="text-white hover:text-blue-300 font-medium border-b border-white/40 hover:border-blue-300 transition-colors whitespace-nowrap hover:scale-105 transform"
    >
      {number}
    </a>
  );

  // Мемоизированные телефонные номера
  const phoneNumbers = useMemo(
    () => ["+375 44 753 47 96", "+375 25 784 97 31", "+375 17 24 24 111"],
    []
  );

  // Fallback для модального окна
  const ModalFallback = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4">
        <div className="flex justify-center mb-4">
          <div className="w-8 h-8 border-4 border-navy-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-center text-gray-600">Загрузка формы...</p>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-8">
      {/* Background Image с градиентным наложением */}
      <div className="absolute inset-0">
        <Image
          src="/main.webp"
          alt="Ремонт ноутбуков в сервисном центре FiveService"
          fill
          className="object-cover object-center scale-100 sm:scale-110 md:scale-105 lg:scale-100"
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRh4CAABXRUJQVlA4IBICAACwCACdASoWAAsAAAAAAwBQBOgCdAFAAAAAA+g=="
          style={{
            objectPosition: "center 30%"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-blue-900/70 to-purple-900/60" />
        {/* Анимированные элементы фона */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-blue-500/10 via-transparent to-purple-500/10 animate-spin-slow" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-conic from-green-500/10 via-transparent to-yellow-500/10 animate-spin-slow reverse" />
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse" />
        <div className="absolute top-16 right-20 w-6 h-6 bg-green-400/20 rounded-full animate-bounce delay-300" />
        <div className="absolute top-40 left-1/4 w-3 h-3 bg-yellow-400/40 rounded-full animate-ping" />
        <div className="absolute top-32 right-16 w-5 h-5 bg-purple-400/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-4 h-4 bg-cyan-400/25 rounded-full animate-bounce delay-700" />
        <div className="absolute bottom-24 right-10 w-3 h-3 bg-orange-400/35 rounded-full animate-pulse delay-500" />
      </div>

      {/* Content с увеличенными отступами */}
      <div className="relative  z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full mt-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Основной заголовок с увеличенными отступами */}
          <div className="mb-6 sm:mb-12">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-8 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 block">
                Ремонт ноутбуков
              </span>
              <span className="block mt-2 sm:mt-4 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                в Минске за 1 день
              </span>
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto px-2">
              <span className="font-semibold text-white">13+ лет опыта</span> • Официальные гарантии • 
              Аккуратная работа с платами
            </p>
          </div>

          {/* Benefits Grid с увеличенным отступом */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-12 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <BenefitItem key={index} benefit={benefit} />
            ))}
          </div>

          {/* CTA Buttons с увеличенным отступом */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 min-h-[56px] sm:min-h-[64px] w-full sm:w-auto"
              asChild
            >
              <a href="tel:+375297349077" className="flex items-center justify-center">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="text-base sm:text-lg">+375 29 734 90 77</span>
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-navy-900 px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[56px] sm:min-h-[64px] w-full sm:w-auto"
              onClick={openModal}
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-base sm:text-lg">Оставить заявку</span>
            </Button>
          </div>

          {/* Trust Indicators с увеличенным отступом */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-8 text-xs sm:text-base text-gray-300 mb-6 sm:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span>25.000+ довольных клиентов</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span>Гарантия до 12 месяцев</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span>Рейтинг 5.0 на основе 312 отзывов</span>
            </div>
          </div>

          {/* Additional Phones с увеличенным отступом */}
          <div className="mt-6 sm:mt-12 p-4 sm:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-md mx-auto">
            <p className="text-gray-100 font-medium mb-3 sm:mb-4 text-sm sm:text-lg">
              Дополнительные номера:
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm sm:text-lg flex-wrap">
              {phoneNumbers.map((number, index) => (
                <PhoneLink key={index} number={number} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal с Suspense */}
      {isModalOpen && (
        <Suspense fallback={<ModalFallback />}>
          <CallbackModal isOpen={isModalOpen} onClose={closeModal} />
        </Suspense>
      )}
    </section>
  );
};

export default Hero;