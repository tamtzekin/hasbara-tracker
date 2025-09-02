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
import { data, summaries } from './data';
import { useAuth } from '../contexts/AuthContext';

// Helper function to format date as "9 Nov 2023"
const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default function EditableClaimTracker() {
    const { user, canAccessClaim, isAdmin } = useAuth();
    
    const metadataProps = {
        url: "https://hasbaratracker.com/admin/edit",
        title: "Admin - Edit Claims",
        description: "Administrative interface for editing claim data",
    };

    // Initial empty row structure
    const createEmptyRow = () => ({
        id: Date.now() + Math.random(),
        claimTitle: '',
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

    // Toggle edit mode for a row
    const toggleEdit = useCallback((rowIndex) => {
        setEditingRows(prev => {
            const newEditingRows = new Set(prev);
            if (newEditingRows.has(rowIndex)) {
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
            
            return newData;
        });
    }, [user]);

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
            
            return newData;
        });
    }, [user]);

    // Add new source to a row
    const addSource = useCallback((rowIndex) => {
        setClaimData(prevData => {
            const newData = [...prevData];
            newData[rowIndex].sources.push({ sourceName: '', sourceLink: '', archiveLink: '' });
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
            const newRow = createEmptyRow();
            setEditingRows(prevEditing => new Set([...prevEditing, prevData.length]));
            return [...prevData, newRow];
        });
    }, []);

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

        // Filter data by selected claim title
        const selectedClaimData = data.filter(item => item.claimTitle === claimTitle);
        
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

    // Get unique claim titles for dropdown (filtered by user permissions)
    const uniqueClaimTitles = useMemo(() => {
        const titles = data.reduce((acc, item) => {
            if (item.claimTitle && !acc.includes(item.claimTitle)) {
                // If admin, show all claims. If regular user, only show assigned claims
                if (isAdmin() || canAccessClaim(item.claimTitle)) {
                    acc.push(item.claimTitle);
                }
            }
            return acc;
        }, []);
        return titles.sort();
    }, [isAdmin, canAccessClaim]);

    // Get selected claim summary
    const selectedClaimSummary = useMemo(() => {
        if (!selectedClaimTitle) return '';
        const summary = summaries.find(s => s.claimMainTitle === selectedClaimTitle);
        return summary?.claimSummary || '';
    }, [selectedClaimTitle]);

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
                            backgroundColor: '#f0f0f0',
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
                                onClick={() => addSource(row.index)}
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
                    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
                    
                    if (diffHours < 1) return 'Just now';
                    if (diffHours < 24) return `${diffHours}h ago`;
                    
                    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substr(2)}`;
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

                {/* Header (fixed) */}
                <span className="header-container-fixed">
                    <span className="flex">
                        <Logo />
                        <MobileMenu />
                        <NavLinks />
                    </span>

                    {/* SELECT CLAIM Dropdown - moved to top */}
                    <div className="container mt-10 mobile:w-[100%] mobile:mt-[5%]">
                        <div className="mt-6 mb-6">
                            <label className="block text-sm font-medium mb-2">
                                <strong>SELECT CLAIM</strong>
                            </label>
                            <select
                                value={selectedClaimTitle}
                                onChange={(e) => handleClaimSelection(e.target.value)}
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
                            🔒 Admin Interface</div>
                            
                        <div className="mobile:mt-0 mobile:text-xs laptop:text-md laptop:w-7/12 mb-2 mt-1">
                            {selectedClaimTitle || 'Editable Claims Tracker'}</div>

                        <div className="mobile:text-xs mobile:mb-5 laptop:w-[60%] display:flex text-sm text-grey-faded mt-2 leading-6">
                            {selectedClaimSummary || 'Live editing interface for claims data. Click "Edit" to modify rows, add sources, and export JSON for your data.js file.'}
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
                                onClick={addNewRow}
                                className="btn-green"
                            >
                                + Add data
                            </button>
                            <button
                                onClick={exportData}
                                className="btn-green"
                            >
                                Export JSON
                            </button>
                        </div>
                    </div>
                </span>

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

                </div>

                {/* <BackToTop /> */}
                {/* <Footer /> */}
            </>
        </HelmetProvider>
    );
}