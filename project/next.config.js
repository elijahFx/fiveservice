/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
    typescript: {
    ignoreBuildErrors: true, // Игнорировать ошибки при сборке
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
