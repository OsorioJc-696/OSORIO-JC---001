import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/products?q=${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Buscar productos..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
    </form>
  );
}

export default SearchBar;
