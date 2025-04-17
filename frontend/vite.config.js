import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server : {
    proxy :{
      '/api': {
        target: 'https://campusconnect-hc79.onrender.com',
        changeOrigin: true,
        secure: false
    }
  }
}
})