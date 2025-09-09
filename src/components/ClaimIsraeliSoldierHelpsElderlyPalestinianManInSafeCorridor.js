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
import { data, summaries } from './data';
import TrackerColumns from './TrackerColumns';
import ClaimSummary from './ClaimSummary';
import RenderTrackerDesktop from './RenderTrackerDesktop';
import RenderTrackerMobile from './RenderTrackerMobile';

export default function ClaimIsraeliSoldierHelpsElderlyPalestinianManInSafeCorridor() {    
    const metadataProps = {
        url: "https://hasbaratracker.com/israeli-soldier-helps",
        title: summaries[6].claimMainTitle,
        description: summaries[6].claimSummary,
        
        twitterTitle: summaries[6].claimMainTitle,
        twitterDescription: summaries[6].claimSummary,
        twitterUrl: "https://hasbaratracker.com/israeli-soldier-helps",
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
            setForceRender(prev => !prev);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // All columns
    const columns = useMemo(() => TrackerColumns({ isMobileView }), [isMobileView]);

    // filteredData based on selected claim title
    const filteredData = useMemo(() => {
        if (!selectedClaimTitle) {
            return data.filter(item => item.claimTitle === summaries[6].claimMainTitle);
        }
        return data.filter(item => item.claimTitle === selectedClaimTitle);
    }, [selectedClaimTitle]);

    // Table setup
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data: filteredData,
        },
        useFilters,
        useGlobalFilter,
        useSortBy
    );

    const { globalFilter } = state;

    return (
        <HelmetProvider>
            <>
                <PageMetadata {...metadataProps} />
                {/* Header (fixed) */}
                <span className="header-container-fixed">
                    <span className="flex">
                        <Logo />
                        <MobileMenu />
                        <NavLinks />
                    </span>

                    {/* Shows title and summary of the claim */}
                    <ClaimSummary id={6} />
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
}
