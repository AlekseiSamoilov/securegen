import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useState } from 'react';

export const PWAInstallButton = () => {
    const { isInstallable, isInstalled, promptInstall } = usePWAInstall();
    const [isDismissed, setIsDismissed] = useState(false);

    if (!isInstallable || isInstalled || isDismissed) {
        return null;
    }

    const handleInstall = async () => {
        const success = await promptInstall();
        if (!success) {
            setIsDismissed(true);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
            >
                <div className="bg-white rounded-2xl p-4 shadow-2xl border border-apple-gray-200 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="bg-apple-blue-500 p-2 rounded-xl">
                                <Smartphone className="text-white" size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-apple-gray-900 text-sm">
                                    Установить SecureGen
                                </h3>
                                <p className="text-apple-gray-600 text-xs">
                                    Добавить на рабочий стол
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsDismissed(true)}
                            className="text-apple-gray-400 hover:text-apple-gray-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                    
                    <div className="flex space-x-2">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleInstall}
                            className="flex-1 bg-apple-blue-500 hover:bg-apple-blue-600 text-white font-medium py-2 px-3 rounded-xl transition-colors flex items-center justify-center space-x-1 text-sm"
                        >
                            <Download size={16} />
                            <span>Установить</span>
                        </motion.button>
                        <button
                            onClick={() => setIsDismissed(true)}
                            className="px-3 py-2 text-apple-gray-600 hover:text-apple-gray-800 transition-colors text-sm font-medium"
                        >
                            Позже
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};