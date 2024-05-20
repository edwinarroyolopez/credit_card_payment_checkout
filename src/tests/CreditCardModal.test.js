import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreditCardModal from '../components/CreditCardModal';

test('renders CreditCardModal and submits form', () => {
  const handleClose = jest.fn();
  const { getByText, getByPlaceholderText } = render(
    <CreditCardModal show={true} handleClose={handleClose} />
  );

  fireEvent.change(getByPlaceholderText('Enter card number'), { target: { value: '1234567812345678' } });
  fireEvent.change(getByPlaceholderText('MM/YY'), { target: { value: '12/25' } });
  fireEvent.change(getByPlaceholderText('Enter CVV'), { target: { value: '123' } });
  fireEvent.click(getByText('Submit Payment'));

  expect(handleClose).toHaveBeenCalled();
});
