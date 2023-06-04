import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { navLinkStyles } from '../../utils'

const AdminNavbar = () => {
  return (
    <Wrapper className='admin-navbar'>
      <div>
        {' '}
        <ul className='nav-links'>
          <li>
            <NavLink to='dashboard' style={navLinkStyles}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='products' style={navLinkStyles}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to='add-product' style={navLinkStyles}>
              Add Products
            </NavLink>
          </li>
          <li>
            <NavLink to='orders' style={navLinkStyles}>
              Orders
            </NavLink>
          </li>
          <li></li>
        </ul>
      </div>
    </Wrapper>
  )
}

export default AdminNavbar

const Wrapper = styled.section`
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    font-size: var(--tertiary-font-size);
  }
`
