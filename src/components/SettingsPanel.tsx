import { motion } from "framer-motion";
import type { IPasswordSettings } from "../types/password";

interface ISettingsPanelProps {
    settings: IPasswordSettings;
    onSettingsChange: (settings: Partial<IPasswordSettings>) => void;
}

const checkboxOptions = [
    { key: 'lowercase' as keyof IPasswordSettings, label: 'Строчные буквы', example: 'abc' },
    { key: 'uppercase' as keyof IPasswordSettings, label: 'Заглавные буквы', example: 'ABC' },
    { key: 'numbers' as keyof IPasswordSettings, label: 'Цифры', example: '123' },
    { key: 'symbols' as keyof IPasswordSettings, label: 'Символы', example: '!@#' },
    { key: 'excludeSimilar' as keyof IPasswordSettings, label: 'Исключить похожие', example: '0O1l' },
]

export const SettingsPanel: React.FC<ISettingsPanelProps> = ({
    settings,
    onSettingsChange,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-apple-gray-700">
                        Длина пароля
                    </label>
                    <span className="text-sm font-mono bg-apple-gray-100 px-2 py-1 rounded-lg">
                        {settings.length}
                    </span>
                </div>
                <div className="relative">
                    <input
                        type="range"
                        min="8"
                        max="50"
                        value={settings.length}
                        onChange={(e) => onSettingsChange({ length: parseInt(e.target.value) })}
                        className="w-full h-2 bg-apple-gray-200 rouned-lg appearance-none cursor-pointer slider"
                        style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((settings.length - 8) / (50 - 8)) * 100}%, #e5e5e5 ${((settings.length - 8) / (50 - 8)) * 100}%, #e5e5e5 100%)`
                        }}
                    />
                    <div className="flex justify-between text-xs text-apple-gray-500 mt-1">
                        <span>8</span>
                        <span>50</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-medium text-apple-gray-700">Включить символы</h3>

                <div className="space-y-3">
                    {checkboxOptions.map(({ key, label, example }) => (
                        <motion.label
                            key={key}
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center justify-between p-3 bg-apple-gray-50 rounded-xl cursor-pointer hover:bg-apple-gray-100 transition-colors"
                        >
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={settings[key] as boolean}
                                    onChange={(e) => onSettingsChange({ [key]: e.target.checked })}
                                    className="w-4 h-4 text-apple-blue-500 bg-white border-apple-gray-300 rounded focus:ring-apple-blue-500 focus:ring-2"
                                />
                                <span className="text-sm text-apple-gray-700">{label}</span>
                            </div>
                            <code className="text-xs text-apple-gray-500 font-mono bg-white px-2 py-1 rounded">
                                {example}
                            </code>
                        </motion.label>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};