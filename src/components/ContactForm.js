import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import '../App.css';
import './VolunteerForm.css';

const SubmitClaimForm = () => {
    const initialFormData = {
        fullName: '',
        email: '',
        message: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // Check session storage on component mount
    useEffect(() => {
        const hasSubmitted = sessionStorage.getItem('hasSubmitted');
        if (hasSubmitted) {
            setIsSubmitted(true);
            sessionStorage.removeItem('hasSubmitted'); // Clear session storage flag
        }
    }, []);

    // reset isSubmitted state on each page refresh
    useEffect(() => {
        setIsSubmitted(false);
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

            const response = await fetch('https://script.google.com/macros/s/AKfycbxzWa1PniI7sDkNvAhXR09Gf2967LOE1GlnxUOXG7VWjYkNGFOcdbJyHZ80WYpnAASXSw/exec', {
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
                setFormData(initialFormData); // Reset form data
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
                <h2 className="subheading">Contact us</h2>
                    <div className="home-text">
                        Leave your message below if you’d like to get in touch with the Hasbara Tracker team.
                    </div>
                    <br />

                    <form className="mt-5" onSubmit={handleSubmit}>
                        <label className="form-field font-semibold">
                            Name <span className="required-field">*</span>

                            <input
                                className="w-full p-1 mt-[2.5%] mb-9"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                maxLength={50}
                            />
                        </label>
                        <br />

                        <label className="form-field font-semibold w-full">
                            Email address<span className="required-field">*</span>
                            
                            <input
                                className="w-full p-1 mt-[2.5%] mb-9"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                maxLength={100}
                            />
                        </label>
                        <br />
                        
                        <label className="font-semibold">
                            Your message (max 500 words)<span className="required-field ">*</span><br />
                            
                            <textarea 
                                className="w-full p-5 mt-[2.5%] mb-9"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                // required 
                                maxLength={500}
                            />
                        </label>
                        <br />

                        {/* When submitting is loading, disable SUBMIT button */}
                        {isLoading ? (
                            <p>Submitting...</p>
                        ) : (
                            !isSubmitted && (
                            <button className="btn-green" type="submit">
                                Submit
                            </button>
                            )
                        )}
                    </form>

                    {isSubmitted && !isLoading && (
                <p>Thanks for your message. Til liberation 🍉</p>
            )}
            </div>
            <Footer />
        </>
    );
};

export default SubmitClaimForm;
