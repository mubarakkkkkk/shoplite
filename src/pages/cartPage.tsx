import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  ShoppingCart,
  CreditCard 
} from 'lucide-react';

export const CartPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleProceedToCheckout = () => {
    if (!user) {     
      navigate('/login', { 
        state: { 
          from: '/checkout',
          message: 'Please log in to complete your purchase'
        } 
      });
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-3 mx-auto"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back to Products</span>
            <span className="sm:hidden">Back</span>
          </button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100"
            >
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-4 sm:py-6 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg sm:rounded-xl shadow-sm shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/100x100/e2e8f0/64748b?text=No+Image';
                        }}
                      />
                      
                      {/* Product Info - Mobile Layout */}
                      <div className="sm:hidden flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{item.product.name}</h3>
                        <p className="text-base font-bold text-blue-600 mt-1">
                          ₦{item.product.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{item.product.category}</p>
                      </div>
                    </div>

                    {/* Product Info - Desktop */}
                    <div className="hidden sm:block flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.product.name}</h3>
                      <p className="text-lg font-bold text-blue-600 mt-1">
                        ₦{item.product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-200 rounded-lg sm:rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.button>
                        
                        <span className="w-8 sm:w-12 text-center font-semibold text-gray-900 text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-200 rounded-lg sm:rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.button>
                      </div>

                      {/* Price and Remove - Mobile */}
                      <div className="sm:hidden flex flex-col items-end gap-1">
                        <p className="font-bold text-gray-900 text-sm">
                          ₦{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRemove(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </motion.button>
                      </div>
                    </div>

                    {/* Price and Remove - Desktop */}
                    <div className="hidden sm:block text-right min-w-20 lg:min-w-24">
                      <p className="font-bold text-lg text-gray-900">
                        ₦{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemove(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 mt-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 sticky top-4 sm:top-8"
            >
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₦{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">₦{(subtotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">
                      ₦{(subtotal * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* User status indicator */}
              {!user && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm text-center">
                    Please log in to complete your purchase
                  </p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceedToCheckout}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 shadow-lg text-sm sm:text-base"
              >
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                {user ? 'Proceed to Checkout' : 'Login to Checkout'}
              </motion.button>

              {!user && (
                <p className="text-center text-gray-600 text-xs mt-3">
                  You'll be redirected to login first
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};