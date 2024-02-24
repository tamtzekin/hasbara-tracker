import React from 'react';
import { Link, NavLink } from "react-router-dom";
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import '../App.css';

const Header = () =>{
    // const location = useLocation();

    return (
        <>
        <span className="header-container">
            <div className="flex-container">
                <MobileMenu />
                <Logo />
            </div>
        </span>
        
        <div className="nav-links">
            {/* {location.pathname !== '/about' && location.pathname !== '/' && ( */}
                <li className="undotted">
                    <NavLink to="/">Claims</NavLink>
                </li>
            {/* )} */}

            {/* {location.pathname !== '/submit-claim' && ( */}
            <li className="undotted">
                <NavLink to="/submit-claim">Submit a claim</NavLink>
            </li>
            {/* )} */}

            <li className="undotted">
                <NavLink to="/volunteer">Volunteer</NavLink>
            </li>

            <li className="undotted">
                <NavLink to="/about">About</NavLink>
            </li>
        </div>
    </>

    );
}

export default Header;
