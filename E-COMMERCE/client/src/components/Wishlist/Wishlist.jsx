import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Wishlist() {
  const { user, token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: wishlistItems, isLoading, error } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.data),
    enabled: !!user,
  });

  const deleteWishlistItemMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
      toast.success('Item removed from wishlist');
    },
    onError: () => toast.error('Failed to remove item'),
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

  if (!user) return <div className="text-center p-6">Please login to view your wishlist</div>;
  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 mt-2 rounded"></div>
              <div className="h-4 bg-gray-200 mt-2 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div className="text-center p-6 text-red-500">Error loading wishlist</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <Link to={`/products/${item.Product.id}`}>
                <img
                  src={item.Product.images?.[0] || 'https://via.placeholder.com/150'}
                  alt={item.Product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2">{item.Product.name}</h3>
                <p className="text-gray-600">${item.Product.price}</p>
              </Link>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => deleteWishlistItemMutation.mutate(item.id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={deleteWishlistItemMutation.isLoading}
                >
                  Remove
                </button>
                <button
                  onClick={() => addToCartMutation.mutate(item.Product.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={addToCartMutation.isLoading}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;