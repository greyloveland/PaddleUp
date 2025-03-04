import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formDataList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addFormData: (state, action) => {
      console.log('USER DATA SLICE', action.payload);
      state.formDataList.push(action.payload); // Append new form data
    },
    removeFormData: (state, action) => {
      state.formDataList = state.formDataList.filter(
        (data, index) => index !== action.payload
      );
    },
    updateFormData: (state, action) => {
      const { index, updatedData } = action.payload;
      if (state.formDataList[index]) {
        state.formDataList[index] = updatedData;
      }
    },
  },
});

export const { addFormData, removeFormData, updateFormData } = userSlice.actions;
export default userSlice.reducer;
