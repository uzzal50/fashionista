import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from 'react-router-dom'

const AdminOnlyRoute = ({ children }) => {
  const { user } = useAuthContext()
  if (user && user.email === 'lhotter7@gmail.com') {
    return children
  }

  return (
    <>
      <section className='container mtb-l'>
        <h3 className='tertiary-heading mb-m'>Permission Denied</h3>
        <Link className='btn' to='/'>
          Back To Home
        </Link>
      </section>
    </>
  )
}

export default AdminOnlyRoute
