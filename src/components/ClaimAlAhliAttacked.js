import React, { useMemo, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { Helmet } from 'react-helmet';

import './Tracker.css';
import '../App.css';

import { data, summaries } from './data';
import VideoPlayer from './VideoPlayer';
import Header from './Header';
import ClaimFilter from './ClaimFilter';
import SearchBar from './SearchBar';

import MobileMenu from './MobileMenu';
import Logo from './Logo';
import Footer from './Footer';

export default function ClaimAlAhliAttacked() {
    // defines claim tags for dropdown (ClaimFilter.js)
    const uniqueClaimTitles = useMemo(() => {
        const claimTitlesSet = new Set(data.map((item) => item.claimTitle));
        return Array.from(claimTitlesSet);
        }, [data]);
    
    const [selectedClaimTitle, setSelectedClaimTitle] = useState('');
        

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


    // Pull all the claims data
    const columns = useMemo(() => {

        // Mobile: the 'Type' is higher up, so the context/claim/debunk tags can be positioned properly
        if (isMobileView) {    
            return [

                // Title of claim
                {
                    Header: 'The claim',
                    accessor: 'claimTitle',
                    Cell: ({ cell }) => (
                        <>{cell.value}</>
                    )
                },

                // Date
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

                // Context/Claim/Debunk tag
                {
                    Header: 'Type',
                    accessor: (row) => row.claim.claimText,
                    Cell: ({ row }) => (
                        <span className={row.original.claim.claimTag}>
                            {row.original.claim.claimText}
                        </span>
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
            
                                    {/* Show source links inside the expandable element */}
                                    <div className="source-heading"></div>
                                    
                                    {row.original.sources.map((source, index) => (
                                        <VideoPlayer key={index} videoPreviewLink={source.videoPreviewLink}>
                                            <div key={index} className="source">
                                                    {source.videoPreviewLink && (
                                                        <a href={source.sourceLink} target="_blank" rel="noreferrer">
                                                            <ul className="icon-playarrow">
                                                                <li>
                                                                    <span dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                                </li>
                                                            </ul>
                                                        </a>
                                                    )}
            
                                                    {/* If there's no video link, show icon link (circle) */}
                                                    {!source.videoPreviewLink && (
                                                        <a href={source.sourceLink} target="_blank" rel="noreferrer">
                                                            <ul className="icon-link">
                                                                <li>
                                                                    <span dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                                </li>
                                                            </ul>
                                                        </a>
                                                    )}
                                                                                                        
                                    {/* If there is an archive link, show the archive link */}
                                    {source.archiveLink && (
                                        <ul>
                                            <li>
                                                <a className="archive-link" href={source.archiveLink} target="_blank" rel="noreferrer">
                                                    <span className="text-grey-faded italic text-xs ml-4 mobile:ml-8">Archive</span>
                                                </a>
                                            </li>
                                        </ul>                                                                    
                                        )}
                                </div>
                                        </VideoPlayer>
                                    ))}
                                </article>
                            </details>
                        </div>
                        </>
                    ),
                },
        ];


        // Render desktop tracker, with different order of columns
        } else {
            return [

                // Title of claim
                {
                    Header: 'The claim',
                    accessor: 'claimTitle',
                    Cell: ({ cell }) => (
                        <>{cell.value}</>
                    )
                },

                // Date claim was made
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
                
                // Detailed description on each claim, expandable
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
                                </article>
                            </details>
                        </div>
                        </>
                    ),
                },
            

                // Context/Claim/Debunk tag
                {
                    Header: 'Type',
                    accessor: (row) => row.claim.claimText,
                    Cell: ({ row }) => (
                            <span className={row.original.claim.claimTag}>
                                {row.original.claim.claimText}
                            </span>
                    ),
                },
                        
                // Source links, and how source link icons are handled
                {
                    Header: 'Sources',
                    accessor: 'sources',
                    Cell: ({ row }) => {
                        const sources = row.original.sources || [];
    
                        // Render source links in last column (for desktop)
                        return (
                            <>
                            <div className="source-heading"></div>

                            {row.original.sources.map((source, index) => (
                                <VideoPlayer key={index} videoPreviewLink={source.videoPreviewLink}>
                                    <div key={index} className="source text-xs">

                                            {/* If there's a video preview available, show play icon (play triangle) */}
                                            {source.videoPreviewLink && (
                                                    <ul className="icon-playarrow">
                                                        <li>
                                                            <a href={source.sourceLink} target="_blank" rel="noreferrer" aria-hidden="true" className={source.hasBeenDeleted === 'true' ? 'deleted-source' : ''}>
                                                                <span className="" dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                            </a>
                                                        </li>
                                                    </ul>
                                            )}
    
                                            {/* If no video preview, show link icon (circle)) */}
                                            {!source.videoPreviewLink && (
                                                    <ul className='icon-link'>
                                                        <li>
                                                            <a href={source.sourceLink} target="_blank" rel="noreferrer" aria-hidden="true" className={source.hasBeenDeleted === 'true' ? 'deleted-source' : ''}>
                                                                <span className="" dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                            </a>
                                                        </li>
                                                    </ul>
                                            )}
    
                                            {/* If a source has been deleted by the original publisher, show a red strikethrough */}
                                            {/* {source.hasBeenDeleted === 'true' ? (
                                                <strike style={{color:'red'}}>
                                                    <span style={{color:'grey'}}>{source.sourceName}</span>
                                                </strike>

                                                ) : (
                                                    <span className="" dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                )}                                         */}

    
                                            {/* If there's an archiveLink in the data, add an 'Archive' link below the source link */}
                                            {source.archiveLink && ( 
                                                <ul>
                                                    <li className="ml-4">
                                                        <a className="archive-link" href={source.archiveLink} target="_blank" rel="noreferrer" aria-hidden="true">
                                                            <span className="text-grey-faded text-xs italic">Archive&nbsp;</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            )}
    
                                            {/* Warns users that the link opens in new tab – only visible to Text-To-Speech */}
                                            <span className="visually-hidden">Opens in new tab</span>
                                        </div>
                                        
                                    </VideoPlayer>
                                ))}
                            </>
                        );  
                    },
                },    
            ];
        }
    }, [isMobileView]);


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
                globalFilter: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces'
                // globalFilter: new URLSearchParams(window.location.search).get('claim') || '', // allows URL queries to set filter
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
        <Helmet>
            {/* HTML meta tags */}
            <title>Claim: ‘Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces’ | Hasbara Tracker</title>
            <meta name="description" content="Israeli officials claim Israeli forces do not bomb hospitals, and that the Al-Shifa Hospital attack was a misfired rocket from the Palestinian resistance." />

            <meta property="og:url" content="https://hasbaratracker.com/al-ahli-attacked" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Hasbara Tracker" />
            <meta property="og:title" content="Claim: ‘Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces’" />
            <meta name="twitter:description" content="Israeli officials claim Israeli forces do not bomb hospitals, and that the Al-Shifa Hospital attack was a misfired rocket from the Palestinian resistance." />
            <meta property="og:image" content="https://files.hasbaratracker.com/htlogo_twittercard.jpg" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="hasbaratracker.com" />
            <meta name="twitter:site" content="@hasbaratracker" />
            <meta property="twitter:url" content="https://hasbaratracker.com/forty-beheaded-babies" />
            <meta name="twitter:title" content="Claim: ‘Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces’" />
            <meta name="twitter:description" content=" Israeli officials claim Israeli forces do not bomb hospitals, and that the Al-Shifa Hospital attack was a misfired rocket from the Palestinian resistance." />
            <meta name="twitter:image" content="https://files.hasbaratracker.com/htlogo_twittercard.jpg" />
            <meta name="twitter:creator" content="@hasbaratracker" />
        </Helmet>

    {/* Header (fixed) */}
    <span className="header-container-fixed">
        <span className="flex mobile:mt-[1%] mobile:ml-[-0.3%]">
            {/* Logo */}
            <div className="mobile:w-9/10 laptop:w-1/5 mr-auto">
                <Link to="/"><Logo /></Link>
            </div>

        {/* Mobile menu toggle */}
            <span className="mobile:mt-[3%]">
                <MobileMenu />
            </span>

            {/* Nav links */}
            <span className="nav-links-fixed mobile:invisible">
                <li className="undotted">
                    <NavLink to="/">Claims</NavLink>
                </li>
                <li className="undotted">
                    <NavLink to="/submit-claim">Submit a claim</NavLink>
                </li>
                <li className="undotted">
                    <NavLink to="/volunteer">Volunteer</NavLink>
                </li>
                <li className="undotted">
                    <NavLink to="/about">About</NavLink>
                </li>
        </span>

    </span>


            {/* Claim summary */}
            <div className="claim-summary container mt-10 mobile:w-[100%] mobile:mt-[5%]">
                <div className="mobile:text-xs laptop:w-7/12 laptop:text-md font-lores font-bold">
                    The claim</div>
                    
                <div className="mobile:mt-0 mobile:text-xs laptop:text-md laptop:w-7/12 mb-2 mt-1">
                    ‘{summaries[1].claimMainTitle}’</div>

                <div className="mobile:text-xs mobile:mb-5 laptop:w-[60%] display:flex text-sm text-grey-faded mt-2 leading-6">
                    {summaries[1].claimSummary}
                </div>
            </div>            
        </span>
        

            {/* Show desktop view of Tracker - as a table */}
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
                                <thead className="font-mono sticky top-0">
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
                                                        <div className="header-container-border"></div>

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
                                                            padding: '40px 40px 40px 0',
                                                            borderBottom: '1px dashed #5e5e5e',
                                                            overflow: 'visible',
                                                            width: // Set fixed column widths
                                                                index === 0 ? '20%' :
                                                                index === 1 ? '9%' :
                                                                index === 2 ? '36%' :
                                                                index === 3 ? '7%' :
                                                                '18%',
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

            
            {/* Show mobile view of Tracker table - as cards */}
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

                    // Renders all claims data in divs, instead of a table
                    <div {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <div key={row.id} 
                                    className="data-row" 
                                    style={{ 
                                        display: 'block',
                                        alignItems: 'center' 
                                    }}>
                                    {row.cells.map((cell, index) => (
                                        <div key={cell.column.id} className={`data-cell ${cell.column.Header.toLowerCase()}`}>
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
