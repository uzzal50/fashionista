import styled from 'styled-components'
import MainLinks from '../Navbar/MainLinks'
import { fb, insta, tw } from '../../assets/icons'

const Subscribe = () => {
  return (
    <Wrapper className='sub-section text-center'>
      <div>
        <div className='sub-container ptb-l'>
          <h2 className='secondary-heading sub'>
            Subscribe To Get Offers In Your Inbox
          </h2>
          <div className='sub-input-btn d-flex w-50 mb-l m-auto-lr'>
            <input
              type='text'
              placeholder='Your Email Address'
              className='email-input b-none'
            />
            <button className='btn sub-btn'>Subscribe</button>
          </div>
          <div className='social-links'>
            <ul className='d-flex-j-center a-center gap-1 social-icons-list'>
              <li className='d-flex-j-center a-center c-pointer'>
                <img src={fb} alt='' className='w-1-icon' />
              </li>
              <li className='d-flex-j-center a-center c-pointer'>
                <img src={tw} alt='' className='w-1-icon' />
              </li>
              <li className='d-flex-j-center a-center c-pointer'>
                <img src={insta} alt='' className='w-1-icon' />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Subscribe

const Wrapper = styled.section`
  .sub-container {
    background-color: var(--primary-bg-color);
    .sub-input-btn {
      .email-input {
        border-radius: 0;

        font-family: inherit;
        &:focus {
          outline: none;
        }
      }
    }
    .social-icons-list {
      li {
        background-color: #fff;
        padding: 0.8rem;
        &:hover {
          background-color: var(--primary-bg-color);
        }
      }
    }
  }
  @media (max-width: 25em) {
    .sub-input-btn {
      flex-direction: column;
    }
    .email-input {
      margin-bottom: 2rem;
    }
    .sub-container sub {
      padding: 1.2rem;
    }
  }
`
