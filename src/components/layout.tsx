import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { logout } from '../store/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Package, 
  LogOut, 
  User, 
  Menu, 
  X,
  Home,
  ShoppingCart
} from 'lucide-react';
import { useState, useEffect } from 'react';

export const Layout = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [previousCartCount, setPreviousCartCount] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (cartCount > previousCartCount && previousCartCount > 0) {
      setShowCartNotification(true);
      
      const timer = setTimeout(() => {
        setShowCartNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
    
    setPreviousCartCount(cartCount);
  }, [cartCount, previousCartCount]);

  const navigation = [
    { name: 'Products', path: '/products', icon: Home },
    { name: 'Orders', path: '/orders', icon: Package },
    { name: 'Cart', path: '/cart', icon: ShoppingCart },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200"
      >
        <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link 
              to="/products" 
              className="flex items-center gap-2 sm:gap-3 group shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-linear-to-r from-blue-600 to-indigo-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </motion.div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
                ShopLite
              </span>
            </Link>

            {/* Desktop Navigation - Show on md screens and up */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 justify-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-lg lg:rounded-xl font-medium transition-all duration-200 text-sm lg:text-base ${
                    isActivePath(item.path)
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
                  <span className="whitespace-nowrap">{item.name}</span>
                  {item.name === 'Cart' && cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center text-[10px] lg:text-xs font-medium">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* User Section - Desktop */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm text-gray-600 bg-gray-50 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg lg:rounded-xl max-w-32 lg:max-w-none truncate">
                    <User className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
                    <span className="truncate">Hi, {user?.name}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 lg:gap-2 bg-red-500 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl hover:bg-red-600 transition-all duration-200 text-sm lg:text-base"
                  >
                    <LogOut className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    <span className="hidden lg:inline">Logout</span>
                  </motion.button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 lg:px-6 py-1.5 lg:py-2 rounded-lg lg:rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Tablet Navigation - Show on sm to md screens */}
            <div className="hidden sm:flex md:hidden items-center gap-3 flex-1 justify-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-1.5 p-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                    isActivePath(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name === 'Cart' && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Cart Badge for Tablet */}
            {isAuthenticated && (
              <div className="hidden sm:flex md:hidden items-center">
                <Link
                  to="/cart"
                  className="relative p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
              </div>
            )}

            {/* Mobile menu button with notification */}
            <div className="relative md:hidden">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setShowCartNotification(false); // Hide notification when menu is opened
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
                
                {/* Cart notification dot */}
                {showCartNotification && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <div className="relative">
                      {/* Pulsing animation */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-3 h-3 bg-red-500 rounded-full"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 w-3 h-3 bg-red-400 rounded-full animate-ping"
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Regular cart count badge */}
                {!showCartNotification && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-medium">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
              
              {/* Notification tooltip */}
              <AnimatePresence>
                {showCartNotification && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute top-full right-0 mt-2 z-50"
                  >
                    <div className="bg-green-500 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                      Item added to cart!
                      <div className="absolute -top-1 right-2 w-2 h-2 bg-green-500 transform rotate-45" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200 py-3 space-y-1"
              >
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 text-base ${
                      isActivePath(item.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="flex-1">{item.name}</span>
                    {item.name === 'Cart' && cartCount > 0 && (
                      <span className="bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                ))}
                
                {isAuthenticated ? (
                  <div className="pt-3 border-t border-gray-200 space-y-1">
                    <div className="flex items-center gap-3 px-3 py-3 text-gray-600 bg-gray-50 rounded-xl">
                      <User className="w-5 h-5 shrink-0" />
                      <span className="flex-1">Hi, {user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-base font-medium"
                    >
                      <LogOut className="w-5 h-5 shrink-0" />
                      <span className="flex-1 text-left">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-base justify-center"
                  >
                    <User className="w-5 h-5" />
                    Login
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
};