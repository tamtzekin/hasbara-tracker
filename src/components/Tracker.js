import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';

import './Tracker.css';
import '../App.css';

import data from './data';
import VideoPlayer from './VideoPlayer';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';

export default function Tracker() {

    // Set phone/mobile view
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


    // Pull all the claims data
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
                    <>
                        <div class="details-heading"></div>
                        <div style={{ maxWidth: 650, textWrap: 'balance' }}>
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
                accessor: 'sources',
                Cell: ({ row }) => {
                    const sources = row.original.sources || [];

                    return (
                        <>
                            <div className="source-heading"></div>

                            {row.original.sources.map((source, index) => (
                                <VideoPlayer key={index} videoLink={source.videoLink}>
                                    <div key={index} class="source" style={{ marginBottom: '15%' }}>
                                        <a href={source.sourceLink} target="_blank" rel="noreferrer">
                                            {source.videoLink && (
                                                <>
                                                    <span className='icon-playarrow'></span>
                                                </>
                                            )}
                                            {!source.videoLink && (
                                                <>
                                                    <span className='icon-link'></span>
                                                </>
                                            )}
                                            <span dangerouslySetInnerHTML={{ __html: source.sourceText }} />
                                        </a>
                                    </div>
                                </VideoPlayer>
                            ))}
                            {sources.length > 1 && <>
                                <br />
                                <br />
                                <br />
                            </>}
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

    // Sets state based on what is in the search box
    const { globalFilter } = state;

    return (
        <>
            <span class="header-container">
                <MobileMenu />
                <h1 class="ht-heading">Hasbara Tracker</h1>
                <span id="dots">. . . . . . . . . . . . . .</span>
                <NavBar />
            </span>


            {/* Show desktop view */}
            {!isMobileView && (
                <>
                    <div class="search-bar-container">
                        <SearchBar filter={globalFilter || ''} setFilter={setGlobalFilter} />
                    </div>

                    <div class="tracker-container">
                        {/* Show 'how to' text when no results are found */}
                        {rows.length === 0 ? (
                            <>
                                <div class="no-results-text">No results found. Try searching a different word or phrase.</div>
                                <div class="how-to">
                                    How to use the tracker:
                                    <ul>
                                        <li>Use the search bar to look up words, phrases, or claims (eg. ‘beheaded babies’, ‘hospital’, ‘biden’)</li>
                                        <li>You can search by type of claim with ‘claim’, ‘debunk’ or ‘context’</li>
                                        <li>Click ‘Date ▲’ to change the order of events (desktop only)</li>
                                        <li>Hover over a source with <span class="icon-play"></span> to preview video (If you’re on your phone, tap + hold the link)</li>
                                        <li>Click each Source to open an archived link</li>
                                        <li>Click + and ⎯ to show more or less text</li>
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
                                                            padding: '20px',
                                                            borderBottom: 'solid 1px gray',
                                                            overflow: 'hidden',
                                                            width: // Set fixed column widths
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

            
            {/* Show phone/mobile view */}
            {isMobileView && (
                <>
                    <div class="search-bar-container">
                        <SearchBar filter={globalFilter || ''} setFilter={setGlobalFilter} />
                    </div>

                    <div class="tracker-container">

                        {/* Show 'how to' text when no results are found */}
                        {rows.length === 0 ? (
                            <>
                                <div class="no-results-text">No results found. Try searching a different word or phrase.</div>
                                <div class="how-to">
                                    How to use the tracker:
                                    <ul>
                                        <li>Use the search bar to look up words, phrases, or claims (eg. ‘beheaded babies’, ‘hospital’, ‘al-shifa’).</li>
                                        <li>You can also search by Claim / Debunk / Context by searching 'claim', 'debunk' or 'context'</li>
                                        <li>Click ‘Date ▲’ to change the order of events (desktop only)</li>
                                        <li>On your laptop: Hover over a ▷ source to preview video</li>
                                        <li>On your phone: tap + hold the ▷ link to preview. Click anywhere to close</li>
                                        <li>Click each Source to open an archived link</li>
                                        <li>Click + and ⎯ to show more or less text</li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            // Renders all claims data as blocks, instead of a table
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

            <div class="back-to-top"><a href="#top">🔺 Back to top</a></div>
        </>
    );
}
