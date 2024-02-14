import React, { useState } from 'react';

const ClaimFilter = ({ claimTags, setGlobalFilter }) => {
  const [selectedClaimTag, setSelectedClaimTag] = useState('');

  const handleClaimTagChange = (e) => {
    const tag = e.target.value;
    setSelectedClaimTag(tag);
    setGlobalFilter(tag);
  };

  return (
    <div className="claim-filter">
      {/* <label htmlFor="claimTag">Filter by Claim Tag:</label> */}
      <select
        className="claim-dropdown-box"
        id="claimTag"
        value={selectedClaimTag}
        onChange={handleClaimTagChange}
      >
        <option value="">
          All claims
        </option>
        {claimTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClaimFilter;
