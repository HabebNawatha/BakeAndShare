// RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RecipeDetails.css';

function RecipeDetail() {
  let { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/recipe/recipe/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.recipe))
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='recipe-details-title'>
        <h1>Recipe ID: {id}</h1>
        <h2>{recipe.recipeName}</h2>
      </div>
      <div className='container'>
        <div className='ingredients-details'>
          <h3>Ingredients</h3>
          <ul className='ingredients-ul'>
            {recipe.Ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className='steps-details'>
          <h3>Method</h3>
          <ol className='steps-ol'>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>

  );
}

export default RecipeDetail;
