import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
import Claims from './Claims';
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
                
        <div className="columns-container">

            <span class="column">
            <details>
            <summary><h2>About us<span class="expand-text"></span></h2></summary>
                <span className="home-text">We’re working on documenting and debunking claims made by the Israeli regime during its most recent — and unprecedented — genocidal campaign in Gaza since 7 Oct, 2023. The Israeli settler-colony continues to spread disinformation to manufacture consent for ethnic cleansing and land theft, as it has since the Nakba. Our aim is to centralise this information.<br /><br /></span>
                </details>

                {/* <a href="https://instagram.com/hasbaratracker" alt="Link to Instagram account @hasbaratracker" target="_blank" rel="noreferrer">@hasbaratracker</a> */}
                
                <br />

                <details>
                <summary><h2>What is hasbara?<span class="expand-text"></span></h2></summary>
                <span className="hasbara-about">'Hasbara' is a Hebrew term that translates to 'explanation' or 'public relations' in English. It refers to public relations efforts by the Israeli settler project aimed at promoting a positive image of itself by whitewashing its military occupation, apartheid system and ongoing dispossession of Palestine.<br />
                <br /> Hasbara includes various forms of communication, such as media outreach, social media campaigns, and other strategies to shape public opinion in favour of the Israeli state, and involves manipulation of information, spreading propaganda, and stifling dissenting voices.</span>
                </details>
                </span>

        <span class="column">
            <h2>Claims</h2>
                <div class="claim-link"><Link to="/tracker?filter=Forty%20beheaded%20babies">Forty beheaded babies</Link></div><br />
                    
                    <div class="claim-link"><Link to="/tracker?filter=al-ahli">Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces</Link></div><br />
                    
                    <em>Coming soon:</em> Israeli state offered fuel to Al-Shifa Hospital and it was refused
                    <br />

                    </span>
        </div>

    </>
    );
};

export default Homepage;
