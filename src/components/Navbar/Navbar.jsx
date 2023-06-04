import styled from 'styled-components'
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
  const dispatch = useDispatch()
  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    state => state.cart
  )
  useEffect(() => {
    dispatch(CALCULATE_TOTAL())
  }, [])

  return (
    <>
      <NavContainer className='container header-wrapper d-grid'>
        <div className='nav-center'>
          <Logo />
        </div>
        <MainLinks />
        <div className='cart-search-container'>
          <div
            className='search-icon'
            onClick={() => dispatch(OPEN_SEARCH_MODAL())}
          >
            <img src={search} alt='search-icon' className='w-2-icon' />
          </div>
          <div className='cart-container'>
            <span className='total'> $ {cartTotalAmount.toFixed(2)}</span>
            <div className='cart-value-container'>
              <div
                onClick={() => dispatch(OPEN_CART_MODAL())}
                style={{ cursor: 'pointer' }}
              >
                <img src={cart} alt='cart' className='cart-icon' />
                <span className='cart-value'>{cartTotalQuantity}</span>
              </div>
            </div>
          </div>

          {!user && (
            <div className='d-flex register-container'>
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
  align-items: center;
  grid-column-gap: 2rem;
  .nav-links {
    list-style: none;
    text-transform: uppercase;
    display: flex;
    gap: 1.8rem;

    li {
      border-bottom: 1px solid transparent;
      transition: all ease-in-out 0.2s;
      a {
        border-bottom: 1px solid transparent;
      }
      &:hover {
        border-bottom: 1px solid var(--primary) !important;
        opacity: 0.6;
      }
    }
  }
  .main-logo {
    height: 4rem;
  }
  .cart-search-container {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 5rem;

    .cart-container {
      display: flex;
      align-items: center;
      .total {
        margin-right: 2rem;
        font-weight: 700;
      }
      .cart-value-container {
        position: relative;
        .cart-icon {
          width: 2rem;
        }
        .cart-value {
          position: absolute;
          width: 1.7rem;
          height: 1.7rem;
          background-color: rgb(0, 0, 0);
          color: rgb(255, 255, 255);
          display: flex;
          justify-content: center;
          align-items: center;
          top: -1rem;
          left: 1rem;
          border-radius: 50%;
          font-size: 1.2rem;
        }
      }
    }
    .login a {
      text-transform: uppercase;
    }
    .register-container {
      gap: 1.2rem;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 56em) {
    display: block;
    .nav-left {
      height: 0;
      overflow: hidden;
      transition: 0.3s ease-in-out all;
    }
    .cart-icon {
      width: 2rem;
    }
    .nav-center {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-links {
      display: block;
      width: 100%;

      background-color: #faedeb;
      li {
        padding: 1.4rem 0.8rem;
      }
    }
    html {
      font-size: 40%;
    }

    .cart-search-container {
      display: none;
    }
    .main-logo {
      width: 7rem;
    }
    .ham {
      display: block;
      img {
        width: 3.5rem;
      }
    }
  }
`
