import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ComputerCustomization from '../components/Product/ComputerCustomization';
import CameraCustomization from '../components/Product/CameraCustomization';

function ProductDetail() {
  const { id } = useParams();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`).then(res => res.data),
  });

  if (isLoading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6">Error loading product</div>;

  const isComputer = product.name.toLowerCase().includes('computer');
  const isCamera = product.name.toLowerCase().includes('nikon d550');

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">${product.price}</p>
          {isComputer && <ComputerCustomization product={product} />}
          {isCamera && <CameraCustomization product={product} />}
          {!isComputer && !isCamera && (
            <button
              onClick={() =>
                axios.post(
                  `${import.meta.env.VITE_API_URL}/cart`,
                  { productId: product.id, quantity: 1, giftWrapping: false },
                  { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                // eslint-disable-next-line no-undef
                ).then(() => toast.success('Added to cart'))
              }
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;