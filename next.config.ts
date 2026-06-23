import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Menangkap semua request frontend yang mengarah ke /api/...
        source: '/api/:path*', 
        // Meneruskannya ke backend Spring Boot kamu
        destination: 'http://localhost:8081/api/:path*', 
      },
    ];
  },
};

export default nextConfig;