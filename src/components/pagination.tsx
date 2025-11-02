import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 mt-12"
    >
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">
              <MoreHorizontal className="w-4 h-4" />
            </span>
          ) : (
            <motion.button
              key={page}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange(page as number)}
              className={`w-12 h-12 rounded-xl font-medium transition-all duration-200 ${
                currentPage === page
                  ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </motion.button>
          )
        )}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};