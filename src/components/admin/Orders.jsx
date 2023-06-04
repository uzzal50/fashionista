import styled from 'styled-components'
import { useCollection } from '../../hooks/useCollection'
import { Link } from 'react-router-dom'

const Orders = () => {
  const { data } = useCollection('orders')

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Order No</th>
            <th>Order Date</th>
            <th>Order By</th>

            <th>Order Amount</th>
            <th>Order Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(ord => {
              return (
                <tr key={ord.id}>
                  <td>{ord.id}</td>
                  <td>{ord.createdAt.toDate().toDateString()}</td>
                  <td>{ord.customerDetails.email}</td>

                  <td>{ord.amount}</td>

                  <td
                    style={{
                      color: ord.orderStatus === 'delivered' ? 'green' : 'red',
                    }}
                  >
                    {ord.orderStatus}
                  </td>

                  <td>
                    {' '}
                    <Link key={ord.id} to={`/admin/order-details/${ord.id}`}>
                      View Details
                    </Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </Wrapper>
  )
}

export default Orders
const Wrapper = styled.section``
