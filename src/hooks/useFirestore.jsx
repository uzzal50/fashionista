import { useEffect, useReducer, useState } from 'react'
import { db, storage } from '../../firebase/config'
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
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

  //addReact hook form
  const addDocumentNew = async data => {
    console.log(data)
    const { name, price, category, description, product, type, thumbnail } =
      data
    const thumbnailImage = thumbnail[0]
    try {
      dispatch({ type: 'IS_PENDING' })
      let productDetails = []
      let allImages = []

      //1. Add Document to Collection and returning id
      const addedDocument = await addDoc(refs, {
        name,
        price,
        category,
        description,
        type,
      })

      //2. Storing thumbnail
      const storageThumbnailRef = await ref(
        storage,
        `/clothes/${addedDocument.id}/thumbnail/${addedDocument.id}`
      )

      const uploadTaskOfThumnbail = await uploadBytesResumable(
        storageThumbnailRef,
        thumbnailImage
      )
      const urlOfThumnail = await getDownloadURL(uploadTaskOfThumnbail.ref)

      //3.Storing Images
      for (const item of product) {
        const storageImageRef = await ref(
          storage,
          `/clothes/${addedDocument.id}/images/${item.color}/${addedDocument.id}`
        )

        const uploadTaskOfImage = await uploadBytesResumable(
          storageImageRef,
          item.image
        )

        const urlOfImage = await getDownloadURL(uploadTaskOfImage.ref)

        await productDetails.push({
          color: item.color,
          image: urlOfImage,
          inStock: item.inStock,
        })
        await allImages.push(urlOfImage)
      }

      //4. Merging url of images with document
      const docRef = await doc(refs, addedDocument.id)
      const result = await setDoc(
        docRef,
        {
          productDetails,
          thumbnailPhoto: urlOfThumnail,
          images: [...allImages, urlOfThumnail],
        },
        { merge: true }
      )
      console.log(result)
      await dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      })
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  //delete document
  const deleteDocument = async (id, colors) => {
    try {
      // get document ref and delete
      const docRef = await doc(db, coll, id)
      await deleteDoc(docRef)

      //get thumbnail ref
      const thubnailRef = await ref(storage, `${coll}/${id}/thumbnail/${id}`)
      //delete thumbnail
      await deleteObject(thubnailRef)

      //get image ref
      //delete images from storage
      for (const item of colors) {
        const imageRef = await ref(
          storage,
          `${coll}/${id}/images/${item}/${id}`
        )
        await deleteObject(imageRef)
      }

      console.log('Deleted :)')
    } catch (error) {
      console.log(error.message)
    }
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
    addDocumentNew,
    deleteDocument,
    updateDocument,
    addAnyDocument,
    updateOrderStatus,
    changeProfilePic,
    response,
  }
}
