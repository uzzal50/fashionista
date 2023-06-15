import { close } from '../../assets/icons'
import { useIncDec, QtyButtons } from '../'
const CartItemBody = ({ cartItems }) => {
  const { increase, decrease, removeItem } = useIncDec()

  return (
    <>
      {cartItems.map(item => {
        return (
          <tr key={item.idColor}>
            <td className='product-remove'>
              <img
                src={
                  item.productDetails.find(p => p.color === item.color).image
                }
                className='w-7'
              />
            </td>
            <td data-title='Product'>
              <p className='mr-s'>
                {item.name} - {item.color}
              </p>
            </td>
            <td data-title='Price'>
              <p>${item.price}.00</p>
            </td>
            <td data-title='Quantity'>
              <QtyButtons
                qty={item.quantity}
                increase={() => increase(item.id, 'inc')}
                decrease={() => decrease(item.id, 'dec')}
              />
            </td>
            <td data-title='SubTotal'>
              <p>${(item.quantity * item.price).toFixed(2)}</p>
            </td>
            <td data-title='Remove'>
              <img
                src={close}
                className='close-btn w-2-icon'
                alt='close-btn'
                onClick={() => {
                  removeItem(item.idColor)
                }}
              />
            </td>
          </tr>
        )
      })}
    </>
  )
}

export default CartItemBody
