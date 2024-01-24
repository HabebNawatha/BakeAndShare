import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'; 
import Home from './components/Home';

function Routing({ user, setUser }) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/signin"
            element={<SignIn user={user} setUser={setUser} />}
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    );
  }
  

export default Routing;
