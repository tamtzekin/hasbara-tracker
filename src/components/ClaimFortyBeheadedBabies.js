import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { HelmetProvider } from 'react-helmet-async';

// Page
import '../App.css';
import PageMetadata from './PageMetadata';
import MobileMenu from './MobileMenu';
import Logo from './Logo';
import NavLinks from './NavLinks';
import Footer from './Footer';
import BackToTop from './BackToTop';

// Tracker
import './Tracker.css';
import { data } from './data';
import TrackerColumns from './TrackerColumns';
import ClaimSummary from './ClaimSummary';
import RenderTrackerDesktop from './RenderTrackerDesktop';
import RenderTrackerMobile from './RenderTrackerMobile';

export default function ClaimFortyBeheadedBabies() {    
    const metadataProps = {
        url: "https://hasbaratracker.com/forty-beheaded-babies",
        title: "Claim: ‘Forty beheaded babies’",
        description: "Israeli officials claimed up to 40 babies were decapitated in kibbutzes following Operation Al-Aqsa Flood on 7 October, 2023. Versions of this fabrication have been repeated by politicians and the media globally.",
        twitterTitle: "Claim: ‘Forty beheaded babies’",
        twitterDescription: "Israeli officials claimed up to 40 babies were decapitated in kibbutzes following Operation Al-Aqsa Flood on 7 October, 2023. Versions of this fabrication have been repeated by politicians and the media globally.",
        twitterUrl: "https://hasbaratracker.com/forty-beheaded-babies",
    };

    // defines claim tags for dropdown (ClaimFilter.js)
    const uniqueClaimTitles = useMemo(() => {
        const claimTitlesSet = new Set(data.map((item) => item.claimTitle));
        return Array.from(claimTitlesSet);
    }, [data]);
    
    const [selectedClaimTitle, setSelectedClaimTitle] = useState('');

    // Set mobile/phone view dimensions
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);

    // Force to render if <= 576, so the Source links don't have the hovered video player attached.
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
                {/* Render page metadata */}
                <PageMetadata {...metadataProps} />

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
