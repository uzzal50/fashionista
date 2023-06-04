import styled from 'styled-components'
import TshirtItem from './TshirtItem'
import { useCollection } from '../../hooks/useCollection'
import { tshirts } from '../../data'
import SkeletonCard from '../skeleton/SkeletonCard'

import { useEffect } from 'react'

import { LOAD_POPULAR, LOAD_SALE } from '../../redux/Slice/popular/PopularSlice'
import { useDispatch } from 'react-redux'
const Popular = ({ type }) => {
  const { data, response } = useCollection('T-shirts', 'type', type)
  const { loading } = response
  const dispatch = useDispatch()

  useEffect(() => {
    if (response.success && type === 'popular') {
      dispatch(LOAD_POPULAR(data))
      return
    }

    if (response.success && type === 'sale') {
      dispatch(LOAD_SALE(data))
    }
  }, [response.success])

  return (
    <PopularWrapper className='popular-tshirts mtb-l '>
      <div className='container-sw'>
        <span className='sub-heading'>summer collection</span>
        <h2 className='secondary-heading'>
          {type === 'popular' ? 'Popular T-Shirts' : 'Sale T-Shirts'}
        </h2>
        <div className='popular-tshirt-container grid-4-col'>
          {loading
            ? [1, 2, 3, 4].map(item => <SkeletonCard key={item} />)
            : data &&
              data.map(item => {
                return <TshirtItem {...item} key={item.id} type={type} />
              })}
        </div>
      </div>
    </PopularWrapper>
  )
}

export default Popular

const PopularWrapper = styled.section`
  text-align: center;
  .popular-tshirt-container {
  }
`
