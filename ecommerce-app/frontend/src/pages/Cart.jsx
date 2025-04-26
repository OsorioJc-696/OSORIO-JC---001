import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="cart container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image_url} alt={product.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-footer">
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
