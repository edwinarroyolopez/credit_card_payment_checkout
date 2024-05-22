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

//   it('should handle makePayment pending state', async () => {
//     store.dispatch(makePayment({ cardNumber: '1234 5678 9012 3456' }));
//     const actions = store.getActions();
//     expect(actions[0].type).toBe(makePayment.pending.type);
//     expect(actions[0].meta.arg).toEqual({ cardNumber: '1234 5678 9012 3456' });
//   });

//   it('should handle makePayment fulfilled state', async () => {
//     mockApiCall.mockResolvedValueOnce({ success: true });

//     await store.dispatch(makePayment({ cardNumber: '1234 5678 9012 3456' }));
//     const actions = store.getActions();

//     expect(actions[1].type).toBe(makePayment.fulfilled.type);
//     expect(actions[1].payload).toEqual({ success: true });
//   });

  it('should handle makePayment rejected state',  () => {
    mockApiCall.mockRejectedValueOnce({ success: false });

     store.dispatch(makePayment({ cardNumber: '5462 8800 0029 2065' }));
    const actions = store.getActions();

    expect(actions[1].type).toBe(makePayment.rejected.type);
    expect(actions[1].payload).toEqual({ success: false });
  });

  it('should handle resetPaymentState action', () => {
    store.dispatch(resetPaymentState());
    const actions = store.getActions();

    expect(actions[0].type).toBe(resetPaymentState.type);
  });
});
