import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cart, search } from '../../assets/Navbar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDispatch, useSelector } from 'react-redux'
import {
  OPEN_CART_MODAL,
  OPEN_SEARCH_MODAL,
} from '../../redux/Slice/cart-modal/cartModalSlice'
import { CALCULATE_TOTAL } from '../../redux/Slice/cart/cartSlice'
import { Logo, MainLinks, ProfileLinks } from './'
import { useEffect } from 'react'

const Navbar = () => {
  const { authIsReady, user } = useAuthContext()
  const [showLinks, setShowLinks] = useState(false)
  const dispatch = useDispatch()
  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    state => state.cart
  )
  useEffect(() => {
    dispatch(CALCULATE_TOTAL())
  }, [])

  return (
    <>
      <NavContainer className='header-wrapper d-grid a-center gap-2'>
        <div className='nav-center'>
          <Logo showLinks={showLinks} setShowLinks={setShowLinks} />
        </div>
        <MainLinks showLinks={showLinks} setShowLinks={setShowLinks} />
        <div className='cart-search-container d-flex a-center'>
          <div
            className='search-icon'
            onClick={() => dispatch(OPEN_SEARCH_MODAL())}
          >
            <img src={search} alt='search-icon' className='w-2-icon' />
          </div>
          <div className='cart-container d-flex a-center'>
            <span className='total mr-s fw-700'>
              {' '}
              Rs. {cartTotalAmount.toFixed(2)}
            </span>
            <div className='cart-value-container p-relative '>
              <div
                onClick={() => dispatch(OPEN_CART_MODAL())}
                style={{ cursor: 'pointer' }}
              >
                <img src={cart} alt='cart' className='cart-icon w-2-icon' />
                <span className='cart-value d-flex-j-center a-center p-absolute bg-default c-default f-xs'>
                  {cartTotalQuantity}
                </span>
              </div>
            </div>
          </div>

          {!user && (
            <div className='register-container d-flex-j-center a-center'>
              <div className='login'>
                <Link to='login'>log in</Link>
              </div>
            </div>
          )}
          {user && authIsReady && <ProfileLinks />}
        </div>
      </NavContainer>
    </>
  )
}

export default Navbar

const NavContainer = styled.header`
  grid-template-columns: 1fr auto 1fr;
  min-height: 8rem;
  .nav-links {
    list-style: none;
    text-transform: uppercase;
    li {
      transition: all ease-in-out 0.2s;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .main-logo {
    height: 4rem;
  }
  .cart-search-container {
    justify-content: end;
    gap: 5rem;
    .cart-container {
      .cart-value-container {
        .cart-value {
          width: 1.7rem;
          height: 1.7rem;
          top: -1rem;
          left: 1rem;
          border-radius: 50%;
        }
      }
    }
    .login a {
      text-transform: uppercase;
    }
  }

  @media (max-width: 80em) {
    grid-template-columns: 0.8fr auto 1fr;
    .cart-search-container {
      gap: 3rem;
    }
    .profile {
      gap: 2rem;
    }
  }
  @media (max-width: 69em) {
    grid-template-columns: 0.5fr auto 1fr;
    .cart-search-container {
      gap: 2rem;
    }
    .profile {
      gap: 1rem;
    }
  }

  @media (max-width: 56em) {
    margin: 1.2rem 0 0;

    display: block;
    .nav-left {
      overflow: hidden;
      transition: 0.3s ease-in-out all;
      margin-bottom: 1.2rem;
      height: 0;
    }

    .nav-center {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-links {
      display: block;
      width: 100%;
      height: auto;
      background-color: #faedeb;
      li {
        padding: 1.4rem 0.8rem;
        border-bottom: 1px solid var(--border-color);
      }
      .admin-list {
        display: none;
      }
      .login-nav,
      .profile-nav,
      .login-logout-nav {
        display: block;
      }
    }

    .cart-search-container {
      .search-icon,
      .profile,
      .register-container {
        display: none;
      }
      .cart-container {
        position: absolute;
        top: 22px;
        right: 85px;
        img {
          width: 3rem;
        }
        .cart-value {
          left: 1.5rem !important;
        }
        .cart-icon {
          width: 2.5rem !important;
        }
        .total {
          font-size: 1.4rem;
        }
      }
    }

    .ham {
      display: block;
      img {
        width: 5rem;
      }
    }
    .main-logo {
      height: 5rem;
    }
  }
`
