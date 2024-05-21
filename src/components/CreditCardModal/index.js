import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import valid from 'card-validator';
import { Modal } from 'react-bootstrap';

import { makePayment } from '../../redux/actions/paymentActions';
import useLocalStorage from '../../hooks/useLocalStorage';
import PaymentForm from './PaymentForm';
import BackdropComponent from '../BackdropComponent';

const CreditCardModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [cardNumber, setCardNumber] = useLocalStorage('cardNumber', '');
  const [expiryDate, setExpiryDate] = useLocalStorage('expiryDate', '');
  const [cvv, setCvv] = useLocalStorage('cvv', '');
  const [cardType, setCardType] = useLocalStorage('cardType', '');

  const [showPaymentSummary, setShowPaymentSummary] = useState(false);


  const totalAmount = products.reduce((total, product) => total + product.price * product.quantity, 0);
  const totalItems = products.reduce((total, product) => total + product.quantity, 0);

  console.log({ totalItems })

  const handlePaymentAccept = () => {

    const cardValidation = valid.number(cardNumber);
    const expiryValidation = valid.expirationDate(expiryDate);
    const cvvValidation = valid.cvv(cvv);

    console.log({ cardValidation: cardValidation.isValid, cvvValidation: cvvValidation.isValid })
    if (cardValidation.isValid && cvvValidation.isValid) {
      console.log('Payment accepted');
      setShowPaymentSummary(true);
      handleClose();
    } else {
      console.error('Please enter valid credit card information.');
    }

  };

  const handlePaymentSuccess = async () => {
    try {
      await dispatch(makePayment({ cardNumber, expiryDate, cvv }));
      console.log('Payment successs');
      setShowPaymentSummary(false);

      // clear the payment data
      localStorage.removeItem('cardNumber');
      localStorage.removeItem('expiryDate');
      localStorage.removeItem('cvv');
      localStorage.removeItem('cardType');

      handleClose();

    } catch (error) {
      console.error('Payment failed. Please try again.', error);
    }
  };

  useEffect(() => {
    const cardValidation = valid.number(cardNumber);
    if (cardValidation.card) {
      setCardType(cardValidation.card.type);
    } else {
      setCardType('');
    }
  }, [cardNumber]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Pay with Credit Card"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentForm
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            cvv={cvv}
            setCvv={setCvv}
            cardType={cardType}
            setCardType={setCardType}
            onPaymentAccept={handlePaymentAccept}
          />
        </Modal.Body>
      </Modal>
      <BackdropComponent
        show={showPaymentSummary}
        totalAmount={totalAmount}
        totalItems={totalItems}
        onHide={() => setShowPaymentSummary(false)}
        onPay={handlePaymentSuccess}
      />
    </>
  );
};

export default CreditCardModal;