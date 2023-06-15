import { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { capital } from '../../utils'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { close, next_arrow, prev_arrow } from '../../assets/icons'
import { CLOSE_QUICK_VIEW } from '../../redux/Slice/cart-modal/cartModalSlice'
import ModalOverlay from '../Cart/ModalOverlay'
import { useButton } from '../../hooks/useButton'

const QuickViewModal = () => {
  const timerRef = useRef(null)
  const dispatch = useDispatch()
  const [isSelectedColor, setIsSelectedColor] = useState(null)

  const { data } = useSelector(state => state.cartModal)
  const { images, name, price, category, description, productDetails } = data
  const { num, prevButton, nextButton } = useButton(
    `${
      isSelectedColor
        ? productDetails.findIndex(item => item.color === isSelectedColor)
        : 0
    }`,
    `${images.length - 1}`
  )
  console.log('called')
  //for autoplay image
  // useEffect(() => {
  //   if (timerRef.current) {
  //     clearTimeout(timerRef.current)
  //   }
  //   timerRef.current = setTimeout(() => {
  //     handleNextImage()
  //   }, 2000)

  //   return () => clearTimeout(timerRef.current)
  // }, [handleNextImage])
  return ReactDOM.createPortal(
    <>
      <Wrapper>
        <ModalOverlay />
        <div className='view-wrapper w-100 h-100 d-flex-a-center-j-center'>
          <div className='view-container d-grid'>
            <div
              className='close-wrapper'
              onClick={() => dispatch(CLOSE_QUICK_VIEW())}
            >
              <img src={close} alt='close' />
            </div>
            <div className='left-container d-flex a-center'>
              <div
                onClick={() => nextButton()}
                className='next-prev-btn c-pointer next'
              >
                <img src={next_arrow} alt='next-btn' />
              </div>
              <div
                onClick={() => prevButton()}
                className='next-prev-btn c-pointer prev'
              >
                <img src={prev_arrow} alt='prev-btn' />
              </div>
              <img src={images[num]} className='w-100 h-100 main-img' />
            </div>
            <div className='right-container'>
              <span className='sub-heading'>{category}</span>
              <h2 className='secondary-heading mb-s'>{capital(name)}</h2>
              <span className='sub-heading'>${price}</span>
              <p className='mb-m'>{description}</p>
              {productDetails.map(item => {
                return (
                  <button
                    key={item.color}
                    className='p-s-tb btn-trans color-btn c-pointer mr-s'
                    style={{
                      border:
                        item.color === isSelectedColor
                          ? '1px solid #000000'
                          : '1px solid rgba(0, 0, 0, 0.14)',
                    }}
                    onClick={() => setIsSelectedColor(item.color)}
                  >
                    {item.color}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    </>,
    document.querySelector('.view-modal')
  )
}

export default QuickViewModal
const Wrapper = styled.section`
  .view-wrapper {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    .view-container {
      position: relative;
      grid-template-columns: 1fr 1.5fr;
      max-width: 100rem;
      background-color: #fff;
      transition: all 0.8s ease-in-out;

      .close-wrapper {
        position: absolute;
        height: 3rem;
        width: 3rem;
        right: 0;
        transform: translate(50%, -50%);
      }
      .right-container {
        padding: 2rem;
      }
      .left-container {
        position: relative;
        width: 40rem;
        height: 40rem;
        .main-img {
          object-position: top;
          object-fit: cover;
        }
        .next-prev-btn {
          display: block;
          position: absolute;
          height: 2rem;
          width: 2rem;
          opacity: 0;
          transition: all 0.3s ease-in-out;
        }
        .next {
          right: 2rem;
        }
        .prev {
          left: 2rem;
        }

        &:hover .next-prev-btn {
          opacity: 1;
        }
      }
    }
  }
`
