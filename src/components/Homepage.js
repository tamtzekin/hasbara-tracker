import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
import './Homepage.css';
import '../App.css';

const Homepage = () => {
    return (
    <>
        <span class="header-container">
            <MobileMenu />
            <h1 class='ht-heading'>Hasbara Tracker</h1>
            <span id="dots">. . . . . . . . . . . . . .</span>
            <NavBar />
        </span>
                
        <span className="content-container">
            <h2>About</h2>
                <span className="home-text">We’re working on documenting and debunking claims made by the Israeli regime during its most recent — and unprecedented — genocidal campaign in Gaza since 7 Oct 2023. The Israeli settler-colony continues to spread disinformation to manufacture consent for ethnic cleansing and land theft, as it has since the Nakba. Our aim is to centralise this information.</span>
                <br /><br />
                <a href="https://instagram.com/hasbaratracker" alt="Link to Instagram account @hasbaratracker" target="_blank" rel="noreferrer">@hasbaratracker</a>
                <br />
                <br />
                <h2>Claims</h2>
                <Link to="/tracker?filter=Forty%20beheaded%20babies">40 beheaded babies</Link><br />
                <br />
            </span>
    </>
    );
};

export default Homepage;
