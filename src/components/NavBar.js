import React from 'react';
import {  Link } from "react-router-dom";
import '../App.css';

const NavBar= () =>{
  return (
    
  <div class="navbar">
    <li>
      <Link to="/homepage">Home</Link>
    </li>

    <li>
      <Link to="/tracker">Tracker</Link>
    </li>

    <li>
        <Link to="/volunteer">Volunteer</Link>
    </li>
  </div>
  );
}
export default NavBar;
