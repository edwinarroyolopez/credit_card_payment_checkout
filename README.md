# Credit Card Payment Checkout

# Content
1. [Install](#install)
2. [Start](#start)
3. [Migrations](#migrations)
3. [Test](#test)
4. [License](#license)



# structure
```
src/
│
├── assets/
│   ├── visa.png
│   └── mastercard.png
│
├── components/
│   ├── BackdropComponent.js
│   ├── CreditCardModal.js
│   ├── PaymentSummary.js
│   └── ProductList.js
│
├── redux/
│   ├── actions/
│   │   └── paymentActions.js
│   ├── reducers/
│   │   ├── paymentReducer.js
│   │   └── productReducer.js
│   └── store.js
│
└── tests/
    ├── components/
    │   ├── BackdropComponent.test.js
    │   ├── CreditCardModal.test.js
    │   ├── PaymentSummary.test.js
    │   └── ProductList.test.js
    │
    └── redux/
        ├── actions/
        │   └── paymentActions.test.js
        ├── reducers/
        │   ├── paymentReducer.test.js
        │   └── productReducer.test.js
        └── store.test.js
```

## Available Scripts

In the project directory, you can run:

## Intall 

To install run this command ```npm install```
**Note:**  node --version 18 

## Start 
To start this command ```npm start```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Test
To run test use this command `npm test`
To run coverage test use this command `npm run test:coverage`

To open coverage file that content `open coverage/lcov-report/index.html`



Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.



# exmple cards 
[cards generator](https://dnschecker.org/credit-card-generator.php) 


# Blacklist Cards

    master card
    5430 8821 9852 6980
    CVV/CVV2 743 
    Good thru 1/2023
    Alexis Johnson

    Mastercard  
    5462 8800 0029 2065
    CVV/CVV2 304 
    Good thru 10/2021
    Mia Lewis

    Mastercard  
    5462 8800 0062 5348
    CVV/CVV2 759 
    Good thru 2/2021
    Samantha Johnson


# Whitelist Cards
1. Master card
    Mastercard 
    5536 7795 5617 8094
    CVV/CVV2 620 
    Good thru 7/2022
    Michael Thomas


    Mastercard 
    5536 7703 3146 4412
    CVV/CVV2 880 
    Good thru 6/2022
    James Lee

    Mastercard 
    5536 7702 3071 5948
    CVV/CVV2 179 
    Good thru 8/2023
    Brianna Hernandez

    Mastercard 
    5536 7700 0059 4663
    CVV/CVV2 590 
    Good thru 4/2025
    Alexis Allen

2. Visa card
    Visa 
    4641 1493 4983 0069
    CVV/CVV2 276 
    Good thru 11/2025
    Anna Robinson

    Visa 
    4081 4225 1740 6005
    CVV/CVV2 955 
    Good thru 10/2025
    Gabriel Thompson

    Visa 
    4641 1409 9580 8533
    CVV/CVV2 475 
    Good thru 5/2025
    Elizabeth Gonzalez



1. You must create a UI to show the product from your store (with information and value), that will be bought by
the customer.
2. Show to the customer the payment type button ”Pay with credit card”. That opens a Modal requesting Credit Card
info.
3. Customer will insert Credit Card data and must be validated. MasterCard and VISA number card detection logos
is a plus. (Remember, credit card data must be fake but must follows the structure of credit cards)
4. Next show the summary payment with payment button in a backdrop component2.
5. Then simulate backend API call with happy and unhappy paths for the payment (regarding if the payment data is complete, in case of unhappy show a toast error)
6. Finally show the result of the transaction made.


1. Debes crear una UI para mostrar el producto de tu tienda (con información y valor), que será comprado por el cliente.
2. Mostrar al cliente el botón de tipo de pago “Pagar con tarjeta de crédito”. Que abre un Modal solicitando Tarjeta de Crédito información.
3. El Cliente insertará los datos de la Tarjeta de Crédito y deberá ser validada. Logotipos de detección de tarjetas de números MasterCard y VISA
es una ventaja. (Recuerde, los datos de la tarjeta de crédito deben ser falsos pero deben seguir la estructura de las tarjetas de crédito)
4. A continuación, muestre el pago resumido con el botón de pago en un componente de fondo2.
5. Luego simule la llamada a la API de backend con rutas felices e infelices para el pago (con respecto a si los datos de pago son
completo, en caso de no estar satisfecho mostrar un error de brindis)
6. Finalmente mostrar el resultado de la transacción realizada.


npm run test:single src/tests/PaymentForm.test.js

npm test -- --testNamePattern="submits the form with valid data"



npm run test:single src/tests/PaymentForm.test.js


npm run test:single src/tests/ProductList.test.js

npm run test:single src/tests/App.test.js

npm run test:single src/tests/paymentReducer.test.js


npm run test:single src/tests/CreditCardModal.test.js

npm run test:coverage