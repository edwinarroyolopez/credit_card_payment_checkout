import React from 'react';
import { Modal } from 'react-bootstrap';
import PaymentSummary from './PaymentSummary';

const BackdropComponent = ({ show, totalAmount, onHide, onPay }) => (
  <Modal 
    show={show} 
    onHide={onHide}
    backdrop="static"
  >
    <Modal.Header closeButton>
      <Modal.Title>Payment Summary</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <PaymentSummary totalAmount={totalAmount} onPay={onPay} />
    </Modal.Body>
  </Modal>
);

export default BackdropComponent;
