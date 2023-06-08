import styled from 'styled-components'

const Subscribe = () => {
  return (
    <Wrapper className='sub-section text-center'>
      <div className='container'>
        <div className='sub-container ptb-l'>
          <h2 className='secondary-heading'>
            Subscribe To Get Offers In Your Inbox
          </h2>
          <div className='sub-input-btn d-flex w-30'>
            <input
              type='text'
              placeholder='Your Email Address'
              className='email-input'
            />
            <button className='btn sub-btn'>Subscribe</button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Subscribe

const Wrapper = styled.section`
  .sub-container {
    background-color: var(--primary-bg-color);
    .sub-input-btn {
      width: fit-content;
      margin: auto;
      .email-input {
        border-radius: 0;
        border: none;
        font-family: inherit;
        &:focus {
          outline: none;
        }
      }
    }
  }
`
