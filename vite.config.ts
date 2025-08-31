import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/securegen/',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'SecureGen - Password Generator',
                short_name: 'SecureGen',
                description: 'Secure local-first password generator',
                theme_color: '#000000',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/securegen/',
                icons: []
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            }
        })
    ],
    server: {
        port: 3000
    },
})