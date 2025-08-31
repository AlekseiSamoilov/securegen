import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setups.ts'],
        include: ['**/*.test.tsx', '**/*.spec.tsx'],
        css: false,
    },
})