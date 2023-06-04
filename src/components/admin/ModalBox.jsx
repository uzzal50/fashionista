import { useEffect } from 'react'
import styled from 'styled-components'

const ModalBox = ({ id, deleteDocument, setIsModalOpen }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'scroll')
  }, [])

  return (
    <Wrapper>
      <div className='modal-wrapper'></div>
      <div className='modal-container'>
        <div className='title mb-m'>
          <p>Are you Sure you want to delete?</p>
        </div>
        <div className='content'>
          <button
            onClick={() => {
              deleteDocument(id)
              console.log('Successfully Deleted', 'success')
              setIsModalOpen(false)
            }}
            className='btn mr-s modal-btn'
          >
            Yes
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className='btn modal-btn'
          >
            Cancel
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

export default ModalBox

const Wrapper = styled.section`
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem 4rem;
    background-color: #fff;
    text-align: center;
    transition: all 2s ease-in-out;

    .modal-btn {
      padding: 0.5rem 1.8rem;
    }
  }
`
