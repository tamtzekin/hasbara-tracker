import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import '../App.css';
import './VolunteerForm.css';

const SubmitClaimForm = () => {
    const initialFormData = {
        fullName: '',
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

            const response = await fetch('https://script.google.com/macros/s/AKfycbxMo-T1Oe5G-ws9czcMhPoLKOC1o_uhilHh80yz1kr4gDdCdp-UC7iTrpWEqBMDjrxI/exec', {
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
            <Header />

            <div className="content-container">
                <h2>Contact us</h2>
                    <div className="home-text">
                        Let us know any suggestions, your thoughts, questions, or other ways you’d like to help.
                    </div>
                    <br />

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
                                maxLength={30}
                            />
                        </label>
                        <br />

                        <label>
                            Email address<span className="required-field">*</span>
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
                            Let us know your thoughts.<span className="required-field">*</span><br />
                            
                            <textarea
                                name="query"
                                value={formData.whatIsClaim}
                                onChange={handleChange}
                                required
                                maxLength={350}
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
            </div>
            
            <div className="footer-contianer">
                    <Footer />
                </div>
            
        </>
    );
};

export default SubmitClaimForm;
