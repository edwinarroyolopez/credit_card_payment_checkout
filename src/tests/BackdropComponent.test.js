import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BackdropComponent from '../components/BackdropComponent';

describe('BackdropComponent', () => {
  const defaultProps = {
    show: true,
    totalItems: 5,
    totalAmount: 100,
    onHide: jest.fn(),
    onPay: jest.fn(),
  };

  test('renders correctly with given props', () => {
    render(<BackdropComponent {...defaultProps} />);

    expect(screen.getByText('Payment Summary')).toBeInTheDocument();
    expect(screen.getByText('This is the payment summary for your purchase.')).toBeInTheDocument();
    expect(screen.getByText('Total Items:')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Total Amount:')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pay Now/i })).toBeInTheDocument();
  });

  test('calls onHide when close button is clicked', () => {
    render(<BackdropComponent {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(defaultProps.onHide).toHaveBeenCalled();
  });

  test('calls onPay when Pay Now button is clicked', () => {
    render(<BackdropComponent {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /Pay Now/i }));
    expect(defaultProps.onPay).toHaveBeenCalled();
  });

  test('does not render when show is false', () => {
    render(<BackdropComponent {...defaultProps} show={false} />);

    expect(screen.queryByText('Payment Summary')).not.toBeInTheDocument();
  });
});
