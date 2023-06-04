import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('wlc')
})
const arr = []
const calculateOrderAmount = items => {
  items.map(item => {
    const { price, quantity } = item
    const cartItemAmount = price * quantity
    return arr.push(cartItemAmount)
  })
  const totalAmount = arr.reduce((a, b) => a + b)
  return totalAmount
}

app.post('/create-payment-intent', async (req, res) => {
  const { items, customerDetails, description } = req.body
  console.log(items, customerDetails, description)
  console.log(calculateOrderAmount(items))
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    description,

    shipping: {
      address: {
        line1: customerDetails.address,
        line2: customerDetails.address,
        city: customerDetails.city,
        country: customerDetails.city,
      },
      name: customerDetails.displayName,
      phone: customerDetails.phone,
    },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})

const PORT = process.env.PORT || 4242
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`))
