import styled from 'styled-components'
import { useEffect } from 'react'
import { SkeletonCard, TshirtItem } from '../components'
import { useCollection } from './useCollection'
import { capital } from '../utils'
import { useLocation } from 'react-router-dom'

const UsePage = ({ name, collection, field, value }) => {
  const { response, dispatch } = useCollection(collection, field, value)
  const data = response.sorted_products
  const location = useLocation()

  const updateSort = e => {
    const value = e.target.value
    dispatch({ type: 'UPDATE_SORT', payload: value })
  }

  useEffect(() => {
    if (response.success) dispatch({ type: 'SORT_PRODUCTS' })
    if (location.state) {
      dispatch({ type: 'SEARCH_TERM', payload: location.state })

      return
    } else null
  }, [response.sort, response.success, location.state])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [])

  return (
    <Wrapper>
      <div className={`${name}-container container-sw mtb-l`}>
        <span className='sub-heading title'>Home / {name}</span>
        <h2 className='secondary-heading mb-m'>{capital(name)}</h2>
        <div>
          {' '}
          <div className='sort-row mtb-m d-flex'>
            <span className='sub-heading'>
              Showing all {data && data.length} results.
            </span>
            <select name='sort' id='sort' onChange={updateSort}>
              <option value='low-price'>Lowest Price</option>
              <option value='high-price'>Highest Price</option>
              <option value='latest'>Sort by Recently Added</option>
              <option value='ratings'>Sort by Ratings</option>
            </select>
          </div>
          <div className='item-container grid-4-col'>
            {response.loading
              ? [1, 2, 3, 4].map(item => <SkeletonCard key={item} />)
              : data.map(item => {
                  return <TshirtItem key={item.id} data={item} {...response} />
                })}
          </div>
        </div>
        <div className='text-center mtb-s'>
          <button className='btn-simple no-more'>
            No More Clothes to Show.
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

export default UsePage

const Wrapper = styled.section`
  .title {
    text-transform: capitalize;
    font-size: 1.4rem;
    margin-bottom: 2.2rem;
  }
  .sort-row {
    display: grid;
    grid-template-columns: 3fr 1fr;
    align-items: baseline;
  }
  .no-more {
    border: 1px solid var(--primary-bg-color);
  }
`
