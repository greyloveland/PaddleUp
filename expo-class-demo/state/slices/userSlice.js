import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the API base URL
const API_URL = 'http://127.0.0.1:8000/api/users/'; // Update with actual backend URL

// Async thunk to fetch user data (GET request)
export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to add a new user (POST request)
export const addUser = createAsyncThunk('user/addUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to add user');
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Initial state
const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add user
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
