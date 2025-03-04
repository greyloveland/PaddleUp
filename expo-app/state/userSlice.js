import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addFormData: (state, action) => {
      console.log('USER DATA SLICE', action.payload);
      state.formData = action.payload;
    },
  },
});

export const { addFormData } = userSlice.actions;
export default userSlice.reducer;
