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
  const { id, name, price, category, images, type, discount } = data
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
            className='img-container w-100 h-100'
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            {images.map((item, i) => {
              return (
                <img
                  src={item}
                  ref={imgRef}
                  key={i}
                  alt=''
                  className='t-shirt-img w-100 h-100 p-absolute o-cover'
                  onLoad={onLoad}
                />
              )
            })}
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
        <p className='f-s fw-500 mb-xs'>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
        <div className='d-flex a-center gap-2'>
          <p className={`price fw-700 ${discount ? 'sale-price' : null}`}>
            Rs. {price}
          </p>
          {discount ? (
            <p className='price fw-700'>
              Rs. {price - (price * discount) / 100}
            </p>
          ) : null}
        </div>
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
      inset: 0;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
    &.loaded {
      .t-shirt-img {
        opacity: 0;
        &:last-child {
          opacity: 1;
        }
      }
      &:hover .t-shirt-img {
        &:nth-child(1) {
          opacity: 1;
        }
        &:last-child {
          opacity: 0;
        }
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
      color: var(--sub-heading-color);
    }
  }
`
