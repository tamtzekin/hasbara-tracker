import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => {
    return (
        <span class="footer">
            <li><Link to="/volunteer">Volunteer</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/newsletter">Newsletter</Link></li>
            <li><Link to="http://instagram.com/hasbaratracker" target="_blank">Instagram</Link></li>
        </span>
    )
}

export default Footer;
