import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../modules/authManager";

const Header = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-info">
            <Link to="/" className="navbar-brand">
                Menagerie
            </Link>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/addPet" className="nav-link">
                        Add New Pet
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/genetics" className="nav-link">
                        Genetics
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={logout}>
                        LOGOUT
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;