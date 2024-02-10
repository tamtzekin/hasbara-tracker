import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
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
                <div class="claim-link"><Link to="/forty-beheaded-babies">Forty beheaded babies</Link></div><br />
                
                <div class="claim-link"><Link to="/al-ahli-attacked">Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces</Link></div><br />
                
                <div class="claim-link"><Link to="/al-shifa-fuel">Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas</Link></div><br />

                <em>Coming soon:</em> xxxxxx
                <br />
            </span>
    </>
    );
};

export default Claims;
