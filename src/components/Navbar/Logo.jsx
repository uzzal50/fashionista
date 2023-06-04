import { logo } from '../../assets/Navbar'
import { Link } from 'react-router-dom'
import ham from '../../assets/icons/ham.svg'

const Logo = () => {
  return (
    <div className='logo'>
      <Link to='/'>
        <img src={logo} alt='main-logo' className='main-logo' />
      </Link>
      <button
        className='ham btn-trans'
        onClick={() => setShowLinks(!showLinks)}
      >
        <img src={ham} alt='hamburger' />
      </button>
    </div>
  )
}

export default Logo
