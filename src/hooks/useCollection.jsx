import { useReducer, useEffect } from 'react'
import { collectionReducer } from '../Reducers/collectionReducer'
import { db } from '../../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const initialState = {
  loading: false,
  documents: [],
  success: false,
}

export const useCollection = (coll, field, value) => {
  const [response, dispatch] = useReducer(collectionReducer, initialState)

  useEffect(() => {
    dispatch({ type: 'IS_LOADING' })
    let colRef = collection(db, coll)
    let ref = field && value ? query(colRef, where(field, '==', value)) : colRef

    const unsub = onSnapshot(ref, snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      dispatch({ type: 'LOAD_DATA', payload: results })
    })

    return () => unsub()
  }, [coll])

  return {
    data: response.documents,
    loading: response.loading,
    success: response.success,
    response,
    dispatch,
  }
}
