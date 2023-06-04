import men1 from '../../assets/Men/men-1.png'
import men2 from '../../assets/Men/men-2.jpg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Men = () => {
  return (
    <Wrapper className='men-section mtb-l container-sw'>
      <div className='men-container'>
        <div className='left'>
          <img src={men2} alt='men-2' className='w-100' />
          <div className='text-box'>
            <span className='sub-heading mtb-s'>MEN</span>
            <h2 className='secondary-heading'>
              The base collection -Ideal every day.
            </h2>
            <Link to='/men'>
              <button className='btn mtb-s shop-now w-30'>shop now</button>
            </Link>
          </div>
        </div>
        <div className='right'>
          <img src={men1} alt='men-1' className='w-100' />
        </div>
      </div>
    </Wrapper>
  )
}

export default Men

const Wrapper = styled.section`
  .men-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.2rem;
    .text-box {
      text-align: center;
      h2 {
        margin-bottom: 1.4rem;
      }
      .shop-now {
      }
    }
  }
`
