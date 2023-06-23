import { useEffect } from 'react'
import styled from 'styled-components'
import TshirtItem from './TshirtItem'
import { useDispatch } from 'react-redux'
import SkeletonCard from '../skeleton/SkeletonCard'
import { useCollection } from '../../hooks/useCollection'
import { LOAD_POPULAR, LOAD_SALE } from '../../redux/Slice/popular/PopularSlice'

const Popular = ({ type }) => {
  const dispatch = useDispatch()
  const { data, loading, success } = useCollection('clothes', 'type', type)

  useEffect(() => {
    if (success && type === 'popular') {
      dispatch(LOAD_POPULAR(data))
    }
    if (success && type === 'sale') {
      dispatch(LOAD_SALE(data))
    }
  }, [success])
  console.log(data)

  return (
    <PopularWrapper className='popular-tshirts mtb-l text-center'>
      <div className='container-sw'>
        <span className='sub-heading'>summer collection</span>
        <h2 className='secondary-heading'>
          {type === 'popular' ? 'Popular' : 'Sale'} T-shirts
        </h2>
        <div className='popular-tshirt-container grid-4-col'>
          {loading
            ? [1, 2, 3, 4].map(item => <SkeletonCard key={item} />)
            : data &&
              data.slice(0, 4).map(item => {
                return <TshirtItem data={item} key={item.id} type={type} />
              })}
        </div>
      </div>
    </PopularWrapper>
  )
}

export default Popular

const PopularWrapper = styled.section`
  @media (max-width: 25em) {
    .popular-tshirt-container {
      grid-template-columns: repeat(2, 1fr);
    }
    .popular-tshirt-container .img-container {
      min-height: 30rem;
      img {
        object-position: top;
      }
    }
  }
`
