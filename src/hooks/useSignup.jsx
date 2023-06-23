import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '../../firebase/config'
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'

export const useSignup = () => {
  const { dispatch, user } = useAuthContext()
  const [isCancelled, setIsCancelled] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const collRef = collection(db, 'users')

  const signUp = async (email, password, name, thumbnail) => {
    setError(null)
    setIsPending(true)

    if (!isCancelled) {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        const uploadImage = thumbnail[0]
        //upload thumbnail
        const storageRef = await ref(storage, `/users/${user.uid}`)
        const uploadTask = await uploadBytesResumable(storageRef, uploadImage)
        const url = await getDownloadURL(uploadTask.ref)

        //adding url and name
        const fullUser = await updateProfile(user, {
          displayName: name,
          photoURL: url,
        })

        //creating a document
        const addedDoc = await doc(collRef, user.uid)
        await setDoc(addedDoc, {
          online: true,
          displayName: name,
          photoURL: url,
          id: user.uid,
          cartItems: [],
        })

        //set loading false
        setIsPending(false)
        setSuccess(true)
        dispatch({ type: 'LOGIN', payload: fullUser })
      } catch (error) {
        console.log(`${error.message}`, 'error')
        setError(error.message)
        setIsPending(false)
        setSuccess(false)
      }
    } else return null
  }
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])
  return { isPending, error, signUp, success }
}
