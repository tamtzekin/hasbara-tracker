import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
import GoogleForm from './GoogleForm';

import '../App.css';
import './VolunteerForm.css';


const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    backgroundAndSkills: '',
    hoursCommitted: '',
    otherAmountOfHours: '',
  });   

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle the form submission logic here, e.g., send data to a server
  //   console.log('Form submitted:', formData);
  //   // You can add further logic, such as sending the data to a server or clearing the form fields
  //   setFormData({
  //     fullName: '',
  //     email: '',
  //     backgroundAndSkills: '',
  //     hoursCommitted: '',
  //     otherAmountOfHours: '',
  //     languageSkill: '',
  //   });
  // };

  return (
    <>
      <span className="header-container">
        <MobileMenu />
        <h1 class="ht-heading"><Link to="/">Hasbara Tracker</Link></h1>
        <span id="dots">. . . . . . . . . . . . . .</span>
        <NavBar />
      </span>

      <div className="content-container">
        <h2>Volunteer</h2>

        <div class="home-text">
          Volunteer to help build a database tracking and debunking fabrications
          by the Israeli state during its genocidal campaign against Palestinians
          in Gaza since 7 October 2023.
        </div><br />

        <div class="home-text">
          We will task volunteers with a specific claim and provide more
          information about how to document and archive. Anyone can help —
          especially if they have a propensity for research and collecting
          receipts.
        </div><br />

        <div class="home-text">
        <GoogleForm />
        </div>
        

        {/* <form onSubmit={handleSubmit}>
          <label>
            Full name <span class="required-field">*</span>
            <br />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Email <span class="required-field">*</span>
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>

            Tell us a little bit about your background and skills so we can match you with the right task. <span class="required-field">*</span> 
            <br />
            <textarea
              name="backgroundAndSkills"
              value={formData.backgroundAndSkills}
              onChange={handleChange}
            />
          </label>
          <br />

          <label>
            How many hours can you commit?
            <br />
            <select
              name="hoursCommitted"
              value={formData.hoursCommitted}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="1">1 hour</option>
              <option value="1-3">1 -3 hours</option>
              <option value="3-5">3 - 5 hours</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br />

          {formData.hoursCommitted === 'other' && (
          <label>
            Enter an amount of hours.
            <br />
            <input
              type="text"
              name="otherAmountOfHours"
              value={formData.otherAmountOfHours}
              onChange={handleChange}            />
            <br /><br />
          </label>
          )}

          <label>
            This isn’t necessary, but do you understand Arabic and/or Hebrew? Let us know what level. 
            <input
              type="text"
              name="languageSkill"
              value={formData.languageSkill}
              onChange={handleChange}
            />
          </label>
          <br />
          <button class="btn-green" type="submit">Submit</button>
        </form> */}

      </div>
    </>
  );
};

export default VolunteerForm;
