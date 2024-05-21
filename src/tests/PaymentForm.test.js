// src/tests/PaymentForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PaymentForm from '../components/CreditCardModal/PaymentForm';
import { makePayment } from '../redux/actions/paymentActions';
import paymentReducer from '../redux/reducers/paymentReducer';
import productReducer from '../redux/reducers/productReducer';
import { ToastContainer } from 'react-toastify';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = configureStore({
    reducer: { payment: paymentReducer, products: productReducer },
  })

const renderWithProviders = (ui, { store, ...renderOptions } = {}) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        {children}
        <ToastContainer />
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe('PaymentForm', () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore({
//       payment: { status: 'idle' },
//     });

//     store.dispatch = jest.fn();
//   });

  test('renders PaymentForm correctly', () => {
    renderWithProviders(<PaymentForm onPaymentSuccess={jest.fn()} />, { store });

    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    expect(screen.getByText(/submit payment/i)).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    renderWithProviders(<PaymentForm onPaymentSuccess={jest.fn()} />, { store });

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText(/submit payment/i));

    expect(store.dispatch).toHaveBeenCalledWith(makePayment({
      cardNumber: '4111111111111111',
      expiryDate: '12/23',
      cvv: '123'
    }));
  });
});
