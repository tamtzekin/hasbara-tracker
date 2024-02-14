import React, { useState } from 'react';

const ClaimFilter = ({ claimTitles, setGlobalFilter }) => {
  const [selectedClaimTitle, setSelectedClaimTitle] = useState('');

  const handleClaimTitleChange = (e) => {
    const title = e.target.value;
    setSelectedClaimTitle(title);
    setGlobalFilter(title);
  };

  return (
    <div className="claim-filter">
      {/* <label htmlFor="claimTag">Filter by Claim Tag:</label> */}
      <select
        className="claim-dropdown-box"
        id="claimTitle"
        value={selectedClaimTitle}
        onChange={handleClaimTitleChange}
      >
        <option value="">
          All claims
        </option>
        {claimTitles.map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClaimFilter;
