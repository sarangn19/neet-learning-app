import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'remove-favicon',
      transformIndexHtml(html) {
        return html.replace(/<link[^>]*rel=["']icon["'][^>]*>/gi, '')
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
