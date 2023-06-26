import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import CartCheckoutSummary from '../Cart/CartCheckoutSummary'
import { CLEAR_CART, CALCULATE_TOTAL } from '../../redux/Slice/cart/cartSlice'
import { PAYMENT_SUCCESS } from '../../redux/Slice/checkout/checkOutSlice'
import { useFirestore } from '../../hooks/useFirestore'
import { useEffect } from 'react'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { cartItems, cartTotalAmount } = useSelector(state => state.cart)
  const { displayName, email } = user && user
  const { addAnyDocument, response } = useFirestore('orders')

  const form = useForm({
    defaultValues: {
      email,
      name: displayName,
      city: '',
      address: '',
      phone: '',
      additionalInfo: '',
      payment: '',
      cartItems: cartItems,
    },
  })

  const { register, handleSubmit, formState, control } = form
  const { errors, isSubmitting } = formState

  const onSubmit = data => {
    const orderConfig = {
      uid: user.uid,
      cartItems,
      customerDetails: data,
      amount: cartTotalAmount,
      orderStatus: 'placed-order',
    }

    addAnyDocument(orderConfig)
  }

  register('cartItems', {
    required: 'CartItems is Empty.',
  })

  useEffect(() => {
    if (response.success) {
      dispatch(CLEAR_CART())
      dispatch(CALCULATE_TOTAL())
      dispatch(PAYMENT_SUCCESS())
      navigate('/cart/order-success')
    }
  }, [response.success])

  return (
    <Wrapper>
      <div className='checkout-container container-sw d-grid mtb-l'>
        <div className='customer-information-container'>
          {/* <p className='error-text'>{errors.cartItems?.message}</p> */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3 className='tertiary-heading mb-m f-w-400'>
              Customer Information
            </h3>
            <div className='form-control'>
              <label>
                <input
                  type='text'
                  {...register('email', {
                    required: 'email is Required',
                  })}
                />
              </label>
              <p className='error-text'>{errors.email?.message} </p>
            </div>

            <h3 className='tertiary-heading mb-s f-w-400'>Billing Details</h3>

            <div className='form-control'>
              <label className='m-0'>
                <input
                  type='text'
                  {...register('name', {
                    required: 'Name is Required',
                  })}
                />
                <p className='error-text'>{errors.name?.message} </p>
              </label>
            </div>
            <div className='form-group'>
              <label className=' d-flex a-center gap-2'>
                <div className='form-control w-50'>
                  <input
                    type='text'
                    {...register('city', {
                      required: 'City is required.',
                    })}
                    placeholder='City*'
                  />
                  <p className='error-text'>{errors.city?.message} </p>
                </div>

                <div className='form-control w-50'>
                  <input
                    type='text'
                    {...register('address', {
                      required: 'Address is Required',
                    })}
                    placeholder='Shipping Address*'
                  />
                  <p className='error-text'>{errors.address?.message} </p>
                </div>
              </label>
            </div>
            <div className='form-control'>
              <label>
                <input
                  type='number'
                  {...register('phone', {
                    valueAsNumber: true,
                    required: 'Phone is Required',
                  })}
                  placeholder='Phone*'
                />
                <p className='error-text'>{errors.phone?.message} </p>
              </label>
            </div>

            <div className='form-control'>
              <label>
                <h3 className='tertiary-heading mb-s f-w-400'>
                  Additional Information
                </h3>
                <textarea
                  style={{ resize: 'none' }}
                  {...register('additionalInfo')}
                  placeholder='Notes about your Order.'
                />
              </label>
            </div>
            <div className='form-control'>
              <label>
                {' '}
                <h3 className='tertiary-heading mb-s f-w-400'>Payment</h3>
                <input
                  type='number'
                  {...register('payment', {
                    valueAsNumber: true,
                    required: 'Payment is Required',
                    validate: {
                      notPayment: value => {
                        return (
                          value === 4242 ||
                          'Enter 4242 for Payemnt Confirmation or else Payemnt Declined.'
                        )
                      },
                    },
                  })}
                  placeholder='Enter 4242 for Payment.*'
                />
                <p className='error-text'>{errors.payment?.message} </p>
              </label>
            </div>
            <p className='error-text'>{errors.cartItems?.message} </p>
            <button
              className='btn w-100 f-s'
              disabled={response.isPending || isSubmitting}
            >
              {response.isPending ? (
                <div className='lds-dual-ring'></div>
              ) : (
                'Confirm Order'
              )}
            </button>
          </form>
        </div>
        <div className='order-container'>
          <CartCheckoutSummary />
        </div>
      </div>
    </Wrapper>
  )
}

export default Checkout
const Wrapper = styled.section`
  .checkout-container {
    grid-template-columns: 1.5fr 1fr;
    gap: 4.2rem;
  }
`
