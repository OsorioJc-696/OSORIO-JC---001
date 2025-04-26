import { FaShoppingCart } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartIcon() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-icon">
      <FaShoppingCart />
      {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
    </div>
  );
}

export default CartIcon;
