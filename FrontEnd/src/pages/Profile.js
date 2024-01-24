// Profile.js

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import profilePictureHolder from '../images/bake&shareLogo.png';
import '../styles/MyProfile.css';

function Profile({ showEditButton, headerText }) {
    let user = localStorage.getItem("user");
    let userObj = JSON.parse(user);
    const [userData, setUserData] = useState([]);
    let { useremail } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/user/userdata/${useremail}`)
          .then(response => response.json())
          .then(data => setUserData(data))
          .catch(error => console.error('Error fetching user data:', error));
      
      }, [useremail]);

    // Add additional user details as needed
    const { email, username } = userObj;

    const [myRecipes, setRecipes] = useState([]);

    let isOwnProfile = false;
    if (email === useremail) {
      isOwnProfile = true;
      showEditButton = true;
      headerText = "Recipes You Shared";
    }else{
        showEditButton = false;
        headerText = `Recipes ${useremail} Shared`
    }
  

    useEffect(() => {
        fetch(`http://localhost:8000/recipe/recipesbyuser?email=${useremail}`)
          .then(response => response.json())
          .then(data => setRecipes(data))
          .catch(error => console.error('Error fetching recipes:', error));
      
      }, []);
      

    return (
        <div className="container">
            <div className="shared-recipes">
                <h1>{headerText}</h1>
                <table className="recipes-tbl">
                    <thead>
                        <tr className="table-row-head">
                            <th>Recipe Name</th>
                            <th>Ingredients</th>
                            <th>Date</th>
                            <th>Likes</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {myRecipes.map(myRecipes => (
                            <tr key={myRecipes._id} className="recipe-data-row">
                                <td className="col-recipe-name">
                                    <Link to={`/pizza-recipes/${myRecipes._id}`}>{myRecipes.recipeName}</Link>
                                </td>
                                <td className="col-ingredients">{myRecipes.Ingredients.join(', ')}</td>
                                <td className="col-date">{new Date(myRecipes.date).toLocaleDateString()}</td>
                                <td className="col-likes">
                                    {myRecipes.likedBy.length}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="profile-container">
                <div className="profile-div">
                    <h1>Profile</h1>
                    <div className="profile-image-container">
                        <img
                            src={profilePictureHolder}
                            alt="Profile"
                            className="profile-image"
                            style={{ width: '200px', height: 'auto' }}
                        />
                    </div>
                    <p className="username">Username: {userData.username}</p>
                    <p className="user-email">Email: {userData.email}</p>
                    {showEditButton && (
                        <Link to="/edit-profile" className="edit-profile-link">Edit Profile</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
