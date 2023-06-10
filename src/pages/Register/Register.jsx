import styled from 'styled-components'
import { RegisterHero, RegisterForm } from '../../components'

const Register = () => {
  return (
    <Wrapper className='d-grid'>
      <RegisterHero />
      <RegisterForm />
    </Wrapper>
  )
}

export default Register

const Wrapper = styled.section`
  grid-template-columns: 1.2fr 1fr;
`
