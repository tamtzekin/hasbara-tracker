import React from 'react';

const SearchBar = ({ filter, setFilter }) => {
  const handleFilterChange = (e) => {
    const inputValue = e.target.value || '';
    setFilter(inputValue);
  };

  return (
    <span className="search-bar">
      Search for:{' '}
      <input
        value={filter || ''}
        onChange={handleFilterChange}
      />
    </span>
  );
};

export default SearchBar;
