import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBoxOpen, FaLaptop, FaCamera, FaSatellite, FaEye, FaCartPlus, FaShoppingCart } from 'react-icons/fa';
import api from '../services/api';
import { useCart } from '../context/CartContext';  // Usamos el contexto
import '../styles/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { cart, addToCart } = useCart();  // Usamos el contexto

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
    });
  }, []);

  const handleSearch = () => {
    const lowercasedSearch = searchTerm.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedSearch) ||
        product.price.toString().includes(lowercasedSearch)
    );
    setFilteredProducts(results);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, price: Number(product.price) });
  };

  return (
    <div className="products-container">
      {/* Search & Filters */}
      <section className="search-filters">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>

        <div className="category-filter">
          {[
            { icon: <FaBoxOpen />, category: 'all' },
            { icon: <FaLaptop />, category: 'Laptop' },
            { icon: <FaCamera />, category: 'Cámara' },
            { icon: <FaSatellite />, category: 'Drone' },
          ].map(({ icon, category }) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={selectedCategory === category ? 'active' : ''}
            >
              {icon}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <div className="product-actions">
                <Link to={`/products/${product.id}`} className="action-btn">
                  <FaEye />
                </Link>
                <button
                  className="action-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaCartPlus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Cart */}
      <Link to="/cart">
        <button className="view-cart-btn">
          <FaShoppingCart /> ({cart.length}) {/* Este contador ahora se actualiza en tiempo real */}
        </button>
      </Link>
    </div>
  );
}

export default Products;
