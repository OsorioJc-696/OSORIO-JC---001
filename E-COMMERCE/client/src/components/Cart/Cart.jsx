import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart() {
  const { user, token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: cartItems, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.data),
    enabled: !!user,
  });

  const updateCartMutation = useMutation({
    mutationFn: ({ id, quantity, giftWrapping }) =>
      axios.put(
        `${import.meta.env.VITE_API_URL}/cart/${id}`,
        { quantity, giftWrapping },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Cart updated');
    },
    onError: () => toast.error('Failed to update cart'),
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Item removed');
    },
    onError: () => toast.error('Failed to remove item'),
  });

  if (!user) return <div className="text-center p-6">Please login to view your cart</div>;
  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center border-b py-4 animate-pulse">
              <div className="w-24 h-24 bg-gray-200 rounded"></div>
              <div className="flex-grow ml-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div className="text-center p-6 text-red-500">Error loading cart</div>;

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.Product.price + (item.giftWrapping ? 10 : 0),
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center border-b py-4">
              <img
                src={item.Product.images?.[0] || 'https://via.placeholder.com/100'}
                alt={item.Product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-grow ml-4">
                <h3 className="text-lg font-semibold">{item.Product.name}</h3>
                <p className="text-gray-600">${item.Product.price}</p>
                {item.customizations && (
                  <p className="text-sm text-gray-600">
                    Customizations: {JSON.stringify(item.customizations)}
                  </p>
                )}
                <div className="flex items-center mt-2">
                  <label className="mr-2">Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartMutation.mutate({
                        id: item.id,
                        quantity: Number(e.target.value),
                        giftWrapping: item.giftWrapping,
                      })
                    }
                    className="w-16 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    disabled={updateCartMutation.isLoading}
                  />
                </div>
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={item.giftWrapping}
                    onChange={(e) =>
                      updateCartMutation.mutate({
                        id: item.id,
                        quantity: item.quantity,
                        giftWrapping: e.target.checked,
                      })
                    }
                    className="mr-2"
                    disabled={updateCartMutation.isLoading}
                  />
                  Gift Wrapping (+$10)
                </label>
              </div>
              <button
                onClick={() => deleteCartItemMutation.mutate(item.id)}
                className="text-red-500 hover:text-red-700"
                disabled={deleteCartItemMutation.isLoading}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;