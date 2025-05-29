const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

// Simplified configuration with specific allowedHosts
module.exports = defineConfig({
  root: path.resolve('client'),
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve('client/src'),
      '@assets': path.resolve('attached_assets'),
      '@shared': path.resolve('shared'),
    },
  },
  server: {
    hmr: {
      clientPort: 443,
    },
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    cors: true,
    // Allow specific host that's causing the issue
    allowedHosts: [
      'all',
      '6cc9dda6-0ecf-4d89-99cd-915e5d31b57a-00-2xheci1p7q2j.riker.replit.dev'
    ],
  },
});