import '../styles/HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Descubre lo Mejor en Tecnología y Estilo</h1>
        <p>Ofertas exclusivas en tus productos favoritos. ¡Compra ahora!</p>
        <Link to="/products" className="hero-btn">Explorar Tienda</Link>
      </div>
    </section>
  );
}

export default HeroSection;
