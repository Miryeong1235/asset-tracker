import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./NavBar.css";

const NavBar = (props) => {
    const { currentUser } = props;
    const navigate = useNavigate();

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigate("/"); // Redirect to home page after sign out
            })
            .catch((error) => {
                console.error("Error signing out", error);
            });
    }

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">My Asset Tracker</h1>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {currentUser && (
                    <>
                        {/* <li>
                            <Link to="/profile">Profile</Link>
                        </li> */}
                        <li>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </li>
                    </>
                )}
                {!currentUser && (
                    <li className="signin-signup">
                        <Link to="/signin">Sign In</Link>
                        <Link to={"/signup"}>Sign Up</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar;