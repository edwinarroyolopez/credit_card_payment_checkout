import React from 'react';
import { Form, Button } from 'react-bootstrap';

import visaLogo from '../../assets/visa.png';
import masterCardLogo from '../../assets/mastercard.png';

const PaymentForm = ({
  cardType,
  setCardInfo,
  cardInfo,
  onPaymentAccept
}) => {

  return (
    <Form >
      <Form.Group controlId="formCardNumber">
        <Form.Label>Card Number</Form.Label>
        <div style={{ position: 'relative' }}>
          <Form.Control
            type="text"
            placeholder="Enter card number"
            value={cardInfo.number}
            onChange={({ target: { value } }) =>
              setCardInfo({ ...cardInfo, number: value })
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
          placeholder="MM/YY"
          value={cardInfo.expiration}
          onChange={({ target: { value } }) =>
            setCardInfo({ ...cardInfo, expiration: value })
          }
          required
        />
      </Form.Group>
      <Form.Group controlId="formCvv">
        <Form.Label>CVV</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter CVV"
          value={cardInfo.cvv}
          onChange={({ target: { value } }) =>
            setCardInfo({ ...cardInfo, cvv: value })
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