import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../styles/NavbarStyles.css';
import logo from '../images/bake&shareLogo.png';
function NavBar() {

    const location = useLocation();
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);
    if(location.pathname === "/"){
        return null;
    }
    let user = localStorage.getItem("user");
    let userObj = JSON.parse(user);
    const { email } = userObj;



    
    

    const handleIconClick = () => {
        setClicked(!clicked);
    }
    const handleProfileClick = () => {
        navigate(`/user-profile/${email}`)
    }

    function handleLogout() {
        localStorage.removeItem("user");
        navigate('/')
    }


    return (
            <nav>
                <img src={logo} alt="Logo" style={{ width: '30px', height: 'auto' }} />
                <div id="nav-bar" className={clicked ? "#nav-bar active" : "#nav-bar"}>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <button onClick={() => handleLogout()}>Sign out</button>
                    </li>
                    <li>
                        <button onClick={() => handleProfileClick()}>Profile</button>
                    </li>

                </ul>
                </div>
                <div className="mobile" onClick={handleIconClick}>
                    <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
            </nav>
    )
}
export default NavBar;