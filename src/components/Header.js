import React from 'react';
import { NavLink } from "react-router-dom";
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import '../App.css';

const Header = () =>{
    // const location = useLocation();

    return (
        <>
        {/* <span className="header-container">
        </span> */}

            <div className="flex flex-wrap items-center justify-between gap-5 relative -mt-6">
                <MobileMenu />
                <Logo />
        
        <div className="flex lg:order-1 max-sm:ml-auto">
                <div className="nav-links">
                        <li className="undotted">
                            <NavLink to="/">Claims</NavLink>
                        </li>

                    <li className="undotted">
                        <NavLink to="/submit-claim">Submit a claim</NavLink>
                    </li>

                    <li className="undotted">
                        <NavLink to="/volunteer">Volunteer</NavLink>
                    </li>

                    <li className="undotted">
                        <NavLink to="/about">About</NavLink>
                    </li>
                </div>
            </div>
        </div>
    </>

    );
}

export default Header;
