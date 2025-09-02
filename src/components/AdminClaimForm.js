import React, { useState, useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';

import '../App.css';
import './VolunteerForm.css';

const AdminClaimForm = () => {
    const initialFormData = {
        fullName: '',
        email: '',
        claimTitle: '',
        date: '',
        claimText: '',
        claimTag: '',
        summary: '',
        details: '',
        sources: [{ sourceName: '', sourceLink: '', archiveLink: '' }]
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check session storage on component mount
    useEffect(() => {
        const hasSubmitted = sessionStorage.getItem('adminHasSubmitted');
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

    const handleSourceChange = (index, field, value) => {
        const newSources = [...formData.sources];
        newSources[index][field] = value;
        setFormData((prevData) => ({
            ...prevData,
            sources: newSources,
        }));
    };

    const addSource = () => {
        setFormData((prevData) => ({
            ...prevData,
            sources: [...prevData.sources, { sourceName: '', sourceLink: '', archiveLink: '' }],
        }));
    };

    const removeSource = (index) => {
        const newSources = formData.sources.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            sources: newSources,
        }));
    };

    // On submit, format claim data and save as JSON
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            // Format data to match the structure in data.js
            const claimData = {
                claimTitle: formData.claimTitle,
                date: formData.date,
                claim: {
                    claimText: formData.claimText,
                    claimTag: formData.claimTag,
                },
                description: {
                    summary: formData.summary,
                    details: formData.details,
                },
                sources: formData.sources.filter(source => source.sourceName && source.sourceLink),
                submittedBy: formData.fullName,
                submitterEmail: formData.email,
                submittedAt: new Date().toISOString(),
                status: 'pending'
            };

            // For demo purposes, log the JSON structure
            console.log('Admin Claim Data JSON:', JSON.stringify(claimData, null, 2));
            
            // In a real implementation, this would be sent to your backend API
            // Example: await fetch('/api/admin/claims/submit', { method: 'POST', body: JSON.stringify(claimData) });
            
            // Download as JSON file for demo
            const dataStr = JSON.stringify(claimData, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = `admin-claim-${Date.now()}.json`;
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();

            setIsSubmitted(true);
            sessionStorage.setItem('adminHasSubmitted', 'true');
            setFormData(initialFormData);
            
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnotherClaim = () => {
        setIsSubmitted(false);
        setIsLoading(false);
        sessionStorage.removeItem('adminHasSubmitted');
        setFormData(initialFormData);
    };

    // Render the form
    return (
        <>
            <Header />
            <div className="content-container">
                <h2 className="subheading">Admin - Submit Claim to Database</h2>

                {/* If user has already submitted that session, prevent repeat submissions */}
                {isSubmitted ? (
                    <>
                        <div className="thank-you-message">
                            Claim submitted successfully! The JSON file has been downloaded.<br />
                            <br />
                            Copy the JSON data and add it to your data.js file to publish the claim.
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
                            <strong>🔒 Admin CMS - Submit New Claim</strong><br />
                            Use this form to submit claims with full data structure matching the tracker format.
                            This form generates JSON that can be directly added to data.js.
                        </div>

                        <form className="mt-5" onSubmit={handleSubmit}>
                            <label>
                                <b>Admin Name</b><span className="required-field">*</span>
                                <input
                                    className="w-full p-1 mt-[2.5%] mb-9" 
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    maxLength={80}
                                />
                            </label>

                            <label>
                                <b>Admin Email</b><span className="required-field">*</span>
                                <input
                                    className="w-full p-1 mt-[2.5%] mb-9"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    maxLength={60}
                                />
                            </label>
                            
                            <label>
                                <b>Claim Title</b><span className="required-field">*</span>
                                <input
                                    className="w-full p-1 mt-[2.5%] mb-9"
                                    type="text"
                                    name="claimTitle"
                                    value={formData.claimTitle}
                                    onChange={handleChange}
                                    required
                                    maxLength={200}
                                />
                            </label>

                            <label>
                                <b>Date</b><span className="required-field">*</span>
                                <input
                                    className="w-full p-1 mt-[2.5%] mb-9"
                                    type="text"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. 10 Oct 2023"
                                />
                            </label>

                            <label>
                                <b>Claim Text</b><span className="required-field">*</span>
                                <input
                                    className="w-full p-1 mt-[2.5%] mb-9"
                                    type="text"
                                    name="claimText"
                                    value={formData.claimText}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Claim, Context, etc."
                                />
                            </label>

                            <label>
                                <b>Claim Tag</b><span className="required-field">*</span>
                                <input
                                    className="w-full p-1 mt-[2.5%] mb-9"
                                    type="text"
                                    name="claimTag"
                                    value={formData.claimTag}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. claim-tag, context-tag"
                                />
                            </label>

                            <label>
                                <b>Summary</b><span className="required-field">*</span>
                                <textarea
                                    className="w-full p-5 mt-[2.5%] mb-9"
                                    name="summary"
                                    value={formData.summary}
                                    onChange={handleChange}
                                    required
                                    maxLength={500}
                                    rows={3}
                                />
                            </label>

                            <label>
                                <b>Details</b><span className="required-field">*</span>
                                <textarea
                                    className="w-full p-5 mt-[2.5%] mb-9"
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    required
                                    maxLength={5000}
                                    rows={8}
                                />
                            </label>

                            <div>
                                <b>Sources</b><span className="required-field">*</span>
                                {formData.sources.map((source, index) => (
                                    <div key={index} className="mb-6 p-4 border border-gray-300 rounded">
                                        <h4 className="font-bold mb-2">Source {index + 1}</h4>
                                        <label>
                                            Source Name:
                                            <input
                                                className="w-full p-1 mt-1 mb-3"
                                                type="text"
                                                value={source.sourceName}
                                                onChange={(e) => handleSourceChange(index, 'sourceName', e.target.value)}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Source Link:
                                            <input
                                                className="w-full p-1 mt-1 mb-3"
                                                type="url"
                                                value={source.sourceLink}
                                                onChange={(e) => handleSourceChange(index, 'sourceLink', e.target.value)}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Archive Link:
                                            <input
                                                className="w-full p-1 mt-1 mb-3"
                                                type="url"
                                                value={source.archiveLink}
                                                onChange={(e) => handleSourceChange(index, 'archiveLink', e.target.value)}
                                            />
                                        </label>
                                        {formData.sources.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSource(index)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Remove Source
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSource}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mb-9"
                                >
                                    Add Another Source
                                </button>
                            </div>

                            {/* When submitting is loading, disable SUBMIT button */}
                            {isLoading ? (
                                <p>Generating JSON...</p>
                            ) : (
                                <button className="btn-green mt-9" type="submit" disabled={isSubmitted}>
                                    Generate Claim JSON
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

export default AdminClaimForm;