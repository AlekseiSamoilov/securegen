import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock для crypto API (для тестов генерации паролей)
Object.defineProperty(globalThis, 'crypto', {
    value: {
        getRandomValues: (arr: Uint8Array) => {
            for (let i = 0; i < arr.length; i++) {
                arr[i] = Math.floor(Math.random() * 256);
            }
            return arr;
        }
    }
});

// Mock для clipboard API
Object.defineProperty(navigator, 'clipboard', {
    value: {
        writeText: vi.fn(() => Promise.resolve())
    }
});

// Mock для framer-motion (убираем анимации в тестах)
vi.mock('framer-motion', () => ({
    motion: {
        div: 'div',
        button: 'button',
        span: 'span'
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children
}));