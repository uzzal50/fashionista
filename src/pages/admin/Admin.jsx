import styled from 'styled-components'
import { AdminNavbar } from '../../components/admin'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <Wrapper>
      <div className='main-dashboard mtb-l container'>
        <AdminNavbar />
        <Outlet />
      </div>
    </Wrapper>
  )
}

export default Admin

const Wrapper = styled.section`
  .main-dashboard {
    display: grid;
    grid-template-columns: 1fr 6fr;
  }
`
