/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig = {
  // Базовые настройки
  trailingSlash: false,
  
  // Оптимизации сборки
  eslint: {
    ignoreDuringBuilds: false, // Лучше включить и исправить ошибки
  },
  
  // Критически важная оптимизация изображений
  images: { 
    unoptimized: false, // ВКЛЮЧИТЬ оптимизацию изображений!
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Будьте осторожнее с этим в продакшене
      },
    ],
    formats: ['image/webp', 'image/avif'], // Современные форматы
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней кэша
  },
  
  // Экспериментальные оптимизации
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog", 
      "@radix-ui/react-dropdown-menu",
      // Добавьте другие тяжелые библиотеки
    ],
    // Новые оптимизации
    optimizeCss: true, // Оптимизация CSS
    nextScriptWorkers: false, // Можно попробовать включить
  },
  
  // Оптимизации производительности
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Настройки TypeScript - ОТКЛЮЧЕНА ПРОВЕРКА
  typescript: {
    ignoreBuildErrors: true, // ПРОВЕРКА TYPESCRIPT ОТКЛЮЧЕНА
  },
  
  // Оптимизации для продакшена
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
  productionBrowserSourceMaps: false, // Отключить source maps в продакшене
  
  // Расширенные оптимизации сборки
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Удалить console.log в продакшене
    reactRemoveProperties: process.env.NODE_ENV === 'production', // Удалить React-пропсы в продакшене
  },
  
  // Безопасность и заголовки
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options', 
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Добавьте performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Отдельные правила для статики
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|gif|ico|webp|avif|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 1 день для изображений
          },
        ],
      },
    ];
  },
  
  // Оптимизация импортов
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
      preventFullImport: true,
      skipDefaultConversion: true,
    },
    // Добавьте другие библиотеки
    "@radix-ui/react-dialog": {
      transform: "@radix-ui/react-dialog/{{member}}",
      preventFullImport: true,
    },
    "@radix-ui/react-dropdown-menu": {
      transform: "@radix-ui/react-dropdown-menu/{{member}}", 
      preventFullImport: true,
    },
  },
  
  // Разное
  outputFileTracingRoot: __dirname,
  
  // Оптимизация кэширования (для standalone output)
  output: 'standalone', // Если используете Docker/сервер
  
  // Включить SWC минификацию (уже по умолчанию)
};

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(withPWA(nextConfig));
} else {
  module.exports = withPWA(nextConfig);
}