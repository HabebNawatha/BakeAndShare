import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetails';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
      <Router>
      <div className="App">
        <NavBar/>
        <Routes>
        <Route path="/" element={<SignIn user={user} setUser={setUser} />} />
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user-profile/:useremail" element={<Profile />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/pizza-recipes/:id" element={<RecipeDetail />} />
        </Routes>
         </div>
      </Router>
   
  );
}
export default App;
