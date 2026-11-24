import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const previa = process.env.VITE_PREVIA === '1'
// no GitHub Pages o site fica em /CICLO-REDE-RECIFE/; em outros lugares, na raiz
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base: previa ? './' : base,
  plugins: [
    react(),
    !previa && VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'MOVE RECIFE',
        short_name: 'MOVE RECIFE',
        description: 'Destrave o caminho, mova a cidade.',
        lang: 'pt-BR',
        start_url: base,
        scope: base,
        display: 'standalone',
        background_color: '#FBF5E9',
        theme_color: '#1F4E8C',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }]
      },
      workbox: {
        navigateFallback: base + 'index.html',
        // guarda os pedaços do mapa já vistos para funcionar sem internet
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[abc]?\.?tile\.openstreetmap\.org\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'mapa', expiration: { maxEntries: 600, maxAgeSeconds: 60 * 60 * 24 * 30 } }
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'fontes' }
          }
        ]
      }
    })
  ]
})
