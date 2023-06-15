import styled from 'styled-components'
import { useState } from 'react'
import { bgImage } from '../../assets/Navbar'
import { next_arrow, prev_arrow } from '../../assets/icons'
import { useButton } from '../../hooks/useButton'
const ProductImages = ({
  productDetails,
  thumbnail,
  isSelectedColor,
  discount,
  images,
}) => {
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)
  const { num, nextButton, prevButton } = useButton(
    `${
      isSelectedColor
        ? productDetails.findIndex(item => item.color === isSelectedColor)
        : images.length - 1
    }`,
    `${images.length - 1}`
  )

  return (
    <Wrapper className='image-container'>
      <div className='main-image p-relative mb-m'>
        <img
          src={images[num]}
          className='h-100 w-100 o-cover op-top'
          onMouseEnter={e => {
            const elem = e.currentTarget
            const { width, height } = elem.getBoundingClientRect()
            setSize([width, height])
            setShowMagnifier(true)
          }}
          onMouseMove={e => {
            //update cursor position
            const elem = e.currentTarget
            const { top, left } = elem.getBoundingClientRect()
            //calculate cursor position on the image
            const x = e.pageX - left - window.pageXOffset
            const y = e.pageY - top - window.pageYOffset
            setXY([x, y])
          }}
          onMouseLeave={() => {
            //close magnifier
            setShowMagnifier(false)
          }}
        />
        <div
          style={{
            display: showMagnifier ? '' : 'none',
            position: 'absolute',
            // prevent magnifier blocks the mousemove event of img
            pointerEvents: 'none',
            // set size of magnifier
            height: `${100}px`,
            width: `${100}px`,
            // move element center to cursor pos
            top: `${y - 100 / 2}px`,
            left: `${x - 100 / 2}px`,
            opacity: '1', // reduce opacity so you can verify position
            border: '1px solid lightgray',
            backgroundColor: 'white',
            borderRadius: '100%',
            backgroundImage: `url('${
              isSelectedColor
                ? productDetails.find(item => item.color === isSelectedColor)
                    .image
                : thumbnail
            }')`,
            backgroundRepeat: 'no-repeat',

            //calculate zoomed image size
            backgroundSize: `${imgWidth * 1.5}px ${imgHeight * 1.5}px`,

            //calculate position of zoomed image.
            backgroundPositionX: `${-x * 1.5 + 100 / 2}px`,
            backgroundPositionY: `${-y * 1.5 + 100 / 2}px`,
          }}
        ></div>

        {discount ? (
          <div className='discounted-price p-absolute'>
            <span>-{discount}%</span>
          </div>
        ) : null}
        <div
          onClick={() => nextButton()}
          className='next-prev-btn c-pointer next p-absolute w-4-icon'
        >
          <img src={next_arrow} alt='next-btn' />
        </div>
        <div
          onClick={() => prevButton()}
          className='next-prev-btn c-pointer prev p-absolute w-4-icon'
        >
          <img src={prev_arrow} alt='prev-btn' />
        </div>
      </div>
      <div className='other-images grid-2-col gap-2'>
        {productDetails.map((item, index) => {
          return (
            <div
              className='img-container'
              key={index}
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              <img src={item.image} className='w-100 h-100 o-cover c-pointer' />
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default ProductImages

const Wrapper = styled.div`
  .main-image {
    overflow: hidden;
    height: 60rem;
    .next-prev-btn {
      top: 50%;
      transform: translateY(-50%);
    }
    .next {
      right: 0;
    }
    .prev {
      left: 0;
    }
  }
  .other-images {
    img {
      transition: opacity eass-in-out 0.9s;
    }
  }
  @media (max-width: 56em) {
    .main-image {
      height: 45rem;
    }
    .other-images {
      display: none;
    }
  }
`
