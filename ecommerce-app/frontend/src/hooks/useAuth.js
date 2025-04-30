import { useState, useEffect } from 'react';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Comprobamos si el token está presente y si no ha expirado.
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decodificamos el JWT
        const isExpired = decoded.exp * 1000 < Date.now(); // Comprobamos si ha expirado

        if (isExpired) {
          setAuthenticated(false);
          localStorage.removeItem('token'); // Eliminamos el token si ha expirado
        } else {
          setAuthenticated(true);
        }
      } catch (err) {
        console.error("Error al verificar el token:", err);
        setAuthenticated(false);
        localStorage.removeItem('token');
      }
    } else {
      setAuthenticated(false);
    }
  }, []);

  return { authenticated };
}
