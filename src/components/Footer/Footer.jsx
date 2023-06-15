import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper className='text-center p-m'>
      <p className='f-xs f-w-300'>
        Copyright © 2023 T-Shirts Store | Powered by T-Shirts Store
      </p>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.footer`
  background-color: var(--primary);
  color: var(--secondary);
`
