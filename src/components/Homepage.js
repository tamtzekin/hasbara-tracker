import React from 'react';
import Header from './Header';
import ClaimsList from './ClaimsList';
import Footer from './Footer';
// import '../App.css';

const Homepage = () => {
    return (
    <>
        <Header />
        {/* On desktop: Display in columns */}
        <span className="hide-on-mobile">
        <div className="columns-container">
            <span class="column">
            <details>
            <summary><h2>About us<span class="expand-text"></span></h2></summary>
                <article>
                <span className="home-text">We’re working on documenting and debunking claims made by the Israeli regime during its most recent — and unprecedented — genocidal campaign in Gaza since 7 Oct, 2023. The Israeli settler-colony continues to spread disinformation to manufacture consent for ethnic cleansing and land theft, as it has since the Nakba. Our aim is to centralise this information.<br /><br /></span>
                </article>
                </details>
                <br />

                <details>
                <summary><h2>What is hasbara?<span class="expand-text"></span></h2></summary>
                <article>
                <span className="hasbara-about">‘Hasbara’ is a Hebrew term that translates to ‘explanation’ or ‘public relations’ in English. It refers to public relations efforts by the Israeli settler project aimed at promoting a positive image of itself by whitewashing its military occupation, apartheid system and ongoing dispossession of Palestine.<br />
                <br /> Hasbara includes various forms of communication, such as media outreach, social media campaigns, and other strategies to shape public opinion in favour of the Israeli state, and involves manipulation of information, spreading propaganda, and stifling dissenting voices.</span>
                </article>
                </details>
                </span>

        <span class="column">
            <ClaimsList />
            </span>
        </div>
        </span>

        {/* On mobile: One column only */}
        <span className="hide-on-desktop">
        <div class="content-container">
            <details className="expandable-text-homepage">
                <summary>
                    <h2>About us<span class="expand-text"></span></h2>
                </summary>
                    <article>
                        <span className="home-text">
                            We’re working on documenting and debunking claims made by the Israeli regime during its most recent — and unprecedented — genocidal campaign in Gaza since 7 Oct, 2023. The Israeli settler-colony continues to spread disinformation to manufacture consent for ethnic cleansing and land theft, as it has since the Nakba. Our aim is to centralise this information.
                        </span>
                    </article>
                    <br />
            </details>
            <br />

            <details className="expandable-text-homepage">
                <summary>
                    <h2>What is hasbara?<span class="expand-text"></span></h2>
                </summary>
                <article>
                    <span className="hasbara-about">
                        ‘Hasbara’ is a Hebrew term that translates to ‘explanation’ or ‘public relations’ in English. It refers to public relations efforts by the Israeli settler project aimed at promoting a positive image of itself by whitewashing its military occupation, apartheid system and ongoing dispossession of Palestine.<br />
                        <br />
                    
                        Hasbara includes various forms of communication, such as media outreach, social media campaigns, and other strategies to shape public opinion in favour of the Israeli state, and involves manipulation of information, spreading propaganda, and stifling dissenting voices.
                    </span>
                </article>
                <br />
            </details>

            <ClaimsList />
                <br />
        </div>
        </span>

        {/* <Footer /> */}
    </>
    );
};

export default Homepage;
