// components/AnalyticsProvider.tsx
"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

// Объявляем глобальные функции аналитики для TypeScript
declare global {
  interface Window {
    ym: (
      counterId: number,
      action: string,
      value: string,
      params?: any
    ) => void;
    gtag: (command: string, action: string, params?: any) => void;
  }
}

// Если используете глобальные переменные без window
declare const ym: (
  counterId: number,
  action: string,
  value: string,
  params?: any
) => void;
declare const gtag: (command: string, action: string, params?: any) => void;

interface AnalyticsProviderProps {
  children: ReactNode;
  yandexCounterId?: number; // Можно передавать ID счетчика через пропсы
}

export function AnalyticsProvider({ 
  children, 
  yandexCounterId = 1234567 // Значение по умолчанию
}: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Отслеживание просмотров страниц
  useEffect(() => {
    // Проверяем, что мы в браузере и функции аналитики доступны
    if (typeof window !== 'undefined' && window.ym && window.gtag) {
      // Меняем URL в метриках при смене маршрута
      window.ym(yandexCounterId, 'hit', window.location.href);
      window.gtag('event', 'page_view');
    }
  }, [pathname, searchParams, yandexCounterId]);

  // Обработка целевых кликов
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as Element).closest('[data-track-event]');
      
      if (target && typeof window !== 'undefined') {
        const eventName = target.getAttribute('data-track-event');
        
        if (eventName) {
          // Отправляем событие в метрики
          if (window.ym) {
            window.ym(yandexCounterId, 'reachGoal', eventName);
          }
          if (window.gtag) {
            window.gtag('event', eventName);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [yandexCounterId]);

  return <>{children}</>;
}