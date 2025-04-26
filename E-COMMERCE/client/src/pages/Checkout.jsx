import { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Checkout() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    email: '',
  });

  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    zip: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const { data: cartItems, isLoading: cartLoading, error: cartError } = useQuery({
    queryKey: ['cart'],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.data),
    enabled: !!user,
  });

  const checkoutMutation = useMutation({
    mutationFn: (order) =>
      axios.post(`${import.meta.env.VITE_API_URL}/orders`, order, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      queryClient.invalidateQueries(['orders']);
      toast.success('Order placed successfully');
      navigate('/orders');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Payment failed');
    },
  });

  const handleBillingChange = (e) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (cardDetails.number !== '4111111111111111') {
      toast.error('Invalid card number. Use 4111111111111111 for testing.');
      setIsLoading(false);
      return;
    }

    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      toast.error('CVV must be 3 digits');
      setIsLoading(false);
      return;
    }

    if (!/^\d{5}$/.test(cardDetails.zip)) {
      toast.error('Zip code must be 5 digits');
      setIsLoading(false);
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      toast.error('Expiry must be MM/YY');
      setIsLoading(false);
      return;
    }

    if (Object.values(billingAddress).some(val => !val)) {
      toast.error('All billing address fields are required');
      setIsLoading(false);
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast.error('Cart is empty');
      setIsLoading(false);
      return;
    }

    const items = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.Product.price,
      giftWrapping: item.giftWrapping,
      customizations: item.customizations,
    }));

    checkoutMutation.mutate({ items, billingAddress });
    setIsLoading(false);
  };

  if (!user) return <div className="text-center p-6">Please login to checkout</div>;
  if (cartLoading) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        </div>
      </div>
    );
  }
  if (cartError) return <div className="text-center p-6 text-red-500">Error loading cart</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Billing Address</h3>
          <div className="mb-4">
            <label htmlFor="street" className="block text-gray-700">Street</label>
            <input
              id="street"
              type="text"
              name="street"
              value={billingAddress.street}
              onChange={handleBillingChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700">City</label>
            <input
              id="city"
              type="text"
              name="city"
              value={billingAddress.city}
              onChange={handleBillingChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-700">State</label>
            <input
              id="state"
              type="text"
              name="state"
              value={billingAddress.state}
              onChange={handleBillingChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="zip" className="block text-gray-700">Zip Code</label>
            <input
              id="zip"
              type="text"
              name="zip"
              value={billingAddress.zip}
              onChange={handleBillingChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={billingAddress.email}
              onChange={handleBillingChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
          <div className="mb-4">
            <label htmlFor="number" className="block text-gray-700">Card Number</label>
            <input
              id="number"
              type="text"
              name="number"
              value={cardDetails.number}
              onChange={handleCardChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
              placeholder="4111111111111111"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiry" className="block text-gray-700">Expiry (MM/YY)</label>
            <input
              id="expiry"
              type="text"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleCardChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
              placeholder="MM/YY"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-gray-700">CVV</label>
            <input
              id="cvv"
              type="text"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
              placeholder="123"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cardZip" className="block text-gray-700">Zip Code</label>
            <input
              id="cardZip"
              type="text"
              name="zip"
              value={cardDetails.zip}
              onChange={handleCardChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
              placeholder="12345"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isLoading || checkoutMutation.isLoading}
          >
            {isLoading || checkoutMutation.isLoading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between py-2">
            <span>{item.Product.name} x {item.quantity}</span>
            <span>${(item.quantity * item.Product.price + (item.giftWrapping ? 10 : 0)).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between py-2 font-bold">
          <span>Total</span>
          <span>
            ${cartItems.reduce((sum, item) => sum + item.quantity * item.Product.price + (item.giftWrapping ? 10 : 0), 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;