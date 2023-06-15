import styled from 'styled-components'
import { Divider, RegisterForm } from '../../components'

const Register = () => {
  return (
    <>
      <Divider />
      <Wrapper className='register-form-container d-grid w-30 m-auto'>
        <RegisterForm />
      </Wrapper>
    </>
  )
}

export default Register

const Wrapper = styled.section`
  @media (max-width: 25em) {
  }
`
