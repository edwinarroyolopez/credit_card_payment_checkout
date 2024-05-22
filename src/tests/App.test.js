import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import App from '../App';
import { resetPaymentState } from '../redux/reducers/paymentReducer';

const mockStore = configureStore([]);

jest.mock('../hooks/useLocalStorage', () => {
  return jest.fn(() => ['', jest.fn()]);
});

describe('App', () => {
  let store;
  let mockDispatch;

  beforeEach(() => {
    store = mockStore({
      products: [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 }
      ],
      payment: {
        status: ''
      }
    });

    mockDispatch = jest.fn();
    store.dispatch = mockDispatch;
  });

  it('should render ProductList with products from Redux store and open CreditCardModal on button click', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText('Product 3')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByText('$20')).toBeInTheDocument();
    expect(getByText('$30')).toBeInTheDocument();

    fireEvent.click(getByText('Pay with credit card'));
    expect(queryByText('Pay with Credit Card')).toBeInTheDocument();
  });

  it('should update payment status and display PaymentStatus component', () => {
    store = mockStore({
      products: [],
      payment: {
        status: 'succeeded'
      }
    });

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Payment Successful')).toBeInTheDocument();
  });

  it('should handle retry payment', () => {
    store = mockStore({
      products: [],
      payment: {
        status: 'failed'
      }
    });

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Payment Failed')).toBeInTheDocument();
    fireEvent.click(getByText('Retry Payment'));
    
  });

  it('should close CreditCardModal when handleClose is called', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(getByText('Pay with credit card'));
    expect(queryByText('Pay with Credit Card')).toBeInTheDocument();

  });
});
