'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { ChevronUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Динамический импорт модального окна
const CallbackModal = lazy(() => import('@/components/modal/CallbackModal'));

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fallback для модального окна
  const ModalFallback = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4">
        <div className="flex justify-center mb-4">
          <div className="w-8 h-8 border-4 border-navy-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-center text-gray-600">Загрузка формы...</p>
      </div>
    </div>
  );

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Кнопка обратной связи */}
      <Button
        onClick={openModal}
        className="fixed bottom-20 right-6 z-50 w-12 h-12 rounded-full bg-navy-600 hover:bg-navy-700 shadow-lg hover:shadow-xl transition-all duration-300 p-0 group"
        aria-label="Оставить заявку"
      >
        <MessageCircle className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
      </Button>

      {/* Кнопка прокрутки наверх */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-navy-600 hover:bg-navy-700 shadow-lg hover:shadow-xl transition-all duration-300 p-0 group"
        aria-label="Вернуться наверх"
      >
        <ChevronUp className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
      </Button>

      {/* Модальное окно */}
      {isModalOpen && (
        <Suspense fallback={<ModalFallback />}>
          <CallbackModal
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </Suspense>
      )}
    </>
  );
};

export default ScrollToTop;