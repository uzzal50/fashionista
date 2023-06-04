import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCQL4HHkKMJEit8d6wWbvHGDoTd56oeNcw',
  authDomain: 'fashion-6cff0.firebaseapp.com',
  projectId: 'fashion-6cff0',
  storageBucket: 'fashion-6cff0.appspot.com',
  messagingSenderId: '35672125393',
  appId: '1:35672125393:web:4026eb69192eb291bf7af0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

//init firestore services
export const db = getFirestore()
export const storage = getStorage(app)
export const auth = getAuth(app)

//timestamp
