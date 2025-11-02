import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { useAppDispatch } from '../hooks/useRedux';
import { addToCart } from '../store/cartSlice';
import { 
  ShoppingCart, 
  Star, 
  Heart, 
  Zap,
  Eye
} from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
  viewMode?: 'grid' | 'list';
}

export const ProductCard = ({ product, index = 0, viewMode = 'grid' }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
      >
        <div className="flex gap-6">
          {/* Product Image */}
          <Link to={`/products/${product.id}`} className="shrink-0">
            <div className="relative">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-cover rounded-xl"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image';
                  setImageLoaded(true);
                }}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
              )}
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <Link to={`/products/${product.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                </Link>
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-3">
                  {product.category}
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavorite}
                className={`p-2 rounded-full ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                } transition-all duration-200`}
              >
                <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
              </motion.button>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium text-gray-600">4.8</span>
              </div>
              
              <div className={`flex items-center gap-1 text-sm font-medium ${
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <Zap className="w-4 h-4" />
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/products/${product.id}`}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Link>
                
                <motion.button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image';
              setImageLoaded(true);
            }}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          <div className="absolute top-3 right-3 flex gap-2">
            {product.stock < 5 && product.stock > 0 && (
              <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                Only {product.stock} left!
              </span>
            )}
            {product.stock === 0 && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavorite}
            className={`absolute bottom-3 right-3 p-2 rounded-full shadow-lg ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-400 hover:bg-red-500 hover:text-white'
            } transition-all duration-200`}
          >
            <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </motion.button>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2 group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium text-gray-600">4.8</span>
            </div>
            <div className={`text-xs font-medium ${
              product.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          <motion.button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};