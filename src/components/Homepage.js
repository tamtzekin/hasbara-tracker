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
          <h1>Hasbara Tracker</h1>
          <span id="dots">. . . . . . . . . . . . . . .</span>

          {/* <div className="navbar">
            <Link to="/about" onClick={handleClick}>About</Link>
            <Link to="/claims" onClick={handleClick}>Claims</Link>
            <a href="">Volunteer</a>
          </div>

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
