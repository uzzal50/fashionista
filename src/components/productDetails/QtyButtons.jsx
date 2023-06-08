import styled from 'styled-components'

const QtyButtons = ({ qty, increase, decrease }) => {
  return (
    <Wrapper className='qty-container'>
      <button className='plus-minus-btn' onClick={decrease}>
        -
      </button>
      <button className='plus-minus-btn' disabled>
        {qty}
      </button>
      <button className='plus-minus-btn' onClick={increase}>
        +
      </button>
    </Wrapper>
  )
}

export default QtyButtons

const Wrapper = styled.div`
  display: inline-block;
  .plus-minus-btn {
    padding: 0.6rem 1rem;
    font-size: var(--medium-font-size);
    background-color: transparent;
    border: 1px solid rgb(0 0 0 / 14%);
    color: var(--primary);
  }
`
