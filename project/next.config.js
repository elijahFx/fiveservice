/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
    typescript: {
    ignoreBuildErrors: true, // Игнорировать ошибки при сборке
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
