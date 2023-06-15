import { useRef, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import bgImage from '../../assets/bgImage.png'
import quickViewIcon from '../../assets/icons/quick-view.svg'
import {
  OPEN_QUICK_VIEW,
  ADD_QUICK_MODAL_DOCUMENT,
} from '../../redux/Slice/cart-modal/cartModalSlice'

const TshirtItem = ({ data }) => {
  const {
    id,
    thumbnailPhoto,
    name,
    price,
    category,
    productDetails,
    type,
    discount,
  } = data
  const [isHover, setIsHovered] = useState(false)
  const dispatch = useDispatch()
  const imgRef = useRef(null)
  const onLoad = () => {
    imgRef.current.parentElement.classList.add('loaded')
  }

  return (
    <ItemWrapper className='item text-left p-relative'>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${type}/${id}`}>
          <div
            className='img-container'
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <img
              ref={imgRef}
              src={isHover ? productDetails[0].image : thumbnailPhoto}
              alt='img'
              className='w-100 h-100 t-shirt-img'
              onLoad={onLoad}
            />
          </div>
        </Link>

        {discount ? (
          <div className='discounted-price p-absolute'>
            <span>-{discount}%</span>
          </div>
        ) : null}

        {isHover && (
          <div
            data-tooltip='Quick View'
            className='quickView-Wrapper a-center d-flex-j-center'
            onClick={() => {
              dispatch(OPEN_QUICK_VIEW())
              dispatch(ADD_QUICK_MODAL_DOCUMENT(data))
            }}
          >
            <img src={quickViewIcon} className='quick-view-icon p-absolute' />
          </div>
        )}
      </div>
      <div className='box p-m'>
        <p className='sub-heading mb-xs'>{category}</p>
        <p className='f-m fw-500 mb-xs'>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
        <p className='price'>${price}.00</p>
      </div>
    </ItemWrapper>
  )
}

export default TshirtItem

const ItemWrapper = styled.article`
  .img-container {
    position: relative;
    min-height: 35rem;
    background-position: center;
    background-size: cover;

    .t-shirt-img {
      position: absolute;
      object-fit: cover;
      object-position: center;

      opacity: 0;
      transition: all 0.3s ease-in-out;
    }
    &.loaded {
      .t-shirt-img {
        opacity: 1;
      }
    }
  }

  .quickView-Wrapper {
    position: absolute;
    top: 0;
    right: 0;
    width: 2.8rem;
    height: 2rem;
    background-color: #fff;
    border-radius: 50%;
    margin: 1rem 1rem 0px 0px;

    &::before,
    &::after {
      position: absolute;
      transition: 250ms scale;
      transform-origin: right;
      scale: 0;
      right: 150%;
    }
    &::after {
      content: '';
      border-top: 0.4rem solid transparent;
      border-left: 0.8rem solid rgb(0, 0, 0);
      border-bottom: 0.4rem solid transparent;
      transform: translateX(100%);
    }
    &::before {
      content: attr(data-tooltip);
      background-color: rgb(0, 0, 0);
      color: rgb(255, 255, 255);
      font-family: inherit;
      padding: 0.6rem 1rem;
      font-size: 1.1rem;
      width: max-content;
      border-radius: 4px;
    }
    &:hover::before,
    &:hover::after {
      scale: 1;
    }
    .quick-view-icon {
      width: 1.7rem;
    }
  }
  .box {
    .price {
      font-weight: 700;
      color: var(--sub-heading-color);
    }
  }
`
