import styled from 'styled-components'
import SkeletonElement from './SkeletonElement'
import Shimmer from './Shimmer'

const SkeletonAvatar = () => {
  return (
    <>
      <SkeletonElement type='avatarTitle' />

      <SkeletonElement type='avatar' />
      <SkeletonElement type='avatarTitle' />
    </>
  )
}

export default SkeletonAvatar
