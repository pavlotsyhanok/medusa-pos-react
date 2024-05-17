// Importing withPWA from the next-pwa package
import withPWA from 'next-pwa';

const nextConfig = {
  dest: 'public',
//   disable: process.env.NODE_ENV === 'development',  // Disable PWA in development to avoid caching issues
  register: true,
  skipWaiting: true,
};

// Wrap your existing Next.js configuration with withPWA
export default withPWA(nextConfig);