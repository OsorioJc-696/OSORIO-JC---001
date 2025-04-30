/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa'; // <-- CAMBIAMOS FaTimesCircle por FaTimes
import api from '../services/api';
import { fetchUser, updateUser } from '../slice/authSlice'; // Asegúrate de que 'updateUser' exista
import '../styles/Profile.css';

function Profile() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '',
      });
    }
  }, [user, reset]);

  /*const onSubmit = async (data) => {
    try {
      await api.put('/users/me', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(fetchUser()); // Fetch updated user data
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error('Error updating profile');
    }
  };*/

  const onSubmit = async (data) => {
    try {
      await dispatch(updateUser(data));  // Llamamos a la acción de Redux para actualizar el perfil
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (err) {
      toast.error('Error updating profile');
    }
  };

  const handleEditToggle = () => setEditing(prev => !prev);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Avatar */}
        <div className="avatar-container">
          <img
            src={user?.avatarUrl || '/default-avatar.png'}
            alt="Profile"
            className="avatar"
          />
          {editing && (
            <button type="button" className="avatar-change-btn">
              <FaCamera />
            </button>
          )}
        </div>

        {/* Info */}
        <h2 className="username">{user?.username}</h2>
        <p className="email">{user?.email}</p>
        <p className="phone">{user?.phone}</p>

        <button
          onClick={handleEditToggle}
          className="edit-btn"
          type="button"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>
              {editing ? <FaTimes /> : <FaEdit />}
            </span>
            <span>
              {editing ? 'Cancel' : 'Edit Profile'}
            </span>
          </span>
        </button>
      </div>

      {/* Formulario de edición */}
      {editing && (
        <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <p className="error">{errors.username.message}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              {...register('phone', {
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: 'Invalid phone number',
                },
              })}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <button type="submit" className="save-btn">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaSave />
              Save Changes
            </span>
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
