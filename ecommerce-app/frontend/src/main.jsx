// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';  // Si estás usando un contexto personalizado
import { Provider } from 'react-redux';  // Importa el Provider de react-redux
import { store } from './store/store.js'; // Importa el store de Redux
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> {/* Asegúrate de envolver tu App con el Provider de Redux */}
        <AuthProvider> {/* Si estás usando AuthProvider */}
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
