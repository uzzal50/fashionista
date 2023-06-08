import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper className='text-center'>
      <div className='container'>
        <div className='footer'>
          <p className='f-xs'>
            Copyright © 2023 T-Shirts Store | Powered by T-Shirts Store
          </p>
        </div>
      </div>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.footer`
  .footer {
    background-color: var(--primary);
    color: var(--secondary);
    padding: 2rem;
    p {
      font-weight: 300;
    }
  }
`
