import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server : {
    proxy :{
      '/api': {
        target: 'https://animerch-tq0g.onrender.com',
        changeOrigin: true,
        secure: false
    }
  }
}
})
