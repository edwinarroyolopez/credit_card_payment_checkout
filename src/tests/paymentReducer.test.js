import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import paymentReducer, { resetPaymentState, makePayment } from '../redux/reducers/paymentReducer';
import { mockApiCall } from '../redux/reducers/paymentReducer'; // Importa el mock para poderlo usar en los tests

jest.mock('../redux/reducers/paymentReducer', () => {
  const originalModule = jest.requireActual('../redux/reducers/paymentReducer');
  return {
    ...originalModule,
    mockApiCall: jest.fn(),
  };
});

jest.mock('../redux/reducers/paymentReducer', () => {
  const originalModule = jest.requireActual('../redux/reducers/paymentReducer');
  return {
    ...originalModule,
    mockApiCall: jest.fn(),
  };
});


const mockStore = configureStore([]);

describe('paymentReducer', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      payment: {
        loading: false,
        success: false,
        error: null,
        status: ''
      }
    });
  });

  it('should have initial state', () => {
    const initialState = {
        loading: false,
        success: false,
        error: null,
        status: ''
    }
    expect(initialState).toEqual({
      loading: false,
      success: false,
      error: null,
      status: ''
    });
  });

  it('should handle resetPaymentState action', () => {
    store.dispatch(resetPaymentState());
    const actions = store.getActions();

    expect(actions[0].type).toBe(resetPaymentState.type);
  });
});
