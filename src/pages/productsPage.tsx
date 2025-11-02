import { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import type { Product } from '../types';
import { ProductCard } from '../components/productCard';
import { FilterBar } from '../components/filterBar';
import { Pagination } from '../components/pagination';
import { motion } from 'framer-motion';
import { 
  Package,  
  Loader2
} from 'lucide-react';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [viewMode] = useState<'grid'>('grid');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const categories = ['All', 'Electronics', 'Sports', 'Home', 'Accessories'];
  const limit = 12;

  useEffect(() => {
    loadProducts();
  }, [search, category, sortBy, page]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params: any = {
        _page: page,
        _limit: limit,
        _sort: 'price',
        _order: sortBy,
      };

      if (search) params.q = search;
      if (category && category !== 'All') params.category = category;

      const result = await fetchProducts(params);
      setProducts(result.products);
      setTotal(result.total);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
        >
          <div className="flex items-center gap-3 mb-4 lg:mb-0">            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
              <p className="text-gray-600 mt-1">Discover amazing products at great prices</p>
            </div>
          </div>
         
        </motion.div>

        {/* Filter Bar */}
        <FilterBar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          category={category}
          onCategoryChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
        />

        {/* Products Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                  : 'space-y-4'
                }
              `}
            >
              {products.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </motion.div>

            {/* Empty State */}
            {products.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-md mx-auto">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearch('');
                      setCategory('');
                      setPage(1);
                    }}
                    className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};