import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaShoppingCart, 
  FaUserAlt, 
  FaStore, 
  FaSignOutAlt, 
  FaUser, 
  FaHeart, 
  FaReceipt 
} from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/products');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <Link to="/Products" className="logo" aria-label="E-Shop Home">
          <FaStore className="logo-icon" />
          <span className="logo-text">E-Shop</span>
        </Link>

        {/* Links */}
        <nav className="nav-links" role="navigation" aria-label="Main Navigation">

          <Link to="/products" title="Productos" className="nav-icon-link">
            <FaStore />
          </Link>

          <Link to="/cart" title="Carrito" className="nav-icon-link">
            <FaShoppingCart />
          </Link>

          {!isLoggedIn ? (
            <Link to="/login" title="Iniciar sesión" className="nav-icon-link">
              <FaUserAlt />
            </Link>
          ) : (
            <>
              <Link to="/profile" title="Perfil" className="nav-icon-link">
                <FaUser />
              </Link>
              <Link to="/orders" title="Mis Compras" className="nav-icon-link">
                <FaReceipt />
              </Link>
              <Link to="/favorites" title="Favoritos" className="nav-icon-link">
                <FaHeart />
              </Link>
              <button 
                className="logout-button" 
                onClick={handleLogout} 
                title="Cerrar sesión" 
                aria-label="Cerrar sesión"
              >
                <FaSignOutAlt />
              </button>
            </>
          )}
          
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
