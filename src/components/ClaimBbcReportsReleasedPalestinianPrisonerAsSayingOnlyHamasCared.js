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

export default function ClaimBbcReportsReleasedPalestinianPrisonerAsSayingOnlyHamasCared() {    
    const metadataProps = {
        url: "https://hasbaratracker.com/bbc-reports-released",
        title: summaries[67].claimMainTitle,
        description: summaries[67].claimSummary,
        
        twitterTitle: summaries[67].claimMainTitle,
        twitterDescription: summaries[67].claimSummary,
        twitterUrl: "https://hasbaratracker.com/bbc-reports-released",
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
            return data.filter(item => item.claimTitle === summaries[67].claimMainTitle);
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

                    {/* Claim summary */}
                    <ClaimSummary id={67} />

                    {isMobileView ? (
                        <RenderTrackerMobile
                            getTableProps={getTableProps}
                            headerGroups={headerGroups}
                            getTableBodyProps={getTableBodyProps}
                            rows={rows}
                            prepareRow={prepareRow}
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                            uniqueClaimTitles={uniqueClaimTitles}
                            selectedClaimTitle={selectedClaimTitle}
                            setSelectedClaimTitle={setSelectedClaimTitle}
                        />
                    ) : (
                        <RenderTrackerDesktop
                            getTableProps={getTableProps}
                            headerGroups={headerGroups}
                            getTableBodyProps={getTableBodyProps}
                            rows={rows}
                            prepareRow={prepareRow}
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                            uniqueClaimTitles={uniqueClaimTitles}
                            selectedClaimTitle={selectedClaimTitle}
                            setSelectedClaimTitle={setSelectedClaimTitle}
                        />
                    )}
                </span>

                <BackToTop />
                <Footer />
            </>
        </HelmetProvider>
    );
}
