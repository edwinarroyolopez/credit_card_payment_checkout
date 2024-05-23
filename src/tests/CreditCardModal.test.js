import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CreditCardModal from '../components/CreditCardModal';
import { makePayment } from '../redux/reducers/paymentReducer';


jest.mock('../hooks/useLocalStorage', () => {
  let storedValue = { number: '', expiration: '', cvv: '', cardType: '' };
  const setValueMock = jest.fn((value) => {
    storedValue = { ...storedValue, ...value };
  });
  return () => [storedValue, setValueMock];
});
jest.mock('../redux/reducers/paymentReducer', () => ({
  makePayment: jest.fn(),
}));

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('CreditCardModal', () => {
  let store;
  let handleCloseMock;

  beforeEach(() => {
    handleCloseMock = jest.fn();
    store = mockStore({
      products: [
        { id: 1, name: 'Product 1', price: 10, quantity: 1 },
        { id: 2, name: 'Product 2', price: 20, quantity: 2 },
      ],
      payment: { status: '' },
    });

    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    global.localStorage = localStorageMock;
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <CreditCardModal show={true} handleClose={handleCloseMock} />
      </Provider>
    );

  it('should render CreditCardModal correctly', () => {
    renderComponent();

    expect(screen.getByText('Pay with Credit Card')).toBeInTheDocument();
  });

  it('should show toast with invalid card information', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Submit Payment'));

  });

  it('should close modal on valid payment accept', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111 1111 1111 1111' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Submit Payment'));
  });

  test('renders CreditCardModal and submits form', () => {
    const handleClose = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <CreditCardModal show={true} handleClose={handleClose} />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('Enter card number'), { target: { value: '1234567812345678' } });
    fireEvent.change(getByPlaceholderText('MM/YY'), { target: { value: '12/25' } });
    fireEvent.change(getByPlaceholderText('Enter CVV'), { target: { value: '123' } });
    fireEvent.click(getByText('Submit Payment'));
  });

  it('should dispatch makePayment action on payment success', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111 1111 1111 1111' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Submit Payment'));

  });

  it('should handle payment failure', async () => {
    makePayment.mockRejectedValueOnce(new Error('Payment failed'));

    renderComponent();

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111 1111 1111 1111' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Submit Payment'));
  });


  //new
  it('should show toast with invalid card information', async () => {
    const useLocalStorageMock = require('../hooks/useLocalStorage');
    const [, setValueMock] = useLocalStorageMock();
    
    // Establecer el valor deseado en localStorage
    setValueMock({ number: '', expiration: '', cvv: '', cardType: '' });
    renderComponent();

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Submit Payment'));

    expect(screen.getByText('Invalid card information')).toBeInTheDocument();
    expect(screen.getByText('Please enter valid credit card information.')).toBeInTheDocument();
  });

  it('should close modal on valid payment accept', async () => {
    const useLocalStorageMock = require('../hooks/useLocalStorage');
    const [, setValueMock] = useLocalStorageMock();
    
    // Establecer el valor deseado en localStorage
    setValueMock({ number: '', expiration: '', cvv: '', cardType: '' });

    

    renderComponent();

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Submit Payment'));

    // await waitFor(() => expect(handleCloseMock).toHaveBeenCalled());
  });




  
  it('should dispatch makePayment action on payment success', async () => {
    makePayment.mockResolvedValueOnce({});

    const useLocalStorageMock = require('../hooks/useLocalStorage');
    const [, setValueMock] = useLocalStorageMock();
    
    // Establecer el valor deseado en localStorage
    setValueMock({
      number: '4641 1493 4983 0069',
      expiration: '11/2025',
      cvv: '955'
    });

    
    renderComponent();

    

    const cardNumberInput = screen.getByTestId('inputCardNumber');
    const expiryDateInput = screen.getByTestId('inputExpiryDate');
    const cvvInput = screen.getByTestId('inputCvv');

    await act(async () => {
      fireEvent.change(cardNumberInput, { target: { value: '4641 1493 4983 0069' } });
      fireEvent.change(expiryDateInput, { target: { value: '11/2025' } });
      fireEvent.change(cvvInput, { target: { value: '955' } });
    });

    // Asegúrate de esperar a que los eventos se procesen
    await new Promise(resolve => setTimeout(resolve, 1000));

    await act(async () => {
      await fireEvent.click(screen.getByText('Submit Payment'));
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

   

     expect(screen.getByText('Payment Summary')).toBeInTheDocument();

    // // Verifica que la acción de pago se haya despachado con la información correcta
    // expect(makePayment).toHaveBeenCalledWith({
    //   cardNumber: '4641 1493 4983 0069',
    //   expiryDate: '11/2025',
    //   cvv: '955'
    // });

    // // Verifica que se haya eliminado 'cardInfo' del localStorage
    // expect(localStorage.removeItem).toHaveBeenCalledWith('cardInfo');

    // // Imprimir el valor de cardInfo
    // const useLocalStorageMock = require('../hooks/useLocalStorage');
    // const setValueMock = useLocalStorageMock().setValue;
    // console.log('cardInfo:', setValueMock.mock.calls);
  });

  // it('should handle payment failure', async () => {
  //   makePayment.mockRejectedValueOnce(new Error('Payment failed'));

  //   renderComponent();

  //   fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111111111111111' } });
  //   fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/23' } });
  //   fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

  //   fireEvent.click(screen.getByText('Submit Payment'));

  //   await waitFor(() => expect(makePayment).toHaveBeenCalled());
  //   await waitFor(() => expect(handleCloseMock).toHaveBeenCalledTimes(1));
  // });

  // it('should show correct card type logo', async () => {
  //   renderComponent();

  //   fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111111111111111' } });

  //   await waitFor(() => expect(screen.getByAltText(/visa logo/i)).toBeInTheDocument());
  // });

  // it('should display payment summary on valid payment accept', async () => {
  //   renderComponent();

  //   fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4641 1493 4983 0069' } });
  //   fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '11/2025' } });
  //   fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '955' } });

  //   fireEvent.click(screen.getByText('Submit Payment'));


  //   await new Promise(resolve => setTimeout(resolve, 1000)); // Espera un segundo

  //   expect(screen.getByText('Payment Summary')).toBeInTheDocument();

  // });

  // it('should handle successful payment and clear local storage', async () => {
  //   makePayment.mockResolvedValueOnce({});
  //   Storage.prototype.removeItem = jest.fn();

  //   renderComponent();

  //   fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4641 1493 4983 0069' } });
  //   fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '11/2025' } });
  //   fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '955' } });

  //   fireEvent.click(screen.getByText('Submit Payment'));

  //   await new Promise(resolve => setTimeout(resolve, 1000)); // Espera un segundo
    

  //   expect(localStorage.removeItem).toHaveBeenCalledWith('cardInfo');

  // });
});
