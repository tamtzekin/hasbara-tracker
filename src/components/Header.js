import React from 'react';
import { NavLink } from "react-router-dom";
import MobileMenu from './MobileMenu';
import '../App.css';

const Header = () =>{
    // const location = useLocation();

    return (
        <>
        <span class="header-container">
            <MobileMenu />
            {/* <div className="flex-container"> */}
                <h1 class='ht-heading'>Hasbara Tracker</h1>
                <span id="dots">. . . . . . . . . . . . . .</span>
            {/* </div> */}
        </span>
        
        <div class="nav-links">
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
    </>

    );
}

export default Header;
