import React from 'react';
import { render } from '@testing-library/react';
import Greeting from '../components/Greeting';

test('renders hello world message', () => {
  const { getByText } = render(<Greeting />);
  expect(getByText('¡Hola, Mundo!')).toBeInTheDocument();
});

test('renders welcome message', () => {
  const { getByText } = render(<Greeting />);
  expect(getByText('Bienvenido a tu nueva aplicación React.')).toBeInTheDocument();
});