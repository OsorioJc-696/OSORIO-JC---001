import '../styles/Home.css';
import Products from './Products';

function Home() {
  return (
    <div className="page">
      <h1>Bienvenido a E-Shop</h1>
      <p>Explora nuestros productos increíbles.</p>
      <Products/>
    </div>
  );
}

export default Home;
