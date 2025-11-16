// components/analytics/SimpleAnalytics.tsx
"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function SimpleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Отслеживание просмотров страниц
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      
      if (window.ym) {
        window.ym(1234567, 'hit', url);
      }
      if (window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: pathname,
          page_location: url,
        });
      }
    }
  }, [pathname]);

  return null;
}