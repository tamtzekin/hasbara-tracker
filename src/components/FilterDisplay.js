import logo from '../logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './Homepage.css';

const FilterDisplay = () => {
    const filterItems = (category, event) => { // Pass the event as an argument
    // Get all items
    const items = document.querySelectorAll('.filtered-item');
  
    // Hide all items
    items.forEach((item) => {
        item.style.display = 'none';
    });
  
    // If the category is 'all', show all items
    if (category === 'all') {
        items.forEach((item) => {
            item.style.display = 'block';
        });
    
    } else {
    // Show only items with the selected category
        const selectedItems = document.querySelectorAll('.' + category);
        selectedItems.forEach((item) => {
            item.style.display = 'block';
        });
    }
  
    // Remove the 'active' class from all buttons
    document.querySelectorAll('button').forEach((button) => {
        button.classList.remove('active');
    });
  
    // Add the 'active' class to the clicked button
        event.target.classList.add('active');
    };
  
  
    return (
    <>
        <span class="header-container">
            <h1 class="ht-heading">Hasbara Tracker</h1>
            <span id="dots">. . . . . . . . . . . . . .</span>
            <NavBar />
        </span>

    <span class="content-container">
        <br />
        <h2>Claims</h2>
        <br />

        Forty beheaded babies
    

        </span>
        </>
  
  
    );
  };

  export default FilterDisplay;
  