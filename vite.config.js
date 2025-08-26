import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: './web-demo',
  resolve: {
    alias: [
      {
        find: /^react-native$/,
        replacement: 'react-native-web',
      },
      {
        find: /^react-native-svg$/,
        replacement: 'react-native-svg-web',
      },
      {
        find: '../src',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
    extensions: ['.web.js', '.web.ts', '.web.tsx', '.js', '.ts', '.tsx', '.json'],
  },
  define: {
    global: 'globalThis',
    __DEV__: JSON.stringify(true),
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-native-web', 'react-native-svg-web'],
    exclude: ['react-native', 'react-native-svg'],
  },
  server: {
    host: '0.0.0.0', // Allow connections from any IP address
    port: 3000,
    open: true,
  },
});
