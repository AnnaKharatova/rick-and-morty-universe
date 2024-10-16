import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `https://annakharatova.github.io/rick-and-morty-universe/`,
  build: {
    outDir: 'build', 
   }
})



