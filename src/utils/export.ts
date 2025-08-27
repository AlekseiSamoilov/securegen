import type { IPasswordEntry } from "../types/password";

// Экспорт в формате CSV 
export const exportPasswordsAsCSV = (passwords: IPasswordEntry[]): void => {
    const headers = ['Сайт', 'Пароль', 'Длина', 'Дата создания', 'Настройки'];
    const rows = passwords.map(p => [
        p.site,
        p.password,
        p.length.toString(),
        p.timestamp,
        `${p.settings.length}символов_${p.settings.uppercase ? 'ABC' : ''}${p.settings.lowercase ? 'abc' : ''}${p.settings ? '123' : ''}${p.settings.symbols ? '!@#' : ''}`
    ]);

    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadFile(blob, `passwords_${getCurrentDateString()}.csv`);
};

export const exportPasswordsAsTXT = (passwords: IPasswordEntry[]): void => {
    let content = '🔐 SecureGen - Экспорт паролей\n'
    content += '================================\n\n';
    content += `📅 Дата экспорта: ${new Date().toLocaleString('ru-RU')}\n`;
    content += `📊 Всего паролей: ${passwords.length}\n\n`;

    passwords.forEach((entry, index) => {
        content += `${index + 1}. ${entry.site}\n`;
        content += `   Пароль: ${entry.password}\n`;
        content += `   Длина: ${entry.length} символов\n`;
        content += `   Создан: ${entry.timestamp}\n`;
        content += `   Настройки: ${formatSettings(entry.settings)}\n`;
        content += '   ' + '─'.repeat(50) + '\n\n';
    });

    content += '\n📋 Как использовать:\n';
    content += '• Копируйте пароли вручную\n';
    content += '• Не храните файл в открытом виде\n';
    content += '• Удалите файл после использования\n\n';
    content += '⚠️  ВАЖНО: Храните пароли в безопасном месте!\n';

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    downloadFile(blob, `passwords_${getCurrentDateString()}.txt`);
};

// Экспорт в формате KeePass CSV
export const exportForKeePass = (passwords: PasswordEntry[]): void => {
    const headers = ['Account', 'Login Name', 'Password', 'Web Site', 'Comments'];
    const rows = passwords.map(p => [
        p.site,
        '',  // Login Name пустой
        p.password,
        p.site.includes('.') ? `https://${p.site}` : p.site,
        `Создан: ${p.timestamp}, Длина: ${p.length}, Настройки: ${formatSettings(p.settings)}`
    ]);

    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadFile(blob, `passwords_keepass_${getCurrentDateString()}.csv`);
};

const formatSettings = (settings: any): string => {
    const parts = [] as string[];
    if (settings.uppercase) parts.push('ABC');
    if (settings.lowercase) parts.push('abc');
    if (settings.numbers) parts.push('123');
    if (settings.symbols) parts.push('!@#');
    if (settings.excludeSimilar) parts.push('без_похожих');
    return parts.join('+') || 'базовые';
};

const downloadFile = (blob: Blob, filename: string): void => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click()
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const getCurrentDateString = (): string => {
    return new Date().toISOString().split('T')[0]
};