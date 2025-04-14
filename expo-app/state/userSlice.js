import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base API URL
const API_URL = 'http://localhost:8000/api/users/';
const AUTH_URL = 'http://localhost:8000/api/auth/';

// Thunks for async operations
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
});

export const createUser = createAsyncThunk('user/createUser', async (userData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error('Failed to create user');
  return await response.json();
});

export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
  const response = await fetch(`${AUTH_URL}login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error('Login failed');
  return await response.json();
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, updatedData }) => {
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return await response.json();
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete user');
  return id;
});

// Initial State
const initialState = {
  formDataList: [],
  currentUser: null,
  token: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Redux Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formDataList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.formDataList.push(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.formDataList.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.formDataList[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.formDataList = state.formDataList.filter((user) => user.id !== action.payload);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
