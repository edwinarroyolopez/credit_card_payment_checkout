import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import ProductList from '../components/ProductList';

const mockStore = configureStore([]);

describe('ProductList', () => {
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

  it('should render with given state from Redux store', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(getByText('Products in the cart')).toBeInTheDocument();
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText('$20')).toBeInTheDocument();
    expect(getByText('Product 3')).toBeInTheDocument();
    expect(getByText('$30')).toBeInTheDocument();
  });
});
