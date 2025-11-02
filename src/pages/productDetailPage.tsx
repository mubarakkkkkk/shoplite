import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api';
import type { Product } from '../types';
import { useAppDispatch } from '../hooks/useRedux';
import { addToCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Package, 
  Star, 
  Plus, 
  Minus,
  Truck,
  Shield,
  Heart
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      // You could replace this with a toast notification
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-contain rounded-xl"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x600/e2e8f0/64748b?text=No+Image';
                }}
              />
            </div>
            
            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-lg ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400'
              } hover:bg-red-500 hover:text-white transition-all duration-200`}
            >
              <Heart className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} />
            </motion.button>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Category and Rating */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-sm font-medium text-gray-600">4.8</span>
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">{product.description}</p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <Package className={`w-5 h-5 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`} />
                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="font-medium text-gray-700 mb-3 block">Quantity:</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-12 h-12 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                    
                    <span className="w-16 text-center text-xl font-bold text-gray-900">
                      {quantity}
                    </span>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="w-12 h-12 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Max: {product.stock} items
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg mb-4"
              >
                <ShoppingCart className="w-6 h-6" />
                {product.stock > 0 ? `Add ${quantity} to Cart` : 'Out of Stock'}
              </motion.button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 text-gray-600">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">2-Year Warranty</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};