import { useEffect } from 'react'
import { OPEN_MESSAGE } from '../../redux/Slice/Message/messageSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      OPEN_MESSAGE({
        type: 'success',
        text: 'Payment of Your Order Successful.',
      })
    )
  }, [])

  return (
    <div className='container-sw mtb-l '>
      <div className='d-flex a-center gap-2'>
        <h3
          className='tertiary-heading'
          style={{
            color: 'rgb(15, 81, 50)',
          }}
        >
          Thanks For Ordering We will Call You to Deliver your Product.{' '}
        </h3>
        <Link to='/profile/my-order'>
          <button className='btn'>View Order</button>
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess
