import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { capital } from '../../utils'
import { Link } from 'react-router-dom'
import { down, up } from '../../assets/icons'
import SkeletonTable from '../skeleton/SkeletonTable'
import { bgImage } from '../../assets/Navbar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { SAVE_ORDERS, SORT_ORDERS } from '../../redux/Slice/Order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLoad } from '../../hooks/useLoad'

const MyOrder = () => {
  const { data, loading } = useCollection('orders')
  const { user } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false)
  const { onLoad, ref } = useLoad('order-image')
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
    <Wrapper>
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
                <div className='accordion-item order-item ' key={index}>
                  <div className='accordion-heading'>
                    <div className='order-item-btn w-100 p-relative b-none d-flex a-center j-space-between '>
                      <div className='d-flex inner-first-part'>
                        <div className='order-item__col'>
                          <div className='order-item__col__label'>
                            <span className='sub-heading'>Order Id</span>
                          </div>
                          <div className='order-item__col__value_id'>
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
                        <p className='f-s mr-s c-pointer show-order'>
                          {index === isOpen ? 'Hide' : 'Show'} Order
                        </p>

                        <img
                          src={isOpen ? up : down}
                          style={{ width: '2rem' }}
                          alt=''
                        />
                      </div>
                    </div>
                  </div>
                  {index === isOpen ? (
                    <div className='accordion-body p-m'>
                      <div className='cartItems-order'>
                        {copiedOrderDetails[index].cartItems.map(item => {
                          return (
                            <div
                              className='cart-items d-flex a-center mb-m'
                              key={item.id}
                            >
                              <div className='cart-items-details d-flex '>
                                <div
                                  className='img-container w-15 mr-s'
                                  style={{ backgroundImage: `url(${bgImage})` }}
                                >
                                  <img
                                    src={item.addedItem.image}
                                    className='w-100 h-100'
                                    ref={ref}
                                    onLoad={onLoad}
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
    </Wrapper>
  )
}

export default MyOrder
const Wrapper = styled.div`
 .accordion-item {
      .order-item-btn {
        flex-wrap: wrap;
         padding: 0.6rem 1.6rem;
        font-family: inherit;
        border-radius: 4px;   
        background-color: #fdf6f5;
        .order-item__col__label {
          .sub-heading {
            margin-bottom: 0.2rem;
            text-transform: capitalize;
          }
        }
      
      }
    }
    .accordion-body {
     
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
      transition: all ease-in-out 3s;
      .cart-items-details {
        .img-container {
          img {
            opacity :0;
            transition : opacity 0.8s ease-in-out 0s
          }
        }
        .loaded {
          img {
            opacity : 1;
          }
        }
            flex: 1;
            .text-container{
              flex-direction: column;
               padding: 1rem 0;
            }
        }
      }
    }
  .inner-first-part {
    gap: 8rem;
  }
  .order-item__col__value_id p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 15rem;
  }

    @media (max-width: 56em) {
      .inner-first-part {
    gap: 3rem;
;
}
    }

  @media (max-width: 25em) {
    .accordion-container .accordion-item .order-item-btn {
      padding: 0.6rem 1rem;
      gap: 0.5rem;
      .inner-first-part {
        gap: 1.5rem;
      }
      .show-order {
        display: none;
      }
    }
    .accordion-body .cart-items-details .img-container {
      width: 25%;
    }
    .order-item__col__value_id p {
      max-width: 3rem;
    }
  }
`
