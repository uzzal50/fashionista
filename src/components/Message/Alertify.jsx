import styled from 'styled-components'
const Alertify = ({ mes, type }) => {
  return (
    <Wrapper
      className='alert'
      style={{ backgroundColor: `${type === 'success' ? 'green' : 'red'}` }}
    >
      <p>{mes}</p>
    </Wrapper>
  )
}

export default Alertify
const Wrapper = styled.section`
  position: fixed;
  right: 0;
  bottom: 0;

  padding: 1.5rem 3.8rem;
  color: #fff;
  margin: 0 0.5rem 0.5rem 0;

  font-size: 1.5rem;
`
