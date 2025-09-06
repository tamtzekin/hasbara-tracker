import React, { useState, useMemo, useCallback } from 'react';
import { useTable, useSortBy } from 'react-table';
import { HelmetProvider } from 'react-helmet-async';

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
import { NavLink } from 'react-router-dom';

// Helper function to format date as "9 Nov 2023"
const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
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
        draftData = parsed.draftData || [...data];
        draftSummaries = parsed.draftSummaries || [...summaries];
        console.log('📝 Loaded previously saved draft from', new Date(parsed.savedAt).toLocaleString());
    }
} catch (error) {
    console.warn('Failed to load saved draft, using fresh copy of data:', error);
}

// Function to save new claim to draft (not live data)
const saveNewClaimToDraft = (claimTitle, claimSummary) => {
    // Create the new summary object
    const newSummary = {
        claimMainTitle: claimTitle,
        claimSummary: claimSummary,
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

// Function to publish draft data to live data.js
const publishDraftToLive = async () => {
    try {
        // Prepare the data to send to the server
        const cleanedData = draftData.map(item => ({ ...item, isDraft: false }));
        const payload = {
            summaries: draftSummaries,
            data: cleanedData
        };

        // Debug: Log the payload being sent
        console.log('📤 Publishing:', {
            summaries: payload.summaries.length,
            data: payload.data.length
        });

        // Send POST request to the server API - use full URL to bypass proxy issues
        const response = await fetch('http://localhost:3001/api/publish-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Publish API error response:', errorData);
            console.error('Response status:', response.status);
            throw new Error(errorData.error || 'Failed to publish data');
        }

        const result = await response.json();
        
        // Update the in-memory data arrays only after successful server write
        data.length = 0;
        summaries.length = 0;
        data.push(...cleanedData);
        summaries.push(...draftSummaries);
        
        console.log('✅ Draft data successfully published to live data.js');
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

export default function EditableClaimTracker() {
    const { user, canAccessClaim, isAdmin, logout } = useAuth();
    
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
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [claimDataVersion, setClaimDataVersion] = useState(0); // To trigger dropdown re-render
    const [isDeletingClaim, setIsDeletingClaim] = useState(false); // Flag to prevent auto-saving during deletion
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

    // Function to populate table with selected claim data
    const handleClaimSelection = useCallback((claimTitle) => {
        if (!claimTitle) {
            setSelectedClaimTitle('');
            return;
        }

        setSelectedClaimTitle(claimTitle);
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

    // Get unique claim titles for dropdown (filtered by user permissions) - using draft data
    const uniqueClaimTitles = useMemo(() => {
        console.log(`🔍 CLAIM-EDITOR: Building dropdown claims list...`);
        console.log(`🔍 CLAIM-EDITOR: User is admin:`, isAdmin());
        console.log(`🔍 CLAIM-EDITOR: User assigned claims:`, user?.assignedClaims);
        console.log(`🔍 CLAIM-EDITOR: Total claims in draftData:`, draftData.length);
        
        const titles = draftData.reduce((acc, item) => {
            if (item.claimTitle && !acc.includes(item.claimTitle)) {
                const hasAccess = isAdmin() || canAccessClaim(item.claimTitle);
                console.log(`🔍 CLAIM-EDITOR: Checking claim "${item.claimTitle}" - hasAccess: ${hasAccess}`);
                
                if (hasAccess) {
                    acc.push(item.claimTitle);
                    console.log(`✅ CLAIM-EDITOR: Added claim to dropdown: "${item.claimTitle}"`);
                } else {
                    console.log(`❌ CLAIM-EDITOR: Skipped claim (no access): "${item.claimTitle}"`);
                }
            }
            return acc;
        }, []);
        
        console.log(`📋 CLAIM-EDITOR: Final dropdown claims list:`, titles);
        console.log(`📊 CLAIM-EDITOR: Total accessible claims: ${titles.length}`);
        return titles.sort();
    }, [isAdmin, canAccessClaim, claimDataVersion, user]);

    // Get selected claim summary - using draft summaries
    const selectedClaimSummary = useMemo(() => {
        if (!selectedClaimTitle) return '';
        const summary = draftSummaries.find(s => s.claimMainTitle === selectedClaimTitle);
        return summary?.claimSummary || '';
    }, [selectedClaimTitle, claimDataVersion]);

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
                        <textarea
                            value={row.original.description.details || ''}
                            onChange={(e) => {
                                e.stopPropagation();
                                updateField(row.index, 'description.details', e.target.value);
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
                                resize: 'vertical'
                            }}
                            rows="4"
                            placeholder="Details"
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

                {/* Header */}
                <Header />

                {/* SELECT CLAIM Dropdown - moved to top */}
                <div className="container mt-10 mobile:w-[100%] mobile:mt-[5%]">
                    <div className="mt-6 mb-4">
                            <label className="block text-sm font-medium mb-0 font-lores">
                                <strong>SELECT CLAIM</strong>
                            </label>
                            <select
                                value={isCreatingNew ? 'CREATE_NEW' : selectedClaimTitle}
                                onChange={(e) => {
                                    if (e.target.value === 'CREATE_NEW') {
                                        setIsCreatingNew(true);
                                        setSelectedClaimTitle('');
                                        setNewClaimTitle('');
                                        setNewClaimSummary('');
                                        // Clear the table data
                                        setClaimData([]);
                                        setEditingRows(new Set());
                                    } else {
                                        setIsCreatingNew(false);
                                        handleClaimSelection(e.target.value);
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    padding: '8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    backgroundColor: 'white',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="">-- Select a claim to edit --</option>
                                <option value="CREATE_NEW">+ CREATE NEW CLAIM</option>
                                {uniqueClaimTitles.map((title) => (
                                    <option key={title} value={title}>
                                        {title}
                                    </option>
                                ))}
                            </select>
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
                            ) : (
                                selectedClaimTitle ? `'${selectedClaimTitle}'` : 'Editable Claims Tracker'
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
                                                        saveNewClaimToDraft(newClaimTitle, newClaimSummary);
                                                        
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
                                selectedClaimSummary || 'Live editing interface for claims data. Click "Edit" to modify rows, add sources, and export JSON for your data.js file.'
                            )}
                        </div>

                        {/* Show loading indicator when populating */}
                        {isPopulating && (
                            <div className="mt-2 mb-4 text-blue-600 text-sm">
                                <span>📊 Populating table with claim data...</span>
                            </div>
                        )}


                        {/* Admin controls */}
                        <div className="flex gap-2 mt-4 mb-6">
                            <button
                                onClick={exportData}
                                className="btn-green"
                            >
                                Export JSON
                            </button>
                            <button
                                onClick={() => {
                                    try {
                                        saveDraft();
                                        setLastDraftSave(new Date().toISOString());
                                        alert('✅ Draft saved successfully! Your changes are now saved locally.');
                                    } catch (error) {
                                        console.error('Error saving draft:', error);
                                        alert('❌ Error saving draft. Please try again.');
                                    }
                                }}
                                className="btn-green"
                                style={{
                                    backgroundColor: '#b7fbf3',
                                    fontWeight: 'bold'
                                }}
                            >
                                SAVE AS DRAFT
                            </button>
                            {isAdmin() && (
                                <button
                                onClick={async () => {
                                    const confirmed = window.confirm('Are you sure you want to publish all draft changes to the live data.js file? This action cannot be undone.');
                                    if (confirmed) {
                                        try {
                                            await publishDraftToLive();
                                            alert('✅ Successfully published draft data to live data.js file!');
                                            // Force re-render to show updated data
                                            setClaimDataVersion(prev => prev + 1);
                                        } catch (error) {
                                            console.error('Error publishing data:', error);
                                            alert(`❌ Error publishing data: ${error.message}`);
                                        }
                                    }
                                }}
                                className="btn-green"
                                style={{
                                    backgroundColor: '#78ff96',
                                    fontWeight: 'bold'
                                }}
                            >
                                PUBLISH
                            </button>
                        )}
                            {selectedClaimTitle && (
                                <button
                                    onClick={async () => {
                                        const doubleConfirm = window.confirm(`⚠️ WARNING: You are about to permanently delete the entire claim "${selectedClaimTitle}" from the database.\n\nThis will:\n- Remove all data for this claim\n- Create a backup of the current data.js file\n- This action CANNOT be undone\n\nAre you absolutely sure you want to proceed?`);
                                        
                                        if (doubleConfirm) {
                                            const finalConfirm = window.confirm(`FINAL CONFIRMATION: Type "${selectedClaimTitle}" in the next prompt to confirm deletion.`);
                                            if (finalConfirm) {
                                                const userInput = window.prompt(`Type the exact claim title to confirm deletion:\n"${selectedClaimTitle}"`);
                                                if (userInput === selectedClaimTitle) {
                                                    try {
                                                        // Set deletion flag to prevent auto-saving
                                                        setIsDeletingClaim(true);
                                                        console.log('🚫 Deletion mode activated - auto-save disabled');
                                                        
                                                        // Create backup first
                                                        const backupData = {
                                                            data: [...data],
                                                            summaries: [...summaries],
                                                            deletedAt: new Date().toISOString(),
                                                            deletedClaim: selectedClaimTitle
                                                        };
                                                        
                                                        // Clean up old backups to prevent localStorage quota issues
                                                        const backupKey = `hasbara_backup_${Date.now()}`;
                                                        try {
                                                            // Remove old backups (keep only latest 3)
                                                            const allKeys = Object.keys(localStorage);
                                                            const backupKeys = allKeys.filter(key => key.startsWith('hasbara_backup_')).sort();
                                                            while (backupKeys.length > 2) { // Keep 2, add 1 = 3 total
                                                                localStorage.removeItem(backupKeys.shift());
                                                            }
                                                            localStorage.setItem(backupKey, JSON.stringify(backupData));
                                                            console.log('💾 Backup saved:', backupKey);
                                                        } catch (quotaError) {
                                                            console.warn('⚠️ localStorage quota exceeded, skipping backup:', quotaError);
                                                        }
                                                        
                                                        // Remove from draft data
                                                        console.log('🔍 DELETE Debug Info:');
                                                        console.log('- Selected claim title:', selectedClaimTitle);
                                                        console.log('- Draft data count before filter:', draftData.length);
                                                        console.log('- Draft summaries count before filter:', draftSummaries.length);
                                                        
                                                        const newDraftData = draftData.filter(item => item.claimTitle !== selectedClaimTitle);
                                                        const newDraftSummaries = draftSummaries.filter(item => item.claimMainTitle !== selectedClaimTitle);
                                                        
                                                        console.log('- Draft data count after filter:', newDraftData.length);
                                                        console.log('- Draft summaries count after filter:', newDraftSummaries.length);
                                                        console.log('- Deletion successful:', draftData.length > newDraftData.length || draftSummaries.length > newDraftSummaries.length);
                                                        
                                                        draftData.length = 0;
                                                        draftSummaries.length = 0;
                                                        draftData.push(...newDraftData);
                                                        draftSummaries.push(...newDraftSummaries);
                                                        
                                                        // Delete the associated component file
                                                        try {
                                                            const token = sessionStorage.getItem('hasbaratracker_token') || localStorage.getItem('hasbaratracker_token');
                                                            const response = await fetch(`http://localhost:3001/api/claims/${encodeURIComponent(selectedClaimTitle)}/file`, {
                                                                method: 'DELETE',
                                                                headers: {
                                                                    'Authorization': `Bearer ${token}`,
                                                                    'Content-Type': 'application/json'
                                                                }
                                                            });
                                                            
                                                            if (response.ok) {
                                                                const result = await response.json();
                                                                console.log('✅ Component file deletion result:', result.message);
                                                            } else {
                                                                console.warn('⚠️ Failed to delete component file:', await response.text());
                                                            }
                                                        } catch (fileDeleteError) {
                                                            console.error('❌ Error deleting component file:', fileDeleteError);
                                                            // Don't block the claim deletion if file deletion fails
                                                        }
                                                        
                                                        // Publish the deletion
                                                        await publishDraftToLive();
                                                        
                                                        // Clear the localStorage draft to prevent restoration of deleted claim
                                                        localStorage.removeItem('hasbaratracker_draft_save');
                                                        console.log('🗑️ Cleared localStorage draft after deletion (key: hasbaratracker_draft_save)');
                                                        
                                                        alert(`✅ Claim "${selectedClaimTitle}" has been successfully deleted.\n\n🔒 A backup has been saved locally in case you need to recover the data.`);
                                                        
                                                        // Reset the interface
                                                        setSelectedClaimTitle('');
                                                        setClaimData([createEmptyRow()]);
                                                        setEditingRows(new Set([0]));
                                                        setClaimDataVersion(prev => prev + 1);
                                                        
                                                        // Clear deletion flag
                                                        setIsDeletingClaim(false);
                                                        console.log('✅ Deletion mode deactivated - auto-save re-enabled');
                                                        
                                                    } catch (error) {
                                                        console.error('Error deleting claim:', error);
                                                        console.error('Draft data length:', draftData.length);
                                                        console.error('Draft summaries length:', draftSummaries.length);
                                                        console.error('Selected claim title:', selectedClaimTitle);
                                                        alert(`❌ Error deleting claim: ${error.message}\n\nCheck browser console for more details.`);
                                                        
                                                        // Clear deletion flag even on error
                                                        setIsDeletingClaim(false);
                                                        console.log('🔄 Deletion mode deactivated after error - auto-save re-enabled');
                                                    }
                                                } else {
                                                    alert('❌ Deletion cancelled - claim title did not match.');
                                                }
                                            }
                                        }
                                    }}
                                    className="btn-green"
                                    style={{
                                        backgroundColor: '#ff6b6b',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}
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

                <div className={`tracker-container transition-all duration-500 ${isPopulating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
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
            </>
        </HelmetProvider>
    );
}