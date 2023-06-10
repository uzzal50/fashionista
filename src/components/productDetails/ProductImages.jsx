import styled from 'styled-components'
import { useState } from 'react'

const ProductImages = ({
  productDetails,
  thumbnail,
  isSelectedColor,
  discount,
}) => {
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)
  return (
    <Wrapper className='image-container'>
      <div className='main-image mb-m'>
        <img
          src={
            isSelectedColor
              ? productDetails.find(item => item.color === isSelectedColor)
                  .image
              : thumbnail
          }
          className='h-100 w-100'
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
      </div>
      <div className='other-images grid-2-col gap-2'>
        {productDetails.map((item, index) => {
          return <img src={item.image} key={index} className='w-100' />
        })}
      </div>
    </Wrapper>
  )
}

export default ProductImages

const Wrapper = styled.div`
  .main-image {
    position: relative;
    overflow: hidden;
    height: 60rem;
    img {
      object-fit: cover;
      object-position: top;
    }
  }

  .other-images img {
    height: 35rem;
    max-height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`
