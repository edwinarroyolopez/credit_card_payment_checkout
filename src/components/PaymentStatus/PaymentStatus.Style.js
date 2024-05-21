import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const PaymentStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
`;

export const Message = styled.p`
  font-size: 1.2em;
  margin: 20px 0;
`;

export const RetryButton = styled(Button)`
  margin-top: 20px;
`;
