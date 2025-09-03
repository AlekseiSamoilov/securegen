import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import QRCode from 'qrcode';

interface IQRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    password: string;
}

export const QRCodeModal: React.FC<IQRCodeModalProps> = ({ isOpen, onClose, password }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && password) {
            setIsLoading(true);
            setError(null);
            setQrDataUrl(null);

            QRCode.toDataURL(password, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#1f2937',
                    light: '#ffffff'
                }
            }).then((dataUrl) => {
                setQrDataUrl(dataUrl);
                setIsLoading(false);
            }).catch((error) => {
                console.error('QR Code generation failed:', error);
                setError('Не удалось сгенерировать QR-код');
                setIsLoading(false);
            });
        }
    }, [isOpen, password]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-apple-gray-800">
                            QR-код пароля
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-apple-gray-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-apple-gray-600" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-apple-gray-200 shadow-sm">
                            {isLoading ? (
                                <div className="w-[300px] h-[300px] flex items-center justify-center bg-apple-gray-50 rounded-lg">
                                    <div className="animate-spin w-8 h-8 border-2 border-apple-blue-500 border-t-transparent rounded-full"></div>
                                </div>
                            ) : error ? (
                                <div className="w-[300px] h-[300px] flex items-center justify-center bg-red-50 rounded-lg">
                                    <p className="text-red-600 text-center">{error}</p>
                                </div>
                            ) : qrDataUrl ? (
                                <img src={qrDataUrl} alt="QR Code" className="w-[300px] h-[300px]" />
                            ) : null}
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-apple-gray-600 mb-2">
                                Наведите камеру на QR-код для копирования пароля
                            </p>
                            <p className="text-xs text-apple-gray-500">
                                Пароль не передается через интернет
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};