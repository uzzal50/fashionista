import styled from 'styled-components'
import { Link } from 'react-router-dom'
import bgImage from '../../assets/bgImage.png'
import quickViewIcon from '../../assets/icons/quick-view.svg'
import { useEffect, useState } from 'react'

import {
  OPEN_QUICK_VIEW,
  ADD_DOC,
} from '../../redux/Slice/cart-modal/cartModalSlice'
import { useDispatch } from 'react-redux'

const TshirtItem = ({
  name,
  id,
  price,
  category,
  images,
  desc,
  colors,
  type,
}) => {
  const [src, setSrc] = useState(bgImage)
  const [isHover, setIsHovered] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setSrc(images[0])
    }, 100)
  }, [])

  const mouseEnterHandler = () => {
    setIsHovered(true)
  }
  const mouseLeaveHandler = () => {
    setIsHovered(false)
  }

  const quickViewHandler = (e, { ...data }) => {
    dispatch(OPEN_QUICK_VIEW())
    dispatch(ADD_DOC(data))
  }

  return (
    <ItemWrapper className='item text-left'>
      <div
        onMouseEnter={() => mouseEnterHandler()}
        onMouseLeave={() => mouseLeaveHandler()}
      >
        <Link to={`/product/${type}/${id}`}>
          <div className='img-container'>
            {images.map((img, index) => (
              <img
                src={src}
                alt='img'
                key={index}
                className='w-100 h-100 t-shirt-img'
              />
            ))}
          </div>
        </Link>
        {isHover && (
          <div
            data-tooltip='Quick View'
            className='quickView-Wrapper'
            onClick={e =>
              quickViewHandler(e, {
                name,
                images,
                price,
                category,
                desc,
                colors,
              })
            }
          >
            <img src={quickViewIcon} className='quick-view-icon' />
          </div>
        )}
      </div>
      <div className='box prl-s'>
        <div className='sub-heading mtb-s'>{category}</div>
        <h3 className='tertiary-heading'>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h3>
        <div className='mtb-s price'>${price}</div>
      </div>
    </ItemWrapper>
  )
}

export default TshirtItem

const ItemWrapper = styled.article`
  div {
    position: relative;
  }
  .img-container {
    position: relative;
    height: 33rem;
    transition: all 0.3s ease-in-out 0s;

    .t-shirt-img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
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
    display: flex;
    justify-content: center;
    align-items: center;
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
    .img {
      position: absolute;
    }
  }
  .box {
    .price {
      font-weight: 700;
      color: var(--sub-heading-color);
    }
  }
`
