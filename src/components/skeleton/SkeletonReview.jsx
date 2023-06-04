import styled from 'styled-components'
import SkeletonElement from './SkeletonElement'
import Shimmer from './Shimmer'

const SkeletonReview = () => {
  return (
    <Wrapper className='sk-wrapper'>
      <Shimmer />

      <SkeletonElement type='text' />
      <SkeletonElement type='text' />

      <SkeletonElement type='review' />
    </Wrapper>
  )
}

export default SkeletonReview
const Wrapper = styled.article``
