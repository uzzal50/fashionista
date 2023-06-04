import { useState } from 'react'
import { auth } from '../../firebase/config'
import { signOut } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  // const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      await signOut(auth)
      console.log('Logout Successful', 'success')
      dispatch({ type: 'LOGOUT' })
      navigate('/')
    } catch (err) {
      setError(err.message)
      setIsPending(false)
      console.log('Logout Failed', 'error')
    }
  }

  return { logout, error, isPending }
}
