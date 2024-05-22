import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import './App.css';

import {
  AppWrapper,
  AppHeader
} from './App.Style';
import useLocalStorage from './hooks/useLocalStorage';
import { resetPaymentState } from './redux/reducers/paymentReducer';

import ProductList from './components/ProductList';
import CreditCardModal from './components/CreditCardModal';
import PaymentStatus from './components/PaymentStatus';

function App() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useLocalStorage('paymentData', '');

  let paymentStatus = useSelector(state => state.payment.status);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleRetry = () => {
    console.log('handleRetry')
    dispatch(resetPaymentState());
    setShowModal(false);
    setPaymentData('')
  };

  useEffect(() => {
    if (paymentStatus === 'succeeded' || paymentStatus === 'failed') {
      setPaymentData(paymentStatus)// th
      setShowModal(false);
    }
  }, [paymentStatus, setPaymentData]);

  paymentStatus = paymentStatus !== '' ? paymentStatus : paymentData
  if (paymentStatus === 'succeeded' || paymentStatus === 'failed') {
    return <PaymentStatus handleRetry={handleRetry} paymentStatus={paymentStatus} />;
  }

  return (
    <AppWrapper>
    <AppHeader>
        <ProductList />
        <Button variant="primary" size="lg" onClick={handleShow}>
          Pay with credit card
        </Button>
        </AppHeader>
      <CreditCardModal show={showModal} handleClose={handleClose} />
    </AppWrapper>
  );
}

export default App;
