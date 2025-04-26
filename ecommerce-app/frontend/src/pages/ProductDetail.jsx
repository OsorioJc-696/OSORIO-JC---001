import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="product-detail container">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>{product.image_URL}</p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
}

export default ProductDetail;