import styled from 'styled-components'
import SkeletonElement from './SkeletonElement'

const SkeletonFallback = () => {
  return (
    <Wrapper className='sk-wrapper container mtb-l'>
      <div className='d-grid grid-3-col gap-2'>
        <div>
          <SkeletonElement
            type='profile-avatar'
            className='mb-m m-auto'
            style={{
              width: '80%',
              minHeight: '25rem',
            }}
          />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
        </div>
        <div>
          <SkeletonElement type='fallback' />
          <SkeletonElement type='fallback' />
        </div>
      </div>
    </Wrapper>
  )
}

export default SkeletonFallback
const Wrapper = styled.article``
