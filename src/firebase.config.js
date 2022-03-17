import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCOcEMRmixMq6b-HK6jKduBgtYSdky-M4E',
  authDomain: 'kara-cooks.firebaseapp.com',
  databaseURL: 'gs://kara-cooks.appspot.com/',
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
