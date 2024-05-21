import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const blackListCards = [
  { id: 1, brand: 'mastercard', cardNumber: '5462 8800 0029 2065', cvv: '304', expirateDate: '10/2021' },
  { id: 2, brand: 'mastercard', cardNumber: '5462 8800 0062 5348', cvv: '759', expirateDate: '2/2021' },
  { id: 3, brand: 'mastercard', cardNumber: '5430 8821 9852 6980', cvv: '743', expirateDate: '1/2023' }
];

const mockApiCall = (paymentData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if(blackListCards.find(card => card.cardNumber === paymentData.cardNumber)){
        reject({ success: false, message: 'Rejected transaction' });
      }else{
        resolve({ success: true, message: 'Correct transaction' });
      }
    }, 1000);
  });
};

export const makePayment = createAsyncThunk(
  'payment/makePayment',
  async (paymentData, { rejectWithValue }) => {
    console.log({ paymentData, message: '-- making payment--' })
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