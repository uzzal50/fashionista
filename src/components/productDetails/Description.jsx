import styled from 'styled-components'
import { useState } from 'react'
import StarsRating from 'react-star-rate'
import { useCollection } from '../../hooks/useCollection'

const Description = ({ desc, id }) => {
  const [acc, setAcc] = useState({
    description: true,
    addInfo: false,
    reviews: false,
  })

  const { data } = useCollection('reviews')
  const filteredReview = data && data.filter(item => item.productId === id)

  return (
    <Wrapper>
      <div className='tabs-container  mtb-m'>
        <hr />
        <div className='tab-item'>
          <div className='tab-head d-flex j-space-between a-center'>
            <p className='f-m fw-500'>Description</p>
            <div
              className='plus'
              onClick={() => {
                setAcc({
                  ...acc,
                  description: !acc.description,
                  addInfo: false,
                  reviews: false,
                })
              }}
            >
              {acc.description ? '-' : '+'}
            </div>
          </div>
          {acc.description ? (
            <div className='tab-body'>
              <p>{desc}</p>
            </div>
          ) : null}
        </div>
        <hr />
        <div className='tab-item'>
          <div className='tab-head d-flex j-space-between a-center'>
            <p className='f-m fw-500'>Additional Information</p>
            <div
              className='plus'
              onClick={() => {
                setAcc({
                  ...acc,
                  addInfo: !acc.addInfo,
                  description: false,
                  reviews: false,
                })
              }}
            >
              {acc.addInfo ? '-' : '+'}
            </div>
          </div>
          {acc.addInfo ? (
            <div className='tab-body'>
              <p>{desc}</p>
            </div>
          ) : null}
        </div>
        <hr />
        <div className='tab-item'>
          <div className='tab-head d-flex j-space-between a-center'>
            <p className='f-m fw-500'>Reviews</p>
            <div
              className='plus'
              onClick={() =>
                setAcc({
                  ...acc,
                  reviews: !acc.reviews,
                  description: false,
                  addInfo: false,
                })
              }
            >
              {acc.reviews ? '-' : '+'}
            </div>
          </div>
          {acc.reviews ? (
            <div className='tab-body'>
              <div className='reviews-container d-flex'>
                {filteredReview.length >= 1 ? (
                  filteredReview.map(item => {
                    return (
                      <div className='review item' key={item.productId}>
                        <div className='mb-xs'>
                          <StarsRating value={item.rate} />
                        </div>

                        <p className='mb-m'>{item.review}</p>
                        <p className='f-d'>By : {item.ReviewedBy.email}</p>
                        <span className='sub-heading m-0 sub-text f-xs'>
                          On : {item.createdAt.toDate().toDateString()}
                        </span>
                      </div>
                    )
                  })
                ) : (
                  <button className='btn-simple b-border'>
                    No Reviews Yet.
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
        <hr />
      </div>
    </Wrapper>
  )
}

export default Description

const Wrapper = styled.div`
  .tabs-container {
    .tab-item {
      padding: 0.8rem;
    }
    .plus {
      font-size: var(--secondary-font-size);
      cursor: pointer;
    }
    .tab-body {
      padding: 0.6rem 0;
      .reviews-container{
flex-direction: column;
    
    gap: 3.6rem;
}
      }
    }
  }
`
