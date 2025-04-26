import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">E-Shop</Link>
        <div className="space-x-4">
          <Link to="/products" className="hover:text-gray-300">Products</Link>
          {user ? (
            <>
              <Link to="/cart" className="hover:text-gray-300">Cart</Link>
              <Link to="/wishlist" className="hover:text-gray-300">Wishlist</Link>
              <Link to="/orders" className="hover:text-gray-300">Orders</Link>
              <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;