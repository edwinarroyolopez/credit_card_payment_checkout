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

VISA
4400 3768 5870 8
CVV/CVV2 812 Good thru 6/2023

master card
5430 8821 9852 6980
CVV/CVV2 743 Good thru 1/2023
Alexis Johnson



Mastercard Validate 
5462 8800 0029 2065
CVV/CVV2 304 Good thru 10/2021
Mia Lewis

Mastercard Validate 
5462 8800 0062 5348
CVV/CVV2 759 Good thru 2/2021
Samantha Johnson

1. You must create a UI to show the product from your store (with information and value), that will be bought by
the customer.
2. Show to the customer the payment type button ”Pay with credit card”. That opens a Modal requesting Credit Card
info.
3. Customer will insert Credit Card data and must be validated. MasterCard and VISA number card detection logos
is a plus. (Remember, credit card data must be fake but must follows the structure of credit cards)
4. Next show the summary payment with payment button in a backdrop component2.
5. Then simulate backend API call with happy and unhappy paths for the payment (regarding if the payment data is complete, in case of unhappy show a toast error)
6. Finally show the result of the transaction made.




npm run test:single src/tests/PaymentForm.test.js

npm test -- --testNamePattern="submits the form with valid data"