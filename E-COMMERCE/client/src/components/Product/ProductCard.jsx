import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function ProductCard({ product }) {
  const { user, token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const addToWishlistMutation = useMutation({
    mutationFn: (productId) =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
      toast.success('Added to wishlist');
    },
    onError: () => toast.error('Failed to add to wishlist'),
  });

  const addToCartMutation = useMutation({
    mutationFn: (productId) =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId, quantity: 1, giftWrapping: false },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Added to cart');
    },
    onError: () => toast.error('Failed to add to cart'),
  });

  const handleAddToWishlist = () => {
    if (!user || !token) {
      toast.error('Please login to add to wishlist');
      return;
    }
    addToWishlistMutation.mutate(product.id);
  };

  const handleAddToCart = () => {
    if (!user || !token) {
      toast.error('Please login to add to cart');
      return;
    }
    addToCartMutation.mutate(product.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/150'}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </Link>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleAddToWishlist}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
          disabled={addToWishlistMutation.isLoading}
        >
          {addToWishlistMutation.isLoading ? 'Adding...' : 'Add to Wishlist'}
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={addToCartMutation.isLoading}
        >
          {addToCartMutation.isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;