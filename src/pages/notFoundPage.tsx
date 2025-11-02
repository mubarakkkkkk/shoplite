import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/products"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition inline-block"
      >
        Go to Home
      </Link>
    </motion.div>
  );
};