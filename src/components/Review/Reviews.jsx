import styled from 'styled-components'
import { star, next_arrow, prev_arrow } from '../../assets/icons/'
import { useCollection } from '../../hooks/useCollection'
import SkeletonReview from '../skeleton/SkeletonReview'
import { useButton } from '../../hooks/useButton'

const Reviews = () => {
  const { data: rev } = useCollection('reviews')
  const { num, nextButton, prevButton } = useButton(0, `${rev.length - 1}`)

  return (
    <>
      <Wrapper className='reviews-section mtb-l text-center'>
        <h2 className='secondary-heading mb-m'>Reviews</h2>
        {rev && rev.length >= 1 ? (
          <>
            <div className='review-item p-m'>
              <p className='review-text mb-m'>"{rev[num].review}"</p>
            </div>
            <div className='reviews'>
              <div className='star'>
                {rev[num].rate === 5 ? (
                  <>
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                  </>
                ) : rev[num].rate === 4 ? (
                  <>
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                  </>
                ) : rev[num].rate === 3 ? (
                  <>
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                  </>
                ) : rev[num].rate === 2 ? (
                  <>
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                  </>
                ) : (
                  <img src={star} alt='' />
                )}
              </div>

              <span className='sub-heading customer-name'>
                {rev[num].ReviewedBy.displayName}
              </span>
            </div>
          </>
        ) : (
          <SkeletonReview />
        )}

        <div className='prev-button c-pointer' onClick={() => prevButton()}>
          <img src={prev_arrow} alt=' ' className='w-100 h-100' />
        </div>
        <div className='next-button c-pointer' onClick={() => nextButton()}>
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

  @media (max-width: 28em) {
    .prev-button {
      transform: translate(0, -50%);
    }
    .next-button {
      transform: translate(0, -50%);
    }
    .review-text {
      padding: 0 1rem;
    }
  }
`
