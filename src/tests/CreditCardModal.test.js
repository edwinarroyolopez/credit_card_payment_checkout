// src/tests/CreditCardModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CreditCardModal from '../components/CreditCardModal';
// import { makePayment } from '../redux/actions/paymentActions';

// jest.mock('../redux/actions/paymentActions');

const mockStore = configureStore([]);
const initialState = {
  // Define the initial state of the Redux store if needed
};

describe('CreditCardModal', () => {
  let store;
  let handleClose;

  beforeEach(() => {
    store = mockStore(initialState);
    handleClose = jest.fn();
  });

  test('renders CreditCardModal correctly', () => {

     const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <CreditCardModal show={true} handleClose={handleClose} />
      </Provider>
    );

    expect(screen.getByText(/pay with credit card/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    expect(screen.getByText(/submit payment/i)).toBeInTheDocument();
  });

  // test('handles payment accept and payment success correctly', async () => {
  //   makePayment.mockResolvedValueOnce({});

  //   render(
  //     <Provider store={store}>
  //       <CreditCardModal show={true} handleClose={handleClose} />
  //     </Provider>
  //   );

  //   const cardNumberInput = screen.getByLabelText(/card number/i);
  //   const expiryDateInput = screen.getByLabelText(/expiry date/i);
  //   const cvvInput = screen.getByLabelText(/cvv/i);

  //   fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });
  //   fireEvent.change(expiryDateInput, { target: { value: '12/23' } });
  //   fireEvent.change(cvvInput, { target: { value: '123' } });

  //   // fireEvent.click(screen.getByText(/submit payment/i));

  //   // Check if handlePaymentAccept is called
  //   // expect(handleClose).toHaveBeenCalled();

  //   // Simulate payment success
  //   const payButton = screen.getByText(/pay/i);
  //   fireEvent.click(payButton);

  //   // Check if makePayment action is dispatched
  //   expect(makePayment).toHaveBeenCalledWith({
  //     cardNumber: '4111111111111111',
  //     expiryDate: '12/23',
  //     cvv: '123',
  //   });

  //   // Check if handleClose is called after successful payment
  //   expect(handleClose).toHaveBeenCalledTimes(2);
  // });
});
