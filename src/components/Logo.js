import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () =>{
    return (
        <>
            <div className="logo-container relative w-72 mt-[0.35%] mobile:w-52 mobile:mt-[-2%] mobile:ml-0">
                <Link to="/">
                    <img src="https://files.hasbaratracker.com/ht-logo-with-slogan.svg" alt="In a pixellated font, the title reads: Hasbara Tracker - Debunking Israeli propaganda"></img>
                </Link>
            </div>
        </>
    );
}

export default Logo;
