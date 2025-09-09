import React, { useState, useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';

import '../App.css';
import './VolunteerForm.css';

const VolunteerForm = () => {
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
        "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
        "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", 
        "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
        "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
        "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", 
        "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
        "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", 
        "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", 
        "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", 
        "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
        "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", 
        "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
        "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
        "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", 
        "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
        "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", 
        "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", 
        "Palestine (1948)", "Palestine (Gaza)", "Palestine (West Bank)", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
        "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
        "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
        "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
        "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
        "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", 
        "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", 
        "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
        "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
        "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", 
        "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    const professionalBackgroundOptions = [
        "Legal (lawyer, law student, legal research)",
        "Medical/Healthcare",
        "Education (teacher, academic, researcher)",
        "Engineering/Architecture",
        "Human Rights/NGO work",
        "Journalism/Media",
        "Government/Policy",
        "Business/Finance",
        "Arts/Creative industries",
        "Science/Research (academic)",
        "Technology/IT",
        "No specific professional background",
        "Other"
    ];

    const contributionOptions = [
        "Research & fact-checking",
        "Technical development (databases, websites)",
        "Content review & editing",
        "Data organization & archiving",
        "Social media monitoring",
        "Translation work",
        "OSINT investigation",
        "Analysis & report writing",
        "I'm flexible - assign me where needed"
    ];

    const languageOptions = [
        "English", "Spanish", "French", "German", "Italian", "Portuguese", "Dutch", 
        "Polish", "Swedish", "Norwegian", "Danish", "Finnish", "Czech", "Hungarian", 
        "Greek", "Romanian", "Ukrainian", "Arabic", "Hebrew", "Russian", "Chinese", 
        "Japanese", "Korean", "Turkish", "Hindi", "Other"
    ];

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        professionalBackground: [],
        otherProfessionalBackground: '',
        backgroundAndSkills: '',
        hoursCommitted: '',
        otherAmountOfHours: '',
        contributionTypes: [],
        languageSkills: [],
        otherLanguage: '',
        signUpForUpdates: false,
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

    const handleMultiSelectChange = (name, value) => {
        setFormData((prevData) => {
            const currentValues = prevData[name] || [];
            const updatedValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];
            
            return {
                ...prevData,
                [name]: updatedValues,
            };
        });
    };

    // Function to send admin notification email
    const sendAdminNotification = async (formData) => {
        const emailBody = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New volunteer » Hasbara Tracker</title>
            </head>
            <body style="font-family: Helvetica, Arial, sans-serif; line-height: 1.4; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #d6d6d6;">
                <!-- Header with Hasbara Tracker logo -->
                <div style="background-color: #d6d6d6; padding: 30px 20px; text-align: center; border-radius: 3px; margin-bottom: 20px;">
                    <img src="https://files.hasbaratracker.com/ht-logo-with-slogan.svg" 
                         alt="Hasbara Tracker - Debunking Israeli propaganda" 
                         style="max-width: 300px; width: 100%; height: auto;" />
                </div>
                
                <!-- Main content -->
                <div style="background: #d6d6d6; padding: 40px 30px; border-radius: 3px; border: 1px solid #cbcbcb;">
                    <h2 style="color: #333; margin-top: 0; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: normal;">
                        New volunteer
                    </h2>
                    
                    <p style="margin-bottom: 20px; font-size: 14px; line-height: 1.5;">
                        A new volunteer has signed up to Hasbara Tracker.
                    </p>
                    
                    <!-- Details -->
                    <div style="background: #d6d6d6; border: 1px solid #e0e0e0; border-radius: 3px; padding: 20px; margin: 25px 0;">
                        <h3 style="color: #333; margin-top: 0; font-size: 16px; font-weight: bold;">Volunteer Details:</h3>
                        <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                            <li><strong>Name:</strong> ${formData.firstName || ''} ${formData.lastName || ''}</li>
                            <li><strong>Email:</strong> ${formData.email || 'Not provided'}</li>
                            <li><strong>Location:</strong> ${formData.location || 'Not provided'}</li>
                            <li><strong>Professional Background:</strong> ${Array.isArray(formData.professionalBackground) ? formData.professionalBackground.join(', ') : 'Not provided'}${formData.otherProfessionalBackground ? ` (Other: ${formData.otherProfessionalBackground})` : ''}</li>
                            <li><strong>Background & Skills:</strong> ${formData.backgroundAndSkills || 'Not provided'}</li>
                            <li><strong>Hours Committed:</strong> ${formData.hoursCommitted || 'Not provided'}</li>
                            ${formData.otherAmountOfHours ? `<li><strong>Other Hours:</strong> ${formData.otherAmountOfHours}</li>` : ''}
                            <li><strong>How they want to contribute:</strong> ${Array.isArray(formData.contributionTypes) ? formData.contributionTypes.join(', ') : 'Not provided'}</li>
                            <li><strong>Language Skills:</strong> ${Array.isArray(formData.languageSkills) ? formData.languageSkills.join(', ') : 'Not provided'}${formData.otherLanguage ? ` (Other: ${formData.otherLanguage})` : ''}</li>
                            <li><strong>Signup Date:</strong> ${formData.dateTime || 'Not provided'}</li>
                        </ul>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div style="text-align: center; margin: 35px 0;">
                        <a href="https://docs.google.com/spreadsheets/d/1AGZDVaQKQvoSxruwZWquXQBCXmzYpnDavITt84TYjUk/edit" 
                           style="display: inline-flex; 
                                  justify-content: center;
                                  align-items: center;
                                  background-color: #bffb9b; 
                                  color: #333; 
                                  padding: 2.5% 3.5% 2.5% 3.5%;
                                  height: 0.5rem;
                                  text-decoration: none; 
                                  border-radius: 3px; 
                                  font-family: Helvetica, Arial, sans-serif; 
                                  font-size: 0.93em; 
                                  font-weight: normal;
                                  border: solid 0.5px #5e5e5e;
                                  min-width: 150px;
                                  margin: 0 10px 15px 0;">
                            View Google Sheet
                        </a>
                        
                        <a href="https://hasbaratracker.com/volunteers" 
                           style="display: inline-flex; 
                                  justify-content: center;
                                  align-items: center;
                                  background-color: #bffb9b; 
                                  color: #333; 
                                  padding: 2.5% 3.5% 2.5% 3.5%;
                                  height: 0.5rem;
                                  text-decoration: none; 
                                  border-radius: 3px; 
                                  font-family: Helvetica, Arial, sans-serif; 
                                  font-size: 0.93em; 
                                  font-weight: normal;
                                  border: solid 0.5px #5e5e5e;
                                  min-width: 150px;
                                  margin: 0 0 15px 10px;">
                            Assign Claims
                        </a>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="text-align: center; margin-top: 30px; padding: 20px; color: #595959; font-size: 12px;">
                    <p style="margin: 0;">
                        This notification was sent automatically from the form at <a href="hasbaratracker.com/volunteer" target="_blank">hasbaratracker.com/volunteer</a>.
                    </p>
                </div>
            </body>
            </html>
        `;

        const emailData = {
            to: 'info@hasbaratracker.com',
            subject: 'New Volunteer Signup - Hasbara Tracker',
            html: emailBody,
            text: `New Volunteer Signup\n\nA new volunteer has signed up:\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nLocation: ${formData.location}\nProfessional Background: ${Array.isArray(formData.professionalBackground) ? formData.professionalBackground.join(', ') : 'Not provided'}\nBackground & Skills: ${formData.backgroundAndSkills}\nHours: ${formData.hoursCommitted}\nContribution Types: ${Array.isArray(formData.contributionTypes) ? formData.contributionTypes.join(', ') : 'Not provided'}\nLanguages: ${Array.isArray(formData.languageSkills) ? formData.languageSkills.join(', ') : 'Not provided'}\nDate: ${formData.dateTime}`,
            from: 'notifications@hasbaratracker.com',
            type: 'notification'
        };

        // Use the same email worker endpoint that handles magic links
        const response = await fetch('https://email-worker.izumi-ky.workers.dev', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Email API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }

        return await response.json();
    };

    // Function to sign up user to MailerLite newsletter
    const signUpToMailerLite = async (firstName, lastName, email) => {
        try {

            const mailerLiteResponse = await fetch('https://assets.mailerlite.com/jsonp/855095/forms/114882690970289440/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'fields[name]': firstName,
                    'fields[last_name]': lastName,
                    'fields[email]': email,
                }).toString(),
            });

            if (mailerLiteResponse.ok) {
                return { success: true };
            } else {
                return { success: false };
            }
        } catch (error) {
            return { success: false };
        }
    };
    
    // On submit, send data to a Google sheet
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for required multi-select fields
        if (formData.professionalBackground.length === 0) {
            alert('Please select at least one professional/education background option.');
            return;
        }
        
        if (formData.contributionTypes.length === 0) {
            alert('Please select at least one way you would like to contribute.');
            return;
        }

        try {
            setIsLoading(true);

            // Get current date and time
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();

            // Include current date and time in form data and format arrays
            // Handle professional background - concatenate "Other" text with other selected options
            let professionalBackgroundValue = '';
            if (Array.isArray(formData.professionalBackground) && formData.professionalBackground.length > 0) {
                // Get all selected options except "Other"
                const selectedOptions = formData.professionalBackground.filter(option => option !== 'Other');
                let backgroundParts = [...selectedOptions];
                
                // If "Other" was selected, add the custom text
                if (formData.professionalBackground.includes('Other') && formData.otherProfessionalBackground) {
                    backgroundParts.push(formData.otherProfessionalBackground);
                }
                
                professionalBackgroundValue = backgroundParts.join(', ');
            }

            // Handle hours - use "Other" text input if "other" is selected
            const hoursValue = formData.hoursCommitted === 'other' 
                ? formData.otherAmountOfHours 
                : formData.hoursCommitted;

            const updatedFormData = {
                dateTime: formattedDate,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                location: formData.location,
                professionEducation: professionalBackgroundValue,
                backgroundAndSkills: formData.backgroundAndSkills,
                hoursCommitted: hoursValue,
                otherAmountOfHours: formData.otherAmountOfHours, // Keep this for compatibility
                contribution: Array.isArray(formData.contributionTypes) ? formData.contributionTypes.join(', ') : '',
                languages: (() => {
                    let languageParts = [];
                    if (Array.isArray(formData.languageSkills) && formData.languageSkills.length > 0) {
                        // Get all selected options except "Other"
                        const selectedLanguages = formData.languageSkills.filter(lang => lang !== 'Other');
                        languageParts = [...selectedLanguages];
                        
                        // If "Other" was selected, add the custom text
                        if (formData.languageSkills.includes('Other') && formData.otherLanguage) {
                            languageParts.push(formData.otherLanguage);
                        }
                    }
                    return languageParts.join(', ');
                })(),
                signedUpToEmail: formData.signUpForUpdates ? 'YES' : 'NO'
            };


            const response = await fetch('https://script.google.com/macros/s/AKfycby2hpFtciSrCZjBvGKZD4Zy8WjlhcggfteNdYsCdhWoMgKtW_yrlvp85QIcD3f8TI7QPA/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: new URLSearchParams(updatedFormData).toString(),
            });

            if (response.ok) {
                // Send admin notification email
                try {
                    await sendAdminNotification(updatedFormData);
                } catch (emailError) {
                    // Don't block form submission if email fails
                }

                // Sign up to MailerLite if checkbox is checked
                if (formData.signUpForUpdates) {
                    try {
                        await signUpToMailerLite(formData.firstName, formData.lastName, formData.email);
                    } catch (mailerLiteError) {
                        // Don't block form submission if MailerLite signup fails
                    }
                }
                
                setIsSubmitted(true);
                sessionStorage.setItem('hasSubmitted', 'true'); // Set session storage flag
                setFormData(initialFormData);
            } else {
                // Error submitting form
            }
        } catch (error) {
            // Error occurred
        } finally {
            setIsLoading(false);
        }
    };


    // Render the form
    return (
        <>
            <Header />

            <div className="content-container">
                <h2 className="subheading">Volunteer</h2>

                {/* If user has already submitted that session, prevent repeat submissions */}
                {isSubmitted ? (
                    <div className="thank-you-message">
                        Thank you for signing up to volunteer. We’ll get back to you as soon as we can.<br />
                        <br />
                        
                        Til liberation 🍉
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
                        </div>

                        <form className="mt-5" onSubmit={handleSubmit} acceptCharset="UTF-8">
                            <div className="flex gap-4 mb-9">
                                <label className="flex-1">
                                    <b>First name</b><span className="required-field">*</span>
                                    <br />
                                    <input
                                        className="w-full p-1 mt-[2.5%]"
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        maxLength={30}
                                    />
                                </label>
                                <label className="flex-1">
                                    <b>Last name</b><span className="required-field">*</span>
                                    <br />
                                    <input
                                        className="w-full p-1 mt-[2.5%]"
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        maxLength={30}
                                    />
                                </label>
                            </div>

                            <label>
                            <b>Email</b><span className="required-field">*</span>
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
                                <b>Location</b><span className="required-field">*</span>
                                <br />
                                <select
                                    className="w-full p-1 mt-[2.5%] mb-9"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select your country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br />

                            <label>
                                <b>Professional/Education Background</b><span className="required-field">*</span>
                                <br />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-[2.5%] mb-4 text-sm">
                                    {professionalBackgroundOptions.map((option) => (
                                        <label key={option} className="flex items-start gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                                            <input
                                                type="checkbox"
                                                checked={formData.professionalBackground.includes(option)}
                                                onChange={() => handleMultiSelectChange('professionalBackground', option)}
                                                className="mt-0.5 min-w-4 h-4"
                                            />
                                            <span className="text-sm">{option}</span>
                                        </label>
                                    ))}
                                </div>
                                {formData.professionalBackground.includes('Other') && (
                                    <div className="mt-2 mb-4">
                                        <label>
                                            <b>Please specify other professional background:</b>
                                            <input
                                                type="text"
                                                name="otherProfessionalBackground"
                                                value={formData.otherProfessionalBackground}
                                                onChange={handleChange}
                                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                                                maxLength={100}
                                                placeholder="Enter your professional background"
                                            />
                                        </label>
                                    </div>
                                )}
                            </label>
                            <br />

                            <label>
                            <b>Tell us a little bit about your background and skills so we can match you with the right task.</b><span className="required-field">*</span>
                                <br />
                                <textarea
                                    className="w-full p-5 mt-[2.5%] mb-9"
                                    name="backgroundAndSkills"
                                    value={formData.backgroundAndSkills}
                                    onChange={handleChange}
                                    maxLength={250}

                                />
                            </label>
                            <br />

                            <label>
                                <b>How many hours can you commit?</b>
                                <br />
                                <select
                                    className="w-full p-1 mt-[2.5%] mb-9"
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
                                <b>How would you like to contribute? (what you want to do)</b><span className="required-field">*</span>
                                <br />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-[2.5%] mb-9 text-sm">
                                    {contributionOptions.map((option) => (
                                        <label key={option} className="flex items-start gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                                            <input
                                                type="checkbox"
                                                checked={formData.contributionTypes.includes(option)}
                                                onChange={() => handleMultiSelectChange('contributionTypes', option)}
                                                className="mt-0.5 min-w-4 h-4"
                                            />
                                            <span className="text-sm">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </label>
                            <br />

                            <label>
                                <b>Language Skills</b>
                                <br />
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-[2.5%] mb-4 text-sm">
                                    {languageOptions.map((language) => (
                                        <label key={language} className="flex items-start gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                                            <input
                                                type="checkbox"
                                                checked={formData.languageSkills.includes(language)}
                                                onChange={() => handleMultiSelectChange('languageSkills', language)}
                                                className="mt-0.5 min-w-4 h-4"
                                            />
                                            <span className="text-sm">{language}</span>
                                        </label>
                                    ))}
                                </div>
                                {formData.languageSkills.includes('Other') && (
                                    <div className="mt-2 mb-4">
                                        <label>
                                            <b>Please specify other language:</b>
                                            <input
                                                type="text"
                                                name="otherLanguage"
                                                value={formData.otherLanguage}
                                                onChange={handleChange}
                                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                                                maxLength={50}
                                                placeholder="Enter language and proficiency level"
                                            />
                                        </label>
                                    </div>
                                )}
                            </label>
                            <br />
                            <br />

                            {/* Newsletter signup checkbox */}
                            <label className="flex items-start gap-3 mb-6">
                                <input
                                    type="checkbox"
                                    name="signUpForUpdates"
                                    checked={formData.signUpForUpdates}
                                    onChange={(e) => setFormData(prev => ({...prev, signUpForUpdates: e.target.checked}))}
                                    className="mt-1 min-w-4 h-4"
                                />
                                <span className="text-sm">
                                    <b>Sign up for news and updates from Hasbara Tracker</b><br />
                                    Get claims straight to your inbox. We'll use the name and email you entered above.
                                </span>
                            </label>

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

            <Footer />
        </>
    );
};

export default VolunteerForm;
