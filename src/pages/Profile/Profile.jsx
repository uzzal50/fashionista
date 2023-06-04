import styled from 'styled-components'
import { Divider, ProfileSidebar } from '../../components'
import { Outlet } from 'react-router-dom'
import SkeletonFallback from '../../components/skeleton/SkeletonFallback'

const Profile = () => {
  return (
    <Wrapper>
      <Divider />

      <div className='container mtb-l profile-order-wrapper d-grid'>
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
    gap: 2rem;
   
    .accordion-item {
      .order-item-btn {
        position: relative;
        width: 100%;
        border: none;
        display: flex;
        // gap: 4.5rem;
        flex-wrap: wrap;
         padding: 0.6rem 1.6rem;
        font-family: inherit;
        border-radius: 4px;
        align-items: center;
        justify-content: space-between;
        background-color: #fdf6f5;
        .order-item__col__label {
          .sub-heading {
            margin-bottom: 0.2rem;
            text-transform: capitalize;
          }
        }
        .order-item__col__value {
          span {
            font-weight: 500;
          }
        }
      }
    }
    .accordion-body {
      padding: 1.2rem;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
      transition: all ease-in-out 3s;
      .cart-items-details {
            flex: 1;
            .text-container{
              flex-direction: column;
               padding: 1rem 0;
               justify-content: space-between;
            }
        }
      }
    }
  }
`
