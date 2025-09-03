import { motion } from 'framer-motion';
import { Copy, Check, QrCode } from 'lucide-react';
import { useState } from 'react';
import { useClipboard } from '../hooks/useClipboard';
import { StrengthMeter } from './StrengthMeter';
import { QRCodeModal } from './QRCodeModal';

interface IPasswordDisplayProps {
    password: string;
}

export const PasswordDisplay: React.FC<IPasswordDisplayProps> = ({ password }) => {
    const { copyText, copied } = useClipboard();
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    if (!password) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-32 bg-apple-gray-50 rounded-2xl border-apple-gray-200"
            >
                <p className='text=apple-gray-500 text-center'>
                    Нажмите "Генерировать" для создания пароля
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >
            <div className="relative bg-apple-gray-50 rounded-2xl border border-apple-gray-200 p-6">
                <div className="flex items-center justify-between gap-4">
                    <code className="font-mono text-lg text-apple-gray-800 break-all flex-1 select-all">
                        {password}
                    </code>

                    <div className="flex gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsQRModalOpen(true)}
                            className="flex-shrink-0 p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                            aria-label="Показать QR-код"
                        >
                            <QrCode size={20} />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyText(password)}
                            className="flex-shrink-0 p-2 bg-apple-blue-500 text-white rounded-xl hover:bg-apple-blue-600 transition-colors"
                            aria-label="Копировать пароль"
                        >
                            {copied ? (
                                <Check size={20} />
                            ) : (
                                <Copy size={20} />
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Индикатор копирования */}
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-10"
                    >
                        Скопировано!
                    </motion.div>
                )}
            </div>

            {/* Индикатор силы пароля */}
            <StrengthMeter password={password} />

            {/* QR-код модал */}
            <QRCodeModal
                isOpen={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
                password={password}
            />
        </motion.div>
    )
}