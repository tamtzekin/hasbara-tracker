import React from 'react';
import Header from './Header';
import ClaimsList from './ClaimsList';
import Footer from './Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// import '../App.css';

const Homepage = () => {
    return (
        <HelmetProvider>
        <>
        <Helmet>
            {/* HTML meta tags */}
            {/* Important metadata */}
            <meta name="url" property="og:url" content="https://hasbaratracker.com/" />
            <meta name="type" property="og:type" content="article" />
            <meta name="site_name" property="og:site_name" content="Hasbara Tracker" />
            <title>Hasbara Tracker</title>
            <meta name="title" property="og:title" content="Hasbara Tracker" />
            <meta name="description" property="og:description" content="A database tracking and debunking fabrications by the Israeli state during its current genocidal campaign against Palestinians in Gaza since 7 October 2023." />
            <meta name="image" property="og:image" content="https://files.hasbaratracker.com/htlogo_twittercard.jpg" />
            
            <meta property="twitter:image:alt" content="In a pixellated font, the title reads: Hasbara Tracker - Debunking Israeli propaganda" />

            {/* Twitter link preview metadata */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@hasbaratracker" />
            <meta name="twitter:title" content="Hasbara Tracker" />
            <meta name="twitter:creator" content="@hasbaratracker" />
            <meta name="twitter:description" content="A database tracking and debunking fabrications by the Israeli state during its current genocidal campaign against Palestinians in Gaza since 7 October 2023." />
            <meta name="twitter:image" content="https://files.hasbaratracker.com/htlogo_twittercard.jpg" />
            <meta property="twitter:url" content="https://hasbaratracker.com/" />
            <meta property="twitter:domain" content="hasbaratracker.com" />
        </Helmet>

        <Header />

        {/* 1-column view */}
        <span className="laptop:hidden">
            <div className="content-container">
                <details className="expandable-text-homepage">
                <summary><h2 className="subheading">About us<span className="expand-text"></span></h2></summary>

                <article className="">
                <span className="home-text">
                    We’re working on documenting and debunking claims made by the Israeli regime during its most recent — and unprecedented — genocidal campaign in Gaza since 7 Oct, 2023. The Israeli settler-colony continues to spread disinformation to manufacture consent for ethnic cleansing and land theft, as it has since the Nakba. Our aim is to centralise this information.
                </span>
                </article>
            </details>

                <details className="expandable-text-homepage">
                    <summary><h2 className="subheading">What is hasbara?<span className="expand-text"></span></h2></summary>

                    <article className="">
                    <span className="hasbara-about">
                        ‘Hasbara’ is a Hebrew term that translates to ‘explanation’ or ‘public relations’ in English. It refers to public relations efforts by the Israeli settler project aimed at promoting a positive image of itself by whitewashing its military occupation, apartheid system and ongoing dispossession of Palestine.<br />
                        <br />
                        
                        Hasbara includes various forms of communication, such as media outreach, social media campaigns, and other strategies to shape public opinion in favour of the Israeli state, and involves manipulation of information, spreading propaganda, and stifling dissenting voices.
                    </span>
                    </article>
                </details>

                <ClaimsList />
            <br />
            </div>
        </span>



        {/* 2-column view */}
        <span className="mobile:hidden hide-on-tablet">
            <div className="columns-container">
                <span className="column">
                    <details>
                    
                    <summary><h2 className="subheading">About us<span className="expand-text"></span></h2></summary>

                    <article>
                    <span className="home-text">
                        We’re working on documenting and debunking claims made by the Israeli regime during its most recent — and unprecedented — genocidal campaign in Gaza since 7 Oct, 2023. The Israeli settler-colony continues to spread disinformation to manufacture consent for ethnic cleansing and land theft, as it has since the Nakba. Our aim is to centralise this information.<br /></span>
                    </article>
                    </details>
                    <br />

                    <details>

                    <summary><h2 className="subheading">What is hasbara?<span className="expand-text"></span></h2></summary>
                    
                    <article>
                    <span className="hasbara-about">
                        ‘Hasbara’ is a Hebrew term that translates to ‘explanation’ or ‘public relations’ in English. It refers to public relations efforts by the Israeli settler project aimed at promoting a positive image of itself by whitewashing its military occupation, apartheid system and ongoing dispossession of Palestine.<br />
                        <br /> 
                    
                        Hasbara includes various forms of communication, such as media outreach, social media campaigns, and other strategies to shape public opinion in favour of the Israeli state, and involves manipulation of information, spreading propaganda, and stifling dissenting voices.
                        </span>
                    </article>

                    </details>
                    </span>

                    <span className="column">
                        <ClaimsList />
                    </span>
            </div>
        </span>

        <Footer />
    </>
    </HelmetProvider>
    );
};

export default Homepage;
