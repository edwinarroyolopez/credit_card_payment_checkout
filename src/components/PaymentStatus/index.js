import React from 'react';
import { useSelector } from 'react-redux';
import { PaymentStatusWrapper, Message, RetryButton } from './PaymentStatus.Style';

const PaymentStatus = ({ handleRetry }) => {
  const paymentStatus = useSelector(state => state.payment.status);
  const paymentError = useSelector(state => state.payment.status);

  return (
    <PaymentStatusWrapper>
      <h2>{paymentStatus === 'succeeded' ? 'Payment Successful' : 'Payment Failed'}</h2>
      <Message>
        {paymentStatus === 'succeeded'
          ? 'Your payment was processed successfully!'
          : 'There was an error processing your payment.'}
      </Message>
      <RetryButton variant="primary" onClick={handleRetry}>
        {paymentStatus === 'succeeded' ? 'Go to Home' : 'Retry Payment'}
      </RetryButton>
    </PaymentStatusWrapper>
  );
};

export default PaymentStatus;
