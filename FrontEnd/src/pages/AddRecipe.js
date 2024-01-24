import React, { useState } from "react";
import { ingredients } from '../components/Ingredients';
import '../styles/AddRecipe.css';

function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState('');
  const [allIngredients] = useState(ingredients);
  const [successMessage, setSuccessMessage] = useState('[]');

  let user = localStorage.getItem("user");
  let userObj = JSON.parse(user);
  let userEmail = userObj.email;
  

//Handle ingredients list
  const handleIngredientChange = (e) => {
    const selectedIngredient = e.target.value;
    setSelectedIngredients([...selectedIngredients, selectedIngredient]);
  };

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
  };

//Handling steps
  const handleRemoveStep = (step) => {
    setSteps(steps.filter((item) => item !== step));
  };

  const handleAddStep = () => {
    if (newStep) {
      setSteps([...steps, newStep]);
      setNewStep(''); // Reset the input field
    }
  };
  
//Handle adding recipe
  const handleAddRecipe = async (e) => {
    e.preventDefault();
    let Ingredients = selectedIngredients;
    let sharedBy = userEmail;

    try {
      const response = await fetch('http://localhost:8000/recipe/addrecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeName, Ingredients, sharedBy ,steps}),
      });

      if (response.ok) {
        setSuccessMessage('Recipe created successfully!');
        setRecipeName('');
      } else {
        setSuccessMessage('Error creating recipe.');
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  //Handling closing popup
  const closePopup = () => {
    setSuccessMessage('');
  };


  return (
    <div className="add-recipe-div">
      {successMessage && (
        <div className="success-popup">
          {successMessage}
          <button onClick={closePopup}>Close</button>
        </div>
      )}
      <form onSubmit={handleAddRecipe} className="add-recipe-form">
      <h2 className="add-recipe-form-title">Make Your Own!</h2>
        <div className="add-recipe-name">
          <label>Recipe Name:</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <select onChange={handleIngredientChange} className="select-ingredient-form">
            <option value="">Select an Ingredient</option>
            {allIngredients.map((ingredient, index) => (
              <option key={index} value={ingredient}>
                {ingredient}
              </option>
            ))}
          </select>
          <ul>
            {selectedIngredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient}{" "}
                <button type="button" onClick={() => handleRemoveIngredient(ingredient)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label>Steps:</label>
          <input
            placeholder="Add a step by step.."
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
          />
          <button type="button" onClick={handleAddStep} className="add-step-form-button">
            
          </button>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>
                {step}{" "}
                <button type="button" onClick={() => handleRemoveStep(step)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipe;
