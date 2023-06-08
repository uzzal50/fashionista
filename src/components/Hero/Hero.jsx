import hero from '../../assets/hero.png'
import heroBg from '../../assets/hero-bg-circle.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <HeroWrapper className='top-section'>
      <div className='hero-container d-grid container-sw'>
        <div className='text-container'>
          <span className='hero-women'>Women</span>
          <h1 className='heading-primary'>
            Slick. Modern. <br></br> Awesome.
          </h1>
          <Link to='shop'>
            <button className='shop btn'>Shop Collection</button>
          </Link>
        </div>
        <div
          className='image-container'
          style={{
            background: `url(${heroBg}) center center/ contain no-repeat`,
          }}
        >
          <img src={hero} alt='hero-img' className='hero-img w-100' />
        </div>
      </div>
    </HeroWrapper>
  )
}

export default Hero

const HeroWrapper = styled.section`
  .hero-container {
    background-color: var(--primary-bg-color);
    grid-template-columns: 1fr 1fr;
    align-items:center;
    gap: 5rem;

    overflow:hidden;
     height :100vh;
}

    .text-container {
      .hero-women {
        color: rgba(0, 0, 0, 0.6);
        display: block;
        margin-bottom: 1.2rem;
        text-transform : uppercase;
      }
    }
 
  }
`
