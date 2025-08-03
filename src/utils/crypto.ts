import type { PasswordSettings, PasswordStrength } from '../types/password';

export const generateSecurePassword = (settings: PasswordSettings): string => {
    const { length, lowercase, uppercase, numbers, symbols, excludeSimilar } = settings;

    let charset = '';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Исключаем похожие символы для лучшей читаемости
    if (excludeSimilar) {
        charset = charset.replace(/[il1Lo0O]/g, '');
    }

    if (!charset) return '';

    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    return Array.from(array, byte => charset[byte % charset.length]).join('');
};

export const calculatePasswordStrength = (password: string): PasswordStrength => {
    if (!password) return { score: 0, label: 'Очень слабый', color: 'text-red-500' };

    let score = 0;

    // Длина
    if (password.length >= 16) score += 30;
    else if (password.length >= 12) score += 25;
    else if (password.length >= 8) score += 15;
    else score += 5;

    // Разнообразие символов
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^a-zA-Z0-9]/.test(password)) score += 15;

    // Бонусы за сложность
    if (password.length > 20) score += 10;
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(password)) score += 10;

    if (score >= 85) return { score, label: 'Превосходный', color: 'text-green-600' };
    if (score >= 70) return { score, label: 'Отличный', color: 'text-green-500' };
    if (score >= 50) return { score, label: 'Хороший', color: 'text-yellow-500' };
    if (score >= 30) return { score, label: 'Средний', color: 'text-orange-500' };
    return { score, label: 'Слабый', color: 'text-red-500' };
};