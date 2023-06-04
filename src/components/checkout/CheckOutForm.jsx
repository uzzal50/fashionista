import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutFormPayment from './CheckoutFormPayment'
import { OPEN_MESSAGE } from '../../redux/Slice/Message/messageSlice'
const stripe_pk = import.meta.env.VITE_REACT_APP_STRIPE_PK

const stripePromise = loadStripe(stripe_pk)

export default function App() {
  const { cartItems, cartTotalAmount } = useSelector(state => state.cart)
  const { customerDetails } = useSelector(state => state.checkout)
  const [clientSecret, setClientSecret] = useState('')
  const desc = `Amount is ${cartTotalAmount}`
  const dispatch = useDispatch()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:4242/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartItems,
        description: desc,
        customerDetails,
      }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(er =>
        dispatch(
          OPEN_MESSAGE({
            type: 'error',
            text: 'Something is wrong with Payment Try Again Latter.',
          })
        )
      )
  }, [])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className='App'>
      <h3 className='tertiary-heading mb-m'>Payment</h3>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutFormPayment />
        </Elements>
      )}
    </div>
  )
}
