import { useDispatch } from 'react-redux'
import {
  TOGGLE_QTY,
  CALCULATE_TOTAL,
  REMOVE_CART_ITEM,
} from '../../redux/Slice/cart/cartSlice'
import { OPEN_MESSAGE } from '../../redux/Slice/Message/messageSlice'

const useIncDec = () => {
  const dispatch = useDispatch()

  const increase = (id, value) => {
    dispatch(TOGGLE_QTY({ id, value }))
    dispatch(CALCULATE_TOTAL())
  }

  const decrease = (id, value) => {
    dispatch(TOGGLE_QTY({ id, value }))
    dispatch(CALCULATE_TOTAL())
  }

  const removeItem = id => {
    dispatch(REMOVE_CART_ITEM(id))
    dispatch(CALCULATE_TOTAL())
    dispatch(
      OPEN_MESSAGE({
        type: 'success',
        text: 'Item Removed Successfully.',
      })
    )
  }
  return { increase, decrease, removeItem }
}

export default useIncDec
