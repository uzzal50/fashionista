import styled from 'styled-components'
import { star, next_arrow, prev_arrow } from '../../assets/icons/'
import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import SkeletonReview from '../skeleton/SkeletonReview'

const Reviews = () => {
  const [index, setIndex] = useState(0)
  const { data: rev, response } = useCollection('reviews')
  const nextRev = () => {
    setIndex(old => {
      let newIndex = old + 1
      if (newIndex > rev.length - 1) {
        newIndex = 0
        return newIndex
      }
      return newIndex
    })
  }

  const prevRev = () => {
    setIndex(old => {
      let newIndex = old - 1
      if (newIndex < 0) {
        newIndex = rev.length - 1
        return newIndex
      }
      return newIndex
    })
  }

  return (
    <>
      <Wrapper className='reviews-section mtb-l text-center'>
        <h2 className='secondary-heading mb-m'>Reviews</h2>
        {rev && rev.length >= 1 ? (
          <>
            <div className='review-item'>
              <p className='review-text mb-m'>"{rev[index].review}"</p>
            </div>
            <div className='reviews'>
              <div className='star'>
                {rev[index].rate === 5 ? (
                  <>
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                  </>
                ) : rev[index].rate === 4 ? (
                  <>
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                  </>
                ) : rev[index].rate === 3 ? (
                  <>
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                  </>
                ) : rev[index].rate === 2 ? (
                  <>
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                  </>
                ) : (
                  <img src={star} alt='' />
                )}
              </div>

              <span className='sub-heading customer-name'>
                {rev[index].ReviewedBy.displayName}
              </span>
            </div>
          </>
        ) : (
          <SkeletonReview />
        )}

        <div className='prev-button' onClick={() => prevRev()}>
          <img src={prev_arrow} alt=' ' className='w-100 h-100' />
        </div>
        <div className='next-button' onClick={() => nextRev()}>
          <img src={next_arrow} alt='' className='w-100 h-100' />
        </div>
      </Wrapper>
    </>
  )
}

export default Reviews

const Wrapper = styled.section`
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  .prev-button,
  .next-button {
    position: absolute;
    top: 50%;
    border-radius: 7px;
    padding: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    text-align: center;
  }
  .prev-button {
    transform: translate(-500%, -50%);
  }
  .next-button {
    right: 0;
    transform: translate(500%, -50%);
  }
  .review-text {
    text-decoration: underline;
    font-weight: 500;
    font-size: var(--medium-font-size);
  }
  .reviews {
    img {
      width: 2.2rem;
    }
    .customer-name {
      font-size: var(--xsmall-font-size);
    }
  }
`
