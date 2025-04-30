import { Link } from 'react-router-dom';
import { FaTrashAlt, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';  // Usamos el contexto
import '../styles/Cart.css';

function Cart() {
  const { cart, removeFromCart } = useCart();  // Usamos el contexto

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart container">
      <h1 className="cart-title">
        <FaShoppingBag /> Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <div className="cart-item-image-wrapper">
                <img src={product.image_url} alt={product.name} className="cart-item-image" />
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-name">{product.name}</h3>
                <p className="cart-item-price">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="remove-item-btn"
                  aria-label={`Remove ${product.name}`}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            Total: <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart-actions">
            <Link to="/products" className="continue-shopping">Continue Shopping</Link>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
