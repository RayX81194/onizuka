import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/onizuka',
  server: {
    host: '0.0.0.0'  // or 'localhost' or your desired host
  }
})
