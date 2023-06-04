import { useAuthContext } from '../../hooks/useAuthContext'

const UserLoggedIn = ({ children }) => {
  const { user } = useAuthContext()
  if (user) {
    return children
  }
  return <>Permission Denied</>
}

export default UserLoggedIn
