import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { BackdropWrapper } from './BackdropComponent.Style'

const BackdropComponent = ({ show, totalItems, totalAmount, onHide, onPay }) => (
  <BackdropWrapper>
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      className='overwrite-backdrop'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Payment Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="payment-summary">
          <h2>Summary Payment</h2>
          <p>Total Items: {totalItems}</p>
          <hr />
          <p>Total Amount: ${totalAmount}</p>
          <Button onClick={onPay} variant="primary">
            Pay Now
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  </BackdropWrapper>
);

export default BackdropComponent;
