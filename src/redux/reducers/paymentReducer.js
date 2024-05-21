import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    submitPaymentRequest(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    submitPaymentSuccess(state) {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    submitPaymentFail(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  submitPaymentRequest,
  submitPaymentSuccess,
  submitPaymentFail,
} = paymentSlice.actions;

export default paymentSlice.reducer;
