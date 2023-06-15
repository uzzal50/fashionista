import styled from 'styled-components'
import { CartItemBody } from '../'

const CartContent = ({ cartItems }) => {
  return (
    <Wrapper className='product-details-container'>
      <table className='shopping-cart-table'>
        <thead>
          <tr>
            <th className='product-remove'></th>
            <th className='w-30'>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{cartItems && <CartItemBody cartItems={cartItems} />}</tbody>
      </table>
    </Wrapper>
  )
}

export default CartContent

const Wrapper = styled.div``
