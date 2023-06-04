import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate()
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      //update user online in user document
      // await projectFirestore.collection('users').doc(res.user.uid).update({
      //   online: true,
      // })

      const user = res.user
      dispatch({ type: 'LOGIN', payload: user })
      setIsPending(false)
      console.log('login Successful.', 'success')
      navigate('/')
    } catch (error) {
      setIsPending(false)
      setError(error.message)
    }
  }

  return { login, isPending, error }
}
