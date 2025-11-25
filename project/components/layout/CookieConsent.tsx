'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const sessionConsent = sessionStorage.getItem('cookie-consent-shown');
    const permanentConsent = localStorage.getItem('cookie-consent');
    
    if (!sessionConsent && !permanentConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = `cookie-consent=accepted; expires=${date.toUTCString()}; path=/`;
    sessionStorage.setItem('cookie-consent-shown', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    sessionStorage.setItem('cookie-consent-shown', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 animate-in slide-in-from-bottom duration-500 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:max-w-md">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 backdrop-blur-sm bg-white/95">
        <div className="p-4 sm:p-6">
          {/* Иконка и заголовок */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-navy-500 rounded-full flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-navy-900 font-semibold text-sm sm:text-base mb-1">
                Мы используем cookie
              </h3>
              <p className="text-navy-700 text-xs sm:text-sm leading-relaxed">
                Это нужно для корректной работы сайта и улучшения вашего опыта. 
                Вы можете отказаться или применить настройки.
              </p>
            </div>
          </div>

          {/* Кнопки - вертикально на мобильных, горизонтально на десктопе */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
			  <button
              onClick={acceptCookies}
              className="flex-1 px-4 py-3 sm:py-2.5 bg-navy-600 text-white text-sm font-medium 
                       rounded-lg hover:bg-navy-700 transform hover:scale-[1.02] 
                       transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              Принять
            </button>
            <button
              onClick={declineCookies}
              className="flex-1 px-4 py-3 sm:py-2.5 text-sm font-medium text-navy-600 hover:text-navy-800 
                       border border-navy-200 rounded-lg hover:border-navy-300 
                       transition-all duration-200 hover:shadow-sm active:scale-95"
            >
              Отказаться
            </button>
          </div>

          {/* Ссылка на политику */}
          <div className="mt-3 text-center">
            <Link 
              href="/privacy-policy" 
              className="text-navy-500 hover:text-navy-700 text-xs transition-colors duration-200 inline-block"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;