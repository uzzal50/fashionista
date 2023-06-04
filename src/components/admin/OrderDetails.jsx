import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import styled from 'styled-components'
import ChangeOrderStatus from './ChangeOrderStatus'
import { useEffect } from 'react'

const OrderDetails = () => {
  const { id } = useParams()
  const { data } = useCollection('orders')
  const [order, setOrder] = useState(null)

  const getData = async () => {
    const results = await data.find(order => order.id === id)
    return await results
  }

  useEffect(() => {
    getData().then(data => setOrder(data))
  }, [data, order])

  console.log(order)

  return (
    <Wrapper>
      <div className='order-details-wrapper d-grid'>
        {order && (
          <>
            <div className='order-details-cart-items p-m'>
              {order.cartItems.map((item, i) => {
                return (
                  <div key={i} className='d-flex j-space-between mb-m a-center'>
                    <div
                      style={{ height: '8rem', width: '8rem', gap: '1rem' }}
                      className='d-flex'
                    >
                      {item.images.map(img => (
                        <img
                          className='w-100 h-100'
                          src={img}
                          key={img}
                          style={{ objectFit: 'contain' }}
                        />
                      ))}
                    </div>
                    <div>
                      <p>Price: $ {item.price}</p>
                      <p className='f-xs'>Quantity : {item.quantity}</p>
                    </div>
                  </div>
                )
              })}

              <div className='text-container'>
                <p>Total Amount : ${order.amount}</p>
                <p>Order Id : {id} </p>
                <p>Shipping Address : {order.customerDetails.address}</p>
                <p>City : {order.customerDetails.city}</p>
                <p>Phone : {order.customerDetails.phone}</p>
                <p>Name : {order.customerDetails.fullName}</p>
                <p>Email : {order.customerDetails.email}</p>
                <p>Additional Info : {order.customerDetails.addInfo}</p>
                <p>{}</p>
              </div>
            </div>

            <div className='order-status-container'>
              <ChangeOrderStatus id={id} orderStatus={order.orderStatus} />
            </div>
          </>
        )}
      </div>
    </Wrapper>
  )
}

export default OrderDetails
const Wrapper = styled.section`
  .order-details-wrapper {
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }
`
