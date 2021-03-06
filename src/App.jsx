import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function App() {
  const [currencyRates, setCurrencyRates] = useState({ rates: [] })

  const [amount, setAmount] = useState(1)

  useEffect(async function () {
    const response = await axios.get(
      'https://api.ratesapi.io/api/latest?base=USD'
    )
    setCurrencyRates(response.data)
  }, [])

  const currencyChoices = Object.entries(currencyRates.rates).map(
    ([currencyCode, currencyDetails]) => {
      return (
        <option key={currencyCode}>
          {currencyCode}: {(currencyDetails * amount).toFixed(2)}
        </option>
      )
    }
  )

  return (
    <div>
      <h1> Latest Currency Converter</h1>
      <input>
        type="number" value={amount}
        onChange={(event) => setAmount(event.target.value)}
      </input>
      <h2> Conversion Rate:</h2>
      <select>{currencyChoices}</select>
    </div>
  )
}
