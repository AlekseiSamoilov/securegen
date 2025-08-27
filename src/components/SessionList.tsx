import { useClipboard } from "../hooks/useClipboard";
import { IPasswordEntry } from "../types/password";
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Trash } from "lucide-react";

interface ISessionListProps {
    passwords: IPasswordEntry[];
    onClear: () => void;
    exportComponent?: React.ReactNode;
}

export const SessionList: React.FC<ISessionListProps> = ({ passwords, onClear, exportComponent }) => {
    const { copyText, copied } = useClipboard();

    if (passwords.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-apple-gray-500"
            >
                <p>Пароли появятся здесь после добавления в сессию</p>
            </motion.div>
        );
    }

    const handleClearWithConfirm = () => {
        if (window.confirm('Очистить все пароли из сессии?')) {
            onClear();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-apple-gray-800">
                    Сессия ({passwords.length})
                </h3>

                <div className="flex space-x-2">
                    {exportComponent}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClearWithConfirm}
                        className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-apple-blue-600 transition-colors"
                    >
                        <Trash size={16} />
                        <span className="text-sm">Очистить</span>
                    </motion.button>
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                <AnimatePresence>
                    {passwords.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-apple-gray-5- rounded-xl p-4 border border-apple-gray-200 hover:bg-apple-gray-100 transition-colors"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-apple-gray-800 truncate">
                                        {entry.site}
                                    </h4>
                                    <p className="text-sm text-apple-gray-500 mt-1">
                                        {entry.timestamp} • {entry.length} символов
                                    </p>
                                    <code className="text-xs text-apple-gray-600 font-mono mt-2 block truncate">
                                        {entry.password.slice(0, 20)}...
                                    </code>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => copyText(entry.password)}
                                    className="ml-3 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
                                    aria-label="Копировать пароль"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};



