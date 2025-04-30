// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice.js'; // Asegúrate de importar el slice correcto

export const store = configureStore({
  reducer: {
    auth: authReducer, // Agrega el authSlice al store
  },
});
