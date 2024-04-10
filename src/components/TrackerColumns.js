import React from 'react';
import VideoPlayer from './VideoPlayer';

function TrackerColumns({ isMobileView }) {
    // Mobile tracker: displayed as an expandable card
    if (isMobileView) {
        return (
            [
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
                            {/* The Claim text */}
                            <details>
                                <summary><u>{row.original.description.summary}</u>
                                    <span className='expand-text'></span>
                                </summary>

                                {/* Details text */}
                                <article className="claim-paragraph">
                                    <div dangerouslySetInnerHTML={{ __html: row.original.description.details }} />
                                    
                                    {/* Source links */}
                                    <div className="source-heading"></div>

                                    {/* Display video link with play icon */}
                                    {row.original.sources.map((source, index) => (
                                            <div key={index} className="source">
                                                    {source.videoPreviewLink && (
                                                        <ul className="icon-playarrow">
                                                                <li>
                                                                    <a href={source.sourceLink} target="_blank" rel="noreferrer">
                                                                        <span dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                    )}
                                                    
                                    {/* Display link with circle icon */}
                                    {!source.videoPreviewLink && (
                                        <ul className="icon-link">
                                                <li>
                                                    <a href={source.sourceLink} target="_blank" rel="noreferrer">
                                                        <span dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                    </a>
                                                </li>
                                            </ul>
                                    )}

                                    {/* Show archive link */}
                                    {source.archiveLink && (
                                        <ul>
                                            <span className="text-grey-faded italic text-xs ml-4 mobile:flex mobile:ml-8 mobile:mt-6">
                                            <li>
                                                <a className="archive-link" href={source.archiveLink} target="_blank" rel="noreferrer">
                                                    <span className="text-grey-faded">Archive</span>
                                                </a>
                                            </li>
                                            </span>
                                        </ul>                                                                    
                                    )}
                                        </div>
                                    ))}
                                </article>
                            </details>
                        </div>
                        </>
                    ),
                },
            ]
    );

    } else {

        // Desktop tracker: displayed as a table
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

                                        {/* Video preview links - If there's a video preview available, show play icon (play triangle) */}
                                        {source.videoPreviewLink && (
                                                <ul className="icon-playarrow">
                                                    <li>
                                                        <a href={source.sourceLink} target="_blank" rel="noreferrer" aria-hidden="true" className={source.hasBeenDeleted === 'true' ? 'deleted-source' : ''}>
                                                            <span dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                            &nbsp;
                                                        </a>
                                                    </li>
                                                </ul>
                                        )}

                                        {/* Normal links - If no video preview, show link icon (circle)) */}
                                        {!source.videoPreviewLink && (
                                                <ul className='icon-link'>
                                                    <li>
                                                        <a href={source.sourceLink} target="_blank" rel="noreferrer" aria-hidden="true" className={source.hasBeenDeleted === 'true' ? 'deleted-source' : ''}>
                                                            <span dangerouslySetInnerHTML={{ __html: source.sourceName }} />
                                                            &nbsp;
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
                                                <li className="ml-4 mt-0">
                                                    <a className="archive-link" href={source.archiveLink} target="_blank" rel="noreferrer" aria-hidden="true">
                                                        <span className="text-grey-faded text-xs italic">Archive</span>
                                                        &nbsp;
                                                    </a>
                                                </li>
                                            </ul>
                                        )}

                                        {/* Show file links */}
                                        {source.fileLink && ( 
                                            <ul>
                                                <li className="ml-4 mt-0">
                                                    <a className="file-link" href={source.fileLink} target="_blank" rel="noreferrer" aria-hidden="true">
                                                        <span className="text-grey-faded text-xs italic">File&nbsp;</span>
                                                        &nbsp;
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
}

export default TrackerColumns;
