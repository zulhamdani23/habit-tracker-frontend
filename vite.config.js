import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/*.png'],
      manifest: {
        name: 'Habit Tracker PWA',
        short_name: 'Habits',
        display: 'standalone',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#3f51b5',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            // API backend → network-first
            urlPattern: /\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 3,
            },
          },
          {
            // static assets → cache-first
            urlPattern: /\.(?:js|css|html|png|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-cache',
            },
          },
        ],
      },
    }),
  ],
})

