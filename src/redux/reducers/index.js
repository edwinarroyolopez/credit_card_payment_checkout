import { combineReducers } from 'redux';
import paymentReducer from './paymentReducer';
import paymentReducer from './productReducer';

const rootReducer = combineReducers({
  payment: paymentReducer,
  products: productReducer
});

export default rootReducer;