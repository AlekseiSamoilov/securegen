export interface IPasswordSettings {
    length: number;
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
    excludeSimilar: boolean;
}

export interface IPasswordEntry {
    id: string;
    site: string;
    password: string;
    length: number;
    timestamp: string;
    settings: IPasswordSettings;
}

export interface IPasswordStrength {
    score: number;
    label: string;
    color: string;
}

export interface IExportData {
    exported_ad: string;
    total_passwords: number;
    passwords: Omit<IPasswordEntry, 'id'>[];
}