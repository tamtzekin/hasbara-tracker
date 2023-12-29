import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';

import './Tracker.css';
import '../App.css';

import data from './data';
import VideoPlayer from './VideoPlayer';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';


export default function Tracker() {
    const trackerData = useMemo(() => data, []);

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);


    const columns = useMemo(
        () => [
            {
                Header: 'Claim',
                accessor: 'claimTag',
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

            {
                Header: 'What',
                accessor: (row) => row.claim.claimText,
                Cell: ({ row }) => (
                    <span className={row.original.claim.claimClass}>
                        {row.original.claim.claimText}
                    </span>
                ),
            },

            {
                Header: 'Details',
                accessor: (row) => `${row.description.summary} ${row.description.details}`,
                Cell: ({ row }) => (
                    <>                    <div class="details-heading"></div>
                    <div style={{maxWidth:700}}>
                        <details>
                            <summary><u>{row.original.description.summary}</u>
                            <span className={row.original.description.summaryClass}></span></summary>
                            <div dangerouslySetInnerHTML={{ __html: row.original.description.details }} />
                        </details>
                    </div>
                    </>

                ),
            },

            {
                Header: 'Sources',
                accessor: 'sourceText',
                Cell: ({ row }) => {
                    const videoLink = row.original.videoLink;
                    const videoHasPreviewLink = videoLink && videoLink.trim() !== '';
                
                    return (
                    <>
                    <div class="source-heading"></div>
                    <VideoPlayer videoLink={videoLink}>
                        <div class="source">
                        <a href={row.original.sourceLink} target="_blank" rel="noreferrer">

                        {videoHasPreviewLink ? (
                            <>
                            {videoHasPreviewLink}
                            <span className='icon-playarrow'></span>
                            </>
                        ) :
                            <>
                            <span className='icon-link'></span>
                            </>
                        
                        }

                        {row.original.sourceText}
                        </a>
                        </div>
                    </VideoPlayer>
                    </>
                    );
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
            },
            disableSortRemove: true,
        },
            useFilters,
            useGlobalFilter,
            useSortBy
        );
        const { globalFilter } = state

        
        // use for mobile view printing data simply
        const renderDataItem = (item) => (
            <div key={item.id} className="data-item">
                {/* <h2>{item.claimTag}</h2> */}
                {/* <p>Date: {item.date}</p> */}
                {/* <p>What: {item.claim.claimText}</p> */}
                {/* ... (render other fields as needed) */}
            </div>
        );


    // Check if the window width is less than or equal to 768 for mobile view
    // const isMobileView = window.innerWidth <= 768;

    // Render data items for mobile view
    // const renderMobileData = () => (
    //     <div className={`mobile-claims-display`}>
    //         {trackerData.map((item) => renderDataItem(item))}
    //     </div>
    // );

    // Render data items for mobile view
    // const mappedData = trackerData.map((item) => ({
    //     id: item.id,
    //     claimTag: item.claimTag,
    //     date: item.date,
    //     claimText: item.claim.claimText,
    //     claimClass: item.claim.claimClass,
    //     summary: item.description.summary,
    //     details: item.description.details,
    //     sourceName: item.sourceText,
    //     sourceLink: item.sourceLink,
    //     videoLink: item.videoLink,
    //     expandButton: item.description.summaryClass 
    // }));
    
    console.log('Search word entered:' + globalFilter);

    return (
        <>
        <span class="header-container">
            <MobileMenu />
            <h1 class="ht-heading"><Link to='/'>Hasbara Tracker</Link></h1>
            <span id="dots">. . . . . . . . . . . . . .</span>
            <NavBar />
        </span>


        {/* DESKTOP VIEW */}

        {!isMobileView && (
        <>
        <div class="search-bar-container">
        <SearchBar filter={globalFilter || ''} setFilter={setGlobalFilter} />
    </div>


        <div class="tracker-container">
            {rows.length === 0 ? (
                <>

<div class="no-results-text">No results found. Try searching a different word or phrase.</div>
                <div class="how-to">
                How to use the tracker:
                <ul>
                <li>Use the search bar to look up words, phrases or claims (eg. ‘beheaded babies’, ‘hospital’, ‘biden’)</li>
                <li>You can search by type of claim with ‘claim’, ‘debunk’ or ‘context’</li>
                <li>Click ‘Date ▲’ to change the order of events (desktop only)</li>
                <li>Hover over a source with <span class="icon-play"></span> to preview video (If you’re on your phone, tap + hold the link)</li>
                <li>Click each Source to open an archived link</li>
                <li>Click + and ⎯ to show more or less text</li>
                </ul>
            </div>
            </>
            ) : (

            <table {...getTableProps()}>
            <thead>
                {/* Map the headers out */}
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (

                // Add sorting function to the Date column
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
                
            {/* Fetch + fill out all the body cell props */}
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);

                    return (
                        <tr 
                            {...row.getRowProps()}>
                            {row.cells.map((cell, index) => (
                                <td
                                    {...cell.getCellProps()}
                                        style={{
                                            padding: '20px',
                                            borderBottom: 'solid 1px gray',
                                            overflow: 'hidden',
                                            
                                            // Fix the size of each column
                                            width:
                                                index === 0 ? '30px' :
                                                index === 1 ? '80px' :
                                                index === 2 ? '20px' :
                                                index === 3 ? '600px' :
                                                '130px',
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



        {/* MOBILE VIEW*/}
        {/* {isMobileView && renderMobileData()} */}
        {isMobileView && (
        <>
        <div class="search-bar-container">
        <SearchBar filter={globalFilter || ''} setFilter={setGlobalFilter} />
    </div>


        <div class="tracker-container">
            {rows.length === 0 ? (
                <>
                <div class="no-results-text">No results found. Try searching a different word or phrase.</div><div class="how-to">
                How to use the tracker:
                <ul>
                <li>Use the search bar to look up words, phrases or claims (eg. ‘beheaded babies’, ‘hospital’, ‘al-shifa’).</li>
                <li>You can also search by Claim / Debunk / Context by searching 'claim', 'debunk' or 'context'</li>
                <li>Click ‘Date ▲’ to change the order of events (desktop only)</li>
                <li>Hover over a ▷ source  to preview video (If you’re on your phone, tap + hold the link to preview). Click anywhere to close</li>
                <li>Click each Source to open an archived link</li>
                <li>Click + and ⎯ to show more or less text</li>
                </ul>
            </div>
            </>

            ) : (

            <div {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);


return (
    <div key={row.id} className="data-row" style={{display: 'block', alignItems: 'center'}}>
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
        
        <div class="back-to-top"><a href="#top">🔺 Back to top</a></div>
        </>
    );
}
