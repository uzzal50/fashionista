import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'
import ProductModalImages from '../ProductDetails/ProductModalImages'

const ProductImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(0)

  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)
  return (
    <Wrapper className='image-container'>
      <div className='main-image mb-m'>
        <img
          src={images[mainImage]}
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
            backgroundImage: `url('${images[mainImage]}')`,
            backgroundRepeat: 'no-repeat',

            //calculate zoomed image size
            backgroundSize: `${imgWidth * 1.5}px ${imgHeight * 1.5}px`,

            //calculate position of zoomed image.
            backgroundPositionX: `${-x * 1.5 + 100 / 2}px`,
            backgroundPositionY: `${-y * 1.5 + 100 / 2}px`,
          }}
        ></div>
      </div>
      <div className='other-images d-grid'>
        {images.map((item, index) => {
          return (
            <img
              src={images[index]}
              alt=''
              key={index}
              className='w-100'
              onClick={() => setMainImage(index)}
            />
          )
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
    }
  }

  .other-images img {
    height: 35rem;
    max-height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`