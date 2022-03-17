import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
  projectId: 'kara-cooks',
  storageBucket: 'kara-cooks.appspot.com',
  messagingSenderId: '742349286442',
  appId: '1:742349286442:web:30d58d0d274162b91c6753',
  measurementId: 'G-RJNR56MB30',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const storage = getStorage(app)

export { db, storage }
