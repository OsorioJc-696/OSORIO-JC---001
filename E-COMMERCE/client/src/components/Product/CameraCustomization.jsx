import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function CameraCustomization({ product, onAddToCart }) {
  const [lens, setLens] = useState('Sony');
  const [extraBatteries, setExtraBatteries] = useState(0);
  const [ram, setRam] = useState(1);
  const { user, token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: (cartItem) =>
      axios.post(`${import.meta.env.VITE_API_URL}/cart`, cartItem, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Added to cart');
      if (onAddToCart) onAddToCart();
    },
    onError: () => toast.error('Failed to add to cart'),
  });

  const calculatePrice = () => {
    if (ram < 1 || ram > 6) {
      toast.error('RAM must be between 1-6 GB');
      return null;
    }
    if (extraBatteries < 0) {
      toast.error('Extra batteries cannot be negative');
      return null;
    }

    let price = product.price;
    let discount = 0;

    if (ram >= 1 && ram <= 6) {
      price += 80;
    }

    if (lens === 'Sony' && extraBatteries >= 2) {
      discount = price * 0.05;
    } else if (lens === 'Nikon' && extraBatteries >= 2) {
      discount = price * 0.1;
    }

    return (price - discount).toFixed(2);
  };

  const handleAddToCart = () => {
    if (!user || !token) {
      toast.error('Please login to add to cart');
      return;
    }

    const finalPrice = calculatePrice();
    if (!finalPrice) return;

    const customizations = { lens, extraBatteries, ram };
    if (!lens || extraBatteries < 0 || ram <= 0) {
      toast.error('All customization fields are required');
      return;
    }

    addToCartMutation.mutate({
      productId: product.id,
      quantity: 1,
      giftWrapping: false,
      customizations,
    });
  };

  const finalPrice = calculatePrice();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Customize Nikon D550</h3>
      <div className="mb-4">
        <label htmlFor="lens" className="block text-gray-700">Lens</label>
        <select
          id="lens"
          value={lens}
          onChange={(e) => setLens(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={addToCartMutation.isLoading}
        >
          <option value="Sony">Sony</option>
          <option value="Nikon">Nikon</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="extraBatteries" className="block text-gray-700">Extra Batteries</label>
        <input
          id="extraBatteries"
          type="number"
          value={extraBatteries}
          onChange={(e) => setExtraBatteries(Number(e.target.value))}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          required
          disabled={addToCartMutation.isLoading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ram" className="block text-gray-700">RAM (GB)</label>
        <input
          id="ram"
          type="number"
          value={ram}
          onChange={(e) => setRam(Number(e.target.value))}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
          max="6"
          required
          disabled={addToCartMutation.isLoading}
        />
      </div>
      {finalPrice && (
        <p className="text-lg font-semibold mb-4">Estimated Price: ${finalPrice}</p>
      )}
      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={addToCartMutation.isLoading}
      >
        {addToCartMutation.isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default CameraCustomization;