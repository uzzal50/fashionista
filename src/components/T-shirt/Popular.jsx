import { useEffect } from 'react'
import styled from 'styled-components'
import TshirtItem from './TshirtItem'
import { useDispatch } from 'react-redux'
import SkeletonCard from '../skeleton/SkeletonCard'
import { useCollection } from '../../hooks/useCollection'
import { LOAD_POPULAR, LOAD_SALE } from '../../redux/Slice/popular/PopularSlice'

const Popular = ({ type }) => {
  const { data, response } = useCollection('clothes', 'type', type)
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
    <PopularWrapper className='popular-tshirts mtb-l text-center'>
      <div className='container-sw'>
        <span className='sub-heading'>summer collection</span>
        <h2 className='secondary-heading'>
          {type === 'Related Products' ? type : `${type} T-shirts`}
        </h2>
        <div className='popular-tshirt-container grid-4-col'>
          {loading
            ? [1, 2, 3, 4].map(item => <SkeletonCard key={item} />)
            : data &&
              data.map(item => {
                return <TshirtItem data={item} key={item.id} type={type} />
              })}
        </div>
      </div>
    </PopularWrapper>
  )
}

export default Popular

const PopularWrapper = styled.section``
