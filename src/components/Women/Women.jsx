import women from '../../assets/Women/women.jpg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Women = () => {
  return (
    <Wrapper className='women-section'>
      <div className='women-container d-grid mtb-xl'>
        <div className='img-container'>
          <div className='container-sw'>
            <img src={women} alt='women-t-shirt' />
          </div>
        </div>
        <div className='text-container'>
          <span className='sub-heading'>women</span>
          <h2 className='secondary-heading title'>Spring Summer Collection</h2>
          <span className='sub-heading mb-m'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo
            tempor, congue justo at, lobortis orci. Aliquam venenatis dui
            lectus, eu convallis turpis convallis et. Pellentesque
          </span>
          <Link to='women'>
            <button className='btn'>See Whole Collection</button>
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}

export default Women

const Wrapper = styled.section`
  .women-container {
    grid-template-columns: 1.2fr 1fr;
    gap: 3.2rem;
    align-items: center;
    .img-container {
      background-color: var(--primary-bg-color);
      img {
        margin: -5rem 0 5rem 0;
      }
    }
    .text-container {
      background-color: transparent;
      margin-left: -12rem;
      padding: 3rem;
      .title {
        margin-bottom: 2.4rem;
      }
    }
  }
`
