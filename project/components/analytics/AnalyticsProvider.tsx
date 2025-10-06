// components/AnalyticsProvider.tsx
"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, ReactNode, Suspense } from 'react';

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

interface AnalyticsProviderProps {
  children: ReactNode;
  yandexCounterId?: number;
}

// Внутренний компонент для использования useSearchParams
function AnalyticsTracker({ 
  children, 
  yandexCounterId = 1234567 
}: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Отслеживание просмотров страниц
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ym && window.gtag) {
      const url = `${window.location.origin}${pathname}${searchParams ? `?${searchParams}` : ''}`;
      
      window.ym(yandexCounterId, 'hit', url);
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pathname,
        page_location: url,
      });
    }
  }, [pathname, searchParams, yandexCounterId]);

  // Обработка целевых кликов
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as Element).closest('[data-track-event]');
      
      if (target && typeof window !== 'undefined') {
        const eventName = target.getAttribute('data-track-event');
        
        if (eventName) {
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

// Основной компонент с Suspense
export function AnalyticsProvider(props: AnalyticsProviderProps) {
  return (
    <Suspense fallback={props.children}>
      <AnalyticsTracker {...props} />
    </Suspense>
  );
}