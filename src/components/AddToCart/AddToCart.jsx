import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { QtyButtons } from '../'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL } from '../../redux/Slice/cart/cartSlice'
import { Link } from 'react-router-dom'
import { OPEN_MESSAGE } from '../../redux/Slice/Message/messageSlice'

const AddToCart = ({ product, setIsSelectedColor, isSelectedColor }) => {
  const { id, name, price, productDetails } = product
  const [qty, setQty] = useState(1)
  const [showView, setShowView] = useState(false)
  const dispatch = useDispatch()

  const increase = () => {
    if (isSelectedColor) {
      let matched = productDetails.find(item => item.color === isSelectedColor)

      setQty(old => {
        let newQty = old + 1
        if (newQty > matched.inStock) {
          return (newQty = matched.inStock)
        }
        return newQty
      })
    } else {
      dispatch(
        OPEN_MESSAGE({ type: 'error', text: 'Please select the color first.' })
      )
    }
  }

  const decrease = () => {
    if (isSelectedColor) {
      setQty(old => {
        let newQty = old - 1
        if (newQty === 0) {
          return (newQty = 1)
        }
        return newQty
      })
    } else {
      dispatch(
        OPEN_MESSAGE({ type: 'error', text: 'Please select the color first.' })
      )
    }
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
    let addedItem = productDetails.find(item => item.color === isSelectedColor)

    const cartItemsConfig = {
      id,
      name,
      price,
      productDetails,
      color: isSelectedColor,
      quantity: qty,
      addedItem,
      idColor: id + isSelectedColor,
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

  useEffect(() => {
    setQty(1)
  }, [isSelectedColor])

  return (
    <Wrapper className='add-to-cart-container'>
      <span className='sub-heading'>Color</span>
      <div className='colors-container d-flex a-center mb-m gap-1'>
        {productDetails.map((item, index) => {
          return (
            <button
              className='color-btn btn-trans p-s-tb'
              key={index}
              style={{
                border:
                  item.color === isSelectedColor ? '1px solid #000000' : null,
              }}
              onClick={() => setIsSelectedColor(item.color)}
            >
              {' '}
              {item.color}
            </button>
          )
        })}
        <p>
          {isSelectedColor
            ? `${
                productDetails.find(item => item.color === isSelectedColor)
                  .inStock
              } in Stock `
            : null}
        </p>
      </div>
      <hr />
      <div className='qty-add-to-cart-container mtb-s d-flex a-center gap-2 '>
        <QtyButtons qty={qty} increase={increase} decrease={decrease} />
        <button
          className='btn add-to-cart-btn p-s-tb f-d'
          onClick={() => addToCart()}
        >
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
    border: 1px solid rgb(0 0 0 / 14%);
  }
`
