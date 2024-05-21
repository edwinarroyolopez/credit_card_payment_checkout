
import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastComponent = ({ show, toggleShow, message = '', title = '' }) => (
  <ToastContainer
    className="p-3"
    position={'bottom-end'}
  >
    <Toast show={show} onClose={toggleShow}>
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </ToastContainer>
);

export default ToastComponent;
