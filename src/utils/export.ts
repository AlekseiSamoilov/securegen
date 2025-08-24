import type { IPasswordEntry, IExportData } from '../types/password';

export const exportPasswordsAsJSON = (passwords: IPasswordEntry[]): void => {
    const exportData: IExportData = {
        exported_ad: new Date().toISOString(),
        total_passwords: passwords.length,
        passwords: passwords.map(p => ({
            site: p.site,
            password: p.password,
            length: p.length,
            timestamp: p.timestamp,
            settings: p.settings
        }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
    });
    downloadFile(blob, `passwords_${getCurrentDateString()}.json`);
};

export const exportPasswordAsCSV = (passwords: IPasswordEntry[]): void => {
    const headers = ['Site', 'Password', 'Length', 'Created', 'Settings'];
    const rows = passwords.map(p => [
        p.site,
        p.password,
        p.length.toString(),
        p.timestamp,
        JSON.stringify(p.settings)
    ]);

    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadFile(blob, `passwords_${getCurrentDateString()}.csv`);
};

const downloadFile = (blob: Blob, filename: string): void => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const getCurrentDateString = (): string => {
    return new Date().toISOString().split('T')[0];
};