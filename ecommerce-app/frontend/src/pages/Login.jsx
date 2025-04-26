import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ usamos AuthContext

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      setIsLoading(false);
      return;
    }

    if (!isEmailValid(email)) {
      setError('Por favor, ingresa un correo electrónico válido');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/users/login', { email, password });

      const { token } = response.data; // ✅ asumimos que API devuelve token
      if (token) {
        login(token); // ✅ guardamos en contexto y localStorage
        navigate('/products'); // ✅ redirigimos a productos
      } else {
        setError('Token inválido recibido');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Credenciales inválidas. Verifica tu correo y contraseña.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Iniciar Sesión</h1>
          <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="input"
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input"
              autoComplete="current-password"
            />
          </div>

          <div className="forgot-password">
            <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>

          <div className="register-link">
            <p>¿No tienes una cuenta? <Link to="/register">Regístrate ahora</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
