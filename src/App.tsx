import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Plus, Shield } from 'lucide-react';
import { usePasswordGenerator } from './hooks/usePasswordGenerator';
import { SettingsPanel } from './components/SettingsPanel';
import { PasswordDisplay } from './components/PasswordDisplay';
import { SessionList } from './components/SessionList';

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
        </div>
    )
}