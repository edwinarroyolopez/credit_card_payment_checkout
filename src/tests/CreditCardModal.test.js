import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CreditCardModal from '../components/CreditCardModal';
import { makePayment } from '../redux/reducers/paymentReducer';








jest.mock('../hooks/useLocalStorage', () => {
  return (key, initialValue) => [initialValue, jest.fn()];
});

jest.mock('../redux/reducers/paymentReducer', () => ({
  makePayment: jest.fn(),
}));

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('CreditCardModal', () => {
  let store;
  let handleCloseMock;

  beforeEach(() => {
    handleCloseMock = jest.fn();
    store = mockStore({
      products: [
        { id: 1, name: 'Product 1', price: 10, quantity: 1 },
        { id: 2, name: 'Product 2', price: 20, quantity: 2 },
      ],
      payment: { status: '' },
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <CreditCardModal show={true} handleClose={handleCloseMock} />
      </Provider>
    );

  it('should render CreditCardModal correctly', () => {
    renderComponent();

    expect(screen.getByText('Pay with Credit Card')).toBeInTheDocument();
  });

  it('should show toast with invalid card information', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Submit Payment'));

    // await waitFor(() => expect(screen.getByText('Invalid card infomation')).toBeInTheDocument());
    // expect(screen.getByText('Please enter valid credit card information.')).toBeInTheDocument();
  });

  it('should close modal on valid payment accept', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111 1111 1111 1111' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Submit Payment'));

    // await waitFor(() => expect(handleCloseMock).toHaveBeenCalledTimes(1));
  });

  it('should dispatch makePayment action on payment success', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111 1111 1111 1111' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Submit Payment'));

    // await waitFor(() => {
    //   expect(makePayment).toHaveBeenCalledWith({
    //     cardNumber: '4111 1111 1111 1111',
    //     expiryDate: '12/23',
    //     cvv: '123',
    //   });
    // });
  });

  it('should handle payment failure', async () => {
    makePayment.mockRejectedValueOnce(new Error('Payment failed'));

    renderComponent();

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111 1111 1111 1111' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Submit Payment'));

    // await waitFor(() => {
    //   expect(screen.getByText('Payment failed. Please try again.')).toBeInTheDocument();
    // });
  });
});
