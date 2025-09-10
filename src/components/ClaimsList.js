import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { summaries } from './data';

const ClaimsList = () => {
    const [publishedClaims, setPublishedClaims] = useState([]);

    useEffect(() => {
        // Function to get published claims
        const getPublishedClaims = () => {
            const claims = summaries
                .filter(summary => {
                    if (!summary.claimMainTitle || summary.claimMainTitle.trim() === '') return false;
                    
                    // Check if claim is marked as PUBLISHED in localStorage
                    const status = localStorage.getItem(`claim_status_${summary.claimMainTitle}`);
                    return status === 'PUBLISHED';
                })
                .sort((a, b) => {
                    // Remove quotes for sorting (same logic as Claims Editor)
                    const titleA = a.claimMainTitle.replace(/^['"]|['"]$/g, '');
                    const titleB = b.claimMainTitle.replace(/^['"]|['"]$/g, '');
                    return titleA.localeCompare(titleB);
                });
            
            setPublishedClaims(claims);
        };

        // Initial load
        getPublishedClaims();

        // Listen for storage changes to update when claims are published/unpublished
        const handleStorageChange = () => {
            getPublishedClaims();
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Also listen for a custom event we'll trigger from the Claims Editor
        window.addEventListener('claimsUpdated', handleStorageChange);

        // Cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('claimsUpdated', handleStorageChange);
        };
    }, []);

    // Function to get custom URL or fallback to slug
    const getClaimUrl = (summary) => {
        return summary.customUrl || summary.claimMainTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    };

    return (
        <>
            <h2 className="subheading mb-1 mobile:mb-4">Claims</h2>

            {publishedClaims.map((summary, index) => (
                <Link 
                    key={index} 
                    to={`/${getClaimUrl(summary)}`}
                >
                    <div className="claim-link">
                        {summary.claimMainTitle}
                    </div>
                </Link>
            ))}

            <div className="claim-coming-soon">+ more coming soon</div>
        </>
    )
}

export default ClaimsList;
