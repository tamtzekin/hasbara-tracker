import logo from '../logo.svg';

import React, { useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';

import './ClaimPage.css';
import '../App.css';

import VideoPlayer from './VideoPlayer';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
import GlobalFilter from './GlobalFilter';


export default function ClaimA() {
    const data = useMemo(
        () => [
            {
                date: '10 Oct 2023',
                claim: {
                    claimText: 'Claim',
                    claimClass: 'claim-tag',
            },
                description: {
                    summary: 'Babies and toddlers were found with their “heads decapitated” in the Kfar Aza kibbutz',
                    summaryClass: 'expand-text',
                    details: 'A spokesperson for the Israeli state’s prime minister claimed babies and toddlers were found with their “heads decapitated” in the Kfar Aza kibbutz after HHH fighters entered occupied Palestine on October 7, 2023.<br /><br />Nicole Zedeck, a reporter with Tel Aviv-based news channel i24, interviewed Israeli occupation force soldier David Ben Zion who made the same claim on October 10, 2023. He said: “They cut heads of children, they cut heads of women.”',
                },
                sourceText: 'i24NEWS: ‘Horror scenes at kibbutz liberated from HHH',
                sourceLink: 'https://archive.ph/QeCXs',
                videoLink: '/files/i24NEWS_10Oct.mp4',
            },

            {
                date: '10 Oct 2023',
                claim: {
                    claimText: 'Claim',
                    claimClass: 'claim-tag',
                },
                description: {
                    summary: 'CNN reporter Nic Robertson claims babies’ heads cut off',
                    summaryClass: 'expand-text',
                    details: 'Nic Robertson, a CNN reporter, claimed Palestinian resistance fighters carried out III-style executions” by “cutting the heads off of people” including babies and killing their pets.<br /><br />“Men, women, children, hands bound, shot, executed, heads cut.”',
                },
                sourceText: 'CNN: ‘IDF, women, toddlers, elderly “butchered” by HHH in Kfar Aza’',
                sourceLink: 'https://archive.ph/XRmh4',
                videoLink: '/files/CNN_NicRobertson_10Oct.mp4',
            },

            {
                date: '11 Oct 2023',
                claim: {
                    claimText: 'Claim',
                    claimClass: 'claim-tag',
            },
                description: {
                    summary: 'US President Biden claims he saw ‘pictures’ of babies being beheaded',
                    summaryClass: 'expand-text',
                    details: 'In an address to Jewish community leaders on October 11, 2023, Biden claimed: “I never really thought that I would see and have confirmed pictures of terrorists beheading children.”',
                },
                sources: 'Source 1',
            },

            {
                date: '11 Oct 2023',
                claim: {
                    claimText: 'Debunk',
                    claimClass: 'debunk-tag',
                },
                description: {
                    summary: 'White House official clarifies Biden did not see pictures of decapitated babies',
                    summaryClass: 'expand-text',
                    details: 'An administration official later clarified Biden’s remarks, saying that Biden was referring to public statements from officials and media reports and had not actually seen photos.',
                },
                sources: 'Source 1',
            },


            {
                date: '',
                claim: '',
                claimClass: 'claim-tag',
                description: {
                    summary: '',
                    summaryClass: '',
                    details: '',
            },
                sources: 'Source 1',
            },

              ],
            []
    )

console.log("data" + data);


    const columns = useMemo(
        () => [
            // Properties
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
        console.log("Search for: " + globalFilter);

    return (
        <>
            <span class="claim-header-container">
                <MobileMenu />
                <Link to="/claims"><div className="arrow">←</div></Link>
                <h1 class="claim-heading">Claim: 40 beheaded babies</h1>
                <NavBar />
            </span>
        
        {/* render filter search bar  */}
            <GlobalFilter filter={globalFilter || ''} setFilter={setGlobalFilter} />
        
        <div>
            <table {...getTableProps()}>
            <thead>
                
                {/* Map the headers out */}
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (

                // Add sorting funct to the Date column
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
                
                {/* fill all the body cell props */}
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);

                        return (
                    <tr {...row.getRowProps()}>
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
        </div>
        </>
    );
}
