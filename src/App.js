import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import ProductList from './components/ProductList';
import CreditCardModal from './components/CreditCardModal';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
