import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function Orders() {
  const { user, token } = useContext(AuthContext);

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.data),
    enabled: !!user,
  });

  if (!user) return <div className="text-center p-6">Please login to view your orders</div>;
  if (isLoading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6">Error loading orders</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold">Order #{order.orderNumber}</h3>
              <p>Status: {order.status}</p>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              <p>Total: ${order.total}</p>
              <h4 className="mt-4 font-semibold">Items:</h4>
              <ul className="list-disc pl-6">
                {order.OrderItems.map(item => (
                  <li key={item.id}>
                    {item.Product.name} - Quantity: {item.quantity} - Price: ${item.price}
                    {item.customizations && (
                      <p className="text-sm text-gray-600">
                        Customizations: {JSON.stringify(item.customizations)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-2">Billing Address: {JSON.stringify(order.billingAddress)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;