import styled from 'styled-components'
import Hero from '../../components/Hero/Hero'
import Popular from '../../components/T-shirt/Popular'
import Men from '../../components/Men/Men'
import Women from '../../components/Women/Women'
import Reviews from '../../components/Review/Reviews'
import QuickViewModal from '../../components/T-shirt/QuickViewModal'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { SAVE_ALL_DOUMENTS } from '../../redux/Slice/sort/sortSlice'
import { useCollection } from '../../hooks/useCollection'

const Home = () => {
  const { quickView } = useSelector(state => state.cartModal)
  const dispatch = useDispatch()
  const { data } = useCollection('clothes')

  useEffect(() => {
    dispatch(SAVE_ALL_DOUMENTS(data))
  }, [data])

  return (
    <main>
      <Hero />
      <Popular type='popular' />
      {quickView && <QuickViewModal />}
      <Men />
      <Women />
      <Popular type='sale' />
      <Reviews />
    </main>
  )
}

export default Home

const main = styled.main``
