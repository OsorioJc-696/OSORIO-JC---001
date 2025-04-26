import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './context/AuthContext';
import NavBar from './components/NavBar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Product/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;