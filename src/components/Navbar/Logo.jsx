import { logo } from '../../assets/Navbar'
import { Link } from 'react-router-dom'
import ham from '../../assets/icons/ham.svg'
import styled from 'styled-components'

const Logo = ({ setShowLinks, showLinks }) => {
  return (
    <Wrapper className='logo'>
      <Link to='/'>
        <img src={logo} alt='main-logo' className='main-logo' />
      </Link>
      <button
        className='ham btn-trans b-none'
        onClick={() => setShowLinks(!showLinks)}
      >
        <img src={ham} alt='hamburger' className='d-none' />
      </button>
    </Wrapper>
  )
}

export default Logo

const Wrapper = styled.div`
  @media (max-width: 56em) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`
