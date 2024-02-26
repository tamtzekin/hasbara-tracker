import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

const About = () => {
    return (
    <>
        <Header />

        <div className="content-container">
                <h2 className="subheading">About us</h2>
                <span className="home-text">We’re working on documenting and debunking claims made by the Israeli regime during its most recent — and unprecedented — genocidal campaign in Gaza since 7 Oct, 2023. The Israeli settler-colony continues to spread disinformation to manufacture consent for ethnic cleansing and land theft, as it has since the Nakba. Our aim is to centralise this information.<br /></span>

                <h2 className="subheading">What is hasbara?</h2>
                <span className="hasbara-about">‘Hasbara’ is a Hebrew term that translates to ‘explanation’ or ‘public relations’ in English. It refers to public relations efforts by the Israeli settler project aimed at promoting a positive image of itself by whitewashing its military occupation, apartheid system and ongoing dispossession of Palestine.<br />
                <br /> Hasbara includes various forms of communication, such as media outreach, social media campaigns, and other strategies to shape public opinion in favour of the Israeli state, and involves manipulation of information, spreading propaganda, and stifling dissenting voices.</span>
    </div>

    <Footer />

    </>
    );
};

export default About;
