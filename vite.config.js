import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["moment/locale/es.js"], // 🔥 Asegura que Vite incluya el idioma español
  },
})
