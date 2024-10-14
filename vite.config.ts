import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AnnaKharatova/rick-and-morty-universe.git',
  build: {
    outDir: 'build', // Изменяем outDir на 'build'
   }
})

