import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /** Relativos em `dist/` — evita página em branco ao abrir o build sem servidor na raiz do domínio */
  base: './',
})
