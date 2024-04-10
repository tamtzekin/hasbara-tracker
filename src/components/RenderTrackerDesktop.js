import React from 'react';
import ClaimFilter from './ClaimFilter';
import SearchBar from './SearchBar';

function RenderTrackerDesktop({ headerGroups, getTableProps, getTableBodyProps, rows, prepareRow, uniqueClaimTitles, globalFilter, setGlobalFilter }) {
  return (
    <>
      <div className="search-bar-container">
        <ClaimFilter
          claimTitles={uniqueClaimTitles}
          setGlobalFilter={setGlobalFilter}
        />
        <SearchBar
          filter={globalFilter || ''}
          setFilter={setGlobalFilter}
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
                <li className="dotted">Use the search bar to look up words, phrases, or topics (eg. ‘hospital’, ‘biden’, ‘al jazeera’)</li>
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
            <thead className="font-mono sticky top-0">
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
                      {/* 'Date' heading */}
                      <span style={{ marginRight: '0.25rem' }}>
                        {column.render('Header')}
                      </span>

                      {/* 'Date' asc/desc arrow */}
                      {column.id === 'date' && column.isSorted ? (
                        <span style={{ verticalAlign: 'middle' }}>
                          {column.isSortedDesc ? '▼' : '▲'}
                        </span>
                      ) : ''}
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
                          padding: '40px 40px 40px 0',
                          borderBottom: '1px dashed #5e5e5e',
                          overflow: 'visible',
                          width: // Set fixed column widths
                            index === 0 ? '20%' :
                            index === 1 ? '9%' :
                            index === 2 ? '36%' :
                            index === 3 ? '7%' :
                            '18%',
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
  );
}

export default RenderTrackerDesktop;
