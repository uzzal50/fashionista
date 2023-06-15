import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { CALCULATE_TOTAL } from '../../redux/Slice/cart/cartSlice'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const CartSummary = ({}) => {
  const { user } = useAuthContext()
  const { cartTotalAmount } = useSelector(state => state.cart)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(CALCULATE_TOTAL())
  }, [])
  return (
    <Wrapper className='cart-totals-container'>
      <table>
        <thead>
          <tr>
            <th>Cart Totals</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className='d-grid total'>
                <p className=''>Subtotal </p>
                <p>${cartTotalAmount.toFixed(2)}</p>
              </div>
              <hr />
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-grid total'>
                <p className=''>Shipping </p>
                <p>$10.00</p>
              </div>
              <hr />
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-grid total'>
                <p className=''>Total </p>
                <p>${(cartTotalAmount + 10).toFixed(2)} </p>
              </div>
              <hr />
            </td>
          </tr>
          <tr>
            <td>
              <button className='btn f-d'>
                <Link to={user ? 'checkout' : '/login'}>
                  {user ? 'Proceed To CheckOut.' : 'Login To Checkout.'}
                </Link>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
}

export default CartSummary
const Wrapper = styled.div`
  .total {
    grid-template-columns: 1fr 1fr;
    justify-items: flex-start;
    padding: 0.6rem;
  }
`
