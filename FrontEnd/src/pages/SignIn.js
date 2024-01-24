import React, { useEffect,useState } from 'react';
import SignUp from "./SignUp"
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
    const history = useNavigate();
    useEffect(()=>{
        let user = localStorage.getItem("user");
        if(user !== null){
            history("/home");
        }
    })
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            const {user} = data

            if (response.ok) {
                localStorage.setItem("user",JSON.stringify(user))
                console.log(localStorage.getItem("user"))
                // Sign in successful, redirect to Home page
                history("/home");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Sign In</button>
            </form>
            <p>Don't have an account? </p>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
}

export default SignIn;
