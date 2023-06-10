import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import StarsRating from 'react-star-rate'
import { useSingleDocument } from '../../hooks/useSingleDocument'
import { useEffect } from 'react'
import { useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { OPEN_MESSAGE } from '../../redux/Slice/Message/messageSlice'
import { useDispatch } from 'react-redux'

const ReviewProduct = () => {
  const { id } = useParams()
  const [rate, setRate] = useState(0)
  const [review, setReview] = useState('')
  const [showReview, setShowReview] = useState(false)
  const { fetchSingleDocument, data, success, isLoading } =
    useSingleDocument('clothes')
  const { user } = useAuthContext()
  const dispatch = useDispatch()

  const { addAnyDocument, response } = useFirestore('reviews')

  useEffect(() => {
    fetchSingleDocument(id)
  }, [id])

  useEffect(() => {
    if (response.success) {
      setRate(0)
      setReview('')
      setShowReview(true)
      dispatch(
        OPEN_MESSAGE({
          type: 'success',
          text: 'Review Added Successfully.',
        })
      )
    }
  }, [response.success])

  const submitReview = e => {
    e.preventDefault()
    const reviewConfig = {
      rate,
      review,
      productId: id,
      ReviewedBy: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      },
    }
    addAnyDocument(reviewConfig)
  }

  return (
    <Wrapper className='mtb-m'>
      <div className='container'>
        <h2 className='secondary-heading'>Review Product</h2>
        <div className='review-container d-grid grid-1-col gap-2'>
          <div className='order-details'>
            <p>Product Name : {data && data.name}</p>
            <span className='sub-heading sub-text mb-m'>
              Price : ${data && data.price}
            </span>
            <div className='image-container d-grid grid-3-col gap-2'>
              {data &&
                success &&
                data.images.map((item, i) => {
                  return (
                    <img src={item} alt='' key={i} className='w-100 h-100' />
                  )
                })}
            </div>
          </div>
          <div className='reviews'>
            <form onSubmit={e => submitReview(e)}>
              <p className='f-m'>Rating: </p>
              <div className='mb-m'>
                <StarsRating
                  value={rate}
                  onChange={rate => {
                    setRate(rate)
                  }}
                />
              </div>
              <p htmlFor='' className='f-m mb-s'>
                Review
              </p>
              <textarea
                className='mb-m'
                value={review}
                required
                style={{ resize: 'none' }}
                onChange={e => setReview(e.target.value)}
              ></textarea>
              <div className='d-flex a-center'>
                <button
                  className='btn p-m f-d mr-s'
                  type='submit'
                  disabled={response.isPending}
                >
                  {response.isPending ? (
                    <div className='lds-dual-ring'></div>
                  ) : (
                    'Submit Review'
                  )}
                </button>
                {showReview ? (
                  <Link to={`/product/${data.type}/${id}`}>
                    <p className='t-capitalize'>View Review</p>
                  </Link>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default ReviewProduct

const Wrapper = styled.section``
