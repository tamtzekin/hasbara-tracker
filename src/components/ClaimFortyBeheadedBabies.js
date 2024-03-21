import React, { useMemo, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import './Tracker.css';
import '../App.css';

import { data, summaries } from './data';
// import VideoPlayer from './VideoPlayer';
import Header from './Header';
import ClaimFilter from './ClaimFilter';
import SearchBar from './SearchBar';
import TrackerColumns from './TrackerColumns';

import MobileMenu from './MobileMenu';
import Logo from './Logo';
import NavLinks from './NavLinks'
import Footer from './Footer';
import BackToTop from './BackToTop';


export default function ClaimFortyBeheadedBabies() {
    // defines claim tags for dropdown (ClaimFilter.js)
    const uniqueClaimTitles = useMemo(() => {
        const claimTitlesSet = new Set(data.map((item) => item.claimTitle));
        return Array.from(claimTitlesSet);
        }, [data]);
    
    const [selectedClaimTitle, setSelectedClaimTitle] = useState('');
    

    // Set mobile/phone view dimensions
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);

    // Force to render if <= 576, so the Sourrce links don't have the hovered video player attached.
    const [forceRender, setForceRender] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            const newIsMobileView = window.innerWidth <= 576;
            setIsMobileView(newIsMobileView);
            if (newIsMobileView) {
                setForceRender((prev) => !prev); // Toggle forceRender
                console.log('rerender');
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    // Pull all the claims data, change order based on desktop/mobile
    const columns = useMemo(() => {
        return TrackerColumns({ isMobileView });
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
                globalFilter: 'Forty beheaded babies'
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
    <HelmetProvider>
    <>
        <Helmet>
            {/* HTML meta tags */}
            {/* Important metadata */}
            <meta name="url" property="og:url" content="https://hasbaratracker.com/forty-beheaded-babies" />
            <meta name="type" property="og:type" content="article" />
            <meta name="site_name" property="og:site_name" content="Claim: ‘Forty beheaded babies’" />
            <meta name="site_name" property="og:site_name" content="Hasbara Tracker" />
            <title>Claim: ‘Forty beheaded babies’</title>
            <meta name="title" property="og:title" content="Claim: ‘Forty beheaded babies’" />
            <meta name="description" property="og:description" content="Israeli officials claimed up to 40 babies were decapitated in kibbutzes following Operation Al-Aqsa Flood on 7 October, 2023. Versions of this fabrication have been repeated by politicians and the media globally." />
            <meta name="image" property="og:image" content="https://files.hasbaratracker.com/htlogo_twittercard.jpg" />
            
            <meta property="twitter:image:alt" content="In a pixellated font, the title reads: Hasbara Tracker - Debunking Israeli propaganda" />

            {/* Twitter link preview metadata */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@hasbaratracker" />
            <meta name="twitter:title" content="Claim: ‘Forty beheaded babies’" />
            <meta name="twitter:creator" content="@hasbaratracker" />
            <meta name="twitter:description" content="Israeli officials claimed up to 40 babies were decapitated in kibbutzes following Operation Al-Aqsa Flood on 7 October, 2023. Versions of this fabrication have been repeated by politicians and the media globally." />
            <meta name="twitter:image" content="https://files.hasbaratracker.com/htlogo_twittercard.jpg" />
            <meta property="twitter:url" content="https://hasbaratracker.com/forty-beheaded-babies" />
            <meta property="twitter:domain" content="hasbaratracker.com" />
        </Helmet>


    {/* Header (fixed) */}
    <span className="header-container-fixed">
        <span className="flex">
            <Logo />
            <MobileMenu />
            <NavLinks />
        </span>

            {/* Claim summary */}
            <div className="claim-summary container mt-10 mobile:w-[100%] mobile:mt-[5%]">
                <div className="mobile:text-xs laptop:w-7/12 laptop:text-md font-lores font-bold">
                    The claim</div>
                    
                <div className="mobile:mt-0 mobile:text-xs laptop:text-md laptop:w-7/12 mb-2 mt-1">
                    ‘{summaries[0].claimMainTitle}’</div>

                <div className="mobile:text-xs mobile:mb-5 laptop:w-[60%] display:flex text-sm text-grey-faded mt-2 leading-6">
                    {summaries[0].claimSummary}
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
                                                    {/* 'Date' heading */}
                                                    <span style={{ marginRight: '0.25rem'}}>
                                                        {column.render('Header')}
                                                    </span>

                                                    {/* 'Date' asc/desc arrow */}
                                                    {column.id === 'date' && column.isSorted ? (
                                                        <span style={{ verticalAlign: 'middle' }}>
                                                            {column.isSortedDesc ? '▼' : '▲'} 
                                                        </span>
                                                    ) : ''}                                                </th>
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

        <BackToTop />
        <Footer />
    </>
    </HelmetProvider>
    );
}
