import { useState } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase.config'

export default function EditForm({ recipe, setEditForm }) {

  const [updatedRecipe, updateRecipe] = useState({
    title: '',
    desc: '',
    ingredients: [],
    steps: [],
    images: [],
  })

  const [images, setImages] = useState([])
  const [progress, setProgress] = useState(0)
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(updatedRecipe)
  }
  const handleIngredientCount = () => {
    updateRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] })
  }
  const handleStepCount = () => {
    updateRecipe({ ...recipe, steps: [...recipe.steps, ''] })
  }
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i]
      newImage.id = Math.random()
      setImages((prevState) => [...prevState, newImage])
    }
  }

  const handleImages = () => {
    const urls =[]
    return new Promise((resolve, reject) => {
      images.map((image) => {
        const imageRef = ref(storage, `images/${image.name}`)
        const upload = uploadBytesResumable(imageRef, image)
        upload.on(
          'state_changed',
          (snapShot) => {
            const progress =
              (snapShot.bytesTransferred / snapShot.totalBytes) * 100
            setProgress(progress)
          },
          (error) => {
            reject(error)
          },
          async () => {
            try {
              const url = await getDownloadURL(imageRef)
              resolve(urls.push(url))
            } catch (error) {
              reject(error)
            }
          },
        )
      })
      let imagesClone = [...recipe.images]
      imagesClone = urls
      updateRecipe({ ...recipe, images: imagesClone })
    })
  }
  return (
    <div className="popup">
          <div className="popup-inner">
            <h2>Edit Recipe</h2>

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Title</label>
            <input
                  type="text"
                  defaultValue={recipe.title}
                  onChange={(e) => updateRecipe({ ...recipe, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  defaultValue={recipe.desc}
                  onChange={(e) => updateRecipe({ ...recipe, desc: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Ingredients</label>
                {recipe.ingredients.map((ingredient, i) => (
                  <input
                    type="text"
                    key={i}
                    defaultValue={ingredient}
                    onChange={(e) => updateRecipe({ ...recipe, ingredients: [...e.target.value] })}
                  />
                ))}
                <button type="button" onClick={handleIngredientCount}>
                  Add ingredient
                </button>
              </div>

              <div className="form-group">
                <label>Steps</label>
                {recipe.steps.map((step, i) => (
                  <textarea
                    type="text"
                    key={i}
                    defaultValue={step}
                    onChange={(e) => updateRecipe({ ...recipe, steps: [...e.target.value] })}
                  />
                ))}
                <button type="button" onClick={handleStepCount}>
                  Add step
                </button>
              </div>

              <div className="form-group">
                <progress value={progress} max="100" />
                <br />
            <br />
            <label htmlFor="file-upload" className="custom-file-upload">Browse</label>
                <input id="file-upload" type="file" multiple onChange={handleChange} />
                <button type="button" onClick={handleImages}> Click to upload pics</button>
              </div>

              <div className="buttons">
                <button type="submit">Submit</button>
                <button type="button" className="remove" onClick={() => setEditForm(false)} > Close </button>
              </div>
            </form>
          </div>
        </div>
  )
}
