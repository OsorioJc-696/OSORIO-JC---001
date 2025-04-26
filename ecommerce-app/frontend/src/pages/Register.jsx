
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordStrong = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!username || !email || !password || !confirmPassword || !phoneNumber) {
      setError('Todos los campos son obligatorios');
      setIsLoading(false);
      return;
    }

    if (!isEmailValid(email)) {
      setError('Por favor, ingresa un correo electrónico válido');
      setIsLoading(false);
      return;
    }

    if (!isPasswordStrong(password)) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/users/register', {
        username,
        email,
        password,
        phone_number: phoneNumber, // 👈 importante
      });
      setSuccessMessage('¡Registro exitoso! Redireccionando al inicio de sesión...');
      setIsLoading(false);
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.message || '¡Registro fallido! Por favor, intenta de nuevo.';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Crear Cuenta</h1>
          <p className="register-subtitle">Completa el formulario para registrarte</p>
        </div>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre de usuario"
              className="input"
              autoComplete="username"
              disabled={isLoading}
            />
          </div>
          
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
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="phoneNumber">Número de teléfono</label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Ej. 555-123-4567"
              className="input"
              autoComplete="tel"
              disabled={isLoading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="input"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              className="input"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : 'Registrarse'}
          </button>
          
          <div className="login-link">
            <p>¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
