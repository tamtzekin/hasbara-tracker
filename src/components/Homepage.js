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
                <span id="dots">. . . . . . . . . . . . . . . </span>
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
