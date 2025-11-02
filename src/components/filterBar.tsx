import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sortBy: 'asc' | 'desc';
  onSortChange: (value: 'asc' | 'desc') => void;
  categories: string[];
}

export const FilterBar = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
}: FilterBarProps) => {
  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('');
    onSortChange('asc');
  };

  const hasActiveFilters = search || category || sortBy !== 'asc';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Filter className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Filter Products</h3>
        </div>
        
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Products
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Category
          </label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === 'All' ? '' : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Sort by Price
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};