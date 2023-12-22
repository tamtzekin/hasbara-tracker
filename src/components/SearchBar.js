import React from 'react';

const SearchBar = ({ filter, setFilter }) => {
    const handleFilterChange = (e) => {
        const inputValue = e.target.value || '';
        setFilter(inputValue);
    };

    return (
        <span className="search-bar">
            <input
                value={filter || ''}
                onChange={handleFilterChange}
                placeholder='&#x1F50E;&#xFE0E;  Search for ...'
                />
        </span>
    );
    };

export default SearchBar;
