import { useCart, useEffect } from 'react';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useCart(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token);
  }, []);

  return { authenticated };
}
