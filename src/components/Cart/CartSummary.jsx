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
              <div className='d-flex a-center j-space-between mb-xs'>
                <p>Subtotal </p>
                <p>Rs. {cartTotalAmount}</p>
              </div>
              <hr />
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-flex a-center j-space-between mb-xs'>
                <p>Shipping </p>
                <p>Rs. 10</p>
              </div>
              <hr />
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-flex a-center j-space-between mb-xs'>
                <p>Total </p>
                <p>Rs. {cartTotalAmount + 10} </p>
              </div>
              <hr />
            </td>
          </tr>
          <tr>
            <td>
              <button className='btn f-d w-100'>
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
const Wrapper = styled.div``
