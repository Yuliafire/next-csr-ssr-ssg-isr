import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Export as static site
  images: {
    unoptimized: true, // Disable Next.js image optimization (not supported on GitHub Pages)
  },
};

export default nextConfig;