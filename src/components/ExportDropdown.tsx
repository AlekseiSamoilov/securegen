import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, FileText, FileSpreadsheet, Key } from 'lucide-react';
import type { IPasswordEntry } from '../types/password';
import {
    exportPasswordsAsCSV,
    exportPasswordsAsTXT,
    exportForKeePass
} from '../utils/export';

interface ExportDropdownProps {
    passwords: IPasswordEntry[];
    disabled?: boolean;
}

const exportOptions = [
    {
        id: 'txt',
        name: 'TXT - Простой текст',
        description: 'Читаемый формат, откроется в любом редакторе',
        icon: FileText,
        color: 'text-green-500',
        action: exportPasswordsAsTXT
    },
    {
        id: 'csv',
        name: 'CSV - Таблица Excel',
        description: 'Для Excel, Google Sheets, Numbers',
        icon: FileSpreadsheet,
        color: 'text-emerald-500',
        action: exportPasswordsAsCSV
    },
    {
        id: 'keepass',
        name: 'KeePass CSV',
        description: 'Импорт в менеджеры паролей',
        icon: Key,
        color: 'text-purple-500',
        action: exportForKeePass
    }
];

export const ExportDropdown: React.FC<ExportDropdownProps> = ({
    passwords,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleExport = (action: (passwords: IPasswordEntry[]) => void) => {
        action(passwords);
        setIsOpen(false);
    };

    if (passwords.length === 0) {
        return (
            <div className="text-apple-gray-400 text-sm flex items-center space-x-2">
                <Download size={16} />
                <span>Нет паролей для экспорта</span>
            </div>
        );
    }

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: disabled ? 1 : 1.02 }}
                whileTap={{ scale: disabled ? 1 : 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
                className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 hover:bg-apple-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
            >
                <Download size={16} />
                <span>Экспорт</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={16} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-12 right-0 z-20 w-72 bg-white rounded-xl shadow-xl border border-apple-gray-200 overflow-hidden"
                        >
                            <div className="p-3 bg-apple-gray-50 border-b border-apple-gray-200">
                                <p className="text-sm font-medium text-apple-gray-800">
                                    Выберите формат экспорта
                                </p>
                                <p className="text-xs text-apple-gray-600">
                                    {passwords.length} паролей готово к экспорту
                                </p>
                            </div>

                            <div className="py-2">
                                {exportOptions.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                        <motion.button
                                            key={option.id}
                                            whileHover={{ backgroundColor: '#f8fafc' }}
                                            onClick={() => handleExport(option.action)}
                                            className="w-full px-4 py-3 flex items-start space-x-3 hover:bg-apple-gray-50 transition-colors text-left"
                                        >
                                            <Icon size={20} className={option.color} />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-apple-gray-800 text-sm">
                                                    {option.name}
                                                </p>
                                                <p className="text-xs text-apple-gray-600 mt-1">
                                                    {option.description}
                                                </p>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div className="p-3 bg-yellow-50 border-t border-yellow-200">
                                <div className="flex items-center space-x-2">
                                    <span className="text-yellow-600">⚠️</span>
                                    <p className="text-xs text-yellow-700">
                                        Экспортированные файлы содержат пароли в открытом виде.
                                        Храните их безопасно!
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};