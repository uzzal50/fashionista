import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import { navLinkStyles, capital, mainNav } from '../../utils'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

const MainLinks = ({ setShowLinks, showLinks }) => {
  const { user } = useAuthContext()
  const navLinksRef = useRef(null)
  const navsLinkContainerRef = useRef(null)

  useEffect(() => {
    const navLinksHeight = navLinksRef.current.getBoundingClientRect().height

    if (showLinks)
      navsLinkContainerRef.current.style.height = `${navLinksHeight}px`
    else navsLinkContainerRef.current.style.height = '0px'
  }, [showLinks])

  return (
    <>
      <div className='nav-left' ref={navsLinkContainerRef}>
        <ul ref={navLinksRef} className='nav-links h-100 '>
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
