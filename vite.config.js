import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages uses /portfolio/, while Vercel/Render and local Vite use /
  base: process.env.GITHUB_ACTIONS ? '/portfolio/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'docs',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
