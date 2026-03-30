import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "#components": path.resolve(__dirname, './src/components'),
      "#constants": path.resolve(__dirname, './src/constants'),
      "#store": path.resolve(__dirname, './src/store'),
      "#hoc": path.resolve(__dirname, './src/hoc'),
      "#windows": path.resolve(__dirname, './src/windows'),
      "@": path.resolve(__dirname, './src'),
    },
  },
})
