import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () =>{
    return (
        <>
            <div className="relative w-72 l-4.3 -mt-14 mobile:w-full mobile:-mt-6 mobile:ml-0">
                <Link>
                <img src="https://files.hasbaratracker.com/ht-logo-with-slogan.svg" alt="In a pixellated font, the title reads: Hasbara Tracker - Debunking Israeli propaganda"></img>
                </Link>
            </div>
        </>
    );
}

export default Logo;
