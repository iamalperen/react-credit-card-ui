# React Credit Card UI - Modern React Credit Card Component

[![NPM Version](https://img.shields.io/npm/v/react-credit-card-ui)](https://www.npmjs.com/package/react-credit-card-ui) 
[![NPM Downloads](https://img.shields.io/npm/dw/react-credit-card-ui)](https://www.npmjs.com/package/react-credit-card-ui)
[![CI/CD](https://github.com/iamalperen/cardify/actions/workflows/main.yml/badge.svg)](https://github.com/iamalperen/cardify/actions/workflows/main.yml)
[![Publish Status](https://github.com/iamalperen/cardify/actions/workflows/publish.yml/badge.svg)](https://github.com/iamalperen/cardify/actions/workflows/publish.yml)

A customizable React component to display credit card information with a sleek UI, smooth animations, and responsive design principles.

## Features

*   **Fully Responsive:** Adapts fluidly to any container size using modern CSS.
*   **Modern Design:** Clean and visually appealing credit card presentation with 3D flip effect.
*   **Card Detection:** Automatically detects and styles based on card issuer (Visa, Mastercard, Amex, etc.).
*   **Customizable:** Easily adjust size (`width`, `maxWidth`), appearance (via `className`), and behavior (`flipOnClick`).
*   **Internationalization:** Built-in support for Right-to-Left (RTL) languages (`direction` prop) and customizable text labels.
*   **Accessibility:** Implemented with ARIA attributes and basic keyboard navigation for the flip interaction.
*   **Lightweight:** Minimal dependencies.

## Installation

```bash
npm install react-credit-card-ui
# or
yarn add react-credit-card-ui
```

## Usage

```jsx
import React, { useState } from 'react';
import { CreditCard } from 'react-credit-card-ui';
// Optional: Import CSS if your setup doesn't automatically handle package CSS
// import 'react-credit-card-ui/dist/style.css'; 
import './App.css';

function App() {
  const [cardNumber, setCardNumber] = useState('4242424242424242');
  const [cardHolder, setCardHolder] = useState('Jane Doe');
  const [expiryDate, setExpiryDate] = useState('12/25');
  const [cvv, setCvv] = useState('123');

  return (
    <div className="App">
      <h1>React Credit Card UI Demo</h1>

      {/* Basic Usage (will take 100% width up to 420px max-width) */}
      <CreditCard
        cardNumber={cardNumber}
        cardHolder={cardHolder}
        expiryDate={expiryDate}
        cvv={cvv}
      />

      {/* Custom Size Example */}
      <div style={{ width: '350px', margin: '2rem auto' }}>
        <CreditCard
          cardNumber={cardNumber}
          cardHolder={cardHolder}
          expiryDate={expiryDate}
          cvv={cvv}
          // width="100%" // Inherits width from parent div
          // maxWidth="none" // Can override default max-width
        />
      </div>

      {/* RTL and Custom Labels Example */}
      <CreditCard
        cardNumber={cardNumber}
        cardHolder={cardHolder}
        expiryDate={expiryDate}
        cvv={cvv}
        direction="rtl"
        cardHolderLabel="اسم حامل البطاقة"
        expiresLabel="تاريخ الانتهاء"
        cvvLabel="رقم التحقق"
        className="my-custom-card-style" // Add custom styles
      />

      {/* Form Inputs (Example) */}
      <div className="form-container">
        {/* Input fields for card details... */}
      </div>
    </div>
  );
}

export default App;
```

## Props

| Prop                | Type                      | Default              | Description                                                                 |
| :------------------ | :------------------------ | :------------------- | :-------------------------------------------------------------------------- |
| `cardNumber`        | `string`                  | `#### #### #### ####`| The credit card number.                                                     |
| `cardHolder`        | `string`                  | `CARD HOLDER`        | The name of the cardholder.                                                 |
| `expiryDate`        | `string`                  | `MM/YY`              | The card's expiration date (format MM/YY or similar).                       |
| `cvv`               | `string`                  | `''`                 | The Card Verification Value (CVV). Displayed on the back of the card.       |
| `issuer`?           | `CardType`                | Auto-detected        | Force a specific card issuer (e.g., 'visa', 'mastercard').                 |
| `flipOnClick`?      | `boolean`                 | `true`               | Allow flipping the card on click/enter to show the CVV.                     |
| `width`?            | `string`                  | `undefined`          | Set a specific width for the card wrapper (e.g., '350px', '100%').           |
| `maxWidth`?         | `string`                  | `undefined`          | Override the default `max-width` (420px) via CSS variable `--card-max-width`. |
| `direction`?        | `'ltr' \| 'rtl'`         | `'ltr'`              | Set text direction for Right-to-Left language support.                      |
| `cardHolderLabel`?  | `string`                  | `Card Holder`        | Custom text label for the card holder field.                                |
| `expiresLabel`?     | `string`                  | `Expires`            | Custom text label for the expiry date field.                                |
| `cvvLabel`?         | `string`                  | `CVV`                | Custom text label for the CVV field on the back.                            |
| `className`?        | `string`                  | `''`                 | Optional CSS class name(s) to add to the main wrapper element.              |
| `ariaLabel`?        | `string`                  | Varies               | Custom ARIA label for the interactive card container element.               |
| `wrapperAriaLabel`? | `string`                  | `Credit card ...`    | Custom ARIA label for the main wrapper element.                             |
| `cardFrontAriaLabel`?| `string`                  | `Card front`         | Custom ARIA label for the card front face.                                  |
| `cardBackAriaLabel`? | `string`                  | `Card back`          | Custom ARIA label for the card back face.                                   |

_`CardType` includes: `'visa'`, `'mastercard'`, `'amex'`, `'discover'`, `'dinersclub'`, `'jcb'`, `'maestro'`, `'unknown'`_

## Styling

The component uses CSS Modules. You can customize styles by:
1.  Passing a `className` prop to add your own CSS rules.
2.  Overriding the default `--card-max-width` CSS variable if you need a different maximum width than 420px.
3.  (Advanced) Forking the repository and modifying the `.module.css` file directly.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/iamalperen/react-credit-card-ui/issues).

## License

MIT 
