import { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import SuccessMessage from '../Message/SuccessMessage'

const ChangeOrderStatus = ({ id, orderStatus }) => {
  const [status, setStatus] = useState('')

  const { updateOrderStatus, response } = useFirestore('orders')

  const editStatus = e => {
    e.preventDefault()
    updateOrderStatus(id, status)
  }

  useEffect(() => {}, [response.success, status])

  return (
    <div>
      {response.success && (
        <SuccessMessage
          type='success'
          text='Order Status Changed Successfully.'
        />
      )}
      <h2 className='secondary-heading mb-m'>
        Order Current Status :
        <span
          style={{ color: orderStatus === 'delivered' ? 'green' : 'red' }}
        >{` ${orderStatus}`}</span>
      </h2>
      <form onSubmit={e => editStatus(e)}>
        <select
          name=''
          id=''
          className='mb-m'
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        >
          <option value='placed-order'>Placed Order</option>
          <option value='processing'>Processing</option>
          <option value='shipped'>Shipped</option>
          <option value='delivered'>Delivered</option>
        </select>
        <button className='btn f-d p-m'>
          {response.isPending ? (
            <div className='lds-dual-ring'></div>
          ) : (
            'Save Status'
          )}
        </button>
      </form>
    </div>
  )
}

export default ChangeOrderStatus
