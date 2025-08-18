import { useCallback, useState } from "react";
import { IPasswordEntry, IPasswordSettings } from "../types/password"
import { generateSecurePassword } from "../utils/crypto";

const defaultSettings: IPasswordSettings = {
    length: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
}

interface IUsePasswordGeneratorReturn {
    settings: IPasswordSettings;
    updateSettings: (newSettings: Partial<IPasswordSettings>) => void;
    currentPassword: string;
    generatePassword: () => Promise<void>;
    sessionPasswords: IPasswordEntry[];
    addToSession: (site: string) => void;
    clearSession: () => void;
    isGenerating: boolean;
}

export const usePasswordGenerator = (): IUsePasswordGeneratorReturn => {
    const [settings, setSettings] = useState<IPasswordSettings>(defaultSettings);
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [sessionPasswords, setSessionPasswords] = useState<IPasswordEntry[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const updateSettings = useCallback((newSettings: Partial<IPasswordSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    }, []);

    const generatePassword = useCallback(async () => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const password = generateSecurePassword(settings);
        setCurrentPassword(password);
        setIsGenerating(false);
    }, [settings])

    const addToSession = useCallback((site: string) => {
        if (!currentPassword) return;

        const entry: IPasswordEntry = {
            id: Date.now().toString(),
            site: site || "Без названия",
            password: currentPassword,
            length: settings.length,
            timestamp: new Date().toLocaleString('ru-Ru'),
            settings: { ...settings }
        };

        setSessionPasswords(prev => [entry, ...prev]);
    }, [currentPassword, settings]);

    const clearSession = useCallback(() => {
        setSessionPasswords([]);
        setCurrentPassword('');
    }, []);

    return {
        settings,
        updateSettings,
        currentPassword,
        generatePassword,
        sessionPasswords,
        addToSession,
        clearSession,
        isGenerating,
    };
};