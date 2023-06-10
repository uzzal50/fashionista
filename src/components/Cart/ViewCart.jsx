import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { close } from '../../assets/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useAuthContext } from '../../hooks/useAuthContext'
import { QtyButtons, useIncDec } from '../'
import { CLOSE_CART_MODAL } from '../../redux/Slice/cart-modal/cartModalSlice'

const ViewCart = () => {
  const { user } = useAuthContext()
  const { isModalOpen } = useSelector(state => state.cartModal)
  const { cartItems, cartTotalAmount } = useSelector(state => state.cart)
  const { increase, decrease, removeItem } = useIncDec()
  const dispatch = useDispatch()
  return (
    <Wrapper>
      <div
        className='view-cart-container w-30 d-flex'
        style={{
          transform: isModalOpen ? 'translate(0)' : 'translate(100%)',
        }}
      >
        <div className='title'>
          <div className='d-flex'>
            Shopping Cart
            <button
              className='close-btn'
              onClick={() => dispatch(CLOSE_CART_MODAL())}
            >
              X
            </button>
          </div>
        </div>
        <hr />
        <div className='content d-flex'>
          <div
            className='top-part d-flex-j-center'
            style={{
              alignItems: cartItems.length >= 1 ? 'flex-start' : 'center',
            }}
          >
            {cartItems && cartItems.length ? (
              <div className='cart-items-container'>
                {cartItems.map(item => {
                  return (
                    <div key={item.idColor} className='item d-grid mb-m'>
                      <div>
                        <img
                          src={
                            item.productDetails.find(
                              p => p.color === item.color
                            ).image
                          }
                          alt=''
                          style={{ width: '5rem' }}
                        />
                      </div>
                      <div>
                        <span className='mb-xs sub-heading'>
                          {item.name.charAt(0).toUpperCase() +
                            item.name.slice(1)}{' '}
                          - {item.colors}
                        </span>
                        <QtyButtons
                          qty={item.quantity}
                          increase={() => increase(item.id, 'inc')}
                          decrease={() => decrease(item.id, 'dec')}
                        />
                      </div>
                      <div className='text-end'>
                        <img
                          src={close}
                          alt='close-btn'
                          className='w-30 mb-xs'
                          onClick={() => removeItem(item.idColor)}
                        />
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <span>No Products in the cart</span>
            )}
          </div>
          <div className='bottom-part'>
            {cartItems.length ? (
              <div>
                <hr />
                <div className='d-flex sub-total'>
                  <p>Subtotal</p>
                  <p>${cartTotalAmount.toFixed(2)}</p>
                </div>
                <hr />
                <button className='btn w-100 mb-m'>
                  <Link to='/cart' onClick={() => dispatch(CLOSE_CART_MODAL())}>
                    View Cart
                  </Link>
                </button>
                <button className='btn w-100'>
                  <Link
                    to={user ? 'cart/checkout' : 'login'}
                    onClick={() => dispatch(CLOSE_CART_MODAL())}
                  >
                    {user ? 'Proceed To CheckOut.' : 'Login To Checkout.'}
                  </Link>
                </button>
              </div>
            ) : (
              <button className='btn w-100'>
                <Link to='/' onClick={() => dispatch(CLOSE_CART_MODAL())}>
                  Continue Shopping
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default ViewCart

const Wrapper = styled.section`
  .view-cart-container {
    flex-direction: column;
    padding: 1.4rem;
    position: fixed;
    background-color: var(--primary-bg-color);
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    transition: all 0.3s ease-in-out;

    .title {
      padding-bottom: 1.4rem;
      div {
        justify-content: space-between;
        align-items: center;
        .close-btn {
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          background-color: transparent;
        }
      }
    }
    .content {
      flex-direction: column;
      height: 100%;
      margin-top: 1.4rem;
      .top-part {
        flex-grow: 1;
        .cart-items-container {
          .item {
            grid-template-columns: 1fr 3.5fr 1fr;
          }
        }
      }
      .bottom-part {
        .sub-total {
          padding: 1.2rem 0;
          margin-bottom: 1.2rem;
          justify-content: space-between;
        }
      }
    }
  }
`
