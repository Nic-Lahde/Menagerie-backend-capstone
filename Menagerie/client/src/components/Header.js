import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../modules/authManager";

const Header = ({ setSelectedPet }) => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-success text-white">
            <img style={{ width: '4rem' }} className="ml-3 mr-3" alt="menagerie-logo" src="../images/TRRbrand.png" />
            <Link to="/" className="navbar-brand mr-5" onClick={() => setSelectedPet(null)}>
                Menagerie
            </Link>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link text-white mr-5" onClick={() => setSelectedPet(null)}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/addPet" className="nav-link text-white mr-5">
                        Add New Pet
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/genetics" className="nav-link text-white mr-5">
                        Genetics
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/clutchCalculator" className="nav-link text-white mr-5">
                        Clutch Calculator
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link text-white" onClick={logout}>
                        LOGOUT
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;