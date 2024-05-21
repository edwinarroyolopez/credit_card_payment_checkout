import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import './App.css';

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
      setPaymentData(paymentStatus)
      setShowModal(false);
    }
  }, [paymentStatus]);

  paymentStatus = paymentStatus !=='' ? paymentStatus : paymentData
  if (paymentStatus === 'succeeded' || paymentStatus === 'failed') {
    return <PaymentStatus handleRetry={handleRetry} paymentStatus={paymentStatus} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <ProductList />
        <Button variant="primary" onClick={handleShow}>
          Pay with credit card
        </Button>
      </header>
      <CreditCardModal show={showModal} handleClose={handleClose} />
    </div>
  );
}

export default App;
