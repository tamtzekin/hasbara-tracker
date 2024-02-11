import React from 'react';
import {  NavLink } from "react-router-dom";
import '../App.css';

const NavBar= () =>{
    // const location = useLocation();

    return (
        
    <div class="navbar">
        {/* {location.pathname !== '/about' && location.pathname !== '/' && ( */}
            <li>
                <NavLink to="/">Claims</NavLink>
            </li>
        {/* )} */}

        {/* {location.pathname !== '/submit-claim' && ( */}
        <li>
            <NavLink to="/submit-claim">Submit a claim</NavLink>
        </li>
        {/* )} */}

        <li>
            <NavLink to="/volunteer">Volunteer</NavLink>
        </li>

        <li>
            <NavLink to="/about">About</NavLink>
        </li>

    </div>
    );
}

export default NavBar;
