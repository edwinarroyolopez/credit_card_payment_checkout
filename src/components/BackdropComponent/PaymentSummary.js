import React from 'react';
import { Button } from 'react-bootstrap';

const PaymentSummary = ({ totalAmount, onPay }) => {
  return (
    <div className="payment-summary">
      <h2>Summary Payment</h2>
      <p>Total Amount: ${totalAmount}</p>
      <Button onClick={onPay} variant="primary">
        Pay Now
      </Button>
    </div>
  );
};

export default PaymentSummary;