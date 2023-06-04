import { useState } from 'react'
import styled from 'styled-components'
import { QtyButtons } from '../'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL } from '../../redux/Slice/cart/cartSlice'
import { Link } from 'react-router-dom'
import { OPEN_MESSAGE } from '../../redux/Slice/Message/messageSlice'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'

const AddToCart = ({ product }) => {
  const { colors, inStock, id } = product
  const [qty, setQty] = useState(1)
  const [isSelectedColor, setIsSelectedColor] = useState(null)
  const [showView, setShowView] = useState(false)

  const increase = () => {
    setQty(old => {
      let newQty = old + 1
      if (newQty > inStock) {
        return (newQty = inStock)
      }
      return newQty
    })
  }

  const decrease = () => {
    setQty(old => {
      let newQty = old - 1
      if (newQty === 0) {
        return (newQty = 1)
      }
      return newQty
    })
  }

  const addToCart = () => {
    if (!isSelectedColor) {
      dispatch(
        OPEN_MESSAGE({
          type: 'error',
          text: 'Please select the color first.',
        })
      )
      return
    }
    const cartItemsConfig = {
      ...product,
      colors: isSelectedColor,
      quantity: qty,
      id,
    }

    dispatch(ADD_TO_CART(cartItemsConfig))

    dispatch(CALCULATE_TOTAL())
    setShowView(true)
    dispatch(
      OPEN_MESSAGE({
        type: 'success',
        text: 'Cloth is Added to your Cart',
      })
    )
  }

  return (
    <Wrapper className='add-to-cart-container'>
      <span className='sub-heading'>Color</span>
      <div className='colors-container'>
        {colors.map((item, index) => {
          return (
            <button
              className='color-btn mb-m mr-s'
              key={index}
              style={{
                border:
                  item.value === isSelectedColor ? '1px solid #000000' : null,
              }}
              onClick={() => setIsSelectedColor(item.value)}
            >
              {' '}
              {item.label}
            </button>
          )
        })}
      </div>
      <hr />
      <div className='qty-add-to-cart-container mtb-s d-flex a-center'>
        <QtyButtons qty={qty} increase={increase} decrease={decrease} />
        <button className='btn add-to-cart-btn' onClick={() => addToCart()}>
          Add to Cart
        </button>

        {showView ? (
          <Link to='/cart'>
            <p style={{ cursor: 'pointer' }}>View Cart</p>
          </Link>
        ) : null}
      </div>
    </Wrapper>
  )
}

export default AddToCart

const Wrapper = styled.div`
  .color-btn {
    background-color: transparent;
    padding: 0.5rem 1.2rem;
    border: 1px solid rgb(0 0 0 / 14%);
    font-family: inherit;
  }
  .qty-add-to-cart-container {
    gap: 2rem;
    .add-to-cart-btn {
      padding: 0.5rem 1rem;
    }
  }
`
