import React, { useState } from 'react'
import { render } from 'react-dom'
import { db } from '../firebase.config'
import { storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export default function ReactFirebaseFileUpload() {
  const [images, setImages] = useState([])
  const [urls, setUrls] = useState([])
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i]
      newImage['id'] = Math.random()
      setImages((prevState) => [...prevState, newImage])
    }
  }

  const handleUpload = () => {
    images.map((image) => {
      const fileRef = ref(storage, `images/${image.name}`)
      const uploadTask = uploadBytesResumable(fileRef, image)
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      })
      getDownloadURL(fileRef)
        .then((urls) => {
          setUrls((prevState) => [...prevState, urls])
          console.log('images: ', images)
          console.log('urls', urls)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Upload Pics</button>
      <br />
      {urls.map((url, i) => (
        <div key={i}>
          <a href={url} target="_blank">
            {url}
          </a>
        </div>
      ))}
      <br />
      {urls.map((url, i) => (
        <img
          key={i}
          style={{ width: '500px' }}
          src={url || 'http://via.placeholder.com/300'}
          alt="firebase-image"
        />
      ))}
    </div>
  )
}
