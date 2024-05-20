import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import App from '../App';

const mockStore = configureStore([]);

describe('App', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 }
      ]
    });
  });

  it('should render ProductList with products from Redux store and open CreditCardModal on button click', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Products to Sell')).toBeInTheDocument();
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();

    fireEvent.click(getByText('Pay with credit card'));
    expect(queryByText('Pay with Credit Card')).toBeInTheDocument();
  });
});
