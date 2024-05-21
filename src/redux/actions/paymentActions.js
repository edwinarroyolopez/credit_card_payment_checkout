import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const mockApiCall = (paymentData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (paymentData.cardNumber === '4111111111111111') {
        resolve({ success: true });
      } else {
        reject({ success: false, message: 'Invalid card number' });
      }
    }, 1000);
  });
};

export const makePayment = createAsyncThunk(
  'payment/makePayment',
  async (paymentData, { rejectWithValue }) => {
    console.log({ paymentData, message: '-- making payment--'})
    try {
      const response = await mockApiCall(paymentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default paymentSlice.reducer;