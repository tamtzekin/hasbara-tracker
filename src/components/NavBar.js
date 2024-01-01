import React from 'react';
import {  NavLink, useLocation } from "react-router-dom";
import '../App.css';

const NavBar= () =>{
    const location = useLocation();

    return (
        
    <div class="navbar">
        {location.pathname !== '/about' && (
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
        )}

        {location.pathname !== '/tracker' && location.pathname !== '/' && (
            <li>
                <NavLink to="/tracker">Tracker</NavLink>
            </li>
        )}  

        {/* {location.pathname !== '/volunteer' && (
        <li>
            <NavLink to="/volunteer">Volunteer</NavLink>
        </li>
        )} */}

    </div>
    );
}

    export default NavBar;
