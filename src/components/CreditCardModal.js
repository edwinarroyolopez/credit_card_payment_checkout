import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import valid from 'card-validator';
import visaLogo from '../assets/visa.png';
import masterCardLogo from '../assets/mastercard.png';

const CreditCardModal = ({ show, handleClose }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardValidation = valid.number(cardNumber);
    const expiryValidation = valid.expirationDate(expiryDate);
    const cvvValidation = valid.cvv(cvv);

    if (cardValidation.isValid && expiryValidation.isValid && cvvValidation.isValid) {
      console.log('Credit Card Info:', { cardNumber, expiryDate, cvv });
      handleClose();
    } else {
      console.log('Please enter valid credit card information.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Pay with Credit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default CreditCardModal;
