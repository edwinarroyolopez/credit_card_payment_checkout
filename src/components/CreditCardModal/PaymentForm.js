import React from 'react';
import { Form, Button } from 'react-bootstrap';

import visaLogo from '../../assets/visa.png';
import masterCardLogo from '../../assets/mastercard.png';

const PaymentForm = ({
  cardType,
  cardInfo,
  handleChange,
  onPaymentAccept
}) => {

  return (
    <Form >
      <Form.Group controlId="formCardNumber">
        <Form.Label>Card Number</Form.Label>
        <div style={{ position: 'relative' }}>
          <Form.Control
            type="text"
            data-testid="inputCardNumber"
            placeholder="Enter card number"
            value={cardInfo.number}
            onChange={({ target: { value } }) =>
              handleChange('number',value)
            }
            required
          />
          {cardInfo.cardType && (
            <img
              src={cardType === 'visa' ? visaLogo : masterCardLogo}
              alt={`${cardType} logo`}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '30px'
              }}
            />
          )}
        </div>
      </Form.Group>
      <Form.Group controlId="formExpiryDate">
        <Form.Label>Expiry Date</Form.Label>
        <Form.Control
          type="text"
          data-testid="inputExpiryDate"
          placeholder="MM/YY"
          value={cardInfo.expiration}
          onChange={({ target: { value } }) =>
            handleChange('expiration',value)
          }
          required
        />
      </Form.Group>
      <Form.Group controlId="formCvv">
        <Form.Label>CVV</Form.Label>
        <Form.Control
          type="text"
          data-testid="inputCvv"
          placeholder="Enter CVV"
          value={cardInfo.cvv}
          onChange={({ target: { value } }) =>
            handleChange('cvv',value)
          }
          required
        />
      </Form.Group>
      <br />
      <Button variant="primary" onClick={onPaymentAccept}>
        Submit Payment
      </Button>
    </Form>
  );
};

export default PaymentForm;