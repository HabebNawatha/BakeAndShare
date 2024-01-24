import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {

  //Handle Add Recipe button
  function handleAddRecipe() {
    navigate('/addrecipe')
  }

  //Sory function by property
  function sortByProperty(array, property, direction = 'asc') {
    if (direction === 'asc') {
      return array.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    } else if (direction === 'desc') {
      return array.sort((a, b) => (a[property] < b[property] ? 1 : -1));
    } else {
      console.error('Invalid direction specified. Use "asc" or "desc".');
      return array;
    }
  }

  //Handle sort button
  const handleSort = (property) => {
    const sortedRecipes = [...recipes];
    if (sortBy === property) {
      setRecipes(sortedRecipes.reverse());
      setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    } else {
      const sorted = sortByProperty(sortedRecipes, property, sortDirection);
      setRecipes(sorted);
      setSortBy(property);
    }
  };


//Handle toggling like button
  const handleToggleLike = async (recipeId) => {
    const userId = userObj._id;

    try {
      const response = await fetch(`http://localhost:8000/recipe/recipes/toggle-like/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        console.log('Like toggled successfully');
        fetchLikedRecipes();
      } else {
        console.error('Error toggling like:', response.statusText);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  
  const fetchLikedRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:8000/recipe/recipes/liked/${userObj._id}`);
      if (response.ok) {
        const likedRecipesData = await response.json();
        setLikedRecipes(likedRecipesData);
      } else {
        console.error('Error fetching liked recipes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching liked recipes:', error);
    }
  };



  const [likedRecipes, setLikedRecipes] = useState([]);
  const navigate = useNavigate()
  let user = localStorage.getItem("user");
  let userObj = JSON.parse(user)
  if (user == null) {
    navigate("/")
  } else {
    userObj = JSON.parse(user);
  }
  const [recipes, setRecipes] = useState([]);
  const [sortBy, setSortBy] = useState('likes');
  const [sortDirection, setSortDirection] = useState('desc');


  useEffect(() => {
    fetch('http://localhost:8000/recipe/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipes:', error));
    fetchLikedRecipes();
  }, []);

  return (
    <div>
      <div className="title">
        <p><h2>Bake & Share</h2></p>
      </div>
      <div className="recipes-tbl-container">
        <table className="recipes-tbl">
          <thead>
            <tr className="table-row-head">
              <th>
                <a className="no-customization-a" href="#" onClick={() => handleSort('recipeName')}>
                  Recipe Name
                  {sortBy === 'recipeName'}
                </a>
                <i className={`fas fa-sort`}></i>
              </th>
              <th>Ingredients</th>
              <th>Shared By </th>
              <th>
                <a className="no-customization-a" href="#" onClick={() => handleSort('date')}>
                  Date
                  {sortBy === 'date'}
                </a>
                <i className={`fas fa-sort`}></i>
              </th>
              <th>
                <a className="no-customization-a" href="#" onClick={() => handleSort('likes')}>
                  Likes
                  {sortBy === 'likes'}
                </a>
                <i className={`fas fa-sort`}></i>
              </th>

            </tr>
          </thead>
          <tbody>
            {recipes.map(recipe => (
              <tr key={recipe._id} className="recipe-data-row">
                <td className="col-recipe-name">
                  <Link to={`/pizza-recipes/${recipe._id}`}>{recipe.recipeName}</Link>
                </td>
                <td className="col-ingredients">{recipe.Ingredients.join(', ')}</td>
                <td className="col-shared-by">
                  <Link to={`/user-profile/${recipe.sharedBy}`}>
                    {recipe.sharedBy}
                  </Link>
                </td>
                <td className="col-date">{new Date(recipe.date).toLocaleDateString()}</td>
                <td className="col-likes">
                  {recipe.likedBy.length}
                  <button className="no-padding-button" onClick={() => handleToggleLike(recipe._id)}>
                    {likedRecipes.some(likedRecipe => likedRecipe._id === recipe._id) ? <i className="fas fa-heart bigger-icon" style={{ color: 'red' }}></i> :
                      <i className="far fa-heart bigger-icon"></i>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="addRecipe-btn-container">
          <button onClick={() => handleAddRecipe()}>Add Recipe</button>
        </div>
      </div>

    </div>
  );
}

export default Home;
