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
                placeholder='Enter a claim or keyword to search ...'
                />
        </span>
    );
    };

export default SearchBar;
