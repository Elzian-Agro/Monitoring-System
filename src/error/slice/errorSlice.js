import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    showModal: false,
    errorMessage: '',
  },
  reducers: {
    showErrorModal: (state, action) => {
      state.showModal = true;
      state.errorMessage = action.payload;
    },
    hideErrorModal: (state) => {
      state.showModal = false;
      state.errorMessage = '';
    },
  },
});

export const { showErrorModal, hideErrorModal } = errorSlice.actions;

export default errorSlice.reducer;
