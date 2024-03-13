import React, { useState, useEffect } from 'react';

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

            const response = await fetch('https://script.google.com/macros/s/AKfycbxy7-eu3grhA1TQoVIMkiPtdjHFZz3Xz9gyuKuYMg93ujPoApXCWdu3OFarPxmDCEk/exec', {
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

    const handleAnotherClaim = () => {
        setIsSubmitted(false);
        setIsLoading(false);
        sessionStorage.removeItem('hasSubmitted'); // Clear session storage flag
        setFormData(initialFormData); // Reset the form data
    };

    // Render the form
    return (
        <>
            <Header />
            <div className="content-container">
                <h2 className="subheading">Submit a claim</h2>

                {/* If user has already submitted that session, prevent repeat submissions */}
                {isSubmitted ? (
                    <>
                        <div className="thank-you-message">
                            Thank you for submitting a claim. We’ll review it as soon as we can.<br />
                            <br />
                            
                            Til liberation 🍉
                        </div>

                        <button 
                            className="btn-green" 
                            style={{ 
                                marginTop: '3%', 
                                width: '25%', 
                            }}
                            onClick={handleAnotherClaim}>
                            Submit another claim
                        </button>
                    </>
                ) : (
                    <>
                        <div className="home-text">
                        Help us keep track of claims and fabrications by submitting a claim and/or example(s) of Israeli state propaganda – no matter how big or small – that we can potentially investigate.
                        </div>

                        <div className="home-text">
                        We’re building a centralised database debunking claims particularly made and/or repeated by officials, from individuals, organisations, to media outlet, particularly post 7 October 2023 while the Israeli occupation carries out a genocide in Gaza.
                        </div>

                        <div className="home-text">
                        If you've encountered any claims or fabrications that you believe warrant debunking, we encourage you to use the form below to submit them.</div>

                        <div className="home-text">
                        Thanks for contributing to our efforts to document, archive, debunk and give context to hasbara – a.k.a ‘explanations’.
                        </div>

                        <form className="mt-5" onSubmit={handleSubmit}>
                            <label>
                                <b>Full name</b><span className="required-field">*</span>
                                
                                <input
                                    className="w-full p-1 mt-[2.5%] mb-9" 
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    maxLength={30}
                                />
                            </label>

                            <label>
                                <b>Email address</b><span className="required-field">*</span>
                                <br />
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
                            
                            <label>
                                <b>What is the claim?</b><span className="required-field">*</span><br />
                                <em>Describe it briefly.</em>
                                <br />
                                <textarea
                                    className="w-full p-5 mt-[2.5%] mb-9"
                                    name="whatIsClaim"
                                    value={formData.whatIsClaim}
                                    onChange={handleChange}
                                    required
                                    maxLength={250}
                                />
                            </label>

                            <label>
                            <b>Where did you see it?</b><br />
                                <em>Provide information on where you encountered this claim if you are able to.</em>
                                <br />
                                <textarea
                                    className="w-full p-5 mt-[2.5%] mb-9"
                                    name="locationOfClaim"
                                    value={formData.locationOfClaim}
                                    onChange={handleChange}
                                    maxLength={250}
                                />
                            </label>
                            <br />


                            <label>
                               <b>Additional comments</b><br />
                                <em>Feel free to include any additional context or comments that might be helpful.</em>
                                <input
                                    className="w-full p-8 mt-[2.5%]"
                                    type="text"
                                    name="commentsAboutClaim"
                                    value={formData.commentsAboutClaim}
                                    onChange={handleChange}
                                    maxLength={250}
                                />
                            </label>
                            <br />

                            {/* When submitting is loading, disable SUBMIT button */}
                            {isLoading ? (
                                <p>Submitting...</p>
                            ) : (
                                <button className="btn-green mt-9" type="submit" disabled={isSubmitted}>
                                    Submit
                                </button>
                            )}
                        </form>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SubmitClaimForm;
