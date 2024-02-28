import React, { useMemo, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';


import './Tracker.css';
import '../App.css';

import data from './data';
import VideoPlayer from './VideoPlayer';
import Header from './Header';
import ClaimFilter from './ClaimFilter';
import SearchBar from './SearchBar';

import MobileMenu from './MobileMenu';
import Logo from './Logo';
import Footer from './Footer';

export default function Tracker() {
    // defines claim tags for dropdown (ClaimFilter.js)
    const uniqueClaimTitles = useMemo(() => {
        const claimTitlesSet = new Set(data.map((item) => item.claimTitle));
        return Array.from(claimTitlesSet);
        }, [data]);
    
    const [selectedClaimTitle, setSelectedClaimTitle] = useState('');
    
    // State to hold the current claim's summary
    const [currentClaimSummary, setCurrentClaimSummary] = useState('');

    const claimTitle = data.map(item => item.claimTitle);
    const claimSummary = data.map(item => item.claimSummary);
    
    // Set mobile/phone view dimensions
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 576);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const claimSummaryText = useMemo (
        () => [
            {
                Header: 'Claim summary',
                accessor: 'claimSummary',
            },
        ]
    )
    // Pull all the claims data
    const columns = useMemo(
        () => [
            // Claim title eg. 'Forty beheaded babies'
            {
                Header: 'The claim',
                accessor: 'claimTitle',
                Cell: ({ cell }) => (
                    // TODO: Do we want the claim name clickable or not
                    <Link to="/tracker?filter={cell.value}">{cell.value}</Link>
                )
            },
            {
                Header: 'Date',
                accessor: 'date',
                sortType: (rowA, rowB, columnId) => {
                    const dateA = new Date(rowA.values[columnId]);
                    const dateB = new Date(rowB.values[columnId]);
                    return dateA.getTime() - dateB.getTime();
                },
                Cell: ({ cell }) => (
                    <div>
                        {cell.value}
                    </div>
                ),
            },
            
            // Detailed description on each claim
            {
                Header: 'Details',
                accessor: (row) => `${row.description.summary} ${row.description.details}`,
                Cell: ({ row }) => (
                    <>
                        <div style={{ maxWidth: 650, textWrap: 'pretty' }}>
                            <details>
                                <summary><u>{row.original.description.summary}</u>
                                    <span className='expand-text'></span>
                                </summary>
                                <article className="claim-paragraph">
                                    <div dangerouslySetInnerHTML={{ __html: row.original.description.details }} />
            
            
                                    {/* On Mobile: render Source links inside the expandable element */}
                                    {isMobileView && (
                                        <>
                                            <div className="source-heading"></div>
                                            {row.original.sources.map((source, index) => (
                                                <VideoPlayer key={index} videoPreviewLink={source.videoPreviewLink}>
                                                    <div key={index} className="source">
                                                        <a href={source.sourceLink} target="_blank" rel="noreferrer">
                                                            {source.videoPreviewLink && (
                                                                <span className='icon-playarrow'></span>
                                                            )}
                                                            {!source.videoPreviewLink && (
                                                                <span className='icon-link'></span>
                                                            )}
                                                            
                                                            <span dangerouslySetInnerHTML={{ __html: source.sourceName }} />

                                                        </a>

                                                        {source.archiveLink && (
                                                                <a className="archive-link" href={source.archiveLink} target="_blank" rel="noreferrer">
                                                                    <span className="text-grey-faded italic text-xs ml-4">Archive</span>
                                                                </a>
                                                        )}
                                                    </div>
                                                </VideoPlayer>
                                            ))}
                                        </>
                                    )}
            
                                </article>
                            </details>
                        </div>
                    </>
                ),
            },


            // Context/Claim/Debunk tag
            {
                Header: ' ',
                accessor: (row) => row.claim.claimText,
                Cell: ({ row }) => (
                    <span className={row.original.claim.claimTag}>
                        {row.original.claim.claimText}
                    </span>
                ),
            },

            {
                Header: 'Sources',
                accessor: 'sources',
                Cell: ({ row }) => {
                    const sources = row.original.sources || [];

                    // On Desktop: render the sources on the right side. If on mobile, hide them.
                    if (!isMobileView) {
                    return (
                        <>
                            <div className="source-heading"></div>

                            {row.original.sources.map((source, index) => (
                                <VideoPlayer key={index} videoPreviewLink={source.videoPreviewLink}>
                                    <div key={index} className="source">

                                        <a href={source.sourceLink} target="_blank" rel="noreferrer"
                                        aria-hidden="true" 
                                        // sets class if source is a deleted source
                                        className={source.hasBeenDeleted === 'true' ? 'deleted-source' : ''}>
                                            {/* If there's a video preview available, show a play button icon */}
                                            {source.videoPreviewLink && (
                                                <>
                                                    <span className='icon-playarrow'></span>
                                                </>
                                            )}

                                            {/* If no video preview available, assume it's a regular link, show a circle icon instead */}
                                            {!source.videoPreviewLink && (
                                                <>
                                                    <div className='icon-link'></div>
                                                </>
                                            )}

                                            {/* If a source has been deleted by the original publisher, show a red strikethrough */}
                                            {source.hasBeenDeleted === 'true' ? (
                                                <strike style={{color:'red'}}>
                                                    <span style={{color:'grey'}}>{source.sourceName}</span>
                                                </strike>

                                                ) : (
                                                    <span className="" dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                )}                                        
                                        </a>

                                        {/* If there's an archiveLink in the data, add an 'Archive' link below the source link */}
                                        {source.archiveLink && ( 
                                                <a className="archive-link" href={source.archiveLink} target="_blank" rel="noreferrer" aria-hidden="true">
                                                    <span className="text-grey-faded text-xs italic ml-4">Archive</span>
                                                </a>
                                            )}

                                            {/* Warns users that the link opens in new tab – only visible to Text-To-Speech */}
                                            <span className="visually-hidden">Opens in new tab</span>
                                    </div>
                                </VideoPlayer>
                            ))}
                        </>
                    );
                    
                    // On Mobile: don't show the sources in the last column
                    } else {
                        return null;
                    }
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
        state,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [{ id: 'date', desc: false }],
                globalFilter: new URLSearchParams(window.location.search).get('claim') || '', // allows URL queries to set filter
            },
            disableSortRemove: true,
        },
        useFilters,
        useGlobalFilter,
        useSortBy
    );

    // Sets state based on what is in the search box
    const { globalFilter } = state;

    return (
        <>

<span className="header-container-fixed">
            <div className="flex-container">
                <MobileMenu />
                    <Logo />
                    <div>{claimSummary}</div>
            </div>
        </span>
        
        <div className=" mobile:invisible">
            {/* {location.pathname !== '/about' && location.pathname !== '/' && ( */}
                <li className="undotted">
                    <NavLink to="/">Claims</NavLink>
                </li>
            {/* )} */}

            {/* {location.pathname !== '/submit-claim' && ( */}
            <li className="undotted">
                <NavLink to="/submit-claim">Submit a claim</NavLink>
            </li>
            {/* )} */}

            <li className="undotted">
                <NavLink to="/volunteer">Volunteer</NavLink>
            </li>

            <li className="undotted">
                <NavLink to="/about">About</NavLink>
            </li>
        </div>


        {/* TODO: make claim summaries */}
            {/* Summary of claim */}
            

            {/* Show desktop view of Tracker */}
            {!isMobileView && (
                <>
                    <div className="search-bar-container">
                        <ClaimFilter 
                            claimTitles={uniqueClaimTitles} setGlobalFilter={setGlobalFilter} 
                        />
                        <SearchBar 
                            filter={globalFilter || ''} setFilter={setGlobalFilter} 
                        />
                    </div>

                    <div className="tracker-container">
                        {/* Show 'how to' text when no results are found */}
                        {rows.length === 0 ? (
                            <>
                                <div className="no-results-text">No results found. Try searching a different word or phrase.</div>
                                <div className="how-to">
                                    How to use the tracker:
                                    <ul className="dotted">
                                        <li className="dotted">Use the dropdown list to select a major claim and see all records of the claim.</li>
                                        <li className="dotted">Use the search bar to look up words, phrases or topics (eg. ‘hospital’, ‘biden’, ‘al jazeera’)</li>
                                        <li className="dotted">You can search by type of claim with ‘claim’, ‘debunk’ or ‘context’</li>
                                        <li className="dotted">Click ‘Date ▲’ to change the order of events (desktop only)</li>
                                        <li className="dotted">Hover over a source with <span className="icon-play"></span> to preview video (If you’re on your phone, tap + hold the link)</li>
                                        <li className="dotted">Click each Source to open an archived link</li>
                                        <li className="dotted">Click + and ⎯ to show more or less text</li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            // Renders all claims data as a table
                            <table {...getTableProps()}>
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th
                                                    {...column.getHeaderProps(
                                                        column.id === 'date' ? column.getSortByToggleProps() : {}
                                                    )}
                                                    style={{
                                                        color: 'black',
                                                        cursor: column.id === 'date' ? 'ns-resize' : 'auto',
                                                    }}
                                                >
                                                    {column.render('Header')}
                                                    {column.id === 'date' && column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell, index) => (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        style={{
                                                            padding: '15px',
                                                            borderBottom: '1px dashed grey',
                                                            overflow: 'hidden',
                                                            width: // Set fixed column widths
                                                                index === 0 ? '20%' :
                                                                index === 1 ? '9%' :
                                                                index === 2 ? '35%' :
                                                                index === 3 ? '8%' :
                                                                '17%',
                                                        }}
                                                    >
                                                        {cell.render('Cell')}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}

            
            {/* Show mobile/phone view of Tracker */}
            {isMobileView && (
                <>
                 <div className="tools-background">
                    <div className="search-bar-container">
                        <ClaimFilter claimTitles={uniqueClaimTitles} setGlobalFilter={setGlobalFilter} />
                        <SearchBar filter={globalFilter || ''} setFilter={setGlobalFilter} />
                    </div>
                </div>

                    <div className="tracker-container">

                        {/* Show 'how to' text when no results are found */}
                        {rows.length === 0 ? (
                            <>
                                <div className="no-results-text">No results found. Try searching a different word or phrase.</div>
                                <div className="how-to">
                                    How to use the tracker:
                                    <ul>
                                        <li>Use the dropdown list to select a major claim and see all records of the claim.</li>
                                        <li>Use the search bar to look up words, phrases or topics (eg. ‘hospital’, ‘biden’, ‘al jazeera’)</li>
                                        <li>You can search by type of claim with ‘claim’, ‘debunk’ or ‘context’</li>
                                        <li>Click ‘Date ▲’ to change the order of events (desktop only)</li>
                                        <li>Hover over a source with <span className="icon-play"></span> to preview video (If you’re on your phone, tap + hold the link)</li>
                                        <li>Click each Source to open an archived link</li>
                                        <li>Click + and ⎯ to show more or less text</li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            // Renders all claims data in div blocks, instead of a table
                            <div {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <div key={row.id} className="data-row" style={{ display: 'block', alignItems: 'center' }}>
                                            {row.cells.map((cell, index) => (
                                                <div
                                                    key={cell.column.id}
                                                    className={`data-cell ${cell.column.Header.toLowerCase()}`}
                                                >
                                                    {cell.render('Cell')}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </>
            )}

            <div className="back-to-top"><a href="#top">🔺 Back to top</a></div>

            <Footer />
        </>
    );
}
