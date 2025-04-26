import ProductList from '../components/Product/ProductList';

function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to E-Shop</h1>
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <ProductList />
    </div>
  );
}

export default Home;