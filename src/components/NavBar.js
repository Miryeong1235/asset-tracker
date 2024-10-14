import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = (props) => {
    const { currentUser } = props;

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">My Asset Tracker</h1>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {currentUser && (
                    <>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/signout">Sign Out</Link>
                        </li>
                    </>
                )}
                {!currentUser && (
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar;