import { calculatePasswordStrength } from "../utils/crypto";
import { motion } from "framer-motion";

interface IStrengthMeterProps {
    password: string;
}

export const StrengthMeter: React.FC<IStrengthMeterProps> = ({ password }) => {
    const strength = calculatePasswordStrength(password);
    if (!password) return null;

    const getBarColor = (score: number): string => {
        if (score >= 85) return 'bg-green-500';
        if (score >= 70) return 'bg-green-400';
        if (score >= 50) return 'bg-yellow-400';
        if (score >= 30) return 'bg-orange-400';
        return 'bg-red-400';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 py-2"
        >
            <div className="flex justify-between items-center">
                <span className="text-sm text-apple-gray-600">Надежность</span>
                <span className={`text-sm font-medium ${strength.color}`}>
                    {strength.label}
                </span>
            </div>

            <div className="w-full bg-apple-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${getBarColor(strength.score)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${strength.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
};