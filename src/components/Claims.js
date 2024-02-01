import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
// import './Homepage.css';
import '../App.css';

const Claims = () => {
    return (
    <>
        <span class="header-container">
            <MobileMenu />
            <h1 class='ht-heading'>Hasbara Tracker</h1>
            <span id="dots">. . . . . . . . . . . . . .</span>
            <NavBar />
        </span>
                
        <span className="content-container">
                <h2>Claims</h2>
                <div class="claim-link"><Link to="/tracker?filter=Forty%20beheaded%20babies">Forty beheaded babies</Link></div><br />
                
                <div class="claim-link"><Link to="/tracker?filter=al-ahli">Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces</Link></div><br />
                
                <em>Coming soon:</em> Israeli state offered fuel to Al-Shifa Hospital and it was refused
                <br />
            </span>
    </>
    );
};

export default Claims;
