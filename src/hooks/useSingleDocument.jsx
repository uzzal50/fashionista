import { useState } from 'react'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

export const useSingleDocument = coll => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const fetchSingleDocument = async id => {
    try {
      setIsLoading(true)

      const docRef = doc(db, coll, id)
      const fetchedDoc = await getDoc(docRef)
      const document = await fetchedDoc.data()

      setData(document)
      setIsLoading(false)
      setSuccess(true)
    } catch (error) {
      console.log(error.message)
    }
  }

  return { fetchSingleDocument, isLoading, data, success }
}
