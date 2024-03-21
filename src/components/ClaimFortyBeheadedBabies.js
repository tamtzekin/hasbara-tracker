import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import './Tracker.css';
import '../App.css';

import { data } from './data';
import ClaimFilter from './ClaimFilter';
import SearchBar from './SearchBar';
import TrackerColumns from './TrackerColumns';

import MobileMenu from './MobileMenu';
import Logo from './Logo';
import NavLinks from './NavLinks'
import Footer from './Footer';
import BackToTop from './BackToTop';
import ClaimSummary from './ClaimSummary';
import RenderTrackerDesktop from './RenderTrackerDesktop';
import RenderTrackerMobile from './RenderTrackerMobile';


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

        {/* Shows title and summary of the claim */}
        <ClaimSummary id={0} />
    </span>
        
    

            {/* Show desktop view of Tracker - as a table */}
            {!isMobileView && (
                <RenderTrackerDesktop
                    {...{
                        headerGroups,
                        getTableProps,
                        getTableBodyProps,
                        rows,
                        prepareRow,
                        globalFilter,
                        setGlobalFilter,
                        uniqueClaimTitles,
                    }}
                />
            )}
            
            {/* Show mobile view of Tracker table - as cards */}
            {isMobileView && (
                <RenderTrackerMobile
                    {...{
                        headerGroups,
                        getTableProps,
                        getTableBodyProps,
                        rows,
                        prepareRow,
                        globalFilter,
                        setGlobalFilter,
                        uniqueClaimTitles,
                    }}
                />    
            )}

        <BackToTop />
        <Footer />
    </>

    </HelmetProvider>

    );
};
