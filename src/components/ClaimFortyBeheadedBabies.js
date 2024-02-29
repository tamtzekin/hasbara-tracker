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

export default function ClaimFortyBeheadedBabies() {
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
                Header: 'Type',
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
                // globalFilter: new URLSearchParams(window.location.search).get('claim') || '', // allows URL queries to set filter

                globalFilter: 'forty beheaded babies'
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

{/* TODO: Refactor this properly to use Logo component */}

            <div className="laptop:w-1/5 mt-1 ml-[5%] mobile:w-1/2 mobile:ml-10 mobile:mt-2">
                <Link to="/">
                <svg 
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 1100 350"
                    width="100%"
                    height="100%"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
<path d="M6.94839 189.278V184.788H29.0884V189.278H20.2634V220.14H15.7734V189.278H6.94839ZM33.4236 220.14V193.613H37.9135V198H42.197V193.613H51.1253V198.103H42.3002V202.49H37.9135V220.14H33.4236ZM55.4604 215.702V206.825H59.8471V202.438H73.0589V198.103H59.8471V193.613H73.1621V198H77.5488V220.14H59.8471V215.702H55.4604ZM59.9503 215.65H73.0589V206.928H59.9503V215.65ZM86.3223 215.702V198H90.709V193.613H104.024V198H108.411V202.49H103.921V198.103H90.8122V215.65H103.921V211.212H108.411V215.702H104.024V220.14H90.709V215.702H86.3223ZM117.184 220.14V184.788H121.674V206.825H125.958V202.438H130.396V198H134.783V193.613H139.273V198.103H134.886V202.49H130.448V211.212H134.886V215.65H139.273V220.14H134.783V215.702H130.396V211.315H121.674V220.14H117.184ZM148.046 198.103V193.613H156.923V220.14H152.433V198.103H148.046ZM152.433 189.278V184.788H156.923V189.278H152.433ZM165.696 220.14V193.613H183.398V198H187.785V220.14H183.295V198.103H170.186V220.14H165.696ZM196.558 215.702V198H200.945V193.613H218.646V224.527H214.26V228.965H200.945V224.475H214.157V220.14H200.945V215.702H196.558ZM201.048 215.65H214.157V198.103H201.048V215.65ZM240.632 215.702V206.825H245.018V202.438H258.23V198.103H245.018V193.613H258.333V198H262.72V220.14H245.018V215.702H240.632ZM245.122 215.65H258.23V206.928H245.122V215.65ZM271.494 220.14V193.613H289.195V198H293.582V220.14H289.092V198.103H275.984V220.14H271.494ZM302.355 215.702V198H306.742V193.613H319.954V184.788H324.444V220.14H306.742V215.702H302.355ZM306.845 215.65H319.954V198.103H306.845V215.65ZM346.429 198.103V193.613H350.816V184.788H355.306V193.613H359.692V198.103H355.306V220.14H350.816V198.103H346.429ZM368.466 220.14V193.613H372.956V198H377.239V193.613H386.168V198.103H377.343V202.49H372.956V220.14H368.466ZM390.503 215.702V206.825H394.889V202.438H408.101V198.103H394.889V193.613H408.204V198H412.591V220.14H394.889V215.702H390.503ZM394.993 215.65H408.101V206.928H394.993V215.65ZM421.365 215.702V211.212H425.855V215.65H434.576V211.315H430.138V206.928H425.751V202.49H421.365V198H425.751V193.613H434.628V198H439.066V202.49H434.576V198.103H425.855V202.438H430.241V206.825H434.628V211.212H439.066V215.702H434.628V220.14H425.751V215.702H421.365ZM447.788 220.14V184.788H452.278V193.613H465.49V198H469.877V220.14H465.387V198.103H452.278V220.14H447.788ZM478.65 198.103V193.613H487.527V220.14H483.037V198.103H478.65ZM483.037 189.278V184.788H487.527V189.278H483.037ZM496.3 220.14V193.613H514.002V198H518.389V220.14H513.899V198.103H500.79V220.14H496.3ZM527.162 215.702V198H531.549V193.613H549.25V224.527H544.864V228.965H531.549V224.475H544.761V220.14H531.549V215.702H527.162ZM531.652 215.65H544.761V198.103H531.652V215.65ZM571.236 220.14V184.788H575.726V220.14H571.236ZM584.448 215.702V211.212H588.937V215.65H597.659V211.315H593.221V206.928H588.834V202.49H584.448V198H588.834V193.613H597.711V198H602.149V202.49H597.659V198.103H588.937V202.438H593.324V206.825H597.711V211.212H602.149V215.702H597.711V220.14H588.834V215.702H584.448ZM610.871 220.14V193.613H615.361V198H619.644V193.613H628.573V198.103H619.748V202.49H615.361V220.14H610.871ZM632.908 215.702V206.825H637.295V202.438H650.506V198.103H637.295V193.613H650.61V198H654.996V220.14H637.295V215.702H632.908ZM637.398 215.65H650.506V206.928H637.398V215.65ZM663.77 215.702V198H668.157V193.613H681.471V198H685.858V206.928H668.26V215.65H681.368V211.212H685.858V215.702H681.471V220.14H668.157V215.702H663.77ZM668.26 202.438H681.368V198.103H668.26V202.438ZM694.632 189.278V184.788H703.508V220.14H699.018V189.278H694.632ZM712.282 198.103V193.613H721.158V220.14H716.668V198.103H712.282ZM716.668 189.278V184.788H721.158V189.278H716.668ZM743.144 228.965V193.613H760.845V198H765.232V215.702H760.845V220.14H747.634V228.965H743.144ZM747.634 215.65H760.742V198.103H747.634V215.65ZM774.005 220.14V193.613H778.495V198H782.779V193.613H791.707V198.103H782.882V202.49H778.495V220.14H774.005ZM796.042 215.702V198H800.429V193.613H813.744V198H818.131V215.702H813.744V220.14H800.429V215.702H796.042ZM800.532 215.65H813.641V198.103H800.532V215.65ZM826.904 228.965V193.613H844.606V198H848.993V215.702H844.606V220.14H831.394V228.965H826.904ZM831.394 215.65H844.503V198.103H831.394V215.65ZM857.766 215.702V206.825H862.153V202.438H875.365V198.103H862.153V193.613H875.468V198H879.855V220.14H862.153V215.702H857.766ZM862.256 215.65H875.365V206.928H862.256V215.65ZM888.628 215.702V198H893.015V193.613H910.716V224.527H906.33V228.965H893.015V224.475H906.226V220.14H893.015V215.702H888.628ZM893.118 215.65H906.226V198.103H893.118V215.65ZM919.49 215.702V206.825H923.877V202.438H937.088V198.103H923.877V193.613H937.192V198H941.578V220.14H923.877V215.702H919.49ZM923.98 215.65H937.088V206.928H923.98V215.65ZM950.352 220.14V193.613H968.053V198H972.44V220.14H967.95V198.103H954.842V220.14H950.352ZM981.214 215.702V198H985.6V193.613H998.812V184.788H1003.3V220.14H985.6V215.702H981.214ZM985.704 215.65H998.812V198.103H985.704V215.65ZM1012.08 215.702V206.825H1016.46V202.438H1029.67V198.103H1016.46V193.613H1029.78V198H1034.16V220.14H1016.46V215.702H1012.08ZM1016.57 215.65H1029.67V206.928H1016.57V215.65Z" fill="#494949"/>
<path d="M11.2448 135.132V44.5125H22.7542V78.3792H56.3562V44.5125H67.8656V135.132H56.3562V89.8885H22.7542V135.132H11.2448ZM90.3552 123.755V101.001H101.6V89.7563H135.467V78.6438H101.6V67.1344H135.731V78.3792H146.976V135.132H101.6V123.755H90.3552ZM101.865 123.623H135.467V101.266H101.865V123.623ZM169.466 123.755V112.246H180.975V123.623H203.332V112.51H191.955V101.266H180.71V89.8885H169.466V78.3792H180.71V67.1344H203.465V78.3792H214.842V89.8885H203.332V78.6438H180.975V89.7563H192.22V101.001H203.465V112.246H214.842V123.755H203.465V135.132H180.71V123.755H169.466ZM237.199 135.132V44.5125H248.708V67.1344H282.575V78.3792H293.82V123.755H282.575V135.132H237.199ZM248.708 123.623H282.31V78.6438H248.708V123.623ZM316.309 123.755V101.001H327.554V89.7563H361.421V78.6438H327.554V67.1344H361.685V78.3792H372.93V135.132H327.554V123.755H316.309ZM327.819 123.623H361.421V101.266H327.819V123.623ZM395.42 135.132V67.1344H406.929V78.3792H417.909V67.1344H440.796V78.6438H418.174V89.8885H406.929V135.132H395.42ZM451.908 123.755V101.001H463.153V89.7563H497.02V78.6438H463.153V67.1344H497.284V78.3792H508.529V135.132H463.153V123.755H451.908ZM463.418 123.623H497.02V101.266H463.418V123.623ZM553.508 56.0219V44.5125H610.261V56.0219H587.64V135.132H576.13V56.0219H553.508ZM621.374 135.132V67.1344H632.883V78.3792H643.864V67.1344H666.75V78.6438H644.128V89.8885H632.883V135.132H621.374ZM677.862 123.755V101.001H689.107V89.7563H722.974V78.6438H689.107V67.1344H723.239V78.3792H734.483V135.132H689.107V123.755H677.862ZM689.372 123.623H722.974V101.266H689.372V123.623ZM756.973 123.755V78.3792H768.218V67.1344H802.349V78.3792H813.594V89.8885H802.084V78.6438H768.482V123.623H802.084V112.246H813.594V123.755H802.349V135.132H768.218V123.755H756.973ZM836.083 135.132V44.5125H847.593V101.001H858.573V89.7563H869.95V78.3792H881.195V67.1344H892.704V78.6438H881.459V89.8885H870.082V112.246H881.459V123.623H892.704V135.132H881.195V123.755H869.95V112.51H847.593V135.132H836.083ZM915.194 123.755V78.3792H926.438V67.1344H960.57V78.3792H971.815V101.266H926.703V123.623H960.305V112.246H971.815V123.755H960.57V135.132H926.438V123.755H915.194ZM926.703 89.7563H960.305V78.6438H926.703V89.7563ZM994.304 135.132V67.1344H1005.81V78.3792H1016.79V67.1344H1039.68V78.6438H1017.06V89.8885H1005.81V135.132H994.304Z" fill="#0B0B0B"/>
<path d="M13.9517 167.158V155.045H20.0435V167.158H13.9517ZM37.8986 167.158V155.045H43.9903V167.158H37.8986ZM61.8455 167.158V155.045H67.9372V167.158H61.8455ZM85.7923 167.158V155.045H91.8841V167.158H85.7923ZM109.739 167.158V155.045H115.831V167.158H109.739ZM133.686 167.158V155.045H139.778V167.158H133.686ZM157.633 167.158V155.045H163.725V167.158H157.633ZM181.58 167.158V155.045H187.672V167.158H181.58ZM205.527 167.158V155.045H211.618V167.158H205.527ZM229.474 167.158V155.045H235.565V167.158H229.474ZM253.42 167.158V155.045H259.512V167.158H253.42ZM277.367 167.158V155.045H283.459V167.158H277.367ZM301.314 167.158V155.045H307.406V167.158H301.314ZM325.261 167.158V155.045H331.353V167.158H325.261ZM349.208 167.158V155.045H355.3V167.158H349.208ZM373.155 167.158V155.045H379.247V167.158H373.155ZM397.102 167.158V155.045H403.193V167.158H397.102ZM421.049 167.158V155.045H427.14V167.158H421.049ZM444.995 167.158V155.045H451.087V167.158H444.995ZM468.942 167.158V155.045H475.034V167.158H468.942ZM492.889 167.158V155.045H498.981V167.158H492.889ZM516.836 167.158V155.045H522.928V167.158H516.836ZM540.783 167.158V155.045H546.875V167.158H540.783ZM564.73 167.158V155.045H570.822V167.158H564.73ZM588.677 167.158V155.045H594.768V167.158H588.677ZM612.624 167.158V155.045H618.715V167.158H612.624ZM636.57 167.158V155.045H642.662V167.158H636.57ZM660.517 167.158V155.045H666.609V167.158H660.517ZM684.464 167.158V155.045H690.556V167.158H684.464ZM708.411 167.158V155.045H714.503V167.158H708.411ZM732.358 167.158V155.045H738.45V167.158H732.358ZM756.305 167.158V155.045H762.397V167.158H756.305ZM780.252 167.158V155.045H786.344V167.158H780.252ZM804.199 167.158V155.045H810.29V167.158H804.199ZM828.145 167.158V155.045H834.237V167.158H828.145ZM852.092 167.158V155.045H858.184V167.158H852.092ZM876.039 167.158V155.045H882.131V167.158H876.039ZM899.986 167.158V155.045H906.078V167.158H899.986ZM923.933 167.158V155.045H930.025V167.158H923.933ZM947.88 167.158V155.045H953.972V167.158H947.88ZM971.827 167.158V155.045H977.919V167.158H971.827ZM995.774 167.158V155.045H1001.87V167.158H995.774ZM1019.72 167.158V155.045H1025.81V167.158H1019.72Z" fill="#3D3C3C"/>
</svg>

                </Link>
            </div>
                    <div className="claim-summary container mt-12 mobile:mt-3">
                        <div className="text-md laptop:w-1/2 mb-5 font-bold mobile:ml-1">
                            The claim
                            </div>
                        <div className="text-lg laptop:w-1/2 mb-2 -mt-2 mobile:ml-1">
                            ‘Forty beheaded babies’</div>
                        <div className="
                            text-md laptop:w-1/2 laptop:mb-10 mt-2 text-grey-faded mobile:w-10/12 mobile:ml-1
                            ">
                                Israeli soldiers claimed they found up to 40 decapitated or murdered babies in kibbutzes across occupied Palestine. This has been repeated by politicians and the media abroad.
                    </div>

                    </div>

                    {/* <div>{claimSummary}</div> */}
            </div>
        </span>
        
        <div className="nav-links-fixed top-16 mobile:invisible">
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
                                <thead className="">
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
                                                            padding: '3% 3% 0 0',
                                                            borderBottom: '1px dashed grey',
                                                            overflow: 'visible',
                                                            width: // Set fixed column widths
                                                                index === 0 ? '20%' :
                                                                index === 1 ? '9%' :
                                                                index === 2 ? '35%' :
                                                                index === 3 ? '8%' :
                                                                '14%',
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
