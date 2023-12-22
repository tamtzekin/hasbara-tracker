import logo from '../logo.svg';

import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';

import './ClaimPage.css';
import '../App.css';

import data from './data';
import VideoPlayer from './VideoPlayer';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';


export default function Tracker() {
    const trackerData = useMemo(() => data, [],
            []
    )


    const columns = useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'date',
                sortType: (rowA, rowB, columnId) => {
                    const dateA = new Date(rowA.values[columnId]);
                    const dateB = new Date(rowB.values[columnId]);
                    return dateA.getTime() - dateB.getTime();
                },
                Cell: ({ cell }) => (
                    <div style={{ textAlign: 'center' }}>
                        {cell.value}
                    </div>
                ),
            },

            {
                Header: 'Claim',
                accessor: (row) => row.claim.claimText,
                Cell: ({ row }) => (
                    <span className={row.original.claim.claimClass}>
                        {row.original.claim.claimText}
                    </span>
                ),
            },

            {
                Header: 'Description',
                accessor: (row) => `${row.description.summary} ${row.description.details}`,
                Cell: ({ row }) => (
                    <div style={{maxWidth:700}}>
                        <details>
                            <summary>{row.original.description.summary}
                            <span className={row.original.description.summaryClass}></span></summary>
                            <div dangerouslySetInnerHTML={{ __html: row.original.description.details }} />
                        </details>
                    </div>
                ),
            },

            {
                Header: 'Sources',
                accessor: 'sourceText',
                Cell: ({ row }) => (
                    <VideoPlayer videoLink={row.original.videoLink}>
                        <a href={row.original.sourceLink} target="_blank" rel="noreferrer">
                            <span className="play-arrow"></span>
                            {row.original.sourceText}
                        </a>
                    </VideoPlayer>
                ),
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

    return (
        <>
        <span class="header-container">
            <MobileMenu />
            <h1 class="ht-heading">Hasbara Tracker</h1>
            <span id="dots">. . . . . . . . . . . . . .</span>
            <NavBar />
        </span>
        
        <div class="content-container">
        <div class="tracker-container">
            <SearchBar filter={globalFilter || ''} setFilter={setGlobalFilter} />

            {rows.length === 0 ? (
                <>
                <div>No results found. Try searching a different word or phrase.</div><div class="how-to">
                How to use the tracker:
                <ul>
                <li>Use the search bar below to find keywords (‘beheaded babies’, ‘hospital’, ‘al-shifa’). You can also search all Debunks by typing 'debunk'</li>
                <li>Click ‘Date▲’ to change the order of dates</li>
                <li>Hover over a ▶ source  to preview video (If you’re on your phone, tap + hold the link to preview)</li>
                <li>Click a source to open the archived link</li>
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
                        {column.id === 'date' && column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
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
                            {row.cells.map((cell) => (
                                <td
                                    {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            overflow: 'hidden',
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
        
        </div>
        </>
    );
}
