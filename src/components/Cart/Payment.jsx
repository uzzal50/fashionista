import styled from 'styled-components'
// import CheckOutForm from '../checkout/CheckOutForm'
// import CartCheckoutSummary from './CartCheckoutSummary'

const Payment = () => {
  return (
    <Wrapper className='d-grid container-sw mtb-m'>
      {/* <CheckOutForm />
      <CartCheckoutSummary /> */}
    </Wrapper>
  )
}

export default Payment

const Wrapper = styled.div`
  grid-template-columns: 1fr 1fr;
  gap: 4.2rem;
`
