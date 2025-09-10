import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { HelmetProvider } from 'react-helmet-async';
import { useLocation, NavLink } from 'react-router-dom';

// Page components
import '../App.css';
import './Tracker.css';
import PageMetadata from './PageMetadata';
import MobileMenu from './MobileMenu';
import Logo from './Logo';
import NavLinks from './NavLinks';
import Footer from './Footer';
import BackToTop from './BackToTop';
import Header from './Header';
import { data, summaries } from './data';
import { useAuth } from '../contexts/AuthContext';

// Add CSS animations for fade effects
const animationStyles = `
@keyframes fadeInTable {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Arrow-style publication flow buttons */
.publication-flow {
    display: flex;
    align-items: center;
    gap: 0;
}

.flow-button {
    position: relative;
    padding: 8px 20px;
    font-weight: bold;
    font-size: 13px;
    border: 1px solid #000;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0;
    min-width: 130px;
    text-align: center;
    color: #333;
    background-color: #d1d5db;
    border-left: 3px solid #9ca3af;
}

.flow-button:first-child {
    border-radius: 8px 0 0 8px;
    padding-right: 30px;
}

.flow-button:last-child {
    border-radius: 0 8px 8px 0;
    padding-left: 30px;
}

.flow-button:not(:first-child):not(:last-child) {
    padding: 8px 30px;
}

.flow-button::after {
    content: '';
    position: absolute;
    top: -1px;
    right: -16px;
    width: 0;
    height: 0;
    border-left: 16px solid #d1d5db;
    border-top: 19px solid transparent;
    border-bottom: 19px solid transparent;
    z-index: 2;
    transition: all 0.3s ease;
}

.flow-button::before {
    content: '';
    position: absolute;
    top: -1px;
    right: -17px;
    width: 0;
    height: 0;
    border-left: 17px solid #000;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    z-index: 1;
}

.flow-button:last-child::after,
.flow-button:last-child::before {
    display: none;
}

/* Hover states - fade in colors */
.flow-button.in-progress:hover {
    background-color: #b7fbf3;
    border-left-color: #2dd4bf;
}

.flow-button.in-progress:hover::after {
    border-left-color: #b7fbf3;
}

.flow-button.review:hover {
    background-color: #fac798;
    border-left-color: #f4a261;
}

.flow-button.review:hover::after {
    border-left-color: #fac798;
}

.flow-button.ready:hover {
    background-color: #bffb9b;
    border-left-color: #a8e063;
}

.flow-button.ready:hover::after {
    border-left-color: #bffb9b;
}

.flow-button.published:hover {
    background-color: #78ff96;
    border-left-color: #52c93f;
}

.flow-button.published:hover::after {
    border-left-color: #78ff96;
}

/* Active states - when status is current */
.flow-button.in-progress.active {
    background-color: #b7fbf3;
    border-left-color: #2dd4bf;
}

.flow-button.in-progress.active::after {
    border-left-color: #b7fbf3;
}

.flow-button.review.active {
    background-color: #fac798;
    border-left-color: #f4a261;
}

.flow-button.review.active::after {
    border-left-color: #fac798;
}

.flow-button.ready.active {
    background-color: #bffb9b;
    border-left-color: #a8e063;
}

.flow-button.ready.active::after {
    border-left-color: #bffb9b;
}

.flow-button.published.active {
    background-color: #78ff96;
    border-left-color: #52c93f;
}

.flow-button.published.active::after {
    border-left-color: #78ff96;
}

.flow-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Disabled state */
.flow-button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

.flow-button.disabled::after {
    border-left-color: #d1d5db;
}

.flow-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}
`;

// Helper function to format date as "9 Nov 2023"
const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Custom dropdown component with status colors
const CustomDropdown = ({ value, onChange, options, statusColors }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = React.useRef(null);
    
    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const getStatusColor = (title) => {
        if (!title || title === '' || title === 'CREATE_NEW') return '#ffffff';
        const status = localStorage.getItem(`claim_status_${title}`) || 'UNASSIGNED';
        return statusColors[status] || statusColors['UNASSIGNED'];
    };

    return (
        <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: getStatusColor(value),
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <span>{value === 'CREATE_NEW' ? '+ CREATE NEW CLAIM' : (value || '-- Select a claim to edit --')}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>▼</span>
            </div>
            
            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        borderRadius: '0 0 4px 4px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        zIndex: 1000
                    }}
                >
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            style={{
                                padding: '8px 12px',
                                backgroundColor: getStatusColor(option.value),
                                cursor: 'pointer',
                                fontSize: '14px',
                                borderBottom: '1px solid #eee',
                                ':hover': { backgroundColor: '#f0f0f0' }
                            }}
                            onMouseEnter={(e) => {
                                if (option.value !== '' && option.value !== 'CREATE_NEW') {
                                    e.target.style.filter = 'brightness(0.9)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.filter = 'brightness(1)';
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Animated message component with fade-in animation
const AnimatedMessage = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <span style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
        }}>
            {message}
        </span>
    );
};

// Initialize draft data storage (try to load from saved draft first)
let draftData = [...data];
let draftSummaries = [...summaries];

// Try to load previously saved draft
try {
    const savedDraft = localStorage.getItem('hasbaratracker_draft_save');
    if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        const savedDraftData = parsed.draftData || [...data];
        const savedDraftSummaries = parsed.draftSummaries || [...summaries];
        
        // Merge new claims from data.js that aren't in the saved draft
        const savedClaimTitles = new Set(savedDraftSummaries.map(s => s.claimMainTitle));
        const newSummaries = summaries.filter(s => !savedClaimTitles.has(s.claimMainTitle));
        
        const savedDataTitles = new Set(savedDraftData.map(d => d.claimTitle));
        const newDataEntries = data.filter(d => !savedDataTitles.has(d.claimTitle));
        
        draftData = [...savedDraftData, ...newDataEntries];
        draftSummaries = [...savedDraftSummaries, ...newSummaries];
        
        console.log('📝 Loaded previously saved draft from', new Date(parsed.savedAt).toLocaleString());
        console.log(`🔄 Merged ${newSummaries.length} new summaries and ${newDataEntries.length} new data entries from data.js`);
    }
} catch (error) {
    console.warn('Failed to load saved draft, using fresh copy of data:', error);
}

// Function to save new claim to draft (not live data)
const saveNewClaimToDraft = (claimTitle, claimSummary, customUrl = '') => {
    // Create the new summary object
    const newSummary = {
        claimMainTitle: claimTitle,
        claimSummary: claimSummary,
        customUrl: customUrl || claimTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    };
    
    // Create the default claim object structure
    const newClaimObject = {
        claimTitle: claimTitle,
        date: '',
        claim: {
            claimText: '',
            claimTag: '',
        },
        description: {
            summary: claimSummary,
            details: '',
        },
        sources: [
            {
                sourceName: '',
                sourceLink: '',
                archiveLink: '',
                videoPreviewLink: '',
            }
        ],
        isDraft: true,
        lastEditedBy: 'current_user',
        lastEditedAt: new Date().toISOString()
    };
    
    // Add to the draft data arrays (in production, this would be saved to draft.js file)
    draftData.push(newClaimObject);
    draftSummaries.push(newSummary);
    
    console.log('New claim added to DRAFT:', newClaimObject);
    console.log('New summary added to DRAFT:', newSummary);
    
    return newClaimObject;
};

// Function to save current state as draft (without publishing)
const saveDraft = () => {
    try {
        // Save current draft state to localStorage with timestamp
        const draftSave = {
            draftData: draftData,
            draftSummaries: draftSummaries,
            savedAt: new Date().toISOString(),
            version: Date.now()
        };
        
        localStorage.setItem('hasbaratracker_draft_save', JSON.stringify(draftSave));
        console.log('📝 Draft saved to local storage');
        return true;
    } catch (error) {
        console.error('❌ Error saving draft:', error);
        throw error;
    }
};

// Function to publish draft data to live data.js (only for selected claim)
const publishDraftToLive = async (claimTitle) => {
    if (!claimTitle) {
        throw new Error('No claim selected for publishing');
    }
    
    try {
        // Only publish data for the selected claim
        const selectedClaimData = draftData.filter(item => item.claimTitle === claimTitle);
        const selectedClaimSummary = draftSummaries.find(summary => summary.claimMainTitle === claimTitle);
        
        if (selectedClaimData.length === 0) {
            throw new Error(`No draft data found for claim: "${claimTitle}"`);
        }
        
        if (!selectedClaimSummary) {
            throw new Error(`No summary found for claim: "${claimTitle}"`);
        }
        
        // Prepare the data to send to the server (just the claim title)
        const payload = {
            claimTitle: claimTitle
        };

        // Debug: Log the payload being sent
        console.log('📤 Publishing claim:', claimTitle);

        // Write claim to data.js and mark as PUBLISHED
        const response = await fetch('http://localhost:3001/api/write-to-datajs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'add_claim',
                claimTitle: claimTitle,
                summary: selectedClaimSummary,
                data: selectedClaimData.map(item => ({ ...item, isDraft: false }))
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Publish API error response:', errorData);
            console.error('Response status:', response.status);
            throw new Error(errorData.error || 'Failed to publish data');
        }

        const result = await response.json();
        
        // Mark as PUBLISHED in localStorage so it appears in ClaimsList
        localStorage.setItem(`claim_status_${claimTitle}`, 'PUBLISHED');
        
        // Trigger update for ClaimsList
        window.dispatchEvent(new CustomEvent('claimsUpdated'));
        
        console.log(`✅ Claim "${claimTitle}" successfully published to data.js and marked as PUBLISHED`);
        return result;
    } catch (error) {
        console.error('❌ Error publishing draft data:', error);
        
        // Check if it's a network error (server not running)
        if (error.message.includes('fetch')) {
            throw new Error('Cannot connect to server. Make sure the server is running with "npm run server"');
        }
        
        throw error;
    }
};


// Function to delete claim from both draft and live data
const deleteClaimCompletely = async (claimTitle) => {
    if (!claimTitle) {
        throw new Error('No claim selected for deletion');
    }
    
    try {
        // Remove from draft data
        const filteredDraftData = draftData.filter(item => item.claimTitle !== claimTitle);
        const filteredDraftSummaries = draftSummaries.filter(summary => summary.claimMainTitle !== claimTitle);
        
        // Update draft arrays
        draftData.length = 0;
        draftSummaries.length = 0;
        draftData.push(...filteredDraftData);
        draftSummaries.push(...filteredDraftSummaries);
        
        // Remove from live data
        const filteredLiveData = data.filter(item => item.claimTitle !== claimTitle);
        const filteredLiveSummaries = summaries.filter(summary => summary.claimMainTitle !== claimTitle);
        
        // Update live arrays
        data.length = 0;
        summaries.length = 0;
        data.push(...filteredLiveData);
        summaries.push(...filteredLiveSummaries);
        
        // Send DELETE request to server to update data.js file
        const response = await fetch('http://localhost:3001/api/write-to-datajs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete_claim',
                claimTitle: claimTitle
            })
        });

        if (!response.ok) {
            let errorMessage = 'Failed to delete claim from server';
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            } catch (parseError) {
                // If JSON parsing fails, use response text
                const errorText = await response.text();
                errorMessage = `Server error (${response.status}): ${errorText.substring(0, 200)}`;
            }
            throw new Error(errorMessage);
        }

        // Remove from localStorage
        localStorage.removeItem(`claim_status_${claimTitle}`);
        localStorage.removeItem(`review_data_${claimTitle}`);
        localStorage.removeItem(`ready_data_${claimTitle}`);
        
        // Trigger update for ClaimsList to remove it from homepage
        window.dispatchEvent(new CustomEvent('claimsUpdated'));
        
        // Save draft after deletion
        saveDraft();
        
        console.log(`✅ Claim "${claimTitle}" completely deleted from system`);
        return { success: true };
        
    } catch (error) {
        console.error('❌ Error deleting claim:', error);
        throw error;
    }
};

// Function to update claim summary and custom URL - DIRECTLY writes to data.js
const updateClaimSummaryAndUrl = async (claimTitle, newSummary, newUrl) => {
    try {
        console.log('🔧 updateClaimSummaryAndUrl called with:', {
            claimTitle,
            newSummary: newSummary?.substring(0, 50) + '...',
            newUrl
        });
        
        const updatedSummary = {
            claimMainTitle: claimTitle,
            claimSummary: newSummary,
            customUrl: newUrl || claimTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        };
        
        console.log('📦 Sending to server:', updatedSummary);

        // Send directly to server to write to data.js
        const response = await fetch('http://localhost:3001/api/write-to-datajs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'update_summary',
                claimTitle: claimTitle,
                summary: updatedSummary
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update data.js: ${errorText}`);
        }

        // Update in-memory data to match what's now in data.js
        const summaryIndex = summaries.findIndex(s => s.claimMainTitle === claimTitle);
        if (summaryIndex !== -1) {
            summaries[summaryIndex] = updatedSummary;
        } else {
            summaries.push(updatedSummary);
        }

        // Update draft summaries to stay in sync - create new array to trigger React updates
        const draftIndex = draftSummaries.findIndex(s => s.claimMainTitle === claimTitle);
        if (draftIndex !== -1) {
            draftSummaries[draftIndex] = { ...updatedSummary };
        } else {
            draftSummaries.push({ ...updatedSummary });
        }
        
        // Force React to recognize the array change by creating new reference
        const newDraftSummaries = [...draftSummaries];
        draftSummaries.length = 0;
        draftSummaries.push(...newDraftSummaries);
        
        // Trigger ClaimsList update event for homepage sync
        window.dispatchEvent(new CustomEvent('claimsUpdated'));
        
        // Force component re-render by updating data version
        window.dispatchEvent(new CustomEvent('dataUpdated'));
        
        console.log(`✅ Updated summary and URL for "${claimTitle}" directly in data.js`);
        return true;
        
    } catch (error) {
        console.error('❌ Error updating summary and URL:', error);
        alert(`❌ Error updating summary: ${error.message}`);
        return false;
    }
};


// Helper function to send email notifications for review/approval actions only
const sendEmailNotification = async (action, claimTitle, userEmail, additionalData = {}) => {
    try {
        // Only send emails for these specific actions
        if (!['Sent to Review', 'Ready to Publish'].includes(action)) {
            return;
        }
        
        const currentTime = new Date().toLocaleString();
        const actionColor = action === 'Sent to Review' ? '#ff9500' : '#16a34a';
        const actionIcon = action === 'Sent to Review' ? '📝' : '✅';
        
        // Convert screenshot file to base64 if provided
        let screenshotBase64 = '';
        if (additionalData.screenshot && additionalData.screenshot instanceof File) {
            try {
                screenshotBase64 = await fileToBase64(additionalData.screenshot);
            } catch (error) {
                console.warn('Failed to convert screenshot to base64:', error);
            }
        }

        const emailBody = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Claims Editor - ${action}</title>
                <style>
                    body { font-family: Helvetica, Arial, sans-serif; line-height: 1.4; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
                    .email-container { max-width: 600px; margin: 0 auto; background-color: #d6d6d6; }
                    .header { background-color: #d6d6d6; padding: 30px 20px; text-align: center; border-radius: 3px; margin-bottom: 20px; }
                    .content { background: #d6d6d6; padding: 40px 30px; border-radius: 3px; border: 1px solid #cbcbcb; }
                    .details-box { background: #d6d6d6; border: 1px solid #e0e0e0; border-radius: 3px; padding: 20px; margin: 25px 0; }
                    .action-buttons { text-align: center; margin: 35px 0; }
                    .action-button { display: inline-flex; justify-content: center; align-items: center; background-color: #bffb9b; color: #333; padding: 12px 24px; text-decoration: none; border-radius: 3px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; border: solid 1px #5e5e5e; margin: 0 10px 15px 0; }
                    .footer { text-align: center; margin-top: 30px; padding: 20px; color: #595959; font-size: 12px; }
                    .screenshot { max-width: 100%; border-radius: 3px; border: 1px solid #ccc; margin: 15px 0; }
                    ul { margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6; }
                    h2 { color: #333; margin-top: 0; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: normal; }
                    h3 { color: #333; margin-top: 0; font-size: 16px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <!-- Header with Hasbara Tracker logo -->
                    <div class="header">
                        <img src="https://files.hasbaratracker.com/ht-logo-with-slogan.svg" 
                             alt="Hasbara Tracker - Debunking Israeli propaganda" 
                             style="max-width: 300px; width: 100%; height: auto;" />
                    </div>
                    
                    <!-- Main content -->
                    <div class="content">
                        <h2 style="color: ${actionColor};">
                            ${actionIcon} Claims Editor: ${action}
                        </h2>
                        
                        <p style="margin-bottom: 20px; font-size: 14px; line-height: 1.5;">
                            A claim has been marked as "${action}" in the Claims Editor.
                        </p>
                        
                        <!-- Claim Details -->
                        <div class="details-box">
                            <h3>Claim Details:</h3>
                            <ul>
                                <li><strong>Claim Title:</strong> ${claimTitle}</li>
                                <li><strong>Action:</strong> ${action}</li>
                                <li><strong>Editor:</strong> ${userEmail}</li>
                                <li><strong>Time:</strong> ${currentTime}</li>
                                ${additionalData.message ? `<li><strong>Message:</strong><br/><em>"${additionalData.message}"</em></li>` : ''}
                            </ul>
                        </div>
                        
                        ${screenshotBase64 ? `
                        <!-- Screenshot -->
                        <div class="details-box">
                            <h3>Attached Screenshot:</h3>
                            <img src="data:image/png;base64,${screenshotBase64}" 
                                 alt="Screenshot" 
                                 class="screenshot" />
                        </div>
                        ` : ''}
                        
                        <!-- Action Buttons -->
                        <div class="action-buttons">
                            <a href="https://hasbaratracker.com/claim-editor" class="action-button">
                                Open Claims Editor
                            </a>
                            <a href="https://hasbaratracker.com/status" class="action-button">
                                View Status Page
                            </a>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="footer">
                        <p style="margin: 0;">
                            This notification was sent automatically from the Claims Editor at <a href="https://hasbaratracker.com/claim-editor" target="_blank">hasbaratracker.com/claim-editor</a>.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const emailData = {
            to: 'info@hasbaratracker.com',
            from: 'notifications@hasbaratracker.com',
            subject: `${actionIcon} Claims Editor: ${action} - ${claimTitle}`,
            type: 'notification',
            html: emailBody,
            text: `Claims Editor: ${action}\n\nClaim: ${claimTitle}\nEditor: ${userEmail}\nAction: ${action}\nTime: ${currentTime}${additionalData.message ? `\nMessage: ${additionalData.message}` : ''}${additionalData.screenshot ? '\n\nScreenshot attached' : ''}\n\nView at: https://hasbaratracker.com/claim-editor`
        };

        // Send directly to email worker (same as volunteer form)
        const response = await fetch('https://email-worker.izumi-ky.workers.dev', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });

        if (response.ok) {
            console.log(`✅ Email notification sent for: ${action}`);
        } else {
            console.warn(`⚠️ Failed to send email notification for: ${action} (Status: ${response.status})`);
        }
    } catch (error) {
        console.warn('⚠️ Email notification failed (non-critical):', error.message);
        // Don't throw error for email failures - they shouldn't block user actions
    }
};

// Helper function to convert file to base64
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Remove data URL prefix (data:image/png;base64,)
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
    });
};

export default function EditableClaimTracker() {
    const { user, canAccessClaim, isAdmin, logout } = useAuth();
    const location = useLocation();
    
    // Mark published claims to match live site (run once)
    React.useEffect(() => {
        const publishedClaims = [
            "Forty beheaded babies",
            "Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces", 
            "Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas",
            "Makeup used in Gaza to fake injuries",
            "Hamas were carrying instructions on how to make chemical weapons",
            "Israeli state denies killing mother and daughter seeking refuge in Gaza's Holy Family Parish",
            "Israeli soldier helps elderly Palestinian man in 'safe corridor'",
            "Palestinian captives stripped down naked because of 'warm weather' in the Middle East, says Mark Regev"
        ];
        
        publishedClaims.forEach(claimTitle => {
            if (!localStorage.getItem(`claim_status_${claimTitle}`)) {
                localStorage.setItem(`claim_status_${claimTitle}`, 'PUBLISHED');
            }
        });

        // Mark additional claims as IN_PROGRESS
        const inProgressClaims = [
            "Hamas stealing flour and food from UNRWA",
            "Israeli state denies targeting journalists in Gaza",
            "Israeli state and AIPAC say the Artists4Ceasefire (A4C) logo represents Ramallah attack",
            "Weapons confiscated during the IOF's 3-day offensive in Jenin refugee camp",
            "Dead Palestinian children are dolls",
            "Keir Starmer says Israel 'has the right' to cut off power and water",
            "Sexual violence used by Palestinian resistance on 7 October",
            "The pro-Palestine student encampments are an 'organised cell' funded by foreign states",
            "Harvard hates Jews' banner flown by plane across campus by Palestine activists",
            "There is no limit to the amount of aid that can be facilitated into Gaza",
            "Israel detains 'terrorists' in Gaza, strips them down to their clothes"
        ];
        
        inProgressClaims.forEach(claimTitle => {
            if (!localStorage.getItem(`claim_status_${claimTitle}`)) {
                localStorage.setItem(`claim_status_${claimTitle}`, 'IN_PROGRESS');
            }
        });
        
        // Trigger ClaimsList update
        window.dispatchEvent(new CustomEvent('claimsUpdated'));
        
        console.log('✅ Marked claims as PUBLISHED to match live site');
    }, []);
    
    const metadataProps = {
        url: "https://hasbaratracker.com/admin/edit",
        title: "Admin - Edit Claims",
        description: "Administrative interface for editing claim data",
    };

    // Initial empty row structure
    const createEmptyRow = (claimTitle = '') => ({
        id: Date.now() + Math.random(),
        claimTitle: claimTitle,
        date: '',
        claim: {
            claimText: '',
            claimTag: 'claim-tag',
        },
        description: {
            summary: '',
            details: '',
        },
        sources: [{ sourceName: '', sourceLink: '', archiveLink: '' }],
        lastEditedBy: user?.email || 'Unknown',
        lastEditedAt: new Date().toISOString(),
        isEditing: true,
        isNew: true
    });

    // Sample data with one empty row to start
    const [claimData, setClaimData] = useState([createEmptyRow()]);
    const [editingRows, setEditingRows] = useState(new Set([0]));
    const [removingRows, setRemovingRows] = useState(new Set());
    const [selectedClaimTitle, setSelectedClaimTitle] = useState('');
    const [isPopulating, setIsPopulating] = useState(false);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [newClaimTitle, setNewClaimTitle] = useState('');
    const [newClaimSummary, setNewClaimSummary] = useState('');
    const [newClaimUrl, setNewClaimUrl] = useState('');
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [claimDataVersion, setClaimDataVersion] = useState(0); // To trigger dropdown re-render
    const [isDeletingClaim, setIsDeletingClaim] = useState(false); // Flag to prevent auto-saving during deletion
    const [isTableVisible, setIsTableVisible] = useState(false); // For fade-in animation
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingSummary, setIsEditingSummary] = useState(false);
    const [isEditingUrl, setIsEditingUrl] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedSummary, setEditedSummary] = useState('');
    const [editedUrl, setEditedUrl] = useState('');
    const [currentClaimUrl, setCurrentClaimUrl] = useState(''); // Track the current claim's URL
    const [showReviewModal, setShowReviewModal] = useState(false); // For TO REVIEW message modal
    const [showReadyToPublishModal, setShowReadyToPublishModal] = useState(false); // For READY TO PUBLISH message modal
    const [lastDraftSave, setLastDraftSave] = useState(() => {
        try {
            const savedDraft = localStorage.getItem('hasbaratracker_draft_save');
            if (savedDraft) {
                const parsed = JSON.parse(savedDraft);
                return parsed.savedAt;
            }
        } catch (error) {
            // Ignore error
        }
        return null;
    });

    // Toggle edit mode for a row
    const toggleEdit = useCallback((rowIndex) => {
        setEditingRows(prev => {
            const newEditingRows = new Set(prev);
            if (newEditingRows.has(rowIndex)) {
                // Switching from edit to save mode - save to draft (unless we're deleting)
                if (!isDeletingClaim) {
                    try {
                        saveDraft();
                        console.log('📝 Row saved to draft automatically');
                    } catch (error) {
                        console.error('Error auto-saving to draft:', error);
                    }
                } else {
                    console.log('⏸️ Auto-save skipped during claim deletion');
                }
                newEditingRows.delete(rowIndex);
            } else {
                newEditingRows.add(rowIndex);
            }
            return newEditingRows;
        });
    }, []);

    // Update field value
    const updateField = useCallback((rowIndex, field, value) => {
        setClaimData(prevData => {
            const newData = [...prevData];
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                if (parent === 'claim') {
                    newData[rowIndex].claim[child] = value;
                } else if (parent === 'description') {
                    newData[rowIndex].description[child] = value;
                }
            } else {
                newData[rowIndex][field] = value;
            }
            
            // Update last edited info
            newData[rowIndex].lastEditedBy = user?.email || 'Unknown';
            newData[rowIndex].lastEditedAt = new Date().toISOString();
            
            // Also update the corresponding entry in the DRAFT data array if it exists
            if (newData[rowIndex].claimTitle && selectedClaimTitle) {
                const draftIndex = draftData.findIndex(item => item.claimTitle === newData[rowIndex].claimTitle);
                if (draftIndex !== -1) {
                    // Update the draft data array entry to match
                    if (field.includes('.')) {
                        const [parent, child] = field.split('.');
                        if (parent === 'claim') {
                            draftData[draftIndex].claim[child] = value;
                        } else if (parent === 'description') {
                            draftData[draftIndex].description[child] = value;
                        }
                    } else {
                        draftData[draftIndex][field] = value;
                    }
                    draftData[draftIndex].lastEditedBy = user?.email || 'Unknown';
                    draftData[draftIndex].lastEditedAt = new Date().toISOString();
                    draftData[draftIndex].isDraft = true;
                }
            }
            
            return newData;
        });
    }, [user, selectedClaimTitle]);

    // Update source field
    const updateSource = useCallback((rowIndex, sourceIndex, field, value) => {
        setClaimData(prevData => {
            const newData = [...prevData];
            if (!newData[rowIndex].sources[sourceIndex]) {
                newData[rowIndex].sources[sourceIndex] = { sourceName: '', sourceLink: '', archiveLink: '' };
            }
            newData[rowIndex].sources[sourceIndex][field] = value;
            
            // Update last edited info
            newData[rowIndex].lastEditedBy = user?.email || 'Unknown';
            newData[rowIndex].lastEditedAt = new Date().toISOString();
            
            // Also update the corresponding entry in the DRAFT data array if it exists
            if (newData[rowIndex].claimTitle && selectedClaimTitle) {
                const draftIndex = draftData.findIndex(item => item.claimTitle === newData[rowIndex].claimTitle);
                if (draftIndex !== -1) {
                    // Ensure sources array exists and has the right structure
                    if (!draftData[draftIndex].sources[sourceIndex]) {
                        draftData[draftIndex].sources[sourceIndex] = { sourceName: '', sourceLink: '', archiveLink: '', videoPreviewLink: '' };
                    }
                    draftData[draftIndex].sources[sourceIndex][field] = value;
                    draftData[draftIndex].lastEditedBy = user?.email || 'Unknown';
                    draftData[draftIndex].lastEditedAt = new Date().toISOString();
                    draftData[draftIndex].isDraft = true;
                }
            }
            
            return newData;
        });
    }, [user, selectedClaimTitle]);

    // Add new source to a row
    const addSource = useCallback((rowIndex) => {
        setClaimData(prevData => {
            const newData = [...prevData];
            newData[rowIndex].sources.push({ sourceName: '', sourceLink: '', archiveLink: '', videoPreviewLink: '' });
            console.log(`Added 1 source to row ${rowIndex}. Total sources: ${newData[rowIndex].sources.length}`);
            return newData;
        });
    }, []);

    // Remove source from a row
    const removeSource = useCallback((rowIndex, sourceIndex) => {
        setClaimData(prevData => {
            const newData = [...prevData];
            newData[rowIndex].sources.splice(sourceIndex, 1);
            return newData;
        });
    }, []);

    // Add new row
    const addNewRow = useCallback(() => {
        setClaimData(prevData => {
            const newRow = createEmptyRow(selectedClaimTitle); // Pass the selected claim title
            
            // Also add this new row to the draft data array so it persists
            draftData.push({
                ...newRow,
                isDraft: true
            });
            
            setEditingRows(prevEditing => new Set([...prevEditing, prevData.length]));
            return [...prevData, newRow];
        });
    }, [selectedClaimTitle]);

    // Remove row with animation
    const removeRow = useCallback((rowIndex) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this row? This action cannot be undone.');
        
        if (!isConfirmed) {
            return; // Exit if user cancels
        }

        // Start remove animation
        setRemovingRows(new Set([rowIndex]));
        
        // After animation, actually remove the row
        setTimeout(() => {
            setClaimData(prevData => {
                const rowToRemove = prevData[rowIndex];
                
                // Also remove from draftData if it exists there
                if (rowToRemove && rowToRemove.claimTitle) {
                    const draftIndexToRemove = draftData.findIndex(item => 
                        item.claimTitle === rowToRemove.claimTitle && 
                        JSON.stringify(item) === JSON.stringify(rowToRemove)
                    );
                    if (draftIndexToRemove !== -1) {
                        draftData.splice(draftIndexToRemove, 1);
                        console.log('🗑️ Row removed from draft data');
                    }
                }
                
                const newData = prevData.filter((_, index) => index !== rowIndex);
                return newData.length > 0 ? newData : []; // Allow empty array
            });
            setEditingRows(prevEditing => {
                const newEditingRows = new Set();
                prevEditing.forEach(index => {
                    if (index < rowIndex) newEditingRows.add(index);
                    if (index > rowIndex) newEditingRows.add(index - 1);
                });
                return newEditingRows;
            });
            setRemovingRows(new Set());
        }, 300);
    }, []);

    // Export all data as JSON
    const exportData = () => {
        const exportData = claimData.map(row => ({
            claimTitle: row.claimTitle,
            date: row.date,
            claim: {
                claimText: row.claim.claimText,
                claimTag: row.claim.claimTag,
            },
            description: {
                summary: row.description.summary,
                details: row.description.details,
            },
            sources: row.sources.filter(source => source.sourceName && source.sourceLink)
        }));
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `claims-export-${Date.now()}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // Status update functions for Phase 1
    const updateClaimStatus = (status) => {
        if (!selectedClaimTitle) {
            alert('Please select a claim first');
            return;
        }
        
        const statusKey = `claim_status_${selectedClaimTitle}`;
        localStorage.setItem(statusKey, status);
        
        // Trigger custom event to update ClaimsList.js
        window.dispatchEvent(new CustomEvent('claimsUpdated'));
        
        // Show confirmation message in console instead of alert
        const statusLabels = {
            'IN_PROGRESS': 'In Progress',
            'NEEDS_REVIEW': 'To review', 
            'READY_TO_PUBLISH': 'Ready to Publish',
            'PUBLISHED': 'Published'
        };
        
        console.log(`✅ Status updated: "${selectedClaimTitle}" → ${statusLabels[status]}`);
    };

    // Function to populate table with selected claim data
    const handleClaimSelection = useCallback((claimTitle) => {
        if (!claimTitle) {
            setSelectedClaimTitle('');
            setCurrentClaimUrl(''); // Clear current URL when no claim selected
            return;
        }

        setSelectedClaimTitle(claimTitle);
        setCurrentClaimUrl(''); // Reset URL state when switching claims
        setIsPopulating(true);

        // Filter DRAFT data by selected claim title
        const selectedClaimData = draftData.filter(item => item.claimTitle === claimTitle);
        
        // Add animation delay
        setTimeout(() => {
            if (selectedClaimData.length > 0) {
                setClaimData(selectedClaimData);
                // Set all rows to editing mode
                const editingIndexes = new Set(selectedClaimData.map((_, index) => index));
                setEditingRows(editingIndexes);
            }
            setIsPopulating(false);
        }, 500);
    }, []);

    // Handle URL parameters to auto-select a claim
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const claimParam = urlParams.get('claim');
        if (claimParam) {
            console.log('🔗 Auto-selecting claim from URL:', claimParam);
            setSelectedClaimTitle(claimParam);
            // Automatically populate the claim data
            handleClaimSelection(claimParam);
        }
    }, [location.search, handleClaimSelection]);

    // Trigger fade-in animation on component load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTableVisible(true);
        }, 300); // Delay the animation slightly for better effect
        
        return () => clearTimeout(timer);
    }, []);

    // Get unique claim titles for dropdown (filtered by user permissions) - using draft data
    const uniqueClaimTitles = useMemo(() => {
        console.log(`🚨 CLAIM-EDITOR: STARTING UNIQUE CLAIMS CALCULATION`);
        console.log(`🔍 CLAIM-EDITOR: Building dropdown claims list...`);
        console.log(`🔍 CLAIM-EDITOR: User is admin:`, isAdmin());
        console.log(`🔍 CLAIM-EDITOR: User assigned claims:`, user?.assignedClaims);
        console.log(`🔍 CLAIM-EDITOR: Total evidence rows in draftData:`, draftData.length);
        
        // Debug: Show all unique claim titles in draftData
        const allClaimTitles = [...new Set(draftData.map(item => item.claimTitle).filter(Boolean))];
        console.log(`🔍 CLAIM-EDITOR: Total unique claim titles: ${allClaimTitles.length}`);
        console.log(`🔍 CLAIM-EDITOR: All unique claim titles:`, allClaimTitles);
        
        // Get unique claim titles first to avoid duplicate permission checks
        const uniqueTitles = [...new Set(draftData.map(item => item.claimTitle).filter(Boolean))];
        console.log(`🔍 CLAIM-EDITOR: Found ${uniqueTitles.length} unique claim titles`);
        
        const titles = [];
        const isUserAdmin = isAdmin();
        
        for (const claimTitle of uniqueTitles) {
            const hasAccess = isUserAdmin || canAccessClaim(claimTitle);
            console.log(`🔍 CLAIM-EDITOR: "${claimTitle}" -> ${hasAccess ? '✅ GRANTED' : '❌ DENIED'}`);
            
            if (hasAccess) {
                titles.push(claimTitle);
            }
        }
        
        console.log(`📋 CLAIM-EDITOR: Final dropdown claims list:`, titles);
        console.log(`📊 CLAIM-EDITOR: Total accessible claims: ${titles.length}`);
        return titles.sort((a, b) => {
            // Remove quotes for comparison
            const titleA = a.replace(/^['"]|['"]$/g, '');
            const titleB = b.replace(/^['"]|['"]$/g, '');
            return titleA.localeCompare(titleB);
        });
    }, [isAdmin, canAccessClaim, claimDataVersion, user]);

    // Get selected claim summary - using draft summaries
    const selectedClaimSummary = useMemo(() => {
        if (!selectedClaimTitle) return '';
        const summary = draftSummaries.find(s => s.claimMainTitle === selectedClaimTitle);
        return summary?.claimSummary || '';
    }, [selectedClaimTitle, claimDataVersion]);

    // Get selected claim custom URL - using draft summaries or current state
    const selectedClaimUrl = useMemo(() => {
        if (!selectedClaimTitle) return '';
        
        // Use currentClaimUrl state if it's for the current claim and has been set
        if (currentClaimUrl && selectedClaimTitle) {
            return currentClaimUrl;
        }
        
        const summary = draftSummaries.find(s => s.claimMainTitle === selectedClaimTitle);
        return summary?.customUrl || selectedClaimTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }, [selectedClaimTitle, claimDataVersion, currentClaimUrl]);

    // Tooltip component
    const Tooltip = ({ text, children }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span>{children}</span>
            <div className="tooltip-container" style={{ marginLeft: '8px' }}>
                <div className="tooltip-icon">?</div>
                <div className="tooltip-text" style={{ whiteSpace: 'pre-line' }}>{text}</div>
            </div>
        </div>
    );

    // Table columns in order: The claim, Date, Summary, Type, Sources, Last Edited, Actions
    const columns = useMemo(() => [
        {
            Header: () => (
                <Tooltip text="The name of the claim.">
                    The claim
                </Tooltip>
            ),
            accessor: 'claimTitle',
            Cell: ({ row, value }) => (
                editingRows.has(row.index) ? (
                    <div
                        style={{
                            width: '100%',
                            padding: '4px',
                            borderRadius: '3px',
                            backgroundColor: '#cbcbcb',
                            fontSize: '0.9em',
                            color: '#666',
                            border: '1px solid #ddd'
                        }}
                        title="This field is automatically populated from the SELECT CLAIM dropdown"
                    >
                        {value || 'Select claim from dropdown above'}
                    </div>
                ) : (
                    <div className="font-medium">{value}</div>
                )
            ),
            width: 200,
        },
        {
            Header: () => (
                <Tooltip text="The date of the claim made, the debunk, and the context. Context can be contemporary context and historical context.">
                    Date
                </Tooltip>
            ),
            accessor: 'date',
            Cell: ({ row, value }) => {
                // Convert display date back to YYYY-MM-DD format for input
                const getInputDateValue = () => {
                    if (!value) return '';
                    // If already in YYYY-MM-DD format, use as-is
                    if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        return value;
                    }
                    // Try to parse display date format back to YYYY-MM-DD
                    const date = new Date(value);
                    if (!isNaN(date)) {
                        return date.toISOString().split('T')[0];
                    }
                    return '';
                };
                
                return editingRows.has(row.index) ? (
                    <input
                        type="date"
                        value={getInputDateValue()}
                        min="1948-01-01"
                        onChange={(e) => {
                            e.stopPropagation();
                            updateField(row.index, 'date', e.target.value);
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                        onInput={(e) => e.stopPropagation()}
                        style={{
                            width: '100%',
                            padding: '4px',
                            border: 'none',
                            borderRadius: '3px',
                            backgroundColor: '#cbcbcb',
                            fontSize: '0.9em'
                        }}
                    />
                ) : (
                    <div>{formatDisplayDate(value)}</div>
                )
            },
            width: 120,
        },
        {
            Header: () => (
                <Tooltip text="The details of the claim, context or debunk go into this cell.

– Use paragraphs to organise information clearly and logically.
– Describe in direct, concise text what the details are. If the source is an Instagram post for example, describe it and quote it. Describe the contents of a video and so on.">
                    Details
                </Tooltip>
            ),
            accessor: 'description.details',
            Cell: ({ row }) => (
                editingRows.has(row.index) ? (
                    <div>
                        <textarea
                            value={row.original.description.summary || ''}
                            onChange={(e) => {
                                e.stopPropagation();
                                updateField(row.index, 'description.summary', e.target.value);
                            }}
                            onKeyDown={(e) => e.stopPropagation()}
                            onInput={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                padding: '4px',
                                border: 'none',
                                borderRadius: '3px',
                                backgroundColor: '#cbcbcb',
                                fontSize: '0.9em',
                                fontFamily: 'Helvetica, sans-serif',
                                resize: 'vertical',
                                marginBottom: '4px'
                            }}
                            rows="2"
                            placeholder="Summary"
                        />
                        <div
                            ref={(el) => {
                                // Only set initial content when element first mounts and doesn't have content
                                if (el && !el.hasAttribute('data-initialized')) {
                                    el.innerHTML = row.original.description.details || '';
                                    el.setAttribute('data-initialized', 'true');
                                }
                            }}
                            contentEditable
                            suppressContentEditableWarning={true}
                            onInput={(e) => {
                                e.stopPropagation();
                                // Get HTML content but clean it up
                                const htmlContent = e.target.innerHTML
                                    .replace(/<div><br><\/div>/g, '<br>')
                                    .replace(/<div>/g, '<br>')
                                    .replace(/<\/div>/g, '');
                                updateField(row.index, 'description.details', htmlContent);
                            }}
                            onKeyDown={(e) => {
                                e.stopPropagation();
                                // Handle formatting shortcuts
                                if (e.ctrlKey || e.metaKey) {
                                    if (e.key === 'b') {
                                        e.preventDefault();
                                        document.execCommand('bold', false, null);
                                    } else if (e.key === 'i') {
                                        e.preventDefault();
                                        document.execCommand('italic', false, null);
                                    }
                                }
                            }}
                            onBlur={(e) => {
                                // Ensure content is saved on blur with cleanup
                                const htmlContent = e.target.innerHTML
                                    .replace(/<div><br><\/div>/g, '<br>')
                                    .replace(/<div>/g, '<br>')
                                    .replace(/<\/div>/g, '');
                                updateField(row.index, 'description.details', htmlContent);
                            }}
                            style={{
                                width: '100%',
                                padding: '4px',
                                border: 'none',
                                borderRadius: '3px',
                                backgroundColor: '#cbcbcb',
                                fontSize: '0.9em',
                                fontFamily: 'Helvetica, sans-serif',
                                minHeight: '80px',
                                outline: 'none'
                            }}
                            data-placeholder="Details (Ctrl+B for bold, Ctrl+I for italic)"
                        />
                    </div>
                ) : (
                    <div style={{ maxWidth: 650, textWrap: 'pretty' }}>
                        <details>
                            <summary><u>{row.original.description.summary}</u>
                                <span className='expand-text'></span>
                            </summary>
                            
                            <article className="claim-paragraph">
                                <div dangerouslySetInnerHTML={{ __html: row.original.description.details }} />
                            </article>
                        </details>
                    </div>
                )
            ),
            width: 350,
        },
        {
            Header: () => (
                <Tooltip text="What is a CLAIM?
                A statement or assertion made by an individual or entity in support of the Israeli entity and its actions, often presented as a fact or piece of information. We focus on what ‘officials’ claim.
                e.g. Netanyahu claims 300 litres of fuel offered by the Israeli state was refused by Al-Shifa Hospital.
                
                What is a DEBUNK?
                Information challenging, exposing, and proving a claim or statement to be false, misleading, inaccurate or dubious. e.g. Al-Shifa Hospital accepted fuel and asked for it to be delivered through the Red Cross, which the Israeli state refused
                
                What is CONTEXT?
                Background information or details that provide a more complete understanding of an event, statement, or situation. e.g. Israeli Energy Minister Israel Katz posts on X (formerly Twitter) that 'no fuel truck will enter' Gaza.
                ">
                    Type
                </Tooltip>
            ),
            accessor: 'claim.claimText',
            Cell: ({ row }) => (
                editingRows.has(row.index) ? (
                    <select
                        value={row.original.claim.claimTag || 'claim-tag'}
                        onChange={(e) => {
                            e.stopPropagation();
                            updateField(row.index, 'claim.claimTag', e.target.value);
                            // Also update claim text based on selection
                            const textMap = {
                                'claim-tag': 'Claim',
                                'context-tag': 'Context', 
                                'debunk-tag': 'Debunk'
                            };
                            updateField(row.index, 'claim.claimText', textMap[e.target.value]);
                        }}
                        style={{
                            width: '100%',
                            padding: '4px',
                            border: 'none',
                            borderRadius: '3px',
                            backgroundColor: '#cbcbcb',
                            fontSize: '0.9em'
                        }}
                    >
                        <option value="claim-tag">Claim</option>
                        <option value="context-tag">Context</option>
                        <option value="debunk-tag">Debunk</option>
                    </select>
                ) : (
                    <span className={row.original.claim.claimTag}>
                        {row.original.claim.claimText}
                    </span>
                )
            ),
            width: 120,
        },
        {
            Header: () => (
                <Tooltip text="For each source, we aim to include four essential elements. One source has to have these four columns. See below.

                Source name
                Provide the name or title of the source.

If it’s a website, a report, a press release, a news article:
Examples: Palestinian Red Crescent Society, Human Rights Watch, CNN, Israeli Prime Minister's Office

If it’s on social media with particular handles (excluding YouTube), include the handle and then add if it was on X, Instagram, TikTok etc:
Examples: @idfonline on X, Israel Occupation Force on YouTube

Original source link
Include a direct link to the original source online, such as original interviews, press releases, and posts wherever possible. NOT general articles that reference the claim.

In the case of someone speaking the media, find the original outlet that got the information or quote.


Archived link
Include a link to an archived version of the source to ensure accessibility and preservation. Archive links at https://archive.ph and share the archived link provided.

This includes YouTube pages/videos – while the archived link won’t be able to play the video, we want to document that the video was up in the event it is taken down. 

When you go to archive a link, it may show that the link has already been archived – simply grab the earliest archived link there is.

File/media link
This is a link to supplementary material (if applicable). 

First download the file/image/video, and then upload it into the corresponding Google Drive folder. Once it’s uploaded into the Google Drive folder, you can grab the link of its location. This link goes into Column J.
">
                    Sources
                </Tooltip>
            ),
            id: 'sources',
            Cell: ({ row }) => (
                <div>
                    {editingRows.has(row.index) ? (
                        <div>
                            {row.original.sources.map((source, sourceIndex) => (
                                <div key={sourceIndex} className="mb-2 p-2 border border-gray-200 rounded">
                                    <input
                                        type="text"
                                        value={source.sourceName || ''}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            updateSource(row.index, sourceIndex, 'sourceName', e.target.value);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '2px 4px',
                                            border: 'none',
                                            borderRadius: '3px',
                                            backgroundColor: '#cbcbcb',
                                            fontSize: '0.8em',
                                            marginBottom: '2px'
                                        }}
                                        placeholder="Source name"
                                    />
                                    <input
                                        type="url"
                                        value={source.sourceLink || ''}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            updateSource(row.index, sourceIndex, 'sourceLink', e.target.value);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '2px 4px',
                                            border: 'none',
                                            borderRadius: '3px',
                                            backgroundColor: '#cbcbcb',
                                            fontSize: '0.8em',
                                            marginBottom: '2px'
                                        }}
                                        placeholder="Source link"
                                    />
                                    <input
                                        type="url"
                                        value={source.archiveLink || ''}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            updateSource(row.index, sourceIndex, 'archiveLink', e.target.value);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '2px 4px',
                                            border: 'none',
                                            borderRadius: '3px',
                                            backgroundColor: '#cbcbcb',
                                            fontSize: '0.8em',
                                            marginBottom: '2px'
                                        }}
                                        placeholder="Archive link"
                                    />
                                    {row.original.sources.length > 1 && (
                                        <button
                                            onClick={() => removeSource(row.index, sourceIndex)}
                                            className="btn-green"
                                            style={{
                                                padding: '2px 6px',
                                                fontSize: '10px',
                                                minWidth: 'auto',
                                                height: 'auto',
                                                backgroundColor: 'rgb(251, 124, 124)'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addSource(row.index);
                                }}
                                className="btn-green"
                                style={{
                                    padding: '4px 8px',
                                    fontSize: '11px',
                                    minWidth: 'auto',
                                    height: 'auto'
                                }}
                            >
                                + Add another Source
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="source-heading"></div>
                            {row.original.sources.filter(s => s.sourceName).map((source, idx) => (
                                <div key={idx} className="source text-xs">
                                    {source.videoPreviewLink ? (
                                        <ul className="icon-playarrow">
                                            <li>
                                                <a href={source.sourceLink} target="_blank" rel="noopener noreferrer">
                                                    <span dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                </a>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="icon-link">
                                            <li>
                                                <a href={source.sourceLink} target="_blank" rel="noopener noreferrer">
                                                    <span dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                    
                                    {source.archiveLink && (
                                        <ul>
                                            <li className="ml-4 mt-0">
                                                <a className="archive-link" href={source.archiveLink} target="_blank" rel="noopener noreferrer">
                                                    <span className="text-grey-faded text-xs italic">Archive</span>
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ),
            width: 250,
        },
        {
            Header: () => (
                <Tooltip text="Shows who last edited this claim and when the changes were made.">
                    Last Edited
                </Tooltip>
            ),
            id: 'lastEdited',
            Cell: ({ row }) => {
                const formatEditDate = (dateString) => {
                    if (!dateString) return 'Never';
                    const date = new Date(dateString);
                    const now = new Date();
                    const diffMinutes = Math.floor((now - date) / (1000 * 60));
                    
                    // Format time as HH:MM
                    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substr(2)}`;
                    
                    if (diffMinutes < 60) return `Just now (${formattedDate} ${timeString})`;
                    if (diffMinutes < 24 * 60) return `${Math.floor(diffMinutes / 60)}h ago`;
                    
                    return `${formattedDate} ${timeString}`;
                };
                
                return (
                    <div style={{ fontSize: '0.8em', color: '#666' }}>
                        <div>{row.original.lastEditedBy?.split('@')[0] || 'Unknown'}</div>
                        <div>{formatEditDate(row.original.lastEditedAt)}</div>
                    </div>
                );
            },
            width: 120,
        },
        {
            Header: () => (
                <Tooltip text="Edit or delete individual claim entries. Use Edit to modify fields, Save to confirm changes.">
                    Actions
                </Tooltip>
            ),
            id: 'actions',
            Cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <button
                        onClick={() => toggleEdit(row.index)}
                        className="btn-green"
                        style={{ 
                            padding: '4px 8px', 
                            fontSize: '11px', 
                            minWidth: 'auto',
                            height: 'auto',
                            backgroundColor: editingRows.has(row.index) ? 'rgba(176, 245, 85, 0.424)' : 'rgb(183, 251, 243)'
                        }}
                    >
                        {editingRows.has(row.index) ? 'Save' : 'Edit'}
                    </button>
                    {isAdmin() && (
                        <button
                            onClick={() => removeRow(row.index)}
                            className="btn-green"
                            style={{ 
                                padding: '4px 8px', 
                                fontSize: '11px', 
                                minWidth: 'auto',
                                height: 'auto',
                                backgroundColor: 'rgb(251, 124, 124)',
                                cursor: 'crosshair'
                            }}
                        >
                            Delete
                        </button>
                    )}
                </div>
            ),
            width: 120,
        },
    ], [editingRows, updateField, updateSource, toggleEdit]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data: claimData,
        },
        useSortBy
    );

    return (
        <HelmetProvider>
            <>
                <PageMetadata {...metadataProps} />
                
                {/* Inject animation styles */}
                <style>{animationStyles}</style>

                {/* Header */}
                <Header />

                {/* SELECT CLAIM Dropdown - moved to top */}
                <div className="container mt-10 mobile:w-[100%] mobile:mt-[5%]">
                    <div className="mt-6 mb-4">
                            <label className="block text-sm font-medium mb-0 font-lores">
                                <strong>SELECT CLAIM</strong>
                            </label>
                            <CustomDropdown
                                value={isCreatingNew ? 'CREATE_NEW' : selectedClaimTitle}
                                onChange={(value) => {
                                    if (value === 'CREATE_NEW') {
                                        setIsCreatingNew(true);
                                        setSelectedClaimTitle('');
                                        setNewClaimTitle('');
                                        setNewClaimSummary('');
                                        setNewClaimUrl('');
                                        // Clear the table data
                                        setClaimData([]);
                                        setEditingRows(new Set());
                                    } else {
                                        setIsCreatingNew(false);
                                        handleClaimSelection(value);
                                    }
                                }}
                                statusColors={{
                                    'UNASSIGNED': '#b9b9b9',
                                    'IN_PROGRESS': '#b7fbf3', 
                                    'NEEDS_REVIEW': '#fac798',
                                    'READY_TO_PUBLISH': '#bffb9b',
                                    'PUBLISHED': '#78ff96'
                                }}
                                options={[
                                    { value: '', label: '-- Select a claim to edit --' },
                                    ...(isAdmin() ? [{ value: 'CREATE_NEW', label: '+ CREATE NEW CLAIM' }] : []),
                                    ...uniqueClaimTitles.map(title => ({ value: title, label: title }))
                                ]}
                            />
                        </div>
                    </div>

                    {/* Admin claim summary */}
                    <div className="claim-summary container mt-5 mobile:w-[100%] mobile:mt-[5%]">
                        <div className="mobile:text-xs laptop:w-7/12 laptop:text-md font-lores font-bold">
                            The claim
                        </div>
                            
                        <div className="mobile:mt-0 mobile:text-xs laptop:text-md laptop:w-7/12 mb-2 mt-1">
                            {isCreatingNew ? (
                                <div style={{ marginTop: '10px' }}>
                                    <input
                                        type="text"
                                        value={newClaimTitle}
                                        onChange={(e) => setNewClaimTitle(e.target.value)}
                                        placeholder="Enter new claim title..."
                                        style={{
                                            width: '100%',
                                            maxWidth: '500px',
                                            padding: '8px 12px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            backgroundColor: '#cbcbcb'
                                        }}
                                    />
                                </div>
                            ) : selectedClaimTitle ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    {isEditingTitle ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
                                            <input
                                                type="text"
                                                value={editedTitle}
                                                onChange={(e) => setEditedTitle(e.target.value)}
                                                style={{
                                                    flex: 1,
                                                    minWidth: '300px',
                                                    padding: '6px 10px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    fontSize: '14px',
                                                    backgroundColor: '#cbcbcb'
                                                }}
                                            />
                                            <button
                                                onClick={async () => {
                                                    // Save title logic would go here
                                                    console.log('Save title:', editedTitle);
                                                    setIsEditingTitle(false);
                                                }}
                                                style={{
                                                    padding: '6px 12px',
                                                    backgroundColor: '#cbcbcb',
                                                    color: 'black',
                                                    border: '1px solid #999',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#b0b0b0'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#cbcbcb'}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                            <span>'{selectedClaimTitle}'</span>
                                            <button
                                                onClick={() => {
                                                    setIsEditingTitle(true);
                                                    setEditedTitle(selectedClaimTitle);
                                                }}
                                                style={{
                                                    padding: '4px 8px',
                                                    backgroundColor: '#cbcbcb',
                                                    color: 'black',
                                                    border: '1px solid #999',
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                'Editable Claims Tracker'
                            )}</div>

                        <div className="mobile:text-xs mobile:mb-5 laptop:w-[60%] display:flex text-sm text-grey-faded mt-2 leading-6">
                            {isCreatingNew ? (
                                <div style={{ marginTop: '10px', width: '100%', maxWidth: '600px' }}>
                                    <textarea
                                        value={newClaimSummary}
                                        onChange={(e) => setNewClaimSummary(e.target.value)}
                                        placeholder="Enter claim summary..."
                                        rows="3"
                                        style={{
                                            width: '100%',
                                            padding: '8px 12px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            resize: 'vertical',
                                            backgroundColor: '#cbcbcb',
                                            marginBottom: '15px'
                                        }}
                                    />
                                    
                                    <input
                                        type="text"
                                        value={newClaimUrl}
                                        onChange={(e) => setNewClaimUrl(e.target.value)}
                                        placeholder="Custom URL (e.g., makeup, beheaded-babies, hospital-attack)"
                                        style={{
                                            width: '100%',
                                            maxWidth: '600px',
                                            padding: '8px 12px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            backgroundColor: '#cbcbcb',
                                            marginBottom: '15px'
                                        }}
                                    />
                                    
                                    {showSaveMessage ? (
                                        <div 
                                            style={{
                                                color: '#16a34a',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                marginTop: '10px'
                                            }}
                                        >
                                            <AnimatedMessage message="New claim saved to draft. Use PUBLISH to make it live." />
                                        </div>
                                    ) : (
                                        <button
                                            onClick={async () => {
                                                if (newClaimTitle.trim() && newClaimSummary.trim()) {
                                                    try {
                                                        // Add new claim to DRAFT (not live data)
                                                        saveNewClaimToDraft(newClaimTitle, newClaimSummary, newClaimUrl);
                                                        
                                                        // Force dropdown to re-render with new claim
                                                        setClaimDataVersion(prev => prev + 1);
                                                        
                                                        // Add new claim to the table
                                                        const newClaim = createEmptyRow(newClaimTitle);
                                                        setClaimData([newClaim]);
                                                        setEditingRows(new Set([0]));
                                                        setSelectedClaimTitle(newClaimTitle);
                                                        setIsCreatingNew(false); // Exit CREATE NEW mode
                                                        
                                                        // Show animated message
                                                        setShowSaveMessage(true);
                                                        
                                                        // Reset form after successful save
                                                        setTimeout(() => {
                                                            setNewClaimTitle('');
                                                            setNewClaimSummary('');
                                                            setNewClaimUrl('');
                                                            setShowSaveMessage(false);
                                                        }, 3000);
                                                        
                                                    } catch (error) {
                                                        console.error('Error saving new claim:', error);
                                                        alert('Error saving new claim. Please try again.');
                                                    }
                                                }
                                            }}
                                            className="btn-green"
                                            style={{
                                                padding: '10px 20px',
                                                fontSize: '14px',
                                                minHeight: 'auto'
                                            }}
                                            disabled={!newClaimTitle.trim() || !newClaimSummary.trim()}
                                        >
                                            ADD CLAIM TO DATABASE
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {selectedClaimTitle ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            {/* Summary Field */}
                                            <div>
                                                <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#555' }}>
                                                    Summary:
                                                </div>
                                                {isEditingSummary ? (
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flexWrap: 'wrap' }}>
                                                        <textarea
                                                            value={editedSummary}
                                                            onChange={(e) => setEditedSummary(e.target.value)}
                                                            placeholder="Enter claim summary..."
                                                            rows="3"
                                                            style={{
                                                                flex: 1,
                                                                minWidth: '300px',
                                                                padding: '8px 12px',
                                                                border: '1px solid #ccc',
                                                                borderRadius: '4px',
                                                                fontSize: '14px',
                                                                resize: 'vertical',
                                                                backgroundColor: '#cbcbcb'
                                                            }}
                                                        />
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                            <button
                                                                onClick={async () => {
                                                                    const success = await updateClaimSummaryAndUrl(selectedClaimTitle, editedSummary, selectedClaimUrl);
                                                                    if (success) {
                                                                        setClaimDataVersion(prev => prev + 1);
                                                                        setIsEditingSummary(false);
                                                                        setTimeout(() => {
                                                                            if (selectedClaimTitle) {
                                                                                handleClaimSelection(selectedClaimTitle);
                                                                            }
                                                                        }, 50);
                                                                    }
                                                                }}
                                                                style={{
                                                                    padding: '6px 12px',
                                                                    backgroundColor: '#cbcbcb',
                                                                    color: 'black',
                                                                    border: '1px solid #999',
                                                                    borderRadius: '4px',
                                                                    fontSize: '12px',
                                                                    cursor: 'pointer',
                                                                    whiteSpace: 'nowrap'
                                                                }}
                                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#b0b0b0'}
                                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#cbcbcb'}
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flexWrap: 'wrap' }}>
                                                        <div style={{ flex: 1, minWidth: '200px', lineHeight: '1.4' }}>
                                                            {selectedClaimSummary}
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                setIsEditingSummary(true);
                                                                setEditedSummary(selectedClaimSummary);
                                                            }}
                                                            style={{
                                                                padding: '4px 8px',
                                                                backgroundColor: '#cbcbcb',
                                                                color: 'black',
                                                                border: '1px solid #999',
                                                                borderRadius: '4px',
                                                                fontSize: '11px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* URL Field */}
                                            <div>
                                                <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#555' }}>
                                                    URL:
                                                </div>
                                                {isEditingUrl ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                        <input
                                                            type="text"
                                                            value={editedUrl}
                                                            onChange={(e) => setEditedUrl(e.target.value)}
                                                            placeholder="Custom URL (e.g., makeup, beheaded-babies)"
                                                            style={{
                                                                flex: 1,
                                                                minWidth: '300px',
                                                                padding: '6px 10px',
                                                                border: '1px solid #ccc',
                                                                borderRadius: '4px',
                                                                fontSize: '14px',
                                                                backgroundColor: '#cbcbcb'
                                                            }}
                                                        />
                                                        <button
                                                            onClick={async () => {
                                                                const success = await updateClaimSummaryAndUrl(selectedClaimTitle, selectedClaimSummary, editedUrl);
                                                                if (success) {
                                                                    setCurrentClaimUrl(editedUrl);
                                                                    setClaimDataVersion(prev => prev + 1);
                                                                    setIsEditingUrl(false);
                                                                    setTimeout(() => {
                                                                        if (selectedClaimTitle) {
                                                                            handleClaimSelection(selectedClaimTitle);
                                                                        }
                                                                    }, 50);
                                                                }
                                                            }}
                                                            style={{
                                                                padding: '6px 12px',
                                                                backgroundColor: '#cbcbcb',
                                                                color: 'black',
                                                                border: '1px solid #999',
                                                                borderRadius: '4px',
                                                                fontSize: '12px',
                                                                cursor: 'pointer'
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#b0b0b0'}
                                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#cbcbcb'}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                                        <div style={{ fontSize: '13px', color: '#666', fontFamily: 'monospace' }}>
                                                            /{selectedClaimUrl}
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                const currentSummary = draftSummaries.find(s => s.claimMainTitle === selectedClaimTitle);
                                                                const currentUrl = currentClaimUrl || 
                                                                    currentSummary?.customUrl || 
                                                                    selectedClaimTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                                                                setIsEditingUrl(true);
                                                                setEditedUrl(currentUrl);
                                                            }}
                                                            style={{
                                                                padding: '4px 8px',
                                                                backgroundColor: '#cbcbcb',
                                                                color: 'black',
                                                                border: '1px solid #999',
                                                                borderRadius: '4px',
                                                                fontSize: '11px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        'Live editing interface for claims data. Click "Edit" to modify rows, add sources, and export JSON for your data.js file.'
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Show loading indicator when populating */}
                        {isPopulating && (
                            <div className="mt-2 mb-4 text-blue-600 text-sm">
                                <span>📊 Populating table with claim data...</span>
                            </div>
                        )}


                        {/* Status Controls - First Row */}
                        <div 
                            className="flex gap-2 mt-4 mb-4"
                            style={{
                                opacity: isTableVisible ? 1 : 0,
                                animation: isTableVisible ? 'fadeInUp 0.4s ease-out 0.2s both' : 'none'
                            }}
                        >
                            {/* Publication Flow Arrow Design */}
                            <div className="publication-flow">
                                {(() => {
                                    // Get current status for the selected claim
                                    const currentStatus = selectedClaimTitle ? 
                                        (localStorage.getItem(`claim_status_${selectedClaimTitle}`) || 'UNASSIGNED') : 
                                        'UNASSIGNED';
                                    
                                    return (
                                        <>
                                            <button
                                                onClick={() => {
                                                    if (!selectedClaimTitle) return;
                                                    try {
                                                        saveDraft();
                                                        updateClaimStatus('IN_PROGRESS');
                                                        setLastDraftSave(new Date().toISOString());
                                                    } catch (error) {
                                                        console.error('Error updating status:', error);
                                                    }
                                                }}
                                                disabled={!selectedClaimTitle}
                                                className={`flow-button in-progress ${currentStatus === 'IN_PROGRESS' ? 'active' : ''} ${!selectedClaimTitle ? 'disabled' : ''}`}
                                            >
                                                IN PROGRESS
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (!selectedClaimTitle) return;
                                                    setShowReviewModal(true);
                                                }}
                                                disabled={!selectedClaimTitle}
                                                className={`flow-button review ${currentStatus === 'NEEDS_REVIEW' ? 'active' : ''} ${!selectedClaimTitle ? 'disabled' : ''}`}
                                            >
                                                TO REVIEW
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (!selectedClaimTitle) return;
                                                    setShowReadyToPublishModal(true);
                                                }}
                                                disabled={!selectedClaimTitle}
                                                className={`flow-button ready ${currentStatus === 'READY_TO_PUBLISH' ? 'active' : ''} ${!selectedClaimTitle ? 'disabled' : ''}`}
                                            >
                                                READY TO PUBLISH
                                            </button>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* Action Controls - Second Row with Grey Rounded Styling */}
                        <div 
                            className="flex gap-3 mb-6"
                            style={{
                                opacity: isTableVisible ? 1 : 0,
                                animation: isTableVisible ? 'fadeInUp 0.4s ease-out 0.4s both' : 'none'
                            }}
                        >
                            <button
                                onClick={async () => {
                                    if (!selectedClaimTitle) {
                                        alert('❌ Please select a claim from the dropdown first');
                                        return;
                                    }
                                    
                                    try {
                                        // Get current claim data
                                        const claimData = draftData.filter(item => item.claimTitle === selectedClaimTitle);
                                        const claimSummary = draftSummaries.find(s => s.claimMainTitle === selectedClaimTitle);
                                        
                                        if (!claimSummary) {
                                            alert('❌ No summary found for this claim');
                                            return;
                                        }

                                        // Write directly to data.js
                                        const response = await fetch('http://localhost:3001/api/write-to-datajs', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                action: 'add_claim',
                                                claimTitle: selectedClaimTitle,
                                                summary: claimSummary,
                                                data: claimData
                                            })
                                        });

                                        if (!response.ok) {
                                            const errorText = await response.text();
                                            throw new Error(`Failed to save to data.js: ${errorText}`);
                                        }

                                        // Update localStorage status and save draft for UI consistency
                                        updateClaimStatus('IN_PROGRESS');
                                        saveDraft();
                                        setLastDraftSave(new Date().toISOString());
                                        
                                        // Note: Email notification removed - only send for review/approval actions
                                        
                                        alert('✅ Claim saved directly to data.js! Status updated to "In Progress".');
                                    } catch (error) {
                                        console.error('Error saving to data.js:', error);
                                        alert(`❌ Error saving to data.js: ${error.message}`);
                                    }
                                }}
                                className="px-3 py-1 text-black font-medium rounded-md border border-solid border-gray-400 transition-colors duration-200"
                                style={{ backgroundColor: '#cbcbcb', borderWidth: '1px' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#b0b0b0'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#cbcbcb'}
                            >
                                Save
                            </button>
                            {isAdmin() && (
                                <button
                                    onClick={() => {
                                        exportData();
                                        // Note: Email notification removed - only send for review/approval actions
                                    }}
                                    className="px-3 py-1 text-black font-medium rounded-md border border-solid border-gray-400 transition-colors duration-200"
                                    style={{ backgroundColor: '#cbcbcb', borderWidth: '1px' }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#b0b0b0'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#cbcbcb'}
                                >
                                    Export JSON
                                </button>
                            )}
                            {isAdmin() && (
                                <button
                                onClick={async () => {
                                    if (!selectedClaimTitle) {
                                        alert('❌ Please select a claim from the dropdown first');
                                        return;
                                    }
                                    const confirmed = window.confirm(`Are you sure you want to publish "${selectedClaimTitle}" to the homepage? This will make it visible to all visitors.`);
                                    if (confirmed) {
                                        try {
                                            await publishDraftToLive(selectedClaimTitle);
                                            console.log(`✅ Successfully published "${selectedClaimTitle}" to data.js and homepage!`);
                                            // Force re-render to show updated data
                                            setClaimDataVersion(prev => prev + 1);
                                        } catch (error) {
                                            console.error('Error publishing data:', error);
                                            console.error(`❌ Error publishing data: ${error.message}`);
                                        }
                                    }
                                }}
                                className="px-3 py-1 text-black font-medium rounded-md border border-solid border-gray-400 transition-colors duration-200"
                                style={{ backgroundColor: '#cbcbcb', borderWidth: '1px' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#b0b0b0'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#cbcbcb'}
                            >
                                PUBLISH
                            </button>
                            )}
                            {isAdmin() && selectedClaimTitle && (
                                <button
                                    onClick={async () => {
                                        // First confirmation
                                        const firstConfirm = window.confirm(`⚠️ WARNING: You are about to PERMANENTLY DELETE "${selectedClaimTitle}" from the entire system.\n\nThis will remove it from:\n- Claims Editor\n- data.js file\n- localStorage\n- ClaimsList\n\nThis action CANNOT be undone!\n\nAre you sure you want to continue?`);
                                        
                                        if (!firstConfirm) return;
                                        
                                        // Second confirmation - type the title
                                        const typedTitle = prompt(`To confirm deletion, please type the EXACT claim title below:\n\n"${selectedClaimTitle}"`);
                                        
                                        if (typedTitle !== selectedClaimTitle) {
                                            alert('❌ Title does not match. Deletion cancelled for safety.');
                                            return;
                                        }
                                        
                                        // Final confirmation
                                        const finalConfirm = window.confirm(`🚨 FINAL CONFIRMATION\n\nYou typed the correct title. This is your LAST CHANCE to cancel.\n\nDelete "${selectedClaimTitle}" permanently?\n\n⚠️ THIS CANNOT BE UNDONE ⚠️`);
                                        
                                        if (!finalConfirm) return;
                                        
                                        try {
                                            await deleteClaimCompletely(selectedClaimTitle);
                                            alert(`✅ Successfully deleted "${selectedClaimTitle}" from the entire system.`);
                                            
                                            // Clear selection and refresh
                                            setSelectedClaimTitle('');
                                            setClaimData([]);
                                            setClaimDataVersion(prev => prev + 1);
                                            
                                        } catch (error) {
                                            console.error('Error deleting claim:', error);
                                            alert(`❌ Error deleting claim: ${error.message}`);
                                        }
                                    }}
                                    style={{
                                        backgroundColor: '#dc2626',
                                        color: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        marginLeft: '10px'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
                                >
                                    DELETE CLAIM
                                </button>
                        )}
                        </div>

                        {/* Last Draft Saved Message */}
                        {lastDraftSave && (
                            <div style={{ marginTop: '10px', fontSize: '12px', color: '#996600', textAlign: 'left' }}>
                                💾 Last draft saved: {new Date(lastDraftSave).toLocaleString()}
                            </div>
                        )}
                    </div>

                <div 
                    className={`tracker-container transition-all duration-500 ${isPopulating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                    style={{
                        opacity: isTableVisible ? 1 : 0,
                        animation: isTableVisible ? 'fadeInTable 0.6s ease-out' : 'none'
                    }}
                >
                    <table {...getTableProps()}>
                        <thead className="font-mono sticky top-0">
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            style={{
                                                color: 'black',
                                                cursor: 'pointer',
                                                minWidth: column.width || 'auto'
                                            }}
                                        >
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' ▼'
                                                        : ' ▲'
                                                    : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                const isRemoving = removingRows.has(row.index);
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        className={`claim-row ${isRemoving ? 'removing' : ''}`}
                                    >
                                        {row.cells.map(cell => (
                                            <td
                                                {...cell.getCellProps()}
                                                style={{ verticalAlign: 'top' }}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    
                    {/* Add data button - positioned below the table */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '12px',
                        borderTop: '1px solid #e5e5e5',
                        backgroundColor: '#d6d6d6'
                    }}>
                        <button
                            onClick={addNewRow}
                            className="btn-green"
                            style={{
                                padding: '8px 16px',
                                fontSize: '14px',
                                minHeight: 'auto'
                            }}
                        >
                            + Add data
                        </button>
                    </div>

                </div>

                {/* <BackToTop /> */}
                {/* <Footer /> */}

                {/* TO REVIEW Modal */}
                {showReviewModal && (
                    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4" style={{ backgroundColor: 'white' }}>
                            <h3 className="text-lg font-bold mb-4">Send to Review</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Add an optional message or attach a screenshot to provide context for the review.
                            </p>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Message (optional)</label>
                                <textarea
                                    id="reviewMessage"
                                    rows="3"
                                    className="w-full p-2 border border-gray-300 rounded-md resize-none"
                                    placeholder="Add any notes or context for the reviewer..."
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Screenshot (optional)</label>
                                <input
                                    type="file"
                                    id="reviewScreenshot"
                                    accept="image/*"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Attach a screenshot if it helps explain the issue
                                </p>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowReviewModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        const message = document.getElementById('reviewMessage').value;
                                        const screenshot = document.getElementById('reviewScreenshot').files[0];
                                        
                                        try {
                                            saveDraft();
                                            updateClaimStatus('NEEDS_REVIEW');
                                            setLastDraftSave(new Date().toISOString());
                                            
                                            // Store review message and screenshot info if provided
                                            if (message || screenshot) {
                                                const reviewData = {
                                                    message: message,
                                                    screenshot: screenshot?.name || null,
                                                    timestamp: new Date().toISOString(),
                                                    user: user?.email || 'anonymous'
                                                };
                                                localStorage.setItem(`review_data_${selectedClaimTitle}`, JSON.stringify(reviewData));
                                            }
                                            
                                            // Send email notification
                                            sendEmailNotification('Sent to Review', selectedClaimTitle, user?.email || 'anonymous', {
                                                message: message,
                                                screenshot: screenshot
                                            });
                                            
                                            setShowReviewModal(false);
                                            alert(`✅ Claim "${selectedClaimTitle}" sent to review` + (message ? ' with message' : '') + (screenshot ? ' with screenshot' : ''));
                                        } catch (error) {
                                            console.error('Error updating status:', error);
                                        }
                                    }}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                                >
                                    Send to Review
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* READY TO PUBLISH Modal */}
                {showReadyToPublishModal && (
                    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4" style={{ backgroundColor: 'white' }}>
                            <h3 className="text-lg font-bold mb-4">Ready to Publish</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Add an optional message or attach a screenshot to provide context for the approval.
                            </p>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Message (optional)</label>
                                <textarea
                                    id="readyToPublishMessage"
                                    rows="3"
                                    className="w-full p-2 border border-gray-300 rounded-md resize-none"
                                    placeholder="Add any notes or context for the approver..."
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Screenshot (optional)</label>
                                <input
                                    type="file"
                                    id="readyToPublishScreenshot"
                                    accept="image/*"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Attach a screenshot if it helps explain the changes
                                </p>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowReadyToPublishModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        const message = document.getElementById('readyToPublishMessage').value;
                                        const screenshot = document.getElementById('readyToPublishScreenshot').files[0];
                                        
                                        try {
                                            saveDraft();
                                            updateClaimStatus('READY_TO_PUBLISH');
                                            setLastDraftSave(new Date().toISOString());
                                            
                                            // Store ready to publish message and screenshot info if provided
                                            if (message || screenshot) {
                                                const readyData = {
                                                    message: message,
                                                    screenshot: screenshot?.name || null,
                                                    timestamp: new Date().toISOString(),
                                                    user: user?.email || 'anonymous'
                                                };
                                                localStorage.setItem(`ready_data_${selectedClaimTitle}`, JSON.stringify(readyData));
                                            }
                                            
                                            // Send email notification
                                            sendEmailNotification('Ready to Publish', selectedClaimTitle, user?.email || 'anonymous', {
                                                message: message,
                                                screenshot: screenshot
                                            });
                                            
                                            setShowReadyToPublishModal(false);
                                            console.log(`✅ Claim "${selectedClaimTitle}" marked as ready to publish` + (message ? ' with message' : '') + (screenshot ? ' with screenshot' : ''));
                                        } catch (error) {
                                            console.error('Error updating status:', error);
                                        }
                                    }}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                                >
                                    Send for Approval
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </HelmetProvider>
    );
}