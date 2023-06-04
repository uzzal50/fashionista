import { useEffect, useReducer, useState } from 'react'
import { db, storage } from '../../firebase/config'
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage'
import { updateProfile } from 'firebase/auth'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { document: null, isPending: true, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        success: true,
        error: null,
      }

    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const useFirestore = coll => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  //collection ref
  const refs = collection(db, coll)

  //only dispatch is not cancelled
  const dispatchIfNotCancelled = action => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  //add order document
  const addAnyDocument = async doc => {
    try {
      dispatch({ type: 'IS_PENDING' })

      const addedDocument = await addDoc(refs, {
        ...doc,
        createdAt: serverTimestamp(),
      })
      await dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      })
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  //add document
  const addDocument = async doc => {
    const { image, name, category, price, colors, inStock, desc, type } = doc

    try {
      dispatch({ type: 'IS_PENDING' })

      //upload images
      let imagesUrl = []
      let now = Date.now()
      for (const item of image) {
        const storageRef = await ref(
          storage,
          `/popular-tshirts/${name}${now}}/${item.name}`
        )
        const uploadTask = await uploadBytesResumable(storageRef, item)

        const url = await getDownloadURL(uploadTask.ref)
        await imagesUrl.push(url)
      }

      const addedDocument = await addDoc(refs, {
        name,
        category,
        price,
        colors,
        inStock,
        desc,
        type,
        images: imagesUrl,
        createdAt: serverTimestamp(),
      })

      await dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  //delete document
  const deleteDocument = async id => {
    const docRef = doc(db, coll, id)
    const imageRef = ref(storage, `/popular-tshirts/${id}/${id}.jpg`)
    await deleteDoc(docRef)
    // // Delete the file
  }

  //update a document
  const updateDocument = async id => {
    const docRef = doc(db, coll, id)
    await updateDoc(docRef, {})
  }

  //update order status
  const updateOrderStatus = async (id, status) => {
    try {
      dispatch({ type: 'IS_PENDING' })
      const docRef = doc(db, coll, id)
      await updateDoc(docRef, { orderStatus: status })

      await dispatchIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
      })
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  //update Profile Picture
  const changeProfilePic = async (image, user) => {
    try {
      dispatchIfNotCancelled({ type: 'IS_PENDING' })
      //remove old picture
      const oldImageRef = await ref(storage, `users/${user.uid}`)
      await deleteObject(oldImageRef)

      //add new picture to storage
      const storageRef = await ref(storage, `/users/${user.uid}`)
      const uploadTask = await uploadBytesResumable(storageRef, image)
      const url = await getDownloadURL(uploadTask.ref)

      //update the user object Url for image
      const fullUser = await updateProfile(user, {
        photoURL: url,
      })

      //update the docs in Users
      const docRef = doc(db, coll, user.uid)
      await updateDoc(docRef, { photoURL: url })

      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT' })
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return {
    addDocument,
    deleteDocument,
    updateDocument,
    addAnyDocument,
    updateOrderStatus,
    changeProfilePic,

    response,
  }
}
