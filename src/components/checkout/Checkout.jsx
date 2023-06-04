import styled from 'styled-components'
import CartCheckoutSummary from '../Cart/CartCheckoutSummary'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SAVE_CUSTOMER_DETAILS } from '../../redux/Slice/checkout/checkOutSlice'
import { useDispatch } from 'react-redux'
import { useAuthContext } from '../../hooks/useAuthContext'

const Checkout = () => {
  const [customerDetails, setCustomerDetails] = useState({
    city: '',
    address: '',
    phone: '',
    addInfo: '',
  })

  const { user } = useAuthContext()
  const { displayName, email } = user && user
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = e => {
    e.preventDefault()

    dispatch(SAVE_CUSTOMER_DETAILS(customerDetails))
    navigate('/cart/payment')
  }

  const handleChange = e => {
    const field = e.target.name
    const value = e.target.value
    setCustomerDetails({
      ...customerDetails,
      displayName,
      email,
      [field]: value,
    })
  }
  return (
    <Wrapper>
      <div className='checkout-container container-sw d-grid mtb-l'>
        <div className='customer-information-container'>
          <form onSubmit={handleClick}>
            <h3 className='tertiary-heading mb-m'>Customer Information</h3>
            <input
              type='text'
              id='email'
              name='email'
              value={user && user.email}
              // placeholder='Username or Email*'
              // value={customerDetails.email}
              // onChange={e => handleChange(e)}
              readOnly
            />

            <label>
              <h3 className='tertiary-heading mb-m'>Billing Details</h3>
              <div className='full-name d-flex'>
                <input
                  required
                  type='text'
                  name='fullName'
                  value={user && user.displayName}
                  readOnly
                  // placeholder='Full Name*'
                  // value={customerDetails.fullName}
                  // onChange={e => handleChange(e)}
                />
              </div>
            </label>
            <label>
              <div className='full-name d-flex'>
                <input
                  required
                  type='text'
                  placeholder='City*'
                  name='city'
                  value={customerDetails.city}
                  onChange={e => handleChange(e)}
                />
                <input
                  required
                  type='text'
                  placeholder='Shipping Address*'
                  name='address'
                  value={customerDetails.address}
                  onChange={e => handleChange(e)}
                />
              </div>
            </label>
            <label>
              <input
                required
                type='number'
                placeholder='Phone*'
                name='phone'
                value={customerDetails.phone}
                onChange={e => handleChange(e)}
              />
            </label>
            <label>
              <h3 className='tertiary-heading mb-m'>Additional Information</h3>
              <textarea
                style={{ resize: 'none' }}
                type='text'
                placeholder='Notes about your order.'
                name='addInfo'
                value={customerDetails.addInfo}
                onChange={e => handleChange(e)}
              />
            </label>
            <button className='btn w-100'>Proceed To Payment</button>
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
    .customer-information-container {
      .full-name {
        gap: 1.2rem;
      }
    }
  }
`
