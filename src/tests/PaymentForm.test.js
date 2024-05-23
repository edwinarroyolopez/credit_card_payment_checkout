// src/tests/PaymentForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentForm from '../components/CreditCardModal/PaymentForm';

describe('PaymentForm', () => {
  let cardInfo, handleChange, onPaymentAccept;

  beforeEach(() => {
    cardInfo = {
      number: '',
      expiration: '',
      cvv: '',
      cardType: ''
    };
    handleChange = jest.fn();
    onPaymentAccept = jest.fn();
  });

  test('renders PaymentForm correctly', () => {
    render(
      <PaymentForm
        cardInfo={cardInfo}
        handleChange={handleChange}
        onPaymentAccept={onPaymentAccept}
      />
    );

    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    expect(screen.getByText(/submit payment/i)).toBeInTheDocument();
  });

  test('updates card number input correctly', () => {
    render(
      <PaymentForm
        cardInfo={cardInfo}
        handleChange={handleChange}
        onPaymentAccept={onPaymentAccept}
      />
    );

    const cardNumberInput = screen.getByLabelText(/card number/i);
    fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });

    expect(handleChange).toHaveBeenCalledWith('number', '4111111111111111');
  });

  test('updates expiry date input correctly', () => {
    render(
      <PaymentForm
        cardInfo={cardInfo}
        handleChange={handleChange}
        onPaymentAccept={onPaymentAccept}
      />
    );

    const expiryDateInput = screen.getByLabelText(/expiry date/i);
    fireEvent.change(expiryDateInput, { target: { value: '12/24' } });

    expect(handleChange).toHaveBeenCalledWith('expiration', '12/24');
  });

  test('updates cvv input correctly', () => {
    render(
      <PaymentForm
        cardInfo={cardInfo}
        handleChange={handleChange}
        onPaymentAccept={onPaymentAccept}
      />
    );

    const cvvInput = screen.getByLabelText(/cvv/i);
    fireEvent.change(cvvInput, { target: { value: '123' } });

    expect(handleChange).toHaveBeenCalledWith('cvv', '123');
  });

  test('calls onPaymentAccept when submit button is clicked', () => {
    render(
      <PaymentForm
        cardInfo={cardInfo}
        handleChange={handleChange}
        onPaymentAccept={onPaymentAccept}
      />
    );

    const submitButton = screen.getByText(/submit payment/i);
    fireEvent.click(submitButton);

    expect(onPaymentAccept).toHaveBeenCalled();
  });
});
