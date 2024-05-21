import React from 'react';

import { PaymentStatusWrapper, Message, RetryButton } from './PaymentStatus.Style';

const PaymentStatus = ({ handleRetry, paymentStatus }) => {
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
