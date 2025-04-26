import ProductList from '../components/Product/ProductList';

function ProductsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList />
    </div>
  );
}

export default ProductsPage;