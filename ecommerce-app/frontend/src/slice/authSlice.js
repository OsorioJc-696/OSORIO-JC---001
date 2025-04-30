// src/slice/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Acción para iniciar sesión
export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err.response.data.error);
  }
});

// Acción para obtener los datos del usuario
export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.error);
  }
});

// Acción para actualizar los datos del usuario
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.put('/users/me', userData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.data; // Devuelve el usuario actualizado
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

// Slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Acciones del login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Acción para obtener los datos del usuario
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      
      // Acción para actualizar los datos del usuario
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload; // Actualiza los datos del usuario en el estado
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Si hay error, guardamos el mensaje
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
