import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">E-Commerce</Link>
        <div className="space-x-4">
          <Link to="/products" className="hover:underline">Products</Link>
          {user ? (
            <>
              <Link to="/cart" className="hover:underline">Cart</Link>
              <Link to="/wishlist" className="hover:underline">Wishlist</Link>
              <Link to="/orders" className="hover:underline">Orders</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;