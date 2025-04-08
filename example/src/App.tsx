import React, { useState, useMemo, ChangeEvent } from 'react'
import { CreditCard } from 'react-credit-card-ui'
import { getCardType, getCardMaxLength } from '../../src/utils'
import './App.css'

function App() {
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('Jane Doe')
  const [expiryDate, setExpiryDate] = useState('12/25')
  const [cvv, setCvv] = useState('123')

  // Determine card type and max length based on current cardNumber
  const cardType = useMemo(() => getCardType(cardNumber), [cardNumber])
  const maxLength = useMemo(() => getCardMaxLength(cardType), [cardType])

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value.replace(/\D/g, '') // Remove non-digits
    // Ensure we don't exceed the max length determined by card type
    setCardNumber(inputVal.slice(0, maxLength))
  }

  return (
    <div className="App">
      <h1>React Credit Card UI Demo</h1>
      <CreditCard
        cardNumber={cardNumber}
        cardHolder={cardHolder}
        expiryDate={expiryDate}
        cvv={cvv}
        issuer={cardType !== 'unknown' ? cardType : undefined}
      />

      <div className="form-container">
        <div className="input-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            type="tel"
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="Enter card number"
            maxLength={maxLength}
          />
          {cardType !== 'unknown' && (
            <small style={{ marginTop: '5px', opacity: 0.7 }}>Detected: {cardType}</small>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="cardHolder">Card Holder</label>
          <input
            id="cardHolder"
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Enter card holder name"
            autoComplete="cc-name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            id="expiryDate"
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
            autoComplete="cc-exp"
          />
        </div>
        <div className="input-group">
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            type="text"
            inputMode="numeric"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g,''))}
            placeholder="Enter CVV"
            maxLength={4}
            autoComplete="cc-csc"
          />
        </div>
      </div>
    </div>
  )
}

export default App
