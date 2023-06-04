import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import { navLinkStyles, capital, mainNav } from '../../utils'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

const MainLinks = () => {
  const [showLinks, setShowLinks] = useState(false)
  const { user, authIsReady } = useAuthContext()
  const navLinksRef = useRef(null)
  const navsLinkContainerRef = useRef(null)

  // useEffect(() => {
  //   const navLinksHeight = navLinksRef.current.getBoundingClientRect().height

  //   if (showLinks)
  //     navsLinkContainerRef.current.style.height = `${navLinksHeight}px`
  //   else navsLinkContainerRef.current.style.height = '100%'
  // }, [showLinks, authIsReady])

  return (
    <>
      <div
        className={`${showLinks ? 'nav-left h-100 show' : 'nav-left h-100'}`}
        ref={navsLinkContainerRef}
      >
        {authIsReady && (
          <ul className='nav-links h-100' ref={navLinksRef}>
            {mainNav.map(nav => {
              return (
                <li key={nav.name} className='h-100 d-flex a-center'>
                  <NavLink
                    to={nav.route}
                    style={navLinkStyles}
                    className='h-100 d-flex a-center'
                  >
                    {nav.name}
                  </NavLink>
                </li>
              )
            })}

            <li>
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
        )}
      </div>
    </>
  )
}

export default MainLinks
const Wrapper = styled.div`
  .ham {
    width: 3.2rem;
    display: none;
  }
`
