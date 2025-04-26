import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function ComputerCustomization({ product, onAddToCart }) {
  const [processor, setProcessor] = useState('Intel');
  const [os, setOs] = useState('Windows');
  const [ssd, setSsd] = useState('256GB');
  const [ram, setRam] = useState(8);
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
    if (ram < 4 || ram > 15) {
      toast.error('RAM must be between 4-15 GB');
      return null;
    }

    let price = product.price;
    let discount = 0;

    if (ram >= 4 && ram <= 8) {
      price += 50;
    } else if (ram >= 9 && ram <= 15) {
      price += 150;
    }

    if (processor === 'Intel' && os === 'Linux') {
      discount = price * 0.05;
    } else if (processor === 'AMD' && os === 'Linux') {
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

    const customizations = { processor, os, ssd, ram };
    if (!processor || !os || !ssd || ram <= 0) {
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
      <h3 className="text-xl font-bold mb-4">Customize Your Computer</h3>
      <div className="mb-4">
        <label htmlFor="processor" className="block text-gray-700">Processor</label>
        <select
          id="processor"
          value={processor}
          onChange={(e) => setProcessor(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={addToCartMutation.isLoading}
        >
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="os" className="block text-gray-700">Operating System</label>
        <select
          id="os"
          value={os}
          onChange={(e) => setOs(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={addToCartMutation.isLoading}
        >
          <option value="Windows">Windows</option>
          <option value="Linux">Linux</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="ssd" className="block text-gray-700">SSD</label>
        <select
          id="ssd"
          value={ssd}
          onChange={(e) => setSsd(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={addToCartMutation.isLoading}
        >
          <option value="256GB">256GB</option>
          <option value="512GB">512GB</option>
          <option value="1TB">1TB</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="ram" className="block text-gray-700">RAM (GB)</label>
        <input
          id="ram"
          type="number"
          value={ram}
          onChange={(e) => setRam(Number(e.target.value))}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="4"
          max="15"
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

export default ComputerCustomization;