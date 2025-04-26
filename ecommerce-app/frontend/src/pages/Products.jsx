import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
    });
  }, []);

  // Maneja la búsqueda
  const handleSearch = () => {
    const lowercasedSearch = searchTerm.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedSearch) ||
        product.price.toString().includes(lowercasedSearch)
    );
    setFilteredProducts(results);
  };

  // Filtrar por categoría
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Agregar al carrito
  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Guardar en localStorage para persistencia
  };

  return (
    <div className="products container">
      <div className="search-filters">
        <div className="search-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search by name or price..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>
        <div className="category-filter">
          <button
            onClick={() => handleCategoryFilter('all')}
            className={selectedCategory === 'all' ? 'active' : ''}
          >
            <i className="fas fa-box-open"></i> All
          </button>
          <button
            onClick={() => handleCategoryFilter('Laptop')}
            className={selectedCategory === 'Laptop' ? 'active' : ''}
          >
            <i className="fas fa-laptop"></i> Laptop
          </button>
          <button
            onClick={() => handleCategoryFilter('PC')}
            className={selectedCategory === 'PC' ? 'active' : ''}
          >
            <i className="fas fa-desktop"></i> PC
          </button>
          <button
            onClick={() => handleCategoryFilter('Cámara')}
            className={selectedCategory === 'Cámara' ? 'active' : ''}
          >
            <i className="fas fa-camera"></i> Cámara
          </button>
          <button
            onClick={() => handleCategoryFilter('Drone')}
            className={selectedCategory === 'Drone' ? 'active' : ''}
          >
            <i className="fas fa-drone"></i> Drone
          </button>
        </div>
      </div>

      <div className="product-grid">
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
              <h2 className="product-name">{product.name}</h2>
              <p className="price">${product.price}</p>
              <div className="product-actions">
                <Link to={`/products/${product.id}`} className="view-details">
                  <i className="fas fa-eye"></i> View Details
                </Link>
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="view-cart">
        <Link to="/cart">
          <button className="view-cart-btn">
            <i className="fas fa-shopping-cart"></i> View Cart ({cart.length})
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Products;
