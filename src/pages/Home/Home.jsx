import styled from 'styled-components'
import Hero from '../../components/Hero/Hero'
import Popular from '../../components/T-shirt/Popular'
import Men from '../../components/Men/Men'
import Women from '../../components/Women/Women'
import Reviews from '../../components/Review/Reviews'
import QuickViewModal from '../../components/T-shirt/QuickViewModal'
import { useSelector } from 'react-redux'
import { useCollection } from '../../hooks/useCollection'

const Home = () => {
  const { quickView } = useSelector(state => state.cartModal)

  return (
    <main className='container'>
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

const main = styled.main`
  hr {
    background-color: red;
  }
`
