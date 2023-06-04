import { close } from '../../assets/icons'
import { useIncDec, QtyButtons } from '../'
const CartItemBody = ({ cartItems }) => {
  const { increase, decrease, removeItem } = useIncDec()

  return (
    <>
      {cartItems.map(item => {
        return (
          <tr key={item.id}>
            <td className='d-flex a-center'>
              <img src={item.images[0]} alt='' className='w-30 mr-s' />
              <p className='mr-s'>{item.name}</p>
              <p>({item.colors})</p>
            </td>
            <td>
              <p>${item.price}.00</p>
            </td>
            <td>
              <QtyButtons
                qty={item.quantity}
                increase={() => increase(item.id, 'inc')}
                decrease={() => decrease(item.id, 'dec')}
              />
            </td>
            <td>
              <p>${(item.quantity * item.price).toFixed(2)}</p>
            </td>
            <td>
              <img
                src={close}
                alt='close-btn'
                onClick={() => {
                  removeItem(item.id)
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
