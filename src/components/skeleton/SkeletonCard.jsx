import styled from 'styled-components'
import SkeletonElement from './SkeletonElement'
import Shimmer from './Shimmer'

const SkeletonCard = () => {
  return (
    <Wrapper className='sk-wrapper container'>
      <Shimmer />
      <SkeletonElement type='image' />
      <SkeletonElement type='title' />
      <SkeletonElement type='text' />
      <SkeletonElement type='title' />
    </Wrapper>
  )
}

export default SkeletonCard
const Wrapper = styled.article``
