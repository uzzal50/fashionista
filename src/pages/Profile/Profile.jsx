import styled from 'styled-components'
import { Divider, ProfileSidebar } from '../../components'
import { Outlet } from 'react-router-dom'
import SkeletonFallback from '../../components/skeleton/SkeletonFallback'

const Profile = () => {
  return (
    <Wrapper>
      <Divider />

      <div className=' mtb-l profile-order-wrapper d-grid grid-3-col gap-2'>
        <ProfileSidebar />
        <Outlet />
      </div>
    </Wrapper>
  )
}

export default Profile

const Wrapper = styled.section`
  .profile-order-wrapper {
    grid-template-columns: 1fr 3fr;
  }
  @media (max-width: 25em) {
    .profile-order-sidebar .image-container {
      img {
        object-fit: contain important;
      }
    }
  }
`
