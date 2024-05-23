import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import valid from 'card-validator';
import { Modal } from 'react-bootstrap';

import { makePayment } from '../../redux/reducers/paymentReducer';
import useLocalStorage from '../../hooks/useLocalStorage';
import PaymentForm from './PaymentForm';

import ToastComponent from '../ToastComponent';
import BackdropComponent from '../BackdropComponent';

const CreditCardModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [cardInfo, setCardInfo] = useLocalStorage('cardInfo', { number: '', expiration: '', cvv: '', cardType: '' });

  const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');
  const [titleToast, setTitleToast] = useState('');

  const totalAmount = products.reduce((total, product) => total + product.price * product.quantity, 0);
  const totalItems = products.reduce((total, product) => total + product.quantity, 0);

  const handlePaymentAccept = () => {
    const cardValidation = valid.number(cardInfo.number);
    const cvvValidation = valid.cvv(cardInfo.cvv);

    if (cardValidation.isValid && cvvValidation.isValid) {
      console.log('Payment accepted');
      setShowPaymentSummary(true);
      handleClose();
    } else {
      setShowToast(true);
      setTitleToast('Invalid card information');
      setMessageToast('Please enter valid credit card information.');
      setTimeout(() => setShowToast(false), 3000);
      console.log('Please enter valid credit card information.');
    }
  };

  const toggleShowToast = () => {
    setShowToast(!showToast);
  }

  const handleChange = (key, value) => {
    setCardInfo({ ...cardInfo, [key]: value });
  }

  const handlePaymentSuccess = async () => {
    try {
      const response = await dispatch(makePayment({
        cardNumber: cardInfo.number,
        expiryDate: cardInfo.expiration,
        cvv: cardInfo.cvv
      }));
      console.log({ response });
      setShowPaymentSummary(false);

      // clear the payment data
      localStorage.removeItem('cardInfo');

      handleClose();
    } catch (error) {
      console.error('Payment failed. Please try again.', error);
    }
  };

  useEffect(() => {
    const cardValidation = valid.number(cardInfo.number);
    let cardType = ''
    if (cardValidation.card) {
      cardType = cardValidation.card.type
    }
    setCardInfo(prevInfo => ({ ...prevInfo, cardType: cardType }));

  }, [cardInfo.number]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Pay with Credit Card"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentForm
            cardInfo={cardInfo}
            handleChange={handleChange}
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
      <ToastComponent
        show={showToast}
        toggleShow={toggleShowToast}
        message={messageToast}
        title={titleToast}
      />
    </>
  );
};

export default CreditCardModal;
