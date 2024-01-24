import React, { useState } from 'react';
import '../styles/styles.css';
import { Link } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username}),
      });

      if (response.ok) {
        setSuccessMessage('User registered successfully!');
        setEmail('');
        setPassword('');
        setUsername('');
      } else {
        setSuccessMessage('Error registering user.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const closePopup = () => {
    setSuccessMessage('');
  };

  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      {successMessage && (
        <div className="success-popup">
          {successMessage}
          <button onClick={closePopup}>Close</button>
          <Link to="/signin"><button>Back to Login</button></Link>
        </div>
      )}
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? </p>
            <Link to="/">Log in</Link>
    </div>
  );
}

export default SignUp;
