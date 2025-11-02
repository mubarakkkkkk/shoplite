import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Package, Search, Heart } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  actionPath?: string;
  icon?: 'shopping' | 'package' | 'search' | 'heart';
}

export const EmptyState = ({
  title,
  message,
  actionText = 'Go Shopping',
  actionPath = '/products',
  icon = 'shopping',
}: EmptyStateProps) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (icon) {
      case 'package':
        return <Package className="w-12 h-12" />;
      case 'search':
        return <Search className="w-12 h-12" />;
      case 'heart':
        return <Heart className="w-12 h-12" />;
      default:
        return <ShoppingBag className="w-12 h-12" />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <div className="text-blue-600">
              {getIcon()}
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 leading-relaxed"
          >
            {message}
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(actionPath)}
            className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-3 mx-auto shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            {actionText}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};