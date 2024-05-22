import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductList from '../components/ProductList';

const mockStore = configureStore([]);

describe('ProductList', () => {
  let store;

  const initialState = {
    products: [
      { id: 1, name: 'Product 1', price: 10, quantity: 3, image: 'product1.jpg' },
      { id: 2, name: 'Product 2', price: 20, quantity: 5, image: 'product2.jpg' },
      { id: 3, name: 'Product 3', price: 30, quantity: 7, image: 'product3.jpg' }
    ]
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders correctly with products from the state', () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    // Verify that the header is rendered
    expect(screen.getByText('Products in the cart')).toBeInTheDocument();

    // Verify that each product is rendered with correct information
    initialState.products.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      // expect(screen.getByAltText(product.name)).toBeInTheDocument();
    });
  });

  test('renders no products when state is empty', () => {
    store = mockStore({ products: [] });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    // Verify that the header is rendered
    expect(screen.getByText('Products in the cart')).toBeInTheDocument();

    // Verify that no products are rendered
    expect(screen.queryByAltText(/product/i)).not.toBeInTheDocument();
  });
});
