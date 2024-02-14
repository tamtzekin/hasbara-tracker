import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer">
                {/* <li><Link to="/newsletter">Newsletter</Link></li> */}
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="http://instagram.com/hasbaratracker" target="_blank">Instagram</Link></li>
            </div>
        </div>
    )
}

export default Footer;
