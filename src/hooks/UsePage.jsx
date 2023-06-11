import styled from 'styled-components'
import { useEffect } from 'react'
import { SkeletonCard, TshirtItem } from '../components'
import { useCollection } from './useCollection'
import { capital } from '../utils'
import {
  SAVE_ALL_DOUMENTS,
  SORT_DOCUMENTS,
} from '../redux/Slice/sort/sortSlice'
import { useDispatch, useSelector } from 'react-redux'

const UsePage = ({ name, collection, field, value }) => {
  const reduxDispatch = useDispatch()
  const { clonedDocuments } = useSelector(state => state.sort)
  const { data, loading } = useCollection(collection, field, value)

  const updateSort = e => {
    reduxDispatch(SORT_DOCUMENTS(e.target.value))
  }

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
            {loading
              ? [1, 2, 3, 4].map(item => <SkeletonCard key={item} />)
              : clonedDocuments.map(item => {
                  return <TshirtItem key={item.id} data={item} />
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
