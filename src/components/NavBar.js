import React from 'react';
import {  Link } from "react-router-dom";
import '../App.css';

const NavBar= () =>{
  return (
  <div class="navbar">
    <li>
      <Link to="/about">About</Link>
    </li>

    <li>
      <Link to="/claims">Claims</Link>
    </li>

    <li>
        <Link to="/volunteer">Volunteer</Link>
    </li>
  </div>
  );
}
export default NavBar;