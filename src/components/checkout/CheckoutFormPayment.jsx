import React, { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import pay from '../../assets/icons/pay.svg'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useSelector, useDispatch } from 'react-redux'
import { CLEAR_CART, CALCULATE_TOTAL } from '../../redux/Slice/cart/cartSlice'
import { PAYMENT_SUCCESS } from '../../redux/Slice/checkout/checkOutSlice'

const CheckoutFormPayment = () => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const {
    user: { uid },
  } = useAuthContext()
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { cartItems, cartTotalAmount } = useSelector(state => state.cart)
  const { customerDetails } = useSelector(state => state.checkout)

  const { addAnyDocument, updateInStock, response } = useFirestore('orders')

  useEffect(() => {
    if (!stripe) {
      return
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )
    if (!clientSecret) {
      return
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent.status === 'succeeded') {
        setMessage('Successful')
        saveOrder()
      } else {
        setMessage('error ocurred')
      }
    })
  }, [stripe])

  useEffect(() => {
    if (response.success) {
      dispatch(CLEAR_CART())
      dispatch(CALCULATE_TOTAL())
      dispatch(PAYMENT_SUCCESS())

      updateInStock(cartItems)
    }
  }, [response.success])

  const saveOrder = () => {
    const orderConfig = {
      uid,
      cartItems,
      customerDetails,
      amount: cartTotalAmount,
      orderStatus: 'placed-order',
    }
    addAnyDocument(orderConfig)
  }

  console.log(response)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    //saving Orders
    saveOrder()
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://127.0.0.1:5173/cart/order-success',
      },
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: 'tabs',
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id='submit'
        className='w-100 btn d-flex-j-center a-center b-none'
      >
        <img
          src={pay}
          alt='money-icon'
          style={{ width: '2rem', marginRight: '0.5rem' }}
        />
        <span id='button-text'>
          {isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  )
}
export default CheckoutFormPayment
