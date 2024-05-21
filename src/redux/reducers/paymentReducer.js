import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const blackListCards = [
  { id: 1, brand: 'mastercard', cardNumber: '5462 8800 0029 2065', cvv: '304', expirateDate: '10/2021' },
  { id: 2, brand: 'mastercard', cardNumber: '5462 8800 0062 5348', cvv: '759', expirateDate: '2/2021' },
  { id: 3, brand: 'mastercard', cardNumber: '5430 8821 9852 6980', cvv: '743', expirateDate: '1/2023' }
];

const mockApiCall = (paymentData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (blackListCards.find(card => card.cardNumber === paymentData.cardNumber)) {
        reject({ success: false });
      } else {
        resolve({ success: true });
      }
    }, 1000);
  });
};

export const makePayment = createAsyncThunk(
  'payment/makePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await mockApiCall(paymentData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  status: ''
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState(state) {
      {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.status = '';
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;