import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import './App.css';
import ProductList from './components/ProductList';
import CreditCardModal from './components/CreditCardModal';
import PaymentStatus from './components/PaymentStatus';

function App() {
  const [showModal, setShowModal] = useState(false);

  const paymentStatus = useSelector(state => state.payment.status);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleRetry = () => {
    setShowModal(false);
    window.location.reload(); // Optionally reset the page or reset the state as needed
  };

  useEffect(() => {
    if (paymentStatus === 'succeeded' || paymentStatus === 'failed') {
      setShowModal(false);
    }
  }, [paymentStatus]);


  if (paymentStatus === 'succeeded' || paymentStatus === 'failed') {
    return <PaymentStatus handleRetry={handleRetry} />;
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
