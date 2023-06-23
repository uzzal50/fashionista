import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import { navLinkStyles, capital, mainNav } from '../../utils'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

const MainLinks = ({ setShowLinks, showLinks }) => {
  const { user } = useAuthContext()
  const navLinksRef = useRef(null)
  const navsLinkContainerRef = useRef(null)
  const { logout } = useLogout()

  useEffect(() => {
    const navLinksHeight = navLinksRef.current.getBoundingClientRect().height

    if (showLinks)
      navsLinkContainerRef.current.style.height = `${navLinksHeight}px`
    else navsLinkContainerRef.current.style.height = '0px'
  }, [showLinks])

  return (
    <>
      <div className='nav-left h-100' ref={navsLinkContainerRef}>
        <ul ref={navLinksRef} className='nav-links d-flex h-100 gap-2'>
          {mainNav.map(nav => {
            return (
              <li
                key={nav.name}
                className={`h-100 d-flex a-center ${
                  nav.class ? nav.class : null
                }`}
                onClick={() => setShowLinks(!showLinks)}
              >
                <NavLink
                  to={nav.route}
                  style={navLinkStyles}
                  className={`d-flex a-center ${showLinks ? null : 'h-100'}`}
                >
                  {nav.name}
                </NavLink>
              </li>
            )
          })}
          {user ? (
            <li
              className='profile-nav d-flex a-center h-100 d-hidden'
              onClick={() => setShowLinks(!showLinks)}
            >
              <NavLink
                to='profile'
                style={navLinkStyles}
                className={`d-flex a-center ${showLinks ? null : 'h-100'}`}
              >
                Profile
              </NavLink>
            </li>
          ) : null}

          <li
            className='login-logout-nav d-flex a-center h-100 d-hidden'
            onClick={() => {
              setShowLinks(!showLinks)
              user ? logout() : null
            }}
          >
            <NavLink
              to={user ? 'logout' : 'login'}
              style={navLinkStyles}
              className={`d-flex a-center ${
                showLinks ? null : 'h-100'
              } login-logout-nav`}
            >
              {user ? 'Logout' : 'Login'}
            </NavLink>
          </li>

          <li className='admin-list'>
            {user && user.email === 'lhotter7@gmail.com' ? (
              <NavLink
                to='admin'
                style={navLinkStyles}
                className='h-100 d-flex a-center'
              >
                admin
              </NavLink>
            ) : null}
          </li>
        </ul>
      </div>
    </>
  )
}

export default MainLinks
const Wrapper = styled.div``
