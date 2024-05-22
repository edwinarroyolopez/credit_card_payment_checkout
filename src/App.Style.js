import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const AppWrapper = styled.div`
  background-color: #282c34;
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  @media (min-width: 768px) {
    padding: 40px;
  }
`;

export const AppHeader = styled.header`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  text-align:center;
`;

export const AppButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  margin-top: 20px;

  @media (min-width: 768px) {
    max-width: 200px;
  }
`;