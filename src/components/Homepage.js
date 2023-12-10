import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

import About from './About';
import FilterDisplay from './FilterDisplay';

const Homepage = () => {
  const [showFilterDisplay, setShowFilterDisplay] = useState(false);

  const handleClick = () => {
    setShowFilterDisplay(true);
  };

  return (
    <>

<span class="header-container">
            <h1>Hasbara Tracker</h1>
                <span id="dots">. . . . . . . . . . . . . . .</span>
        </span>
        
        <span className="content-container">
            <h2>About</h2>
                We’re working on documenting and debunking claims made by the Israeli regime during its most recent – and unprecedented – genocidal campaign in Gaza since 7 Oct 2023. The Israeli settler-colony continues to spread disinformation to manufacture consent for ethnic cleansing and land theft, as it has since the Nakba. Our aim is to centralise this information.
                <br /><br /><br />

        <h2>Volunteer on this project</h2>

        Volunteer to help build a database tracking and debunking fabrications by the Israeli state during its current genocidal campaign against Palestinians in Gaza since 7 October 2023. We will task each volunteer with a specific claim and provide more information about how to document and archive. Anyone can help — especially if they have a propensity for research and collecting receipts.
        </span>

          {/* 

    {showFilterDisplay ? (
        <FilterDisplay />
      ) : (
        <>
          <About />

          <br />
        </>
      )} */}
    </>
  );
};

export default Homepage;
