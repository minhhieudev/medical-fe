import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { AUTH_MESSAGES } from '../../constants/messages';

// Login user thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || AUTH_MESSAGES.LOGIN_FAILED);
    }
  }
);

// Logout user thunk
export const logoutUser = createAsyncThunk(
  'auth/logout', 
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      return null;
    } catch (error) {
      // Even if logout fails on server, we still clear local storage
      localStorage.removeItem('token');
      return null;
    }
  }
);

// Get current user thunk
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error(AUTH_MESSAGES.TOKEN_NOT_FOUND);
      }
      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error.message || AUTH_MESSAGES.GET_USER_FAILED);
    }
  }
);

// Refresh token thunk
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken();
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error.message || AUTH_MESSAGES.SESSION_EXPIRED);
    }
  }
);
