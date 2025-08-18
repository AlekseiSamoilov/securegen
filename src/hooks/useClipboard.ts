import { useState, useCallback } from "react";

interface IUseClipboardReturn {
    copyText: (text: string) => Promise<void>;
    copied: boolean;
    error: string | null;
}

export const useClipboard = (resetDelay: number = 2000): IUseClipboardReturn => {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const copyText = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setError(null);

            setTimeout(() => setCopied(false), resetDelay);
        } catch (err) {
            setError('Failed to copy text');
            setCopied(false);

            setTimeout(() => setError(null), resetDelay);
        }
    }, [resetDelay]);

    return { copyText, copied, error };
}