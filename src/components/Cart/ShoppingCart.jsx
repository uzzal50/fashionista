import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CartContent, CartSummary } from '../'

const ShoppingCart = () => {
  const { cartItems } = useSelector(state => state.cart)

  return (
    <div>
      {cartItems && cartItems.length >= 1 ? (
        <div className='cart-totals-details-container mtb-m'>
          <CartContent cartItems={cartItems} />
          <CartSummary cartItems={cartItems} />
        </div>
      ) : (
        <div className='no-items text-center mtb-l'>
          <button className='btn mr-s'>No Items in Cart</button>
          <Link to='/' className='btn'>
            Return to Shop.
          </Link>
        </div>
      )}
    </div>
  )
}

export default ShoppingCart
