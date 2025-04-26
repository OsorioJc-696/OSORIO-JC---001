import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductCard from './ProductCard';

function ProductList() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
  });

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      return axios.get(`${import.meta.env.VITE_API_URL}/products?${params.toString()}`).then(res => res.data);
    },
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Cameras">Cameras</option>
        </select>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Brands</option>
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
          <option value="Nikon">Nikon</option>
          <option value="Sony">Sony</option>
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 mt-2 rounded"></div>
              <div className="h-4 bg-gray-200 mt-2 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error loading products</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;