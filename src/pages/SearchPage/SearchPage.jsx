import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { closeSearch, search } from '../../assets/icons'
import { CLOSE_SEARCH_MODAL } from '../../redux/Slice/cart-modal/cartModalSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const SearchPage = () => {
  const [term, setTerm] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if (!term) return
    else {
      dispatch(CLOSE_SEARCH_MODAL())
      navigate('shop', {
        state: term,
      })
    }
  }

  return (
    <Wrapper>
      <div className='search-container w-100 h-100 d-flex-j-center  a-center'>
        <form className='w-50 d-flex' onSubmit={handleSubmit}>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search...'
            className='search-input text-center'
            autoFocus
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
          <button className='btn-trans search-btn w-3-icon' type='submit'>
            <img src={search} alt='search' className='w-100' />
          </button>
        </form>
      </div>
      <button
        className='btn-trans w-3-icon search-close-btn'
        onClick={() => dispatch(CLOSE_SEARCH_MODAL())}
      >
        <img src={closeSearch} alt='close' className='w-100' />
      </button>
    </Wrapper>
  )
}

export default SearchPage

const Wrapper = styled.section`
  .search-container {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.9);
    inset: 0;
    .search-input {
      background-color: transparent;
      border: none;
      font-size: 3.4rem;
      color: #fff;
      &::placeholder {
        color: #b3b3b3;
      }
    }

 
`
