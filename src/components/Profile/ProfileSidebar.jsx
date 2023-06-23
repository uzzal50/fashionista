import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState, useEffect, useRef } from 'react'
import upload from '../../assets/icons/upload.svg'
import { sidebarStyles, sideBarlinks } from '../../utils'
import { useFirestore } from '../../hooks/useFirestore'
import { useCollection } from '../../hooks/useCollection'
import { OPEN_MESSAGE } from '../../redux/Slice/Message/messageSlice'
import bgImage from '../../assets/bgImage.png'
import { useDispatch } from 'react-redux'
import { useLoad } from '../../hooks/useLoad'

const ProfileSidebar = () => {
  const { user } = useAuthContext()
  const { data } = useCollection('users')
  const [imageUrl, setImageUrl] = useState(null)
  const { changeProfilePic, response } = useFirestore('users')
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const { onLoad, ref } = useLoad('profileImg')

  const fetchUsers = async () => {
    const loggedUser = await data.find(item => item.id === user.uid)
    ;(await loggedUser) && setImageUrl(loggedUser.photoURL)
  }

  useEffect(() => {
    fetchUsers()
  }, [data])

  useEffect(() => {
    if (response.success) {
      dispatch(
        OPEN_MESSAGE({ type: 'success', text: 'Profile Picture Successfully.' })
      )
    }
  }, [response.success])

  const handleImage = e => {
    e.preventDefault()
    let uploadedImg = [...e.target.files]

    if (!uploadedImg[0]) {
      console.log('select image')
      return
    }
    if (!uploadedImg[0].type.includes('image')) {
      dispatch(
        OPEN_MESSAGE({
          type: 'error',
          text: 'Not an Image',
        })
      )
      inputRef.current.value = ''
      return
    }

    if (uploadedImg[0].size > 100000) {
      dispatch(
        OPEN_MESSAGE({
          type: 'error',
          text: 'Image size should be less than 100kb.',
        })
      )
      inputRef.current.value = ''

      return
    }

    changeProfilePic(uploadedImg[0], user)
  }

  return (
    <Wrapper>
      <div className='profile-order-sidebar d-flex'>
        <div className='profile-details-top'>
          <div
            className='image-container p-relative'
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <input
              type='file'
              id='user-profile'
              accept='image/*'
              ref={inputRef}
              // hidden
              disabled={response.isPending}
              onChange={e => handleImage(e)}
            />
            <img src={upload} className='upload-btn' />

            <img
              ref={ref}
              src={imageUrl && imageUrl}
              alt='avatar'
              style={{ objectFit: 'cover' }}
              className='w-100 h-100 profile-image'
              onLoad={onLoad}
            />
          </div>
          <h2 className='secondary-heading text-center mb-xs'>
            {user && user.displayName}
          </h2>
          <p className='text-center'>{user && user.email}</p>
        </div>
        <div className='sidebar-menu-bottom'>
          <ul className='d-flex-d-column-g'>
            {sideBarlinks.map(sidebar => {
              return (
                <li className='sidebar-links' key={sidebar.label}>
                  <NavLink
                    to={sidebar.link}
                    style={sidebarStyles}
                    className='d-flex a-center j-space-between p-m'
                    onClick={() =>
                      window.scroll({ top: 0, behavior: 'smooth' })
                    }
                  >
                    <p className='t-capitalize f-s'>{sidebar.label}</p>
                    <span>{' > '}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}

export default ProfileSidebar

const Wrapper = styled.section`
  .profile-order-sidebar {
    flex-direction: column;
    gap: 3.6rem;
    .image-container {
      border-radius: 50%;
      overflow: hidden;
      height: 27rem;
      margin: 0 2.4rem 1.6rem;
      border: 4px solid #d4d4d4;
      input#user-profile {
        position: absolute;
        height: 100%;
        opacity: 0;
        z-index: 3;
      }
      .upload-btn {
        position: absolute;
        bottom: 0;
        height: 5rem;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 2;
        opacity: 0;
        transition: all ease 0.5s;
      }

      .profile-image {
        opacity: 0;
        transition: opacity ease-in-out 2s;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
      &:hover img {
        opacity: 0.6;
      }
      &:hover .upload-btn {
        transform: translate(-50%, -100%);
        opacity: 1;
        z-index: 1;
      }
    }
    .sidebar-links {
      transition: background-color ease-in-out 0.2s;
      &:hover {
        background-color: var(--primary-bg-color);
      }
    }
    .loaded .profile-image {
      opacity: 1;
    }
  }
  @media (max-width: 56em) {
    .profile-order-sidebar .image-container {
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 25em) {
    .profile-order-sidebar {
      .image-container {
        width: 25rem;
        height: 25rem;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
`
