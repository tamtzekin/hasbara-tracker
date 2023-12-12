import logo from '../logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
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
        </span>

    <span class="content-container">
        <br />
        <h2>Claims</h2>
        <br />
        
    <div class="filters">
        {/* Filters */}
        <button class="dotted-button" onClick={(event) => filterItems('all', event)}>*ALL*</button>
        <button onClick={(event) => filterItems('oct7', event)}>Oct 7</button>
        <button onClick={(event) => filterItems('death', event)}>Death</button>
        <button onClick={(event) => filterItems('hospitals', event)}>Hospitals</button>
        <button onClick={(event) => filterItems('alahli', event)}>Al Ahli</button>
        <button onClick={(event) => filterItems('fabricatedav', event)}>Fabricated audio and video</button>
        <button onClick={(event) => filterItems('pallywood', event)}>Pallywood</button>
        <button onClick={(event) => filterItems('documents', event)}>Documents and items</button>
        {/* <button onClick={(event) => filterItems('category3', event)}>Category 3</button> */}
  
        {/* Items to filter */}
        <div className="filtered-item oct7 death"><Link to="/claim-a">Claim: Forty beheaded babies</Link></div>
        <div className="filtered-item oct7 investigating">Claim: Fetus removed from pregnant woman</div>
        <div className="filtered-item oct7 investigating">Claim: Babies hung on clotheslines</div>
        <div className="filtered-item oct7 investigating">Claim: ‘Little Mary Janes’ and pink blood</div>
        <div className="filtered-item oct7 documents investigating">Claim: Hamas left an ISIS flag</div>
  
        <div className="filtered-item death investigating">Claim: Revisions of number of Israelis killed</div>
  
        <div className="filtered-item hospitals investigating">Claim: Israeli president denies it is striking Al-Shifa hospital</div>
        <div className="filtered-item hospitals investigating">Claim: Hamas tunnel found at the Qatari Hospital</div>
  
        <div className="filtered-item alahli hospitals investigating">Claim: Al-Ahli Hospital was hit by stray Islamic Jihad rockets fired from a cemetery</div>
  
        <div className="filtered-item fabricatedav hospitals alahli investigating">Claim: Hamas operatives discussing Palestinian Islamic Jihad's responsibility for the al-Ahli Arab Baptist Hospital massacre</div>
          
        <div className="filtered-item fabricatedav investigating">Claim: Nurse at Al-Shifa Hospital blaming Hamas</div>
        
        <div className="filtered-item pallywood investigating">Claim: Dead Palestinian children are dolls</div>
        <div className="filtered-item pallywood investigating">Claim: Saleh Aljafarawi is a propagandist / Mr FAFO</div>
  
        <div className="filtered-item documents investigating">Claim: Isaac Herzog says Mein Kampf found in child's bedroom</div>
    </div>
        {/* Filtering logic, if needed */}
        {/* <script>
        {`
            function filterItems(category, event) {
            // Your filtering logic here
            }
        `}
        </script> */}
</span>
        </>
  
  
    );
  };

  export default FilterDisplay;
  