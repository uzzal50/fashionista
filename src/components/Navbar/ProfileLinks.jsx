import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { dropdown, bgImage } from '../../assets/Navbar'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

const ProfileLinks = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { user, loading, authIsReady } = useAuthContext()
  const { logout } = useLogout()
  const dropRef = useRef()

  useEffect(() => {
    let handler = e => {
      if (user && !dropRef.current.contains(e.target)) setShowDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  })

  return (
    <Wrapper>
      <div className='profile d-flex-a-center-j-center'>
        <p>Hi, {user.displayName}</p>
        <div className='avatar' onClick={() => setShowDropdown(!showDropdown)}>
          <img
            src={loading ? bgImage : user.photoURL}
            alt='profile'
            className='avatar-icon'
          />
          <div className='profile-dropdown-container'>
            <img
              src={dropdown}
              alt=''
              className='profile-dropdown-icon w-100 h-100'
            />
          </div>
          <div
            className={showDropdown ? 'dropdown show-drop' : 'dropdown'}
            ref={dropRef}
          >
            <ul>
              <li className='profile-nav-links'>
                <Link to='profile/my-profile'>Profile</Link>
              </li>
              <li className='profile-nav-links'>
                <Link to='profile/my-order'>My Order</Link>
              </li>
              <li className='profile-nav-links'>
                <Link to='profile/my-wishlist'>My WishList</Link>
              </li>
              <li className='profile-nav-links' onClick={() => logout()}>
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default ProfileLinks
const Wrapper = styled.div`
  .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    position: relative;
    .avatar-icon {
      height: 100%;
      object-fit: cover;
      width: 100%;
      border-radius: 50%;
    }
    .profile-dropdown-container {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 1.5rem;
      height: 1.5rem;
      background-color: #fff;
      padding: 0.2rem;
      border-radius: 50%;
    }
    .dropdown {
      position: absolute;
      top: 100%;
      z-index: 1;
      width: max-content;
      margin-top: 1rem;
      right: 0;
      background-color: #fff;
      display: none;
      visibility: hidden;
      box-shadow: 0 8px 24px rgba(140, 149, 159, 0.2);
    }
    .dropdown.show-drop {
      display: block;
      visibility: visible;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        border: 6px solid #0000;
        border-bottom: 8px solid #000000;
        transform: translateY(-100%);
        right: 16px;
      }
    }
    .profile-nav-links {
      padding: 1.4rem 3.2rem;
      a {
        text-transform: capitalize;
      }
      &:hover {
        background-color: var(--primary-bg-color);
      }
    }
  }
`
