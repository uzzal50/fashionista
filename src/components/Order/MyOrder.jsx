import { useEffect, useState } from 'react'
import { capital } from '../../utils'
import { Link } from 'react-router-dom'
import { down, up } from '../../assets/icons'
import SkeletonTable from '../skeleton/SkeletonTable'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { SAVE_ORDERS, SORT_ORDERS } from '../../redux/Slice/Order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'

const MyOrder = () => {
  const { data, loading } = useCollection('orders')
  const { user } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()
  const { copiedOrderDetails } = useSelector(state => state.order)
  const fetchUserOrders = async () => {
    const userOrders = await data.filter(item => item.uid === user.uid)
    await dispatch(SAVE_ORDERS(userOrders))
  }

  useEffect(() => {
    fetchUserOrders()
    return () => {}
  }, [data])

  const handleToggle = index => {
    if (isOpen === index) {
      setIsOpen(null)
      return false
    }
    setIsOpen(index)
  }

  const handleSortOrders = value => {
    dispatch(SORT_ORDERS(value))
  }

  return (
    <>
      <div className='profile-order-dashboard-container'>
        <div className='title-sort-container d-flex j-space-between a-center mb-m'>
          <h3 className='tertiary-heading'>My Orders</h3>
          <div className='sort-orders'>
            <select onChange={e => handleSortOrders(e.target.value)}>
              <option value='all-orders'>All</option>
              <option value='placed-order'> Placed Order</option>
              <option value='delivered'>Delivered</option>
              <option value='processing'>Processing</option>
            </select>
          </div>
        </div>
        {loading && <SkeletonTable />}

        {copiedOrderDetails && (
          <div className='accordion-container orders-accordion d-flex-d-column-g'>
            {copiedOrderDetails.map((item, index) => {
              return (
                <div className='accordion-item order-item' key={index}>
                  <div className='accordion-heading'>
                    <div className='order-item-btn w-100'>
                      <div className='d-flex' style={{ gap: '8rem' }}>
                        <div className='order-item__col'>
                          <div className='order-item__col__label'>
                            <span className='sub-heading'>Order Id</span>
                          </div>
                          <div className='order-item__col__value'>
                            <p>{item.id}</p>
                          </div>
                        </div>

                        <div className='order-item__col'>
                          <div className='order-item__col__label'>
                            <span className='sub-heading'>Order Date</span>
                          </div>
                          <div className='order-item__col__value'>
                            <p className=' text-center'>
                              {item.createdAt.toDate().toDateString()}{' '}
                              {/* {item.createdAt
                                .toDate()
                                .toLocaleTimeString('en-US')} */}
                            </p>
                          </div>
                        </div>
                        <div className='order-item__col'>
                          <div className='order-item__col__label'>
                            <span className='sub-heading'>Amount</span>
                          </div>
                          <div className='order-item__col__value'>
                            <p className=' text-center'>${item.amount}.00</p>
                          </div>
                        </div>
                        <div className='order-item__col'>
                          <div className='order-item__col__label'>
                            <span className='sub-heading'>Order Status</span>
                          </div>
                          <div className='order-item__col__value'>
                            <p
                              className='t-capitalize text-center'
                              style={{
                                color:
                                  item.orderStatus === 'delivered'
                                    ? '#008000'
                                    : '	#FF0000',
                              }}
                            >
                              {item.orderStatus}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className='d-flex-j-center a-center'
                        onClick={() => {
                          handleToggle(index)
                        }}
                      >
                        <h3 className='tertiary-heading mr-s c-pointer'>
                          {index === isOpen ? 'Hide' : 'Show'} Order
                        </h3>

                        <img
                          src={isOpen ? up : down}
                          style={{ width: '2rem' }}
                          alt=''
                        />
                      </div>
                    </div>
                  </div>
                  {index === isOpen ? (
                    <div className='accordion-body'>
                      <div className='cartItems-order'>
                        {copiedOrderDetails[index].cartItems.map(item => {
                          return (
                            <div
                              className='cart-items d-flex a-center mb-m'
                              key={item.id}
                            >
                              <div className='cart-items-details d-flex'>
                                <div className='img-container w-15 mr-s'>
                                  <img
                                    src={item.addedItem.image}
                                    className='w-100 h-100'
                                  />
                                </div>

                                <div className='text-container d-flex'>
                                  <div>
                                    <p>{capital(item.name)}</p>
                                    <span className='sub-heading sub-text'>
                                      Price : ${item.price}.00
                                    </span>
                                  </div>
                                  <p className='f-s'>
                                    Quantity : {item.quantity}
                                  </p>
                                </div>
                              </div>

                              {copiedOrderDetails[index].orderStatus ===
                              'delivered' ? (
                                <Link
                                  to={`/profile/my-orders/review-product/${item.id}`}
                                >
                                  <button className='btn f-d p-m'>
                                    Review Product
                                  </button>
                                </Link>
                              ) : null}
                            </div>
                          )
                        })}

                        <hr className='mb-m' />
                        <div className='grid-2-col'>
                          <div className='cart-items-order-amount'>
                            <div className='d-flex a-center j-space-between sub-total-amount mb-s'>
                              <p className='f-s'>Sub Total </p>
                              <p className='f-s'>${item.amount.toFixed(2)}</p>
                            </div>
                            <div className='d-flex a-center j-space-between shipping-amount mb-s'>
                              <p className='f-s'>Shipping Cost </p>
                              <p className='f-s'>$10.00</p>
                            </div>
                            <hr className='mb-s' />
                            <div className='d-flex a-center j-space-between shipping-amount mb-m'>
                              <p className='f-s'>Total Amount </p>
                              <p>${(item.amount + 10).toFixed(2)}</p>
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default MyOrder
