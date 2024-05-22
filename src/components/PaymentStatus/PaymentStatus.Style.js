import styled from 'styled-components';

export const PaymentStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  
  @media (min-width: 768px) {
    margin: 40px;
    padding: 40px;
  }
`;

export const Message = styled.p`
  font-size: 1em;
  color: #6c757d;
  margin: 20px 0;

  @media (min-width: 768px) {
    font-size: 1.2em;
  }
`;

export const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ variant }) => (variant === 'primary' ? '#007bff' : '#6c757d')};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: ${({ variant }) => (variant === 'primary' ? '#0056b3' : '#5a6268')};
  }

  @media (min-width: 768px) {
    padding: 12px 24px;
    font-size: 1.2em;
  }
`;
