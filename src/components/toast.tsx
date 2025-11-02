import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, type = 'success', onClose, duration = 4000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.8 }}
        className={`fixed top-6 right-6 ${bgColors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl z-50 max-w-sm`}
      >
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            {icons[type]}
          </div>
          <p className="flex-1 font-medium pr-2">{message}</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
        
        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 origin-left rounded-b-2xl"
        />
      </motion.div>
    </AnimatePresence>
  );
};