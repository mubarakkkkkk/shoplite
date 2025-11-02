import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false, 
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          state: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['lucide-react', 'framer-motion']
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  base: './',
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})