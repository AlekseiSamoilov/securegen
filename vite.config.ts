import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/securegen/',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                            }
                        }
                    }
                ]
            },
            includeAssets: ['icons/icon.svg'],
            manifest: {
                name: 'SecureGen - Генератор Паролей',
                short_name: 'SecureGen',
                description: 'Безопасный генератор паролей для локального использования',
                theme_color: '#007AFF',
                background_color: '#ffffff',
                display: 'standalone',
                orientation: 'portrait-primary',
                start_url: '/securegen/',
                scope: '/securegen/',
                lang: 'ru',
                categories: ['security', 'utilities', 'productivity'],
                icons: [
                    {
                        src: '/securegen/icons/icon.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'any'
                    },
                    {
                        src: '/securegen/icons/icon.svg',
                        sizes: '192x192',
                        type: 'image/svg+xml',
                        purpose: 'maskable'
                    },
                    {
                        src: '/securegen/icons/icon.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml',
                        purpose: 'any'
                    }
                ],
                screenshots: [],
                prefer_related_applications: false
            },
            devOptions: {
                enabled: true
            }
        })
    ],
    server: {
        port: 3000
    },
})