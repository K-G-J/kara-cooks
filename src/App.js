import { db } from './firebase.config'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { collection, onSnapshot, doc, deleteDoc, } from 'firebase/firestore'
import RecipeCard from './components/RecipeCard'
import Form from './components/Form.jsx'

function App() {
  const [recipes, setRecipes] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  
  const recipesCollectionRef = collection(db, 'recipes')

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          }
        }),
      )
    })
  }, [])

  const refresh = () => {
    window.location.reload();
  }


  const handleView = (id) => {
    const recipesClone = [...recipes]

    recipesClone.forEach((recipe) => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing
      } else {
        recipe.viewing = false
      }
    })

    setRecipes(recipesClone)
  }

  const removeRecipe = (id) => {
    deleteDoc(doc(db, 'recipes', id))
  }

  return (
    <div className="App">
      <div className="logo-container">
        <h1 onClick={refresh} id="logo-text">Kara Cooks</h1>
        <span onClick={refresh} ><img id="bean-chef" src="Bean-Chef.png" /></span>
      </div>
      <button onClick={() => setPopupActive(!popupActive)}>Add recipe</button>
      <div className="recipes">
        {recipes.map((recipe, i) => (
          <RecipeCard className="recipeCard" key={i} recipe={recipe} onHandleView={handleView} onRemoveRecipe={removeRecipe} />))}
      </div>
      {popupActive && (<Form recipesCollectionRef={recipesCollectionRef} setPopupActive={setPopupActive} />)}
    </div>
  )
}

export default App
