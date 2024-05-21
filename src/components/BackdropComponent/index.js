import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { PaymentSummary } from './BackdropComponent.Style'

const BackdropComponent = ({ show, totalItems, totalAmount, onHide, onPay }) => (
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
      <PaymentSummary>
        <p>This is the payment summary for your purchase.</p>
        <hr />
        <p>Total Items: <b>{totalItems}</b></p>
        <hr />
        <p>Total Amount: <b>${totalAmount}</b></p>
      </PaymentSummary>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onPay} variant="outline-primary">
        Pay Now
      </Button>
    </Modal.Footer>
  </Modal>
);

export default BackdropComponent;
