import React from 'react';
import {  NavLink, useLocation } from "react-router-dom";
import '../App.css';

const NavBar= () =>{
    const location = useLocation();

    return (
        
    <div class="navbar">
        {location.pathname !== '/about' && location.pathname !== '/' && (
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
        )}

        {location.pathname !== '/claims' && (
            <li>
                <NavLink to="/claims">Claims</NavLink>
            </li>
        )}

        {location.pathname !== '/tracker' && (
            <li>
                <NavLink to="/tracker">Tracker</NavLink>
            </li>
        )}  

        {location.pathname !== '/volunteer' && (
        <li>
            <NavLink to="/volunteer">Volunteer</NavLink>
        </li>
        )}

    </div>
    );
}

export default NavBar;
