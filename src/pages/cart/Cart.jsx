import styled from 'styled-components'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useSelector } from 'react-redux'
import { Divider } from '../../components'

const Cart = () => {
  const { user } = useAuthContext()
  const { isCustomerDetailsFilled, isPaymentSuccess } = useSelector(
    state => state.checkout
  )

  const linkStyles = ({ isActive }) => {
    return {
      opacity: isActive ? 1 : 0.4,
    }
  }

  return (
    <>
      <Divider />
      <Wrapper className='cart-container mtb-l'>
        <div className='container-sw'>
          <h2 className='secondary-heading'>Cart</h2>
          <div className='cart-checkout-order-container d-flex-a-center-j-center '>
            <NavLink end to='/cart' style={linkStyles}>
              <div className='shopping-cart'>
                <span className='number mr-s '>1</span>
                <p className='d-inline-block'>SHOPPING CART</p>
              </div>
            </NavLink>

            <div className='greater-than-sign'>{'>'}</div>
            <NavLink
              to='checkout'
              style={linkStyles}
              className={user ? null : 'btn-disabled'}
            >
              <div className='checkout'>
                <span className='number mr-s'>2</span>
                <p className='d-inline-block'>CHECKOUT DETAILS</p>
              </div>
            </NavLink>

            <div className='greater-than-sign'>{'>'}</div>
            <NavLink
              to='payment'
              style={linkStyles}
              className={
                user && isCustomerDetailsFilled ? null : 'btn-disabled'
              }
            >
              <div className='payment'>
                <span className='number mr-s'>3</span>
                <p className='d-inline-block'>PAYMENT</p>
              </div>
            </NavLink>

            <div className='greater-than-sign'>{'>'}</div>
            <NavLink
              to='order-success'
              style={linkStyles}
              className={
                user && isCustomerDetailsFilled && isPaymentSuccess
                  ? null
                  : 'btn-disabled'
              }
            >
              <div className='order'>
                <span className='number mr-s'>4</span>
                <p className='d-inline-block'>ORDER COMPLETE</p>
              </div>
            </NavLink>
          </div>
          <Outlet />
        </div>
      </Wrapper>
    </>
  )
}

export default Cart

const Wrapper = styled.section`
  .cart-checkout-order-container {
    .number {
      background-color: #000000;
      color: #fff;
      padding: 0.3rem 1rem;
      border-radius: 2rem;
    }
  }

  .cart-totals-details-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 2.4rem;
  }
`