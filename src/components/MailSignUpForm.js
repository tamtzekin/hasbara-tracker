import React, { useState, useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';

const MailSignUpForm = () => {

    const initialFormData = {
        firstName: '',
        lastName: '',
        emailAddress: '',
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
    

        // On submit, send to MailerLite
        const handleSubmit = async (e) => {
            e.preventDefault();
        
            try {
                setIsLoading(true);
        
                // MailerLite form submission
                const mailerLiteResponse = await fetch('https://assets.mailerlite.com/jsonp/855095/forms/114882690970289440/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        'fields[name]': formData.firstName,
                        'fields[last_name]': formData.lastName,
                        'fields[email]': formData.emailAddress,
                    }).toString(),
                });
        
                if (mailerLiteResponse.ok) {
                    console.log('MailerLite form submitted successfully');
                    setIsSubmitted(true);
                    sessionStorage.setItem('hasSubmitted', 'true'); // Set session storage flag
                    setFormData(initialFormData); // Reset form data
                } else {
                    console.error('Error submitting MailerLite form');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };
    

    return (
        <>
            <Header />

            <div className="content-container">
                <h2 className="subheading">News and updates</h2>
                    <div className="home-text">
                        Sign up for news + updates from Hasbara Tracker and get claims straight to your inbox.
                    </div>
                    <br />

                    <form onSubmit={handleSubmit} class="mt-8">
                        <label className="form-field font-semibold">
                            First name <span className="required-field">*</span>

                            <input
                                className="w-full p-1 mt-[2.5%] mb-9"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                maxLength={20}

                                aria-label="name" 
                                aria-required="true" 
                                data-inputmask="" 
                                placeholder="" 
                                autocomplete="given-name"
                            />
                        </label>
                        <br />

                        <label className="form-field font-semibold">
                            Last name <span className="required-field">*</span>
                            <input
                                className="w-full p-1 mt-[2.5%] mb-9"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                maxLength={20}

                                aria-label="last_name" 
                                aria-required="true"
                                data-inputmask=""  
                                placeholder="" 
                                autocomplete="family-name"
                            />
                        </label>
                        <br />

            {/* TODO: The issue is with how the name= value is handled */}
                        <label className="form-field font-semibold w-full">
                            Email<span className="required-field">*</span>
                            
                            <input
                                className="w-full p-1 mt-[2.5%] mb-9"
                                type="email"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleChange}
                                required
                                maxLength={20}

                                aria-label="email"
                                aria-required="true" 
                                data-inputmask=""
                                placeholder=""
                                autocomplete="email"
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
                <p>Thank you for signing up to Hasbara Tracker. We’re working on documenting and debunking claims made by the Israeli state during its most recent — and unprecedented — genocidal campaign in Gaza since 7 Oct, 2023.</p>
            )}
            </div>
            <Footer />
        </>



    )
}
export default MailSignUpForm;
