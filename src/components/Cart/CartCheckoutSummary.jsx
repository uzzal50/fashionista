import styled from 'styled-components'
import { useSelector } from 'react-redux'

const CartCheckoutSummary = () => {
  const { cartItems, cartTotalAmount } = useSelector(state => state.cart)
  return (
    <Wrapper className='checkout-summary-wrapper'>
      <div className='checkout-summary-container'>
        <div className='title'>
          <h3 className='tertiary-heading mb-m f-w-400'>Your Order</h3>
        </div>
        <div className='content'>
          <div className='content-heading d-flex j-space-between a-center'>
            <p className='sub-heading sub-text m-0'>Product</p>
            <p className='sub-heading sub-text m-0'>Subtotal</p>
          </div>
          <hr />
          <div>
            {cartItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className='orders d-flex j-space-between a-center p-m'
                >
                  <div className='d-flex a-center'>
                    <img
                      src={
                        item.productDetails.find(p => p.color === item.color)
                          .image
                      }
                      style={{ width: '5rem' }}
                      className='mr-s'
                    />
                    <p className='sub-heading sub-text'>
                      {item.name} * {item.quantity}
                    </p>
                  </div>
                  <p className='sub-heading sub-text m-0'>
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              )
            })}
          </div>
          <hr />
          <div className='content-heading d-flex j-space-between a-center p-m'>
            <p className='sub-heading sub-text m-0'>Subtotal</p>
            <p className='sub-heading sub-text m-0'>
              ${cartTotalAmount.toFixed(2)}
            </p>
          </div>
          <hr />
          <div className='sub-total d-flex j-space-between a-center p-m'>
            <p className='sub-heading sub-text m-0'>Shipping Cost</p>
            <p className='sub-heading sub-text m-0'>$10.00</p>
          </div>
          <hr />
          <div className='total-order-cost d-flex j-space-between a-center p-m'>
            <p className='sub-heading sub-text m-0 f-m'>Total</p>
            <p className='sub-heading sub-text m-0 f-m'>
              ${(cartTotalAmount + 10).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default CartCheckoutSummary

const Wrapper = styled.div`
  .checkout-summary-container {
    .content {
      border: 1px solid rgb(0 0 0 / 6%);
      .content-heading {
        padding: 1.2rem;
      }
    }
  }
`
