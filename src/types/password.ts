export interface PasswordSettings {
    length: number;
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
    excludeSimilar: boolean;
}

export interface PasswordEntry {
    id: string;
    site: string;
    password: string;
    length: number;
    timestamp: string;
    settings: PasswordSettings;
}

export interface PasswordStrength {
    score: number;
    label: string;
    color: string;
}

export interface ExportData {
    exported_ad: string;
    total_passwords: number;
    passwords: Omit<PasswordEntry, 'id'>[];
}