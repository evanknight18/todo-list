import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white text-center p-4">
        <h1 className="text-3xl font-bold">Get $#!T Done</h1>
        <nav>
        <Link to="/" className="text-white mr-4">Home</Link>
        <Link to="/register" className="text-white mr-4">Register</Link>
        <Link to="/login" className="text-white">Login</Link>
      </nav>
        </header>
    );
    };

export default Header;