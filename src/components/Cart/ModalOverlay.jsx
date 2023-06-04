import { useEffect } from 'react'
import styled from 'styled-components'
import { CLOSE_CART_MODAL } from '../../redux/Slice/cart-modal/cartModalSlice'
import { useDispatch } from 'react-redux'

const ModalOverlay = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'scroll')
  }, [])

  const handleClose = () => {
    dispatch(CLOSE_CART_MODAL())
  }

  return (
    <Wrapper className='modal-wrapper' onClick={() => handleClose()}></Wrapper>
  )
}

export default ModalOverlay
const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
`
