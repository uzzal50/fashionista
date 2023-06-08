import { useState } from 'react'
import { auth } from '../../firebase/config'
import { signOut } from 'firebase/auth'
import { OPEN_MESSAGE } from '../redux/Slice/Message/messageSlice'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
import { useDispatch } from 'react-redux'

export const useLogout = () => {
  // const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const reduxDispatch = useDispatch()
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      await signOut(auth)

      dispatch({ type: 'LOGOUT' })
      navigate('/')
      reduxDispatch(
        OPEN_MESSAGE({
          type: 'success',
          text: 'Logout Successful.',
        })
      )
    } catch (err) {
      setError(err.message)
      setIsPending(false)
      reduxDispatch(
        OPEN_MESSAGE({
          type: 'error',
          text: 'Logout Failed.',
        })
      )
    }
  }

  return { logout, error, isPending }
}
