import { createContext, useReducer } from 'react'
import { authReducer } from '../Reducers/authReducer'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/config'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: false,
    authIsReady: false,
  })

  //Monitor currently signed user
  useEffect(() => {
    dispatch({ type: 'IS_LOADING' })
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch({ type: 'AUTH_IS_READY', payload: user })
      }
    })

    unsub()
  }, [state.user])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
