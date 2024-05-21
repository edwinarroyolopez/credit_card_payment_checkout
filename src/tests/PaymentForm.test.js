// src/tests/PaymentForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentForm from '../components/CreditCardModal/PaymentForm';

describe('PaymentForm', () => {
  let cardNumber, setCardNumber, expiryDate, setExpiryDate, cvv, setCvv, cardType, setCardType, onPaymentAccept;

  beforeEach(() => {
    cardNumber = '';
    setCardNumber = jest.fn();
    expiryDate = '';
    setExpiryDate = jest.fn();
    cvv = '';
    setCvv = jest.fn();
    cardType = '';
    setCardType = jest.fn();
    onPaymentAccept = jest.fn();
  });

  test('renders PaymentForm correctly', () => {
    render(
      <PaymentForm
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expiryDate={expiryDate}
        setExpiryDate={setExpiryDate}
        cvv={cvv}
        setCvv={setCvv}
        cardType={cardType}
        setCardType={setCardType}
        onPaymentAccept={onPaymentAccept}
      />
    );

    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    expect(screen.getByText(/submit payment/i)).toBeInTheDocument();
  });

  test('updates card type when valid card number is entered', () => {
    render(
      <PaymentForm
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expiryDate={expiryDate}
        setExpiryDate={setExpiryDate}
        cvv={cvv}
        setCvv={setCvv}
        cardType={cardType}
        setCardType={setCardType}
        onPaymentAccept={onPaymentAccept}
      />
    );

    const cardNumberInput = screen.getByLabelText(/card number/i);
    fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });

    expect(setCardNumber).toHaveBeenCalledWith('4111111111111111');
    expect(setCardType).toHaveBeenCalledWith('visa');
  });

  // test('submits the form with valid data', () => {
  //   render(
  //     <PaymentForm
  //       cardNumber="4111111111111111"
  //       setCardNumber={setCardNumber}
  //       expiryDate="12/23"
  //       setExpiryDate={setExpiryDate}
  //       cvv="123"
  //       setCvv={setCvv}
  //       cardType="visa"
  //       setCardType={setCardType}
  //       onPaymentAccept={onPaymentAccept}
  //     />
  //   );

  //   fireEvent.click(screen.getByText(/submit payment/i));

  //   expect(onPaymentAccept).toHaveBeenCalled();
  // });
});
