import { useReducer, useEffect } from 'react'
import { sortReducer } from '../Reducers/sort_reducer'
import { db } from '../../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const initialState = {
  loading: false,
  all_products: [],
  sorted_products: [],
  sort: 'low-price',
  success: false,
}

export const useCollection = (coll, field, value) => {
  const [response, dispatch] = useReducer(sortReducer, initialState)

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
    data: response.all_products,
    loading: response.loading,
    response,
    dispatch,
  }
}
