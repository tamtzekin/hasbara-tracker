import React from 'react';

const SearchBar = ({ filter, setFilter }) => {
    const handleFilterChange = (e) => {
        const inputValue = e.target.value || '';
        setFilter(inputValue);
    };

    return (
        <div className="search-bar">
            <input
                value={filter || ''}
                onChange={handleFilterChange}
                placeholder='Search for ...'
                />
        </div>
    );
    };

export default SearchBar;
