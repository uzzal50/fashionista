import styled from 'styled-components'
import SkeletonElement from './SkeletonElement'
import Shimmer from './Shimmer'

const SkeletonProductDetails = ({ side }) => {
  return (
    <Wrapper className='sk-product-deatisl-wrapper'>
      <Shimmer />
      {side === 'image' ? (
        <SkeletonElement type='image' />
      ) : (
        <>
          <SkeletonElement type='title' />
          <SkeletonElement type='title' />
          <SkeletonElement type='title' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='title' />
          <SkeletonElement type='title' />
          <SkeletonElement type='title' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
        </>
      )}
    </Wrapper>
  )
}

export default SkeletonProductDetails
const Wrapper = styled.article`
  position: relative;
  .sk.image {
    height: 43rem;
  }
`
