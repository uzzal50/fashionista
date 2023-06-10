import { RegisterHero } from '../../components'
import Login from '../../components/login/Login'
import styled from 'styled-components'

const LoginPage = () => {
  return (
    <Wrapper className='d-grid'>
      {/* <RegisterHero /> */}
      <Login />
    </Wrapper>
  )
}

export default LoginPage

const Wrapper = styled.div``
