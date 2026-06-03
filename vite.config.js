import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 5510,
    proxy: {
      '/api': 'http://127.0.0.1:5511'
    }
  }
})
