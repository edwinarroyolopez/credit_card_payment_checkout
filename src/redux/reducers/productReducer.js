import { createSlice } from '@reduxjs/toolkit';

const initialState =  [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ]


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Define tus reducers aquí si es necesario
  }
});

export default productSlice.reducer;