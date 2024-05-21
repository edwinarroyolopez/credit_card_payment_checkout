import { configureStore } from '@reduxjs/toolkit';
import productReducer from './redux/reducers/productReducer';
import paymentReducer from './redux/reducers/paymentReducer'; 

const store = configureStore({
  reducer: {
    products: productReducer,
    payment: paymentReducer, // Agrega el nuevo reducer de pagos
  },
});

export default store;