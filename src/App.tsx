import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { ProtectedRoute } from './components/protectedRoute';
import { LoginPage } from './pages/loginPage';
import { ProductsPage } from './pages/productsPage';
import { ProductDetailPage } from './pages/productDetailPage';
import { CartPage } from './pages/cartPage';
import { CheckoutPage } from './pages/checkoutPage';
import { OrdersPage } from './pages/ordersPage';
import { NotFoundPage } from './pages/notFoundPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Routes with Layout */}
      <Route element={<Layout />}>
        {/* Redirect root to products */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        
        {/* Public product routes */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        
        {/* Protected routes - require authentication */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        
        {/* 404 Not Found - must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;