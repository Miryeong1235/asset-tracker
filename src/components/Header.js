import React, { useState, useEffect } from "react";
import logo from "../inu-test.JPG";
import "./Header.css";

const Header = () => {
    const [greeting, setGreeting] = useState("Hello");

    useEffect(() => {
        const getGreeting = () => {
            const currentHour = new Date().getHours();

            if (currentHour < 12) {
                setGreeting("Good morning");
            } else if (currentHour < 18) {
                setGreeting("Good afternoon");
            } else {
                setGreeting("Good evening");
            }
        }

        getGreeting();
    }, []);

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="test" />
            <p>
                {greeting}, this is asset tracker app.
            </p>
        </header>
    )
}

export default Header;