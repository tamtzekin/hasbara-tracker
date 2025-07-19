import React from 'react';
import ClaimFilter from './ClaimFilter';
import SearchBar from './SearchBar';

function RenderTrackerMobile({ headerGroups, getTableProps, getTableBodyProps, rows, prepareRow, uniqueClaimTitles, globalFilter, setGlobalFilter }) {
  return (
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
                        <li>Use the search bar to look up words, phrases or topics (eg. 'hospital', 'biden', 'al jazeera')</li>
                        <li>You can search by type of claim with 'claim', 'debunk' or 'context'</li>
                        <li>Click 'Date ▲' to change the order of events (desktop only)</li>
                        <li>Hover over a source with <span className="icon-play"></span> to preview video (If you're on your phone, tap + hold the link)</li>
                        <li>Click each Source to open an archived link</li>
                        <li>Click + and ⎯ to show more or less text</li>
                    </ul>
                </div>
        </>

) : (

    // Renders all claims data in divs, instead of a table
    <div {...getTableBodyProps()}>
        {rows.map((row) => {
            prepareRow(row);
            
            // Separate the date and type cells from other cells
            const dateCells = row.cells.filter(cell => 
                cell.column.Header.toLowerCase() === 'date' || 
                cell.column.Header.toLowerCase() === 'type'
            );
            const otherCells = row.cells.filter(cell => 
                cell.column.Header.toLowerCase() !== 'date' && 
                cell.column.Header.toLowerCase() !== 'type'
            );
            
            return (
                <div key={row.id} 
                    className="data-row" 
                    style={{ 
                        display: 'block',
                        alignItems: 'center' 
                    }}>
                    
                    {/* Group date and type tags in a flex container */}
                    <div className="tag-container">
                        {dateCells.map((cell) => (
                            <div key={cell.column.id} className={`data-cell ${cell.column.Header.toLowerCase()}`}>
                                {cell.render('Cell')}
                            </div>
                        ))}
                    </div>
                    
                    {/* Render other cells normally */}
                    {otherCells.map((cell) => (
                        <div key={cell.column.id} className={`data-cell ${cell.column.Header.toLowerCase()}`}>
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
);
}

export default RenderTrackerMobile;