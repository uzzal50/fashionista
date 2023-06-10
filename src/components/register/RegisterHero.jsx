import React from 'react'
import register from '../../assets/register.jpg'
import styled from 'styled-components'
import heroBg from '../../assets/hero-bg-circle.png'

const RegisterHero = () => {
  return (
    <Wrapper className='text-center w-100'>
      <div
        style={{
          background: `url(${register}) rgba(0,0,0,0.5)`,
          minHeight: '100%',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
          backgroundPosition: 'center',
        }}
      ></div>
    </Wrapper>
  )
}

export default RegisterHero
const Wrapper = styled.section`
  .hero-icon {
    height: 100vh;
    object-fit: cover;
  }
`
