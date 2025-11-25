// components/layout/LazyCookieConsent.tsx
"use client";

import dynamic from 'next/dynamic';

const LazyCookieConsent = dynamic(
  () => import('./CookieConsent'),
  {
    ssr: false,
    loading: () => null,
  }
);

export default LazyCookieConsent;