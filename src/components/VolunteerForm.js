import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';
import MobileMenu from './MobileMenu';

import '../App.css';
import './VolunteerForm.css';

const VolunteerForm = () => {
    const initialFormData = {
        fullName: '',
        email: '',
        backgroundAndSkills: '',
        hoursCommitted: '',
        otherAmountOfHours: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // Check session storage on component mount
    useEffect(() => {
        const hasSubmitted = sessionStorage.getItem('hasSubmitted');
        if (hasSubmitted) {
            setIsSubmitted(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    
    // On submit, send data to a Google sheet
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const response = await fetch('https://script.google.com/macros/s/AKfycbxW-EKbkyQjHMby5HOp1kqf4R1E1YI3Ap9lWn7_TEzaQ6VHK0d_Scz5DTjwlEt2ga5W8g/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString(),
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                setIsSubmitted(true);
                sessionStorage.setItem('hasSubmitted', 'true'); // Set session storage flag
                setFormData(initialFormData);
            } else {
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    // Render the form
    return (
        <>
            <span className="header-container">
                <MobileMenu />
                <h1 className="ht-heading"><Link to="/">Hasbara Tracker</Link></h1>
                <span id="dots">. . . . . . . . . . . . . .</span>
                <NavBar />
            </span>

            <div className="content-container">
                <h2>Volunteer</h2>

                {/* If user has already submitted that session, prevent repeat submissions */}
                {isSubmitted ? (
                    <div className="thank-you-message">
                        Thank you for signing up to volunteer. We’ll get back to you as soon as we can. 🍉
                    </div>
                ) : (
                    <>
                        <div className="home-text">
                            Volunteer to help build a database tracking and debunking fabrications
                            by the Israeli state during its genocidal campaign against Palestinians
                            in Gaza since 7 October 2023.
                        </div><br />

                        <div className="home-text">
                            We will task volunteers with a specific claim and provide more
                            information about how to document and archive. Anyone can help —
                            especially if they have a propensity for research and collecting
                            receipts.
                        </div><br />

                        <form onSubmit={handleSubmit}>
                            <label>
                                Full name <span className="required-field">*</span>
                                <br />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    maxLength={50}
                                />
                            </label>
                            <br />

                            <label>
                                Email <span className="required-field">*</span>
                                <br />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    maxLength={50}
                                />
                            </label>
                            <br />
                            <label>
                                Tell us a little bit about your background and skills so we can match you with the right task. <span className="required-field">*</span>
                                <br />
                                <textarea
                                    name="backgroundAndSkills"
                                    value={formData.backgroundAndSkills}
                                    onChange={handleChange}
                                    maxLength={250}

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


                            {/* If they select 'Other', give option to enter hours */}
                            {formData.hoursCommitted === 'other' && (
                                <label>
                                    Enter an amount of hours.
                                    <br />
                                    <input
                                        type="text"
                                        name="otherAmountOfHours"
                                        value={formData.otherAmountOfHours}
                                        onChange={handleChange}
                                        maxLength={10}
                                    />
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
                                    maxLength={150}
                                />
                            </label>
                            <br />

                            {/* When submitting is loading, disable SUBMIT button */}
                            {isLoading ? (
                                <p>Submitting...</p>
                            ) : (
                                <button className="btn-green" type="submit" disabled={isSubmitted}>
                                    Submit
                                </button>
                            )}
                        </form>
                    </>
                )}
            </div>
        </>
    );
};

export default VolunteerForm;
