import React from 'react';
import valid from 'card-validator';
import { Form, Button } from 'react-bootstrap';

import visaLogo from '../../assets/visa.png';
import masterCardLogo from '../../assets/mastercard.png';

const PaymentForm = ({
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  cardType,
  setCardType,
  onPaymentAccept
}) => {

  const handleCardNumberChange = (e) => {
    const number = e.target.value;
    setCardNumber(number);

    const cardValidation = valid.number(number);
    if (cardValidation.card) {
      setCardType(cardValidation.card.type);
    } else {
      setCardType('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onPaymentAccept()
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCardNumber">
        <Form.Label>Card Number</Form.Label>
        <div style={{ position: 'relative' }}>
          <Form.Control
            type="text"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
          {cardType && (
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
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCvv">
        <Form.Label>CVV</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit Payment
      </Button>
    </Form>
  );
};

export default PaymentForm;