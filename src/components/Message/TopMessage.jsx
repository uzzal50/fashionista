import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { check, error, clos } from '../../assets/icons'
import { CLOSE_MESSAGE } from '../../redux/Slice/Message/messageSlice'

const TopMessage = ({ text, type }) => {
  const { showMsg } = useSelector(state => state.message)
  const dispatch = useDispatch()
  setTimeout(() => {
    dispatch(CLOSE_MESSAGE())
  }, 2000)

  return (
    <Wrapper>
      <div
        className='message-container'
        style={{
          transform: showMsg
            ? 'translate(-50%, 125%)'
            : 'translate(-50%, -150%)',
          opacity: showMsg ? 1 : 0,

          backgroundColor: type === 'success' ? '#edf7ed' : '#fdeded',
        }}
      >
        <div className='d-flex a-center'>
          <div style={{ flex: 1 }} className='d-flex  a-center  gap-1'>
            <img src={type === 'success' ? check : error} alt='' />
            <p
              style={{
                color: type === 'success' ? '#0f5132' : '#5f2120',
              }}
            >
              {text}
            </p>
          </div>

          <img
            src={clos}
            alt=''
            className='c-pointer'
            onClick={() => dispatch(CLOSE_MESSAGE())}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default TopMessage
const Wrapper = styled.section`
  .message-container {
    position: absolute;
    top: 0;

    border-radius: 4px;
    left: 50%;
    width: 50%;
    padding: 1.2rem;
    transition: all ease-in 0.2s;
  }
`
