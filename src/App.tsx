import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Plus, Shield } from 'lucide-react';
import { usePasswordGenerator } from './hooks/usePasswordGenerator';
import { SettingsPanel } from './components/SettingsPanel';
import { PasswordDisplay } from './components/PasswordDisplay';
import { SessionList } from './components/SessionList';
import { rotate } from 'three/tsl';

function App() {
    const {
        settings,
        updateSettings,
        currentPassword,
        generatePassword,
        sessionPasswords,
        addToSession,
        clearSession,
        isGenerating,
    } = usePasswordGenerator();

    const [siteInput, setSiteInput] = useState('');

    const handleAddToSession = () => {
        addToSession(siteInput);
        setSiteInput('');
    };

    return (
        <div className='min-h-screen bg-white font-sf'>
            <header className='sticky top-0 z-10 bg-white/80 backdrop-blue-md border-b border-apple-gray-200'>
                <div className='max-w-6xl mx-auto px-4 py-6'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='text-center'
                    >
                        <div className='flex items-center justify-center space-x-3 mb-2'>
                            <Shield className='text-apple-blue-500' size={32} />
                            <h1 className='text-3xl font-bold text-apple-gray-900'>
                                SecureGen
                            </h1>
                        </div>
                        <p className='text-apple-gray-600'>
                            Криптографически стойкий генератор паролей
                        </p>
                        <div className='mt-3 inline-flex items-center space-x-2 bg-green-800 px-3 py-1 rounded-full text-sm'>
                            <span>Все данные остаются на вашем устройстве</span>
                        </div>
                    </motion.div>
                </div>
            </header>

            <main className='max-w-6xl mx-auto px-4 py-8'>
                <div className='grid lg:grid-cols-2 gap-8'>
                    <div className='space-y-6'>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='bg-white rounded-2xl p-6 shadow-sm border border-apple-gray-200'
                        >
                            <h2 className='text-xl font-semibold text-apple-gray-800 mb-6'>
                                Настройка генерации
                            </h2>
                            <SettingsPanel
                                settings={settings}
                                onSettingsChange={updateSettings}
                            />
                        </motion.div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={generatePassword}
                            className='w-full bg-apple-blue-500 hover:bg-apple-blue-600 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center space-x2 shadow-lg hover:shadow-xl'
                        >
                            <motion.div
                                animate={isGenerating ? { rotate: 360 } : { rotate: 0 }}
                                transition={{ duration: 0.5, repeat: isGenerating ? Infinity : 0 }}
                            >
                                <RefreshCw size={20} />
                            </motion.div>
                            <span>
                                {isGenerating ? 'Генерируб...' : 'Сгенерировать пароль'}
                            </span>
                        </motion.button>
                    </div>

                    <div className='space-y-6'>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className='bg-white rounded-2xl p-6 shadow-sm border border-apple-gray-200'
                        >
                            <h2 className='text-xl font-semibold text-apple-gray-800 mb-6'>
                                Сгенерировать пароль
                            </h2>
                            <PasswordDisplay password={currentPassword} />

                            {currentPassword && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className='bg-white rounded-2xl p-6 shadow-sm border border-apple-gray-200'
                                >
                                    <input
                                        type="text"
                                        value={siteInput}
                                        onChange={(e) => setSiteInput(e.target.value)}
                                        placeholder='Название сайт (необязательное)'
                                        className='w-full px-4 py-3 bg-apple-gray-50 border border-apple-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aapple-blue-400 focus:border-transparent'
                                        onKeyDown={(e) => e.key === "Enter" && handleAddToSession()}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToSession}
                                        className='w-full bg-gree-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify0center space-x-2'
                                    >
                                        <Plus size={20} />
                                        <span>Добавить в сессию</span>
                                    </motion.button>
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className='bg-white rounded-2xl p-6 shadow-sm border border-apple-gray-200'
                        >
                            <SessionList
                                passwords={sessionPasswords}
                                onClear={clearSession}
                            />
                        </motion.div>
                    </div>
                </div>
            </main>

            <footer className='mt-16 py-8 border-t border-apple-gray-200'>
                <div className='max-w-6xl mx-auto px-4 text-center text-apple-gray-500 text-sm'>
                    <p>
                        SecureGen использует криптографически стойкие алгоритмы для генерации паролей.
                        Все данные обрабатываются локально и никогда не покидают ваше устройство.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;