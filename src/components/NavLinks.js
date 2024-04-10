import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
    return (
        <span className="nav-links-fixed mobile:invisible">
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
        </span>
    );
};

export default NavLinks;
