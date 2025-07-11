// next.config.mjs (или next.config.js — любой из форматов работает)
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // 🔀 проксируем все вызовы /api/** на настоящий бэк-энд
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://cinemate.ddns.net:8081/api/:path*',
      },
    ]
  },
}

export default nextConfig
