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
          <div className='cart-checkout-order-container d-flex-a-center-j-center flex-wrap '>
            <NavLink end to='/cart' style={linkStyles} variant='cart'>
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
              variant='checkout'
            >
              <div className='checkout'>
                <span className='number mr-s'>2</span>
                <p className='d-inline-block'>CHECKOUT DETAILS</p>
              </div>
            </NavLink>

            <NavLink
              to='order-success'
              style={linkStyles}
              variant='order'
              className={
                user && isCustomerDetailsFilled && isPaymentSuccess
                  ? null
                  : 'btn-disabled'
              }
            >
              <div className='order'>
                <span className='number mr-s'>3</span>
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
    grid-template-columns: 3fr 1fr;
    gap: 2.4rem;
  }
  @media (max-width: 28em) {
    .close-btn {
      width: 2.4rem;
    }

    .shopping-cart-table {
      thead {
        display: none;
      }
      tbody tr td {
        display: block;
        width: 100%;
        text-align: right;
        border-top: 1px solid #dddddd;
        &::before {
          content: attr(data-title) ': ';
          font-weight: 400;
          float: left;
        }
      }
      tbody tr {
        & td:first-child {
          text-align: center;
        }
        & td:first-child::before {
          content: '';
        }
      }
    }
  }
`
